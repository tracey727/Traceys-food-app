(()=>{
'use strict';

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const VERSION='2026.07.29.24.0';
const STORE_KEY='genevieve_food_v24_state';
const LEGACY_V22_KEY='genevieve_food_v22_state';
const LEGACY_V20_KEY='genevieve_food_v20_state';
const LEGACY_V19_KEY='genevieve_food_v19_live_phone';
const LEGACY_V18_KEY='genevieveV18';
const OFF_V2='https://world.openfoodfacts.org/api/v2/product/';
const OFF_V0='https://world.openfoodfacts.org/api/v0/product/';
const clone=value=>typeof structuredClone==='function'?structuredClone(value):JSON.parse(JSON.stringify(value));

const defaults={
  settings:{traceDairyAccepted:true,warnAdditives:true,autoScanner:true},
  foods:[],shopping:[],diary:[],currentProduct:null,mealPlan:{},
  createdAt:new Date().toISOString(),version:VERSION
};

let state=loadState();
let cameraStream=null,scanTimer=null,liveReader=null,liveControls=null,scanLocked=false,scanStarting=false;
let barcodePhoto=null,barcodePhotoRotation=0,barcodePhotoUrl='';
let tesseractPromise=null;
const uploadedPhotos={front:null,ingredients:null,allergen:null};
const uploadedPhotoUrls={front:'',ingredients:'',allergen:''};
let photoProcessing=false;

const KNOWN_PRODUCTS={
  '4901515129889':{
    barcode:'4901515129889',
    name:'Kikkoman Naturally Brewed Gluten Free Soy Sauce',
    brand:'Kikkoman',
    ingredients:'Water, soybeans, rice, salt.',
    allergens:'Contains soy.',
    traces:'',
    labels:'Gluten-free',
    labels_tags:['en:gluten-free'],
    glutenFreeConfirmed:true,
    evidenceSource:'known-product',
    source:'Built-in verified test record; check the current physical label'
  }
};
let displayedMeals=[];
let currentScreen='scan';
const brandObjectUrls={ga:null,tree:null};

function uid(prefix='id'){return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}
function esc(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]))}
function norm(value=''){return String(value).toLowerCase().replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim()}
function money(value){return new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD'}).format(Number(value)||0)}
function toast(message){const element=$('#toast');element.textContent=message;element.hidden=false;clearTimeout(element._hide);element._hide=setTimeout(()=>element.hidden=true,3400)}
function safeJsonParse(text){try{return JSON.parse(text)}catch{return null}}
function withTimeout(promise,ms,message='Operation timed out'){return Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error(message)),ms))])}

function migrateV19(old){
  if(!old||typeof old!=='object')return null;
  return {
    ...clone(defaults),
    foods:Array.isArray(old.stock)?old.stock.map(item=>({
      id:item.id||uid('food'),name:item.name||'Unnamed food',brand:'',barcode:item.barcode||'',ingredients:item.notes||'',
      allergens:'',traces:'',labels:'',labels_tags:[],glutenFreeConfirmed:String(item.safety||'').startsWith('Green'),
      image:'',safety:String(item.safety||'').startsWith('Red')?'red':String(item.safety||'').startsWith('Green')?'green':'amber',
      reasons:[item.safety||'Imported from V19'],alternatives:[],owner:String(item.safety||'').startsWith('Housemate')?'housemate':'mine',
      quantity:Number(item.qty)||0,unit:item.unit||'item',location:item.location||'Pantry',lowThreshold:Number(item.yellow??1),updatedAt:new Date().toISOString()
    })):[],
    shopping:Array.isArray(old.shopping)?old.shopping.map(item=>({
      id:item.id||uid('shop'),name:item.item||item.name||'Item',quantity:Number(item.qty||item.quantity)||1,barcode:item.barcode||'',
      colesPrice:item.colesPrice??'',wooliesPrice:item.woolworthsPrice??'',done:false,auto:false
    })):[],
    diary:Array.isArray(old.usage)?old.usage.map(item=>({id:uid('diary'),food:item.recipe||'Meal',reaction:'Not recorded',notes:item.ingredients||'',date:item.time||new Date().toISOString()})):[],
    currentProduct:null,mealPlan:{},version:VERSION
  };
}

function migrateV18(old){
  if(!old||typeof old!=='object')return null;
  return {
    ...clone(defaults),
    foods:Array.isArray(old.pantry)?old.pantry.map(item=>({
      id:uid('food'),name:item.name||'Unnamed food',brand:'',barcode:item.barcode||'',ingredients:'',allergens:'',traces:'',labels:'',labels_tags:[],
      glutenFreeConfirmed:item.safe==='green',image:'',safety:['green','amber','red'].includes(item.safe)?item.safe:'amber',
      reasons:item.notes?[item.notes]:['Imported from Food V18'],alternatives:[],owner:item.mine===false?'housemate':'mine',
      quantity:Number(item.qty)||0,unit:item.unit||'item',location:item.area||'Pantry',lowThreshold:Math.max(0,Math.round((Number(item.max)||2)/2)),updatedAt:new Date().toISOString(),
      evidenceSource:'legacy-import',manualLabelConfirmed:false
    })):[],
    shopping:Array.isArray(old.shop)?old.shop.map(item=>({
      id:uid('shop'),name:item.name||'Item',quantity:Math.max(1,Number(item.qty)||1),barcode:item.barcode||'',
      colesPrice:'',wooliesPrice:'',done:false,auto:false,sourceFoodId:''
    })):[],
    diary:Array.isArray(old.reactions)?old.reactions.map(item=>({
      id:uid('diary'),food:item.meal||'Meal',reaction:item.severity||'Not recorded',notes:[item.symptoms,item.bowels!==undefined?`Bowel count: ${item.bowels}`:''].filter(Boolean).join(' · '),date:item.date||new Date().toISOString()
    })):[],
    currentProduct:null,mealPlan:{},version:VERSION
  };
}

function migrateState(raw){
  const source=raw&&typeof raw==='object'?raw:{};
  const next={...clone(defaults),...source,settings:{...defaults.settings,...(source.settings||{})}};
  next.foods=Array.isArray(next.foods)?next.foods.map(food=>({
    id:food.id||uid('food'),name:food.name||'Unnamed food',brand:food.brand||'',barcode:food.barcode||'',ingredients:food.ingredients||'',
    allergens:food.allergens||'',traces:food.traces||'',labels:food.labels||'',labels_tags:Array.isArray(food.labels_tags)?food.labels_tags:[],
    glutenFreeConfirmed:Boolean(food.glutenFreeConfirmed),image:typeof food.image==='string'&&!food.image.startsWith('blob:')?food.image:'',
    safety:['green','amber','red'].includes(food.safety)?food.safety:'amber',reasons:Array.isArray(food.reasons)?food.reasons:[],alternatives:Array.isArray(food.alternatives)?food.alternatives:[],
    owner:food.owner==='housemate'?'housemate':'mine',quantity:Number(food.quantity)||0,unit:food.unit||'item',location:food.location||'Pantry',
    lowThreshold:Number.isFinite(Number(food.lowThreshold))?Number(food.lowThreshold):1,updatedAt:food.updatedAt||new Date().toISOString()
  })):[];
  next.shopping=Array.isArray(next.shopping)?next.shopping.map(item=>({
    id:item.id||uid('shop'),name:item.name||item.item||'Item',quantity:Math.max(1,Number(item.quantity||item.qty)||1),barcode:item.barcode||'',
    colesPrice:item.colesPrice==null?'':String(item.colesPrice),wooliesPrice:item.wooliesPrice==null?(item.woolworthsPrice==null?'':String(item.woolworthsPrice)):String(item.wooliesPrice),
    done:Boolean(item.done),auto:Boolean(item.auto),sourceFoodId:item.sourceFoodId||''
  })):[];
  next.diary=Array.isArray(next.diary)?next.diary:[];
  next.mealPlan=next.mealPlan&&typeof next.mealPlan==='object'?next.mealPlan:{};
  next.version=VERSION;
  return next;
}

function loadState(){
  const current=safeJsonParse(localStorage.getItem(STORE_KEY)||'');
  if(current)return migrateState(current);
  const v22=safeJsonParse(localStorage.getItem(LEGACY_V22_KEY)||'');
  if(v22)return migrateState(v22);
  const v20=safeJsonParse(localStorage.getItem(LEGACY_V20_KEY)||'');
  if(v20)return migrateState(v20);
  const v19=safeJsonParse(localStorage.getItem(LEGACY_V19_KEY)||'');
  if(v19)return migrateState(migrateV19(v19));
  const v18=safeJsonParse(localStorage.getItem(LEGACY_V18_KEY)||'');
  if(v18)return migrateState(migrateV18(v18));
  return migrateState(defaults);
}

