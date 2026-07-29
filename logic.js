(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  root.FoodLogic=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const GLUTEN_TERMS=['wheat','barley','rye','spelt','triticale','malt','semolina','durum','couscous','bulgur','farina'];
  const OAT_TERMS=['oat','oats','oatmeal','oat flour','oat fibre','oat fiber','oat bran'];
  const DAIRY_TERMS=['milk solids','skim milk','milk powder','milk protein','buttermilk','caseinate','casein','whey','lactose','yoghurt','yogurt','cheese','butter','cream','ghee','milk'];
  const SOY_RE=/\bsoy(?:a|bean|beans)?\b/i;
  const PLANT_MILK_RE=/\b(soy|soya|almond|coconut|rice|hemp|pea|cashew|macadamia|hazelnut|plant|oat)\s+(milk|drink|beverage)\b/gi;
  const TRACE_DAIRY_RE=/(may contain|traces? of|made (?:in|on) (?:a )?(?:facility|line)|shared equipment)[^.;\n]{0,140}\b(milk|dairy|lactose|whey|casein|caseinate|butter|cream|cheese)\b/i;
  const ADDITIVE_RE=/(preservative|colour\s*\(?\d|flavou?r enhancer|artificial flavou?r|artificial colou?r|emulsifier|stabiliser|stabilizer|thickener|e\s*\d{3,4})/i;

  const norm=s=>(s||'').toString().toLowerCase().replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim();
  const escapeRe=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const findTerms=(text,terms)=>terms.filter(term=>new RegExp(`\\b${escapeRe(term).replace(/\\ /g,'\\s+')}\\b`,'i').test(text));
  const unique=items=>[...new Set(items)];
  const trustedSources=new Set(['known-product','database','manual-confirmed']);

  function categoryFor(product){
    const text=norm(`${product.name||''} ${product.brand||''}`);
    if(/\b(soy|soya|almond|coconut|rice|oat|plant|pea)\s+(milk|drink|beverage)\b|\bmilk\b/.test(text)) return 'milk';
    if(/\bbread|toast|roll|wrap\b/.test(text)) return 'bread';
    if(/\bsauce|gravy|dressing|marinade\b/.test(text)) return 'sauce';
    if(/\bcereal|muesli|granola\b/.test(text)) return 'cereal';
    if(/\byoghurt|yogurt\b/.test(text)) return 'yoghurt';
    return 'general';
  }

  function saferAlternatives(product,findings){
    const category=categoryFor(product);
    const alternatives=[];
    const add=text=>{if(!alternatives.includes(text)) alternatives.push(text)};

    if(findings.directDairy){
      if(category==='milk'){
        add('Choose a soy, rice or coconut drink whose current package is clearly labelled gluten-free and lists no milk, whey, casein/caseinate, lactose, cream or butter.');
        add('Soybeans are not dairy. Scan the alternative and check its current allergen panel before buying.');
      }else if(category==='yoghurt'){
        add('Choose a clearly labelled gluten-free soy or coconut yoghurt with no milk, whey, casein/caseinate or lactose.');
      }else{
        add('Choose a clearly labelled gluten-free version that is also dairy-free, then scan the current package before buying.');
      }
    }
    if(findings.glutenHits.length){
      if(category==='bread') add('Choose bread specifically labelled gluten-free and check that the package also contains no direct dairy ingredients.');
      else if(category==='sauce') add('Choose a sauce clearly labelled gluten-free; check soy sauce, malt, wheat thickeners and dairy ingredients on the current label.');
      else add('Choose a clearly labelled gluten-free version of the same type of product and scan the current package.');
    }
    if(findings.oatHits.length) add('Under your strict setting, choose a rice, corn, quinoa or buckwheat alternative instead of an oat product.');
    if(findings.missingIngredients||!findings.gfConfirmed) add('Choose a product with a readable ingredient and allergen panel plus a clear gluten-free or coeliac-suitable statement.');
    if(findings.additiveWarning&&!findings.directDairy&&!findings.glutenHits.length&&!findings.oatHits.length) add('For a simpler option, compare products with fewer additives or preservatives while still checking gluten-free and dairy information.');
    if(findings.traceDairy) add('For a lower-uncertainty choice, choose one with no “may contain milk/dairy” statement and scan its current label.');
    if(!alternatives.length) add('No replacement is needed from the loaded information. Keep checking the current package because formulations can change.');
    return alternatives.slice(0,3);
  }

  function analyseProduct(product,settings={}){
    const traceDairyAccepted=settings.traceDairyAccepted!==false;
    const warnAdditives=settings.warnAdditives!==false;
    const source=String(product.evidenceSource||'').toLowerCase();
    const evidenceTrusted=trustedSources.has(source)||product.manualLabelConfirmed===true;
    const ocrConfidence=Math.max(0,Math.min(100,Number(product.ocrConfidence)||0));
    const strongOcr=source==='ocr'&&ocrConfidence>=86;
    const riskEvidenceStrong=evidenceTrusted||strongOcr;

    const ingredients=norm(product.ingredients||product.ingredients_text);
    const allergens=norm([product.allergens,...(product.allergens_tags||[])].join(' '));
    const traces=norm([product.traces,...(product.traces_tags||[])].join(' '));
    const labels=norm([product.labels,...(product.labels_tags||[])].join(' '));

    // Do not treat the words “gluten-free” as an ingredient risk.
    const riskIngredients=ingredients.replace(/\bgluten\s*free\b/g,' ').replace(/\bfree\s+from\s+gluten\b/g,' ');
    const riskAllergens=allergens.replace(/\bgluten\s*free\b/g,' ').replace(/\bfree\s+from\s+gluten\b/g,' ');
    const combined=`${riskIngredients} ${riskAllergens}`.trim();

    const plantDescriptorText=`${norm(product.name||'')} ${combined}`;
    const plantMilkHits=unique((plantDescriptorText.match(PLANT_MILK_RE)||[]).map(norm));
    const ingredientsForDirect=riskIngredients.replace(PLANT_MILK_RE,' plant beverage ').replace(/(may contain|traces? of|made (?:in|on) (?:a )?(?:facility|line)|shared equipment)[^.;\n]*/gi,' ');
    const allergensForDirect=riskAllergens.replace(PLANT_MILK_RE,' plant beverage ');
    const dairyScanText=`${ingredientsForDirect} ${allergensForDirect}`;

    const glutenHits=unique(findTerms(combined,GLUTEN_TERMS));
    const oatHits=unique(findTerms(combined,OAT_TERMS));
    const dairyHits=unique(findTerms(dairyScanText,DAIRY_TERMS));
    const gfConfirmed=Boolean(product.glutenFreeConfirmed)||/\bgluten\s*free\b|\bcoeliac\b|\bceliac\b/.test(labels);
    const traceDairy=TRACE_DAIRY_RE.test(`${traces}. ${ingredients}`)||findTerms(traces.replace(PLANT_MILK_RE,' plant beverage '),DAIRY_TERMS).length>0||/\bdairy\b/.test(traces);
    const directDairy=dairyHits.length>0;
    const additiveWarning=warnAdditives&&ADDITIVE_RE.test(ingredients);
    const missingIngredients=!ingredients;
    const soyPresent=SOY_RE.test(`${ingredients} ${allergens} ${product.name||''}`);
    const reasons=[];
    let level='amber';

    function applyPossibleOcrRisk(kind,hits){
      reasons.push(`The photo reader may have seen ${kind}: ${hits.join(', ')}. The text was not trusted enough to issue a red block. Check the current physical label or correct the text below.`);
      level='amber';
    }

    if(glutenHits.length){
      if(riskEvidenceStrong){level='red';reasons.push(`Gluten risk found in the loaded ingredient or allergen information: ${glutenHits.join(', ')}.`)}
      else applyPossibleOcrRisk('a gluten ingredient',glutenHits);
    }
    if(oatHits.length){
      if(riskEvidenceStrong){level='red';reasons.push(`Oat ingredient found in the loaded ingredient information: ${oatHits.join(', ')}. Your strict setting blocks oat products.`)}
      else applyPossibleOcrRisk('an oat word',oatHits);
    }
    if(directDairy){
      if(riskEvidenceStrong){level='red';reasons.push(`Direct dairy found in the loaded ingredient or allergen information: ${dairyHits.join(', ')}.`)}
      else applyPossibleOcrRisk('a direct dairy word',dairyHits);
    }

    if(level!=='red'){
      if(missingIngredients){
        reasons.push('The ingredient list is missing or unreadable, so the product cannot be confirmed safe.');
        level='amber';
      }else if(!gfConfirmed){
        reasons.push('No clear gluten-free or coeliac-suitable statement was found in the loaded label information.');
        level='amber';
      }else if(!evidenceTrusted){
        reasons.push('Gluten-free wording was read, but the product details have not yet been confirmed against the current label. Tick the confirmation box after checking the packet.');
        level='amber';
      }else{
        level='green';
        reasons.push('A clear gluten-free or coeliac-suitable label was loaded.');
        reasons.push('No gluten ingredient, oat ingredient or direct dairy ingredient was found in the trusted loaded information.');
      }

      if(soyPresent&&!directDairy) reasons.push('Soy/soybeans were found. Soy is not dairy and is not treated as a dairy ingredient.');
      if(plantMilkHits.length) reasons.push(`${plantMilkHits.join(', ')} is a plant drink description and is not treated as dairy by itself.`);

      if(traceDairy){
        if(traceDairyAccepted){
          reasons.push('A trace or “may contain” dairy warning was found. Your setting allows trace dairy, so this stays amber for visibility.');
          level='amber';
        }else{
          reasons.push('A trace dairy warning was found and your settings do not allow it.');
          level='red';
        }
      }

      if(additiveWarning) reasons.push('Clean-food caution: additive or preservative wording was detected. This does not by itself turn a gluten/dairy-safe product red.');
    }

    if(level==='green'&&!reasons.length) reasons.push('No known issue was detected in the trusted loaded information.');

    const findings={directDairy,traceDairy,glutenHits,oatHits,dairyHits,gfConfirmed,missingIngredients,additiveWarning,plantMilkHits,soyPresent,evidenceTrusted,ocrConfidence,source};
    const label=level==='green'?'SAFE FROM LOADED LABEL':level==='red'?'DO NOT EAT':'NEEDS CHECKING';
    const action=level==='green'
      ?'This matches your saved safety rules from the trusted information loaded. Still read the current package before eating.'
      :level==='red'
        ?`Do not eat this product under your saved rules. ${reasons[0]||'A blocked ingredient was found.'}`
        :'The app cannot confirm this product yet. Check or correct the loaded details, then press USE THESE UPDATED DETAILS + RE-CHECK SAFETY.';
    const whyHeading=level==='green'?'Why it was accepted':level==='red'?"Why you can't have this":'What needs checking';
    const alternatives=saferAlternatives(product,findings);

    return {...findings,level,label,action,reasons,whyHeading,alternatives};
  }

  function stockLevel(item){
    const q=Number(item.quantity||0),low=Number(item.lowThreshold??1);
    if(q<=0)return 'red';
    if(q<=low)return 'amber';
    return 'green';
  }

  function cheapestStore(item){
    const c=Number(item.colesPrice),w=Number(item.wooliesPrice);
    if(c>0&&w>0)return c<=w?'Coles':'Woolworths';
    if(c>0)return 'Coles';
    if(w>0)return 'Woolworths';
    return 'Price needed';
  }

  return {analyseProduct,stockLevel,cheapestStore,norm};
});