function serialisableState(){
  const copy=clone(state);
  if(copy.currentProduct?.image?.startsWith?.('blob:'))copy.currentProduct.image='';
  copy.version=VERSION;
  return copy;
}

function persist(render=true){
  syncAutoShopping();
  try{localStorage.setItem(STORE_KEY,JSON.stringify(serialisableState()))}catch(error){console.error(error);toast('This phone could not save the latest change. Export a backup before clearing browser data.')}
  if(render)renderAll();
}

function showScreen(name,push=true){
  if(name!=='scan')stopCamera(false);
  currentScreen=name;
  const id=name==='result'?'screen-result':`screen-${name}`;
  $$('.screen').forEach(screen=>screen.classList.toggle('active',screen.id===id));
  $$('.nav-btn').forEach(button=>button.classList.toggle('active',button.dataset.go===name||(name==='result'&&button.dataset.go==='scan')));
  if(push&&location.hash!==`#${name}`)history.pushState({screen:name},'',`#${name}`);
  window.scrollTo({top:0,behavior:'instant'});
}

function setScanStatus(level,title,text){
  const card=$('#scanStatusCard');
  card.querySelector('.status-dot').className=`status-dot ${level}`;
  card.querySelector('b').textContent=title;
  card.querySelector('p').textContent=text;
}

async function fetchJson(url,timeout=15000){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeout);
  try{
    const response=await fetch(url,{headers:{Accept:'application/json'},cache:'no-store',signal:controller.signal});
    if(!response.ok)throw new Error(`Request failed ${response.status}`);
    return await response.json();
  }finally{clearTimeout(timer)}
}

async function startCamera(options={}){
  if(scanStarting||scanLocked)return;
  if(!navigator.mediaDevices?.getUserMedia){toast('Camera access is unavailable here. Use Take barcode photo or type the barcode.');return}
  scanStarting=true;stopCamera(false);
  const dialog=$('#cameraDialog');
  if(!dialog.open){if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','')}
  const video=$('#cameraVideo');
  $('#cameraMessage').textContent='Starting the rear camera…';
  setScanStatus('amber','Starting automatic scanner…','Allow camera access, then hold the barcode inside the frame.');
  try{
    const constraints={audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}};
    if(window.ZXingBrowser?.BrowserMultiFormatReader){
      liveReader=new ZXingBrowser.BrowserMultiFormatReader(undefined,{delayBetweenScanAttempts:100,delayBetweenScanSuccess:700});
      liveControls=await liveReader.decodeFromConstraints(constraints,video,(result)=>{
        if(result){const code=typeof result.getText==='function'?result.getText():(result.text||'');if(code)handleDetectedBarcode(code,'live camera')}
      });
      cameraStream=video.srcObject;
      $('#cameraMessage').textContent='Camera on — scanning automatically.';
      setScanStatus('green','Scanner is running','Keep the whole barcode inside the frame until it loads.');
    }else{
      cameraStream=await navigator.mediaDevices.getUserMedia(constraints);video.srcObject=cameraStream;await video.play();
      if(!('BarcodeDetector' in window))throw new Error('No barcode reader');
      const formats=await BarcodeDetector.getSupportedFormats().catch(()=>[]);
      const wanted=['ean_13','ean_8','upc_a','upc_e','code_128','itf'];
      const chosen=formats.length?wanted.filter(format=>formats.includes(format)):wanted;
      liveReader=new BarcodeDetector(chosen.length?{formats:chosen}:undefined);
      $('#cameraMessage').textContent='Camera on — scanning automatically.';scanNativeLoop();
    }
  }catch(error){
    console.warn('Camera start failed',error);stopCamera(false);
    $('#cameraMessage').textContent='The camera could not start. Use a barcode photo or type the number.';
    setScanStatus('red','Camera did not start','Check Safari camera permission, or use Take barcode photo.');
    if(options.silentAuto&&dialog.open)dialog.close();
  }finally{scanStarting=false}
}

async function scanNativeLoop(){
  if(!cameraStream||!liveReader||scanLocked)return;
  try{const codes=await liveReader.detect($('#cameraVideo'));if(codes?.[0]?.rawValue){await handleDetectedBarcode(codes[0].rawValue,'live camera');return}}catch{}
  scanTimer=setTimeout(scanNativeLoop,160);
}

function stopCamera(closeDialog=true){
  clearTimeout(scanTimer);scanTimer=null;
  try{liveControls?.stop?.()}catch{}liveControls=null;
  try{liveReader?.reset?.()}catch{}liveReader=null;
  if(cameraStream){try{cameraStream.getTracks().forEach(track=>track.stop())}catch{}cameraStream=null}
  const video=$('#cameraVideo');
  if(video?.srcObject){try{video.srcObject.getTracks?.().forEach(track=>track.stop())}catch{}video.srcObject=null}
  const dialog=$('#cameraDialog');
  if(closeDialog&&dialog.open){if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open')}
}

async function handleDetectedBarcode(rawCode,source='scanner'){
  if(scanLocked)return;
  const code=String(rawCode||'').replace(/\D/g,'');
  if(code.length<6)return;
  scanLocked=true;
  if(navigator.vibrate)navigator.vibrate(90);
  stopCamera();closeBarcodePhoto();
  setScanStatus('green','Barcode found',`Loading product ${code}`);
  try{await lookupBarcode(code,source)}finally{scanLocked=false}
}

async function loadImage(file){
  if(!file)throw new Error('No image');
  if(window.createImageBitmap){
    try{return await createImageBitmap(file,{imageOrientation:'from-image'})}catch{try{return await createImageBitmap(file)}catch{}}
  }
  return await new Promise((resolve,reject)=>{
    const url=URL.createObjectURL(file);const image=new Image();
    image.onload=()=>{URL.revokeObjectURL(url);resolve(image)};image.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('Image load failed'))};image.src=url;
  });
}

function sourceDimensions(source){return {width:source.width||source.naturalWidth||1,height:source.height||source.naturalHeight||1}}

function makeCanvas(source,{rotation=0,cropX=0,cropY=0,cropW=1,cropH=1,mode='normal',maxDimension=2400}={}){
  const dims=sourceDimensions(source);
  const sx=Math.max(0,Math.floor(dims.width*cropX)),sy=Math.max(0,Math.floor(dims.height*cropY));
  const sw=Math.max(1,Math.floor(dims.width*cropW)),sh=Math.max(1,Math.floor(dims.height*cropH));
  const scale=Math.min(1,maxDimension/Math.max(sw,sh));
  const dw=Math.max(1,Math.round(sw*scale)),dh=Math.max(1,Math.round(sh*scale));
  const swapped=Math.abs(rotation)%180===90;
  const canvas=document.createElement('canvas');canvas.width=swapped?dh:dw;canvas.height=swapped?dw:dh;
  const context=canvas.getContext('2d',{willReadFrequently:true});
  context.save();context.translate(canvas.width/2,canvas.height/2);context.rotate(rotation*Math.PI/180);context.drawImage(source,sx,sy,sw,sh,-dw/2,-dh/2,dw,dh);context.restore();
  if(mode!=='normal'){
    const image=context.getImageData(0,0,canvas.width,canvas.height),data=image.data;
    for(let i=0;i<data.length;i+=4){
      const grey=.299*data[i]+.587*data[i+1]+.114*data[i+2];
      let value=grey;
      if(mode==='contrast')value=grey>145?255:grey<90?0:Math.max(0,Math.min(255,(grey-110)*1.65+128));
      if(mode==='threshold')value=grey>150?255:0;
      data[i]=data[i+1]=data[i+2]=value;
    }
    context.putImageData(image,0,0);
  }
  return canvas;
}

async function detectCanvas(canvas){
  if('BarcodeDetector' in window){
    try{
      const formats=await BarcodeDetector.getSupportedFormats().catch(()=>[]);
      const wanted=['ean_13','ean_8','upc_a','upc_e','code_128','itf'];
      const chosen=formats.length?wanted.filter(format=>formats.includes(format)):wanted;
      const detector=new BarcodeDetector(chosen.length?{formats:chosen}:undefined);
      const found=await withTimeout(detector.detect(canvas),3500,'Native barcode scan timed out');
      if(found?.[0]?.rawValue)return found[0].rawValue;
    }catch{}
  }
  if(!window.ZXingBrowser?.BrowserMultiFormatReader)return null;
  try{
    const reader=new ZXingBrowser.BrowserMultiFormatReader();
    const result=await withTimeout(reader.decodeFromCanvas(canvas),4500,'Barcode scan timed out');
    try{reader.reset?.()}catch{}
    return result?.getText?.()||result?.text||null;
  }catch{return null}
}

function barcodeAttempts(source,baseRotation=0){
  const rotations=[baseRotation,(baseRotation+90)%360,(baseRotation+180)%360,(baseRotation+270)%360];
  const attempts=[];
  rotations.forEach(rotation=>{
    attempts.push({rotation,mode:'normal'});
    attempts.push({rotation,mode:'contrast'});
  });
  const crops=[
    {cropX:.05,cropY:.12,cropW:.9,cropH:.76},
    {cropX:.02,cropY:.28,cropW:.96,cropH:.44},
    {cropX:.15,cropY:.15,cropW:.7,cropH:.7}
  ];
  crops.forEach(crop=>{attempts.push({...crop,rotation:baseRotation,mode:'normal'});attempts.push({...crop,rotation:baseRotation,mode:'contrast'});attempts.push({...crop,rotation:(baseRotation+90)%360,mode:'normal'})});
  return attempts;
}

async function handleBarcodePhoto(file){
  if(!file)return;
  closeBarcodePhoto();
  try{
    barcodePhoto=await loadImage(file);barcodePhotoRotation=0;barcodePhotoUrl=URL.createObjectURL(file);
    $('#barcodePhotoPreview').src=barcodePhotoUrl;$('#photoScanCard').hidden=false;
    await scanBarcodePhoto();
  }catch(error){console.error(error);setScanStatus('red','Photo could not be opened','Try taking the photo again in good light.');toast('The barcode photo could not be opened.')}
  finally{$('#barcodePhotoInput').value=''}
}

async function scanBarcodePhoto(){
  if(!barcodePhoto)return toast('Take a barcode photo first.');
  const button=$('#retryBarcodePhotoBtn');button.classList.add('busy');button.disabled=true;
  setScanStatus('amber','Reading barcode photo…','Trying the full photo, rotations, contrast and close crops.');
  $('#photoScanMessage').textContent='Reading the barcode. Keep this page open.';
  const attempts=barcodeAttempts(barcodePhoto,barcodePhotoRotation);
  let code=null;
  for(let index=0;index<attempts.length&&!code;index++){
    $('#photoScanMessage').textContent=`Barcode reading attempt ${index+1} of ${attempts.length}…`;
    const canvas=makeCanvas(barcodePhoto,attempts[index]);
    code=await detectCanvas(canvas);
  }
  button.classList.remove('busy');button.disabled=false;
  if(!code){
    $('#photoScanMessage').textContent='The barcode was not decoded. Rotate once and retry, or type the number shown under the bars.';
    setScanStatus('red','Barcode photo not decoded','The photo remains open. Rotate and retry, or type the barcode—your image has not been discarded.');
    return;
  }
  $('#photoScanMessage').textContent=`Barcode ${String(code).replace(/\D/g,'')} found.`;
  await handleDetectedBarcode(code,'barcode photo');
}

function rotateBarcodePhoto(){
  if(!barcodePhoto)return;
  barcodePhotoRotation=(barcodePhotoRotation+90)%360;
  $('#barcodePhotoPreview').style.transform=`rotate(${barcodePhotoRotation}deg)`;
  $('#photoScanMessage').textContent='Photo rotated. Tap Read barcode again.';
}

function closeBarcodePhoto(){
  if(barcodePhoto?.close)try{barcodePhoto.close()}catch{}
  barcodePhoto=null;barcodePhotoRotation=0;
  if(barcodePhotoUrl)URL.revokeObjectURL(barcodePhotoUrl);barcodePhotoUrl='';
  const preview=$('#barcodePhotoPreview');if(preview){preview.removeAttribute('src');preview.style.transform=''}
  if($('#photoScanCard'))$('#photoScanCard').hidden=true;
}

function setUploadedPhoto(kind,file){
  if(!['front','ingredients','allergen'].includes(kind))return;
  uploadedPhotos[kind]=file||null;
  const preview=$(`#${kind}PhotoPreview`),stateLabel=$(`#${kind}PhotoState`);
  if(uploadedPhotoUrls[kind])URL.revokeObjectURL(uploadedPhotoUrls[kind]);
  uploadedPhotoUrls[kind]='';
  if(file){
    uploadedPhotoUrls[kind]=URL.createObjectURL(file);
    preview.src=uploadedPhotoUrls[kind];preview.hidden=false;
    stateLabel.textContent=`Loaded: ${file.name||'photo'}`;stateLabel.classList.add('loaded');
  }else{
    preview.hidden=true;preview.removeAttribute('src');stateLabel.textContent='Take or choose photo';stateLabel.classList.remove('loaded');
  }
}

function clearUploadedPhotos(){
  for(const kind of ['front','ingredients','allergen']){
    setUploadedPhoto(kind,null);
    const input=$(`#${kind}PhotoInput`);if(input)input.value='';
  }
  $('#photoProcessStatus').textContent='Waiting for your photos.';
  setScanStatus('green','Ready','Take the photos above and press READ ALL PHOTOS + LOAD PRODUCT.');
}

async function decodeBarcodeFromFile(file,onProgress=()=>{}){
  if(!file)return null;
  const image=await loadImage(file);
  try{
    const attempts=barcodeAttempts(image,0);
    for(let index=0;index<attempts.length;index++){
      onProgress(index+1,attempts.length);
      const code=await detectCanvas(makeCanvas(image,attempts[index]));
      if(code)return String(code).replace(/\D/g,'');
    }
    return null;
  }finally{if(image?.close)try{image.close()}catch{}}
}

function extractBarcodeFromText(text){
  const compact=String(text||'').replace(/[Oo]/g,'0').replace(/[^0-9\n ]/g,' ');
  const matches=compact.match(/(?:\d[\s-]*){8,14}/g)||[];
  return matches.map(item=>item.replace(/\D/g,'')).find(code=>code.length>=8&&code.length<=14)||'';
}

function cleanOcrText(text){
  return String(text||'').replace(/\r/g,'').replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();
}

async function ocrUploadedPhoto(file,role){
  if(!file)return {text:'',confidence:0};
  const Tesseract=await ensureTesseract();
  const image=await loadImage(file);
  try{
    const canvas=makeCanvas(image,{mode:'contrast',maxDimension:role==='front'?1800:2400});
    const result=await withTimeout(Tesseract.recognize(canvas,'eng',{logger:message=>{
      if(message.status==='recognizing text'){
        const pct=Math.round((message.progress||0)*100);
        $('#photoProcessStatus').textContent=`Reading ${role} photo… ${pct}%`;
      }
    }}),95000,`${role} photo reading timed out`);
    return {text:cleanOcrText(result?.data?.text||''),confidence:Number(result?.data?.confidence)||0};
  }finally{if(image?.close)try{image.close()}catch{}}
}

function combineOcrName(frontText){
  const lines=String(frontText||'').split(/\n+/).map(line=>line.trim()).filter(Boolean);
  const blocked=/^(ingredients?|nutrition|allergen|contains|may contain|serving|barcode|best before|use by)\b/i;
  const candidates=lines.filter(line=>line.length>=3&&line.length<=80&&!blocked.test(line)&&/[a-z]{3}/i.test(line));
  const gfSoy=candidates.find(line=>/gluten\s*free.*soy\s*sauce|soy\s*sauce.*gluten\s*free/i.test(line));
  return gfSoy||candidates.slice(0,2).join(' ').slice(0,90)||'';
}

async function processUploadedPhotos(){
  if(photoProcessing)return;
  const files=Object.values(uploadedPhotos).filter(Boolean);
  if(!files.length){toast('Take at least one product photo first.');return}
  photoProcessing=true;
  const button=$('#processPhotosBtn');button.disabled=true;button.classList.add('busy');
  $('#photoProcessStatus').textContent='Opening your photos…';
  setScanStatus('amber','Reading photos…','Keep this page open while Genevieve loads the barcode and label information.');
  let barcode='',baseProduct=null;
  try{
    for(const kind of ['ingredients','allergen','front']){
      if(!uploadedPhotos[kind]||barcode)continue;
      $('#photoProcessStatus').textContent=`Looking for a barcode in the ${kind} photo…`;
      barcode=await decodeBarcodeFromFile(uploadedPhotos[kind],(n,total)=>{$('#photoProcessStatus').textContent=`Reading barcode from ${kind} photo… ${n}/${total}`});
    }
    if(barcode){
      $('#barcodeInput').value=barcode;
      $('#photoProcessStatus').textContent=`Barcode ${barcode} found. Loading the product name…`;
      baseProduct=await fetchProductByBarcode(barcode,'uploaded photos');
    }

    const ocr={front:{text:'',confidence:0},ingredients:{text:'',confidence:0},allergen:{text:'',confidence:0}};
    let ocrAvailable=true;
    const trustedComplete=baseProduct&&['known-product','database'].includes(baseProduct.evidenceSource)&&Boolean(baseProduct.name)&&Boolean(baseProduct.ingredients);
    if(!trustedComplete){
      try{
        for(const kind of ['front','ingredients','allergen']){
          if(uploadedPhotos[kind])ocr[kind]=await ocrUploadedPhoto(uploadedPhotos[kind],kind);
        }
      }catch(error){
        console.warn('Photo text reading unavailable',error);ocrAvailable=false;
      }
    }else{
      $('#photoProcessStatus').textContent='Barcode record loaded. Using the product name and ingredients without waiting for OCR.';
    }

    if(!barcode){
      barcode=extractBarcodeFromText(`${ocr.ingredients.text}
${ocr.allergen.text}
${ocr.front.text}`);
      if(barcode){
        $('#barcodeInput').value=barcode;
        baseProduct=await fetchProductByBarcode(barcode,'photo text');
      }
    }

    const base=baseProduct||{};
    const confidenceValues=Object.values(ocr).filter(item=>item.text).map(item=>item.confidence);
    const averageConfidence=confidenceValues.length?Math.round(confidenceValues.reduce((a,b)=>a+b,0)/confidenceValues.length):0;
    const frontName=combineOcrName(ocr.front.text)||guessProductName(ocr.front.text);
    const ingredientsText=ocr.ingredients.text||'';
    const allergenText=ocr.allergen.text||'';
    const frontHasGf=/\bgluten\s*free\b|\bcoeliac\b|\bceliac\b/i.test(ocr.front.text);
    const hasTrustedBase=['known-product','database'].includes(base.evidenceSource)&&Boolean(base.ingredients);

    const product={
      ...base,
      barcode:barcode||base.barcode||'',
      name:base.name&&!/^Product \d+|^Unknown product/i.test(base.name)?base.name:(frontName||base.name||'Photographed product'),
      brand:base.brand||'',
      ingredients:base.ingredients||ingredientsText,
      allergens:base.allergens||allergenText,
      traces:base.traces||'',
      labels:[base.labels||'',frontHasGf?'Gluten-free wording read from front photo':''].filter(Boolean).join(' · '),
      labels_tags:Array.isArray(base.labels_tags)?base.labels_tags:[],
      glutenFreeConfirmed:Boolean(base.glutenFreeConfirmed||frontHasGf),
      evidenceSource:hasTrustedBase?base.evidenceSource:'ocr',
      manualLabelConfirmed:false,
      ocrConfidence:averageConfidence,
      ocrRaw:[ocr.front.text,ocr.ingredients.text,ocr.allergen.text].filter(Boolean).join('\n\n'),
      source:base.source||(ocrAvailable?'Uploaded photos':'Uploaded photos; automatic text reading unavailable'),
      image:uploadedPhotoUrls.front||base.image||''
    };

    openProduct(product);
    openCorrection(true);
    const loadedBits=[product.name&&'name',product.barcode&&'barcode',product.ingredients&&'ingredients',product.allergens&&'allergen panel'].filter(Boolean);
    $('#photoProcessStatus').textContent=`Loaded ${loadedBits.join(', ')||'the photos'}. Check the next page and press USE THESE UPDATED DETAILS if you correct anything.`;
    toast(product.barcode?'Product loaded from your photos.':'Photos loaded. Check the details before using the result.');
  }catch(error){
    console.error(error);
    $('#photoProcessStatus').textContent='The photos stayed loaded, but automatic reading did not finish. Use the barcode box or correct the details on the result page.';
    setScanStatus('red','Photo reading did not finish','Your photos are still visible. Try again or type the barcode.');
    toast('The photos are still there. Try the button again or type the barcode.');
  }finally{
    photoProcessing=false;button.disabled=false;button.classList.remove('busy');
  }
}

async function fetchProductByBarcode(rawBarcode,source='typed barcode'){
  const barcode=String(rawBarcode||'').replace(/\D/g,'');
  if(barcode.length<6)throw new Error('That barcode is too short.');
  if(KNOWN_PRODUCTS[barcode])return {...clone(KNOWN_PRODUCTS[barcode]),source:`${KNOWN_PRODUCTS[barcode].source}; loaded via ${source}`};

  const fields='code,product_name,product_name_en,generic_name,generic_name_en,brands,ingredients_text,ingredients_text_en,allergens,allergens_tags,traces,traces_tags,labels,labels_tags,image_front_small_url,image_front_url,nutriments,nutrition_grades,nova_group';
  let data=null;
  try{data=await fetchJson(`${OFF_V2}${encodeURIComponent(barcode)}.json?fields=${encodeURIComponent(fields)}`)}
  catch(firstError){
    try{data=await fetchJson(`${OFF_V0}${encodeURIComponent(barcode)}.json`)}
    catch(secondError){
      console.error(firstError,secondError);
      return {barcode,name:`Product ${barcode}`,brand:'',ingredients:'',allergens:'',traces:'',labels:'',labels_tags:[],glutenFreeConfirmed:false,evidenceSource:'barcode-only',source:`Barcode found via ${source}; product service unavailable`};
    }
  }
  if(data?.status===0||!data?.product){
    return {barcode,name:`Unknown product ${barcode}`,brand:'',ingredients:'',allergens:'',traces:'',labels:'',labels_tags:[],glutenFreeConfirmed:false,evidenceSource:'barcode-only',source:`Barcode found via ${source}; product not listed`};
  }
  const product=data.product;
  return {
    barcode,
    name:product.product_name_en||product.product_name||product.generic_name_en||product.generic_name||`Product ${barcode}`,
    brand:product.brands||'',
    ingredients:product.ingredients_text_en||product.ingredients_text||'',
    allergens:product.allergens||'',
    allergens_tags:product.allergens_tags||[],
    traces:product.traces||'',
    traces_tags:product.traces_tags||[],
    labels:product.labels||'',
    labels_tags:product.labels_tags||[],
    glutenFreeConfirmed:/gluten[- ]?free|coeliac|celiac/i.test(`${product.labels||''} ${(product.labels_tags||[]).join(' ')}`),
    image:product.image_front_url||product.image_front_small_url||'',
    nutriments:product.nutriments||{},nutritionGrade:product.nutrition_grades||'',novaGroup:product.nova_group||null,
    evidenceSource:'database',source:`Open Food Facts via ${source}`
  };
}

async function lookupBarcode(rawBarcode,source='typed barcode'){
  const barcode=String(rawBarcode||'').replace(/\D/g,'');
  if(barcode.length<6){toast('That barcode is too short.');return}
  setScanStatus('amber','Loading product…',`Looking up barcode ${barcode}`);showScreen('scan',false);
  const product=await fetchProductByBarcode(barcode,source);
  openProduct(product);
  if(product.evidenceSource==='barcode-only'){
    toast('Barcode loaded. Add or correct the label details below, then press USE THESE UPDATED DETAILS.');
    openCorrection(true);
  }
}

function openProduct(product){
  const verdict=FoodLogic.analyseProduct(product,state.settings);
  state.currentProduct={...product,verdict,checkedAt:new Date().toISOString()};
  persist(false);renderResult();showScreen('result');
  setScanStatus(verdict.level,product.name||'Product',verdict.label);
}

function renderResult(){
  const product=state.currentProduct;if(!product)return;
  const verdict=FoodLogic.analyseProduct(product,state.settings);product.verdict=verdict;
  const card=$('#resultCard');card.className=`result-card ${verdict.level}`;
  $('#resultLight').className=`traffic-light ${verdict.level}`;$('#resultLabel').textContent=verdict.label;
  $('#resultName').textContent=product.name||'Unknown product';
  $('#resultBrand').textContent=[product.brand,product.barcode&&`Barcode ${product.barcode}`].filter(Boolean).join(' · ');
  const sourceLabels={
    'known-product':'Built-in barcode record loaded',
    'database':'Product database record loaded',
    'manual-confirmed':'Details confirmed against the current physical label',
    'ocr':`Photo text loaded${product.ocrConfidence?` · OCR confidence ${Math.round(product.ocrConfidence)}%`:''}`,
    'barcode-only':'Barcode loaded — label details still needed'
  };
  $('#resultEvidence').textContent=sourceLabels[product.evidenceSource]||product.source||'Loaded product information';
  $('#resultAnswer').textContent=verdict.action;$('#resultWhyHeading').textContent=verdict.whyHeading||'Why this answer?';
  $('#resultReasons').innerHTML=verdict.reasons.length?verdict.reasons.map(reason=>`<li>${esc(reason)}</li>`).join(''):'<li>No reason was loaded.</li>';
  $('#resultAlternatives').innerHTML=(verdict.alternatives||[]).map(item=>`<li>${esc(item)}</li>`).join('');
  $('#resultIngredients').textContent=product.ingredients||'No ingredient list loaded.';
  const image=$('#resultImage');if(product.image){image.src=product.image;image.hidden=false;image.alt=product.name||'Product image'}else{image.hidden=true;image.removeAttribute('src')}
  $('#savePantryBtn').disabled=verdict.level==='red';$('#saveHousemateBtn').hidden=verdict.level!=='red';
  fillCorrectionForm();
}

function fillCorrectionForm(){
  const product=state.currentProduct;if(!product)return;
  const form=$('#correctionForm');
  form.elements.name.value=product.name||'';form.elements.brand.value=product.brand||'';form.elements.barcode.value=product.barcode||'';form.elements.ingredients.value=product.ingredients||'';
  form.elements.allergens.value=product.allergens||'';form.elements.traces.value=product.traces||'';form.elements.glutenFreeConfirmed.checked=Boolean(product.glutenFreeConfirmed||product.verdict?.gfConfirmed);
  form.elements.manualLabelConfirmed.checked=Boolean(product.manualLabelConfirmed);
}

function openCorrection(open=true){const form=$('#correctionForm');fillCorrectionForm();form.hidden=!open;if(open)setTimeout(()=>form.scrollIntoView({behavior:'smooth',block:'start'}),20)}

async function ensureTesseract(){
  if(window.Tesseract)return window.Tesseract;
  if(tesseractPromise)return tesseractPromise;
  tesseractPromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';script.async=true;
    const timer=setTimeout(()=>{script.remove();reject(new Error('Text reader timed out'))},20000);
    script.onload=()=>{clearTimeout(timer);window.Tesseract?resolve(window.Tesseract):reject(new Error('Text reader missing'))};
    script.onerror=()=>{clearTimeout(timer);reject(new Error('Text reader failed'))};document.head.appendChild(script);
  });
  return tesseractPromise;
}

function guessProductName(text){return text.split(/\n+/).map(line=>line.trim()).find(line=>line.length>2&&line.length<60&&!/^ingredients?\b/i.test(line))||''}

async function readLabelPhoto(file){
  if(!file)return;
  const imageUrl=URL.createObjectURL(file);
  const existing=state.currentProduct||{name:'Photographed product',brand:'',ingredients:'',allergens:'',traces:'',source:'ingredients photo',evidenceSource:'ocr'};
  state.currentProduct={...existing,image:imageUrl,manualLabelConfirmed:false};
  renderResult();showScreen('result',false);$('#resultAnswer').textContent='Reading ingredient text. This can take a little while on an iPhone.';
  try{
    const ocr=await ocrUploadedPhoto(file,'ingredients');
    if(!ocr.text)throw new Error('No text found');
    const trustedExisting=['known-product','database'].includes(state.currentProduct.evidenceSource)&&Boolean(state.currentProduct.ingredients);
    if(!trustedExisting)state.currentProduct.ingredients=ocr.text;
    state.currentProduct.ocrRaw=[state.currentProduct.ocrRaw,ocr.text].filter(Boolean).join('\n\n');
    state.currentProduct.ocrConfidence=ocr.confidence;
    if(!trustedExisting)state.currentProduct.evidenceSource='ocr';
    if(!state.currentProduct.name||/^Photographed product|^Product \d+|^Unknown product/i.test(state.currentProduct.name))state.currentProduct.name=guessProductName(ocr.text)||state.currentProduct.name;
    state.currentProduct.verdict=FoodLogic.analyseProduct(state.currentProduct,state.settings);persist(false);renderResult();openCorrection(true);
    setScanStatus(state.currentProduct.verdict.level,state.currentProduct.name,state.currentProduct.verdict.label);toast('Ingredient photo loaded. Check the details and press USE THESE UPDATED DETAILS.');
  }catch(error){
    console.error(error);renderResult();openCorrection(true);toast('Automatic ingredient reading failed. The photo is still shown; type the ingredient text below.');
  }finally{$('#labelPhotoInput').value=''}
}

function saveCurrentToFood(owner='mine'){
  const product=state.currentProduct;if(!product)return toast('Scan or load a product first.');
  const verdict=FoodLogic.analyseProduct(product,state.settings);product.verdict=verdict;
  if(owner==='mine'&&verdict.level==='red'){toast('A red product cannot be saved as your food. Save it as housemate food instead.');return}
  const existing=state.foods.find(item=>(item.owner||'mine')===owner&&((product.barcode&&item.barcode===product.barcode)||(!product.barcode&&norm(item.name)===norm(product.name))));
  const record={
    name:product.name||'Unnamed product',brand:product.brand||'',barcode:product.barcode||'',ingredients:product.ingredients||'',allergens:product.allergens||'',traces:product.traces||'',
    labels:product.labels||'',labels_tags:Array.isArray(product.labels_tags)?product.labels_tags:[],glutenFreeConfirmed:Boolean(product.glutenFreeConfirmed||verdict.gfConfirmed),
    image:product.image&&!String(product.image).startsWith('blob:')?product.image:'',safety:verdict.level,reasons:verdict.reasons||[],alternatives:verdict.alternatives||[],owner,evidenceSource:product.evidenceSource||'',manualLabelConfirmed:Boolean(product.manualLabelConfirmed),updatedAt:new Date().toISOString()
  };
  if(existing)Object.assign(existing,record,{quantity:Number(existing.quantity||0)+1});
  else state.foods.unshift({id:uid('food'),...record,quantity:1,unit:'item',location:'Pantry',lowThreshold:1});
  persist();toast(owner==='mine'?'Saved to My food':'Saved separately as housemate food');showScreen('food');
}

function addShopItem(name,quantity=1,barcode='',options={}){
  name=String(name||'').trim();if(!name)return false;
  const existing=state.shopping.find(item=>!item.done&&norm(item.name)===norm(name));
  if(existing){existing.quantity=Math.max(Number(existing.quantity)||1,Number(quantity)||1);if(barcode&&!existing.barcode)existing.barcode=barcode}
  else state.shopping.unshift({id:uid('shop'),name,quantity:Math.max(1,Number(quantity)||1),barcode,colesPrice:'',wooliesPrice:'',done:false,auto:Boolean(options.auto),sourceFoodId:options.sourceFoodId||''});
  if(!options.defer)persist();
  return true;
}

function addCurrentToShopping(){
  const product=state.currentProduct;if(!product)return toast('Load a product first.');
  addShopItem(product.name||'Product',1,product.barcode||'');toast('Added to shopping list');showScreen('shop');
}

function syncAutoShopping(){
  const lowFoods=state.foods.filter(food=>(food.owner||'mine')==='mine'&&FoodLogic.stockLevel(food)!=='green');
  const lowIds=new Set(lowFoods.map(food=>food.id));
  state.shopping=state.shopping.filter(item=>!item.auto||item.done||lowIds.has(item.sourceFoodId));
  lowFoods.forEach(food=>{
    const required=Math.max(1,Math.ceil((Number(food.lowThreshold)||1)+1-Number(food.quantity||0)));
    const existing=state.shopping.find(item=>!item.done&&item.auto&&item.sourceFoodId===food.id);
    if(existing){existing.name=food.name;existing.quantity=required;existing.barcode=food.barcode||existing.barcode}
    else state.shopping.unshift({id:uid('shop'),name:food.name,quantity:required,barcode:food.barcode||'',colesPrice:'',wooliesPrice:'',done:false,auto:true,sourceFoodId:food.id});
  });
}

function renderFoods(){
  const query=norm($('#foodSearch')?.value||''),filter=$('#foodFilter')?.value||'all';
  let foods=state.foods.filter(food=>!query||norm(`${food.name} ${food.brand}`).includes(query));
  foods=foods.filter(food=>filter==='all'||(filter==='low'?FoodLogic.stockLevel(food)!=='green':filter==='mine'?(food.owner||'mine')==='mine':filter==='housemate'?food.owner==='housemate':food.safety===filter));
  $('#emptyFood').hidden=state.foods.length>0;
  $('#foodList').innerHTML=foods.map(food=>{
    const stock=FoodLogic.stockLevel(food),owner=food.owner||'mine';
    const stockText=stock==='green'?'Stock okay':stock==='amber'?'Running low':'Out of stock';
    return `<article class="food-card ${esc(food.safety)}" data-id="${food.id}">
      <div class="food-head"><div><h3>${esc(food.name)}</h3><div class="muted">${esc(food.brand||'')}</div><div class="food-meta">${esc(food.location||'Pantry')} · low warning at ${food.lowThreshold} ${esc(food.unit||'item')}</div><span class="owner-badge ${owner==='housemate'?'housemate':''}">${owner==='housemate'?'Housemate food':'My food'}</span></div><span class="badge ${esc(food.safety)}">${food.safety==='green'?'safe':food.safety==='red'?'blocked':'check'}</span></div>
      <div class="stock-status">${stockText}</div><div class="stock-controls"><button data-food-action="minus">−</button><div class="stock-number">${Number(food.quantity).toFixed(Number.isInteger(Number(food.quantity))?0:1)} ${esc(food.unit||'item')}</div><button data-food-action="plus">+</button></div>
      <div class="card-actions"><button class="mini-btn" data-food-action="shop">Add to shop</button><button class="mini-btn" data-food-action="edit">Edit details</button><button class="mini-btn" data-food-action="owner">${owner==='housemate'?'Move to my food':'Move to housemate'}</button><button class="mini-btn danger" data-food-action="remove">Remove</button></div>
    </article>`;
  }).join('');
}

function openFoodEditor(food){
  const form=$('#foodEditForm');form.elements.id.value=food.id;form.elements.name.value=food.name;form.elements.location.value=food.location||'Pantry';
  form.elements.quantity.value=food.quantity;form.elements.unit.value=food.unit||'item';form.elements.lowThreshold.value=food.lowThreshold??1;form.hidden=false;form.scrollIntoView({behavior:'smooth',block:'start'});
}
function closeFoodEditor(){$('#foodEditForm').hidden=true;$('#foodEditForm').reset()}

const recipes=[
 {name:'Chicken, pumpkin and potato tray bake',meal:'Tea',needs:['chicken','pumpkin','potato','olive oil','italian herbs']},
 {name:'Chicken and vegetable soup',meal:'Lunch',needs:['chicken','carrot','pumpkin','potato']},
 {name:'Gluten-free chicken fried rice style bowl',meal:'Tea',needs:['chicken','rice','carrot','corn','gluten free soy sauce','sesame oil']},
 {name:'Pumpkin and potato fritters',meal:'Lunch',needs:['pumpkin','potato','gluten free flour','egg']},
 {name:'Bacon, corn and potato hash',meal:'Breakfast',needs:['bacon','corn','potato','olive oil']},
 {name:'Peanut butter breakfast toast',meal:'Breakfast',needs:['gluten free bread','peanut butter']},
 {name:'Simple chicken curry',meal:'Tea',needs:['chicken','pumpkin','carrot','curry powder','soy milk']},
 {name:'Vegetable pasta bowl',meal:'Lunch',needs:['gluten free pasta','tomato paste','carrot','corn','italian herbs']}
];

function matchIngredient(need){
  const wanted=norm(need);
  return state.foods.find(food=>(food.owner||'mine')==='mine'&&food.safety==='green'&&Number(food.quantity)>0&&(norm(food.name).includes(wanted)||wanted.includes(norm(food.name))))||null;
}
function availableMeals(){return recipes.map(recipe=>({...recipe,matches:recipe.needs.map(need=>({need,item:matchIngredient(need)}))})).sort((a,b)=>b.matches.filter(match=>match.item).length-a.matches.filter(match=>match.item).length)}

function renderMeals(){
  displayedMeals=availableMeals().slice(0,6);
  $('#mealList').innerHTML=displayedMeals.map((recipe,index)=>{
    const have=recipe.matches.filter(match=>match.item).length,missing=recipe.matches.length-have;
    return `<article class="meal-card" data-recipe="${index}"><h3>${esc(recipe.name)}</h3><div class="availability">${have} of ${recipe.matches.length} ingredients available${missing?` · ${missing} missing`:''}</div><div class="ingredient-chips">${recipe.matches.map(match=>`<span class="chip ${match.item?'have':'missing'}">${match.item?'✓':'+'} ${esc(match.need)}</span>`).join('')}</div><div class="card-actions"><button class="mini-btn" data-meal-action="cook" ${missing?'disabled':''}>Cook and deduct stock</button><button class="mini-btn" data-meal-action="shop">Add missing to shop</button></div></article>`;
  }).join('');renderMealPlan();
}
function renderMealPlan(){const plan=state.mealPlan||{};$('#mealPlanner').innerHTML=['Breakfast','Lunch','Tea'].map(meal=>`<div class="planner-row"><b>${meal}</b><span>${esc(plan[meal]||'Not planned')}</span></div>`).join('')}
function refreshPlan(){const all=availableMeals(),previous=state.mealPlan||{},plan={};['Breakfast','Lunch','Tea'].forEach(meal=>{const pool=all.filter(item=>item.meal===meal);if(!pool.length){plan[meal]='Choose a saved safe food';return}const currentIndex=pool.findIndex(item=>item.name===previous[meal]);const nextIndex=pool.length>1?(currentIndex+1+pool.length)%pool.length:0;plan[meal]=pool[nextIndex].name});state.mealPlan=plan;persist();toast('Meal plan updated')}
function cookRecipe(index){const recipe=displayedMeals[index];if(!recipe)return;const missing=recipe.matches.filter(match=>!match.item);if(missing.length)return toast('Add the missing ingredients first.');recipe.matches.forEach(match=>{match.item.quantity=Math.max(0,Number(match.item.quantity)-1)});state.diary.unshift({id:uid('diary'),food:recipe.name,reaction:'Not recorded',notes:'Cooked from pantry; stock deducted automatically.',date:new Date().toISOString()});persist();toast('Stock deducted and shopping list updated')}
function addRecipeMissing(index){const recipe=displayedMeals[index];if(!recipe)return;recipe.matches.filter(match=>!match.item).forEach(match=>addShopItem(match.need,1,'',{defer:true}));persist();toast('Missing ingredients added to shopping');showScreen('shop')}

function renderShopping(){
  syncAutoShopping();
  const list=state.shopping.filter(item=>!item.done);
  $('#shoppingList').innerHTML=list.length?list.map(item=>{
    const store=FoodLogic.cheapestStore(item);
    return `<article class="shop-card" data-id="${item.id}"><div class="shop-head"><div><h3>${esc(item.name)}</h3><span class="muted">Quantity ${Number(item.quantity)||1}${item.auto?' · added from low stock':''}</span></div><button class="mini-btn" data-shop-action="done">Bought</button></div><div class="shop-prices"><label class="price-field">Coles price<input data-price="colesPrice" inputmode="decimal" value="${esc(item.colesPrice)}" placeholder="$0.00"></label><label class="price-field">Woolworths price<input data-price="wooliesPrice" inputmode="decimal" value="${esc(item.wooliesPrice)}" placeholder="$0.00"></label></div><div class="store-choice">${store==='Price needed'?'Enter a price to compare':`Buy at ${store}`}</div><button class="mini-btn danger" data-shop-action="remove">Remove</button></article>`;
  }).join(''):'<article class="empty-state"><b>Your shopping list is clear.</b><p>Low-stock food will be added automatically.</p></article>';
  renderTotals();
}
function renderTotals(){let coles=0,woolies=0;state.shopping.filter(item=>!item.done).forEach(item=>{const store=FoodLogic.cheapestStore(item),quantity=Number(item.quantity)||1;if(store==='Coles')coles+=(Number(item.colesPrice)||0)*quantity;if(store==='Woolworths')woolies+=(Number(item.wooliesPrice)||0)*quantity});$('#colesTotal').textContent=money(coles);$('#wooliesTotal').textContent=money(woolies);$('#grandTotal').textContent=money(coles+woolies);const notes=[];if(coles>0&&coles<50)notes.push(`Coles is ${money(50-coles)} under the $50 preferred minimum.`);if(woolies>0&&woolies<50)notes.push(`Woolworths is ${money(50-woolies)} under the $50 preferred minimum.`);$('#minimumSpendNote').textContent=notes.join(' ')||'Your preferred $50 minimum is met for each store being used, or no prices have been entered yet.'}
function markBought(item){item.done=true;const matching=state.foods.find(food=>(item.barcode&&food.barcode===item.barcode)||norm(food.name)===norm(item.name));if(matching)matching.quantity=Number(matching.quantity||0)+Number(item.quantity||1);persist();toast(matching?'Marked bought and added to saved stock':'Marked bought')}

function renderDiary(){
  $('#diaryList').innerHTML=state.diary.map(entry=>`<div class="diary-entry" data-id="${entry.id}"><b>${esc(entry.food)}</b><p>${esc(entry.reaction)} · ${new Date(entry.date).toLocaleDateString('en-AU')}</p>${entry.notes?`<span>${esc(entry.notes)}</span>`:''}<div class="card-actions"><button class="mini-btn danger" data-diary-action="remove">Delete note</button></div></div>`).join('');
  const bad=state.diary.filter(entry=>/bad|mild/i.test(entry.reaction)),words={};bad.forEach(entry=>norm(entry.notes).split(/[^a-z]+/).filter(word=>word.length>4).forEach(word=>words[word]=(words[word]||0)+1));const top=Object.entries(words).sort((a,b)=>b[1]-a[1]).slice(0,3);$('#patternNotice').textContent=top.length?`Words repeated in symptom notes: ${top.map(item=>item[0]).join(', ')}. This is a diary pattern, not a diagnosis.`:'No repeated symptom-note pattern yet.';
}

function renderSummary(){$('#safeCount').textContent=state.foods.length;$('#lowCount').textContent=state.foods.filter(food=>FoodLogic.stockLevel(food)!=='green').length;$('#shopCount').textContent=state.shopping.filter(item=>!item.done).length;$('#diaryCount').textContent=state.diary.length}
function renderAll(){renderSummary();renderFoods();renderMeals();renderShopping();renderDiary();$('#traceDairyToggle').checked=state.settings.traceDairyAccepted;$('#additiveToggle').checked=state.settings.warnAdditives;$('#autoScannerToggle').checked=state.settings.autoScanner!==false;if(state.currentProduct)renderResult()}

function openBrandDb(){return new Promise((resolve,reject)=>{const request=indexedDB.open('genevieve-food-brand-assets',1);request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('assets'))request.result.createObjectStore('assets')};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function getBrandAsset(key){try{const db=await openBrandDb();return await new Promise((resolve,reject)=>{const transaction=db.transaction('assets','readonly'),request=transaction.objectStore('assets').get(key);request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error)})}catch{return null}}
async function putBrandAsset(key,file){const db=await openBrandDb();await new Promise((resolve,reject)=>{const transaction=db.transaction('assets','readwrite');transaction.objectStore('assets').put(file,key);transaction.oncomplete=resolve;transaction.onerror=()=>reject(transaction.error)})}
async function clearBrandAssets(){try{const db=await openBrandDb();await new Promise((resolve,reject)=>{const transaction=db.transaction('assets','readwrite');transaction.objectStore('assets').clear();transaction.oncomplete=resolve;transaction.onerror=()=>reject(transaction.error)})}catch{}}
function showBrandImage(kind,source,statusText){const image=kind==='ga'?$('#gaLogo'):$('#treeLogo'),wrap=kind==='tree'?$('#treeBrandWrap'):null,status=kind==='ga'?$('#gaAssetStatus'):$('#treeAssetStatus');if(kind==='ga'){$('#brandFallback').hidden=true;const apple=document.querySelector('link[rel="apple-touch-icon"]'),icon=document.querySelector('link[rel="icon"]');if(apple)apple.href=source;if(icon)icon.href=source}image.src=source;image.hidden=false;if(wrap)wrap.hidden=false;if(status)status.textContent=statusText}
function loadBrandCandidate(kind,items,index=0){return new Promise(resolve=>{if(index>=items.length)return resolve(false);const image=new Image();image.onload=()=>{showBrandImage(kind,items[index],'Locked image loaded from the app package.');resolve(true)};image.onerror=()=>resolve(loadBrandCandidate(kind,items,index+1));image.src=items[index]})}
async function tryBrandImages(){const candidates={ga:['assets/icons/icon-512.png','assets/icons/icon-192.png'],tree:[]};for(const kind of ['ga','tree']){const saved=await getBrandAsset(kind);if(saved){if(brandObjectUrls[kind])URL.revokeObjectURL(brandObjectUrls[kind]);brandObjectUrls[kind]=URL.createObjectURL(saved);showBrandImage(kind,brandObjectUrls[kind],'Exact master image installed on this device.');continue}const loaded=await loadBrandCandidate(kind,candidates[kind]);if(!loaded){const status=kind==='ga'?$('#gaAssetStatus'):$('#treeAssetStatus');if(status)status.textContent='Exact image is not inside this ZIP. Choose the locked master image below.'}}}
async function installBrandAsset(kind,file){if(!file)return;if(!/^image\//.test(file.type))return toast('Choose a PNG, JPEG or WebP image.');try{await putBrandAsset(kind,file);await tryBrandImages();toast('Logo installed on this device.')}catch{toast('The logo could not be saved on this device.')}}

function csv(rows,fields){const quote=value=>`"${String(value??'').replace(/"/g,'""')}"`;return [fields.join(','),...rows.map(row=>fields.map(field=>quote(row[field])).join(','))].join('\n')}
function download(name,text,type='text/plain'){const blob=new Blob([text],{type}),anchor=document.createElement('a');anchor.href=URL.createObjectURL(blob);anchor.download=name;document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(anchor.href),700)}
function exportBackup(){download(`GENEVIEVE_FOOD_V24_BACKUP_${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(serialisableState(),null,2),'application/json')}
function exportFoodCsv(){download('GENEVIEVE_FOOD_STOCK.csv',csv(state.foods.map(food=>({...food,reasons:(food.reasons||[]).join(' | ')})),['name','brand','barcode','location','quantity','unit','lowThreshold','safety','owner','ingredients','reasons']),'text/csv')}
function exportShoppingCsv(){download('GENEVIEVE_FOOD_SHOPPING.csv',csv(state.shopping,['name','quantity','barcode','colesPrice','wooliesPrice','done','auto']),'text/csv')}
function exportDiaryCsv(){download('GENEVIEVE_FOOD_DIARY.csv',csv(state.diary,['date','food','reaction','notes']),'text/csv')}

function bindEvents(){
  document.addEventListener('click',event=>{
    const go=event.target.closest('[data-go]');if(go){showScreen(go.dataset.go);return}
    const foodAction=event.target.closest('[data-food-action]');
    if(foodAction){const card=event.target.closest('.food-card'),food=state.foods.find(item=>item.id===card?.dataset.id);if(!food)return;const action=foodAction.dataset.foodAction;if(action==='minus')food.quantity=Math.max(0,Number(food.quantity)-1);if(action==='plus')food.quantity=Number(food.quantity)+1;if(action==='shop'){addShopItem(food.name,1,food.barcode);showScreen('shop');return}if(action==='edit'){openFoodEditor(food);return}if(action==='owner')food.owner=(food.owner||'mine')==='mine'?'housemate':'mine';if(action==='remove'&&confirm(`Remove ${food.name}?`))state.foods=state.foods.filter(item=>item.id!==food.id);persist();return}
    const mealAction=event.target.closest('[data-meal-action]');if(mealAction){const card=event.target.closest('.meal-card'),index=Number(card?.dataset.recipe);if(mealAction.dataset.mealAction==='cook')cookRecipe(index);else addRecipeMissing(index);return}
    const shopAction=event.target.closest('[data-shop-action]');if(shopAction){const card=event.target.closest('.shop-card'),item=state.shopping.find(entry=>entry.id===card?.dataset.id);if(!item)return;if(shopAction.dataset.shopAction==='done')markBought(item);else{state.shopping=state.shopping.filter(entry=>entry.id!==item.id);persist()}return}
    const diaryAction=event.target.closest('[data-diary-action]');if(diaryAction){const entry=event.target.closest('.diary-entry');state.diary=state.diary.filter(item=>item.id!==entry?.dataset.id);persist();return}
  });

  $('#startCameraBtn').onclick=()=>startCamera();$('#openQuickScan').onclick=()=>{showScreen('scan');startCamera()};
  $('#closeCameraBtn').onclick=event=>{event.preventDefault();stopCamera()};$('#cameraDialog').addEventListener('close',()=>stopCamera(false));
  $('#cameraPhotoFallback').onclick=()=>{stopCamera();$('#barcodePhotoInput').click()};$('#cameraLabelFallback').onclick=()=>{stopCamera();$('#labelPhotoInput').click()};
  $('#frontPhotoInput').onchange=event=>{setUploadedPhoto('front',event.target.files[0]);event.target.value=''};
  $('#ingredientsPhotoInput').onchange=event=>{setUploadedPhoto('ingredients',event.target.files[0]);event.target.value=''};
  $('#allergenPhotoInput').onchange=event=>{setUploadedPhoto('allergen',event.target.files[0]);event.target.value=''};
  $('#processPhotosBtn').onclick=processUploadedPhotos;$('#clearUploadedPhotosBtn').onclick=clearUploadedPhotos;
  $('#barcodePhotoInput').onchange=event=>handleBarcodePhoto(event.target.files[0]);$('#labelPhotoInput').onchange=event=>readLabelPhoto(event.target.files[0]);
  $('#rotateBarcodePhotoBtn').onclick=rotateBarcodePhoto;$('#retryBarcodePhotoBtn').onclick=scanBarcodePhoto;$('#closeBarcodePhotoBtn').onclick=closeBarcodePhoto;
  $('#barcodeForm').onsubmit=event=>{event.preventDefault();lookupBarcode($('#barcodeInput').value,'typed barcode')};

  $('#savePantryBtn').onclick=()=>saveCurrentToFood('mine');$('#saveHousemateBtn').onclick=()=>saveCurrentToFood('housemate');$('#addShoppingBtn').onclick=addCurrentToShopping;
  $('#correctProductBtn').onclick=()=>openCorrection($('#correctionForm').hidden);$('#cancelCorrectionBtn').onclick=()=>openCorrection(false);
  $('#scanAlternativeBtn').onclick=()=>{showScreen('scan');startCamera()};
  $('#correctionForm').onsubmit=event=>{
    event.preventDefault();
    const form=new FormData(event.currentTarget),product=state.currentProduct;if(!product)return;
    product.name=String(form.get('name')||'').trim();product.brand=String(form.get('brand')||'').trim();
    product.barcode=String(form.get('barcode')||'').replace(/\D/g,'');
    product.ingredients=String(form.get('ingredients')||'').trim();product.allergens=String(form.get('allergens')||'').trim();product.traces=String(form.get('traces')||'').trim();
    product.glutenFreeConfirmed=form.get('glutenFreeConfirmed')==='on';product.manualLabelConfirmed=form.get('manualLabelConfirmed')==='on';
    if(product.manualLabelConfirmed)product.evidenceSource='manual-confirmed';
    else if(!['known-product','database'].includes(product.evidenceSource))product.evidenceSource='ocr';
    product.verdict=FoodLogic.analyseProduct(product,state.settings);persist(false);renderResult();openCorrection(false);
    toast('Updated details applied and safety re-checked');
  };

  $('#foodSearch').oninput=renderFoods;$('#foodFilter').onchange=renderFoods;
  $('#foodEditForm').onsubmit=event=>{event.preventDefault();const form=new FormData(event.currentTarget),food=state.foods.find(item=>item.id===form.get('id'));if(!food)return;food.name=form.get('name');food.location=form.get('location');food.quantity=Math.max(0,Number(form.get('quantity'))||0);food.unit=form.get('unit')||'item';food.lowThreshold=Math.max(0,Number(form.get('lowThreshold'))||0);food.updatedAt=new Date().toISOString();closeFoodEditor();persist();toast('Saved food updated')};
  $('#cancelFoodEditBtn').onclick=closeFoodEditor;

  $('#generateMealsBtn').onclick=()=>{renderMeals();toast('Meals refreshed from current pantry')};$('#refreshPlanBtn').onclick=refreshPlan;
  $('#addShopItemBtn').onclick=()=>{$('#shopItemForm').hidden=!$('#shopItemForm').hidden};$('#cancelShopItemBtn').onclick=()=>{$('#shopItemForm').hidden=true;$('#shopItemForm').reset()};
  $('#shopItemForm').onsubmit=event=>{event.preventDefault();const form=new FormData(event.currentTarget);addShopItem(form.get('name'),form.get('quantity'));event.currentTarget.reset();event.currentTarget.hidden=true;toast('Shopping item added')};
  $('#shoppingList').addEventListener('change',event=>{if(!event.target.dataset.price)return;const card=event.target.closest('.shop-card'),item=state.shopping.find(entry=>entry.id===card?.dataset.id);if(!item)return;item[event.target.dataset.price]=event.target.value.replace(/[^0-9.]/g,'');persist()});

  $('#diaryForm').onsubmit=event=>{event.preventDefault();const form=new FormData(event.currentTarget);state.diary.unshift({id:uid('diary'),food:form.get('food'),reaction:form.get('reaction'),notes:form.get('notes'),date:new Date().toISOString()});event.currentTarget.reset();persist();toast('Diary note saved')};
  $('#traceDairyToggle').onchange=event=>{state.settings.traceDairyAccepted=event.target.checked;if(state.currentProduct)state.currentProduct.verdict=FoodLogic.analyseProduct(state.currentProduct,state.settings);persist()};
  $('#additiveToggle').onchange=event=>{state.settings.warnAdditives=event.target.checked;if(state.currentProduct)state.currentProduct.verdict=FoodLogic.analyseProduct(state.currentProduct,state.settings);persist()};
  $('#autoScannerToggle').onchange=event=>{state.settings.autoScanner=event.target.checked;persist();toast(event.target.checked?'Automatic scanner reopening is on':'Automatic scanner reopening is off')};
  $('#gaLogoInput').onchange=event=>installBrandAsset('ga',event.target.files[0]);$('#treeLogoInput').onchange=event=>installBrandAsset('tree',event.target.files[0]);$('#clearSavedLogosBtn').onclick=async()=>{await clearBrandAssets();location.reload()};
  $('#exportBtn').onclick=exportBackup;$('#exportFoodCsvBtn').onclick=exportFoodCsv;$('#exportShoppingCsvBtn').onclick=exportShoppingCsv;$('#exportDiaryCsvBtn').onclick=exportDiaryCsv;
  $('#importInput').onchange=async event=>{try{const file=event.target.files[0];if(!file)return;const data=JSON.parse(await file.text());if(!Array.isArray(data.foods)||!Array.isArray(data.shopping))throw new Error('Invalid backup');state=migrateState(data);persist();toast('Backup imported')}catch(error){console.error(error);toast('That backup file could not be read')}finally{event.target.value=''}};

  window.onpopstate=event=>showScreen(event.state?.screen||location.hash.slice(1)||'scan',false);
  window.addEventListener('online',updateOnline);window.addEventListener('offline',updateOnline);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')maybeAutoStartScanner();else stopCamera(false)});
}

function updateOnline(){$('#offlineBanner').hidden=navigator.onLine}
async function maybeAutoStartScanner(){if(state.settings.autoScanner===false||document.visibilityState!=='visible')return;try{if(navigator.permissions?.query){const permission=await navigator.permissions.query({name:'camera'});if(permission.state==='granted'&&currentScreen==='scan')setTimeout(()=>startCamera({silentAuto:true}),350)}}catch{}}

async function init(){
  bindEvents();updateOnline();syncAutoShopping();persist(false);renderAll();tryBrandImages();
  const first=location.hash.slice(1);showScreen(['scan','result','food','meals','shop','more'].includes(first)?first:'scan',false);
  if('serviceWorker' in navigator)navigator.serviceWorker.register('service-worker.js').catch(error=>console.warn('Service worker unavailable',error));
  maybeAutoStartScanner();setScanStatus('green','Ready','Take the photos above and press READ ALL PHOTOS + LOAD PRODUCT.');
}

window.__GENEVIEVE_APP__={
  version:VERSION,getState:()=>clone(state),setState:value=>{state=migrateState(value);persist()},lookupBarcode,
  openProduct,showScreen,closeBarcodePhoto,syncAutoShopping,renderAll
};

init();
})();
