import React, {useMemo, useState} from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const TM = 'Genevieve App™';

const starterPantry = [
  { id: 1, name: 'GF Worcestershire Sauce', qty: 1, unit: 'bottle', safe: 'green', clean: 72 },
  { id: 2, name: 'Tamari Gluten-Free Soy Sauce', qty: 1, unit: 'bottle', safe: 'green', clean: 75 },
  { id: 3, name: 'Regular Soy Sauce - housemate', qty: 1, unit: 'bottle', safe: 'red', clean: 45 },
  { id: 4, name: 'Chicken Breast', qty: 2, unit: 'serves', safe: 'green', clean: 90 },
  { id: 5, name: 'Pumpkin', qty: 4, unit: 'serves', safe: 'green', clean: 96 },
  { id: 6, name: 'Soy Milk', qty: 1, unit: 'carton', safe: 'green', clean: 78 },
];

const riskyGluten = ['wheat','barley','rye','oats','malt','brewer','spelt','semolina','durum','gluten'];
const directDairy = ['milk','cream','cheese','yoghurt','yogurt','butter','casein','whey','lactose','skim milk','milk solids','milk powder'];
const traceDairy = ['may contain milk','may contain traces of milk','traces of milk','made on equipment that also processes milk'];
const preservativeWords = ['preservative','sulphite','sulfite','nitrate','nitrite','benzoate','sorbate','colour','color','flavour','flavor','emulsifier','stabiliser','stabilizer','thickener','e-number','e number'];
const greenWords = ['gluten free','certified gluten free','dairy free','no milk','vegan','plant based'];

function includesAny(text, words){
  const t = text.toLowerCase();
  return words.filter(w => t.includes(w));
}

function analyseText(text){
  const lower = text.toLowerCase();
  const certifiedGF = greenWords.some(w => lower.includes(w)) || lower.includes('gf');
  const glutenHits = includesAny(text, riskyGluten).filter(w => !(certifiedGF && w === 'gluten'));
  const directDairyHits = includesAny(text, directDairy);
  const traceHits = includesAny(text, traceDairy);
  const preservativeHits = includesAny(text, preservativeWords);

  let colour = 'green';
  let headline = 'Tracey Safe';
  let reasons = [];

  if (glutenHits.length > 0 && !certifiedGF) {
    colour = 'red'; headline = 'Not Mine / Coeliac Risk'; reasons.push(`Gluten/coeliac concern: ${[...new Set(glutenHits)].join(', ')}`);
  }
  if (directDairyHits.length > 0) {
    colour = 'red'; headline = 'Not Mine / Direct Dairy'; reasons.push(`Direct dairy found: ${[...new Set(directDairyHits)].join(', ')}`);
  }
  if (colour !== 'red' && traceHits.length > 0) {
    colour = 'amber'; headline = 'Trace Dairy / Check Label'; reasons.push('Trace dairy wording found. You said traces may be okay, but check label before eating.');
  }
  if (colour !== 'red' && !certifiedGF && lower.length > 20) {
    colour = colour === 'green' ? 'amber' : colour;
    headline = headline === 'Tracey Safe' ? 'Check Label / Not Certified GF' : headline;
    reasons.push('No clear certified gluten-free wording found.');
  }
  if (certifiedGF && colour !== 'red') reasons.push('Gluten-free wording detected.');
  if (reasons.length === 0) reasons.push('No gluten or direct dairy words detected in the text entered/scanned.');

  let cleanScore = 100;
  cleanScore -= preservativeHits.length * 8;
  cleanScore -= directDairyHits.length * 10;
  cleanScore -= glutenHits.length * 12;
  cleanScore -= traceHits.length * 4;
  if (certifiedGF) cleanScore += 6;
  cleanScore = Math.max(5, Math.min(100, cleanScore));
  const cleanBand = cleanScore >= 80 ? 'Clean Choice' : cleanScore >= 55 ? 'Okay / Moderate' : 'Processed / Caution';

  return {colour, headline, reasons, cleanScore, cleanBand, preservativeHits: [...new Set(preservativeHits)], certifiedGF};
}

async function loadTesseract(){
  if(window.Tesseract) return window.Tesseract;
  await new Promise((resolve, reject)=>{
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    s.onload=resolve; s.onerror=reject; document.body.appendChild(s);
  });
  return window.Tesseract;
}

function App(){
  const [tab,setTab]=useState('photo');
  const [image,setImage]=useState(null);
  const [ocrText,setOcrText]=useState('');
  const [productName,setProductName]=useState('');
  const [busy,setBusy]=useState(false);
  const [ocrMsg,setOcrMsg]=useState('Upload/take a photo of the ingredients or allergen panel.');
  const [pantry,setPantry]=useState(starterPantry);
  const [grocery,setGrocery]=useState([]);
  const [history,setHistory]=useState([]);

  const analysis = useMemo(()=>analyseText(ocrText),[ocrText]);
  const lowStock = pantry.filter(p=>p.qty <= 1 && p.safe !== 'red');

  async function handlePhoto(e){
    const file=e.target.files?.[0]; if(!file) return;
    setImage(URL.createObjectURL(file)); setBusy(true); setOcrMsg('Reading label photo... this can take a moment.');
    try{
      const T=await loadTesseract();
      const result=await T.recognize(file,'eng',{ logger:m=>{ if(m.status) setOcrMsg(`${m.status}${m.progress?` ${Math.round(m.progress*100)}%`:''}`)}});
      setOcrText(result.data.text || '');
      setOcrMsg('Photo read complete. Review the text because labels can be blurry.');
    }catch(err){
      setOcrMsg('Photo text reader could not load. You can still paste/type the label text below.');
    }finally{ setBusy(false); }
  }

  function addToPantry(){
    const name = productName.trim() || 'Photo checked product';
    const item = {id: Date.now(), name, qty:1, unit:'item', safe:analysis.colour, clean:analysis.cleanScore};
    setPantry([item,...pantry]);
    setHistory([{time:new Date().toLocaleString(), action:`Added ${name} to pantry as ${analysis.headline}`, colour:analysis.colour},...history]);
    setProductName(''); setOcrText(''); setImage(null);
  }

  function addToGrocery(){
    const name = productName.trim() || 'Photo checked product';
    setGrocery([{id:Date.now(), name, status:analysis.colour, note:analysis.headline},...grocery]);
    setHistory([{time:new Date().toLocaleString(), action:`Added ${name} to grocery list`, colour:analysis.colour},...history]);
  }

  function autoAddLow(){
    const add = lowStock.map(p=>({id:Date.now()+Math.random(), name:p.name, status:p.safe, note:'Low stock auto-add'}));
    setGrocery([...add,...grocery]);
    setHistory([{time:new Date().toLocaleString(), action:`Auto-added ${add.length} low-stock items`, colour:'amber'},...history]);
  }

  function deduct(id){ setPantry(pantry.map(p=>p.id===id?{...p,qty:Math.max(0,p.qty-1)}:p)); }
  function remove(id){ setPantry(pantry.filter(p=>p.id!==id)); }

  return <div className="app">
    <header className="hero">
      <div><div className="kicker">Personal photo food-safety prototype</div><h1>{TM} Photo Food Safety</h1><p>For Tracey: strict gluten-free/coeliac, no direct dairy, dairy traces allowed. Always check the current label before eating.</p></div>
      <div className="badge">PMS 675 border<br/>Process Magenta fade</div>
    </header>

    <nav className="tabs">
      {['photo','pantry','grocery','health','legal'].map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}
    </nav>

    {tab==='photo' && <main className="grid two">
      <section className="card strong">
        <h2>Photo label checker</h2>
        <p className="muted">Take a photo of the ingredients/allergen panel. The app reads the text, then applies your Genevieve App™ light system.</p>
        <input className="file" type="file" accept="image/*" capture="environment" onChange={handlePhoto}/>
        {image && <img className="preview" src={image} alt="uploaded label"/>}
        <div className="statusline">{busy?'Working: ':''}{ocrMsg}</div>
        <label>Product name</label>
        <input value={productName} onChange={e=>setProductName(e.target.value)} placeholder="Example: GF taco mix, sauce, cereal" />
        <label>Label text found / review text</label>
        <textarea value={ocrText} onChange={e=>setOcrText(e.target.value)} placeholder="Photo text appears here. You can correct it if the camera misses words." />
        <div className="buttons"><button onClick={addToPantry}>Add to Pantry</button><button className="secondary" onClick={addToGrocery}>Add to Grocery List</button></div>
      </section>
      <section className={`card result ${analysis.colour}`}>
        <h2>{analysis.headline}</h2>
        <div className="biglight">{analysis.colour==='green'?'🟢':analysis.colour==='amber'?'🟠':'🔴'}</div>
        <h3>Clean-food rating: {analysis.cleanScore}/100</h3>
        <p className="pill">{analysis.cleanBand}</p>
        <ul>{analysis.reasons.map((r,i)=><li key={i}>{r}</li>)}</ul>
        <div className="mini"><b>Preservative/processed words found:</b> {analysis.preservativeHits.length?analysis.preservativeHits.join(', '):'none detected'}</div>
        <div className="note">Green means it appears suitable for your saved profile. Amber means check label/current packaging. Red means do not put it in Tracey pantry.</div>
      </section>
    </main>}

    {tab==='pantry' && <main className="grid two"><section className="card"><h2>Pantry</h2>{pantry.map(p=><div className={`row ${p.safe}`} key={p.id}><div><b>{p.safe==='green'?'🟢':p.safe==='amber'?'🟠':'🔴'} {p.name}</b><span>{p.qty} {p.unit} · Clean {p.clean}/100</span></div><div><button onClick={()=>deduct(p.id)}>- use</button><button className="danger" onClick={()=>remove(p.id)}>delete</button></div></div>)}</section><section className="card"><h2>Low-stock alerts</h2>{lowStock.length?lowStock.map(p=><p key={p.id}>🟠 {p.name} is running low.</p>):<p>Nothing safe is running low.</p>}<button onClick={autoAddLow}>Auto-add low stock to grocery list</button></section></main>}

    {tab==='grocery' && <main className="grid two"><section className="card"><h2>Grocery list</h2>{grocery.length?grocery.map(g=><div className={`row ${g.status}`} key={g.id}><b>{g.status==='green'?'🟢':g.status==='amber'?'🟠':'🔴'} {g.name}</b><span>{g.note}</span></div>):<p>No grocery items yet.</p>}</section><section className="card"><h2>Quick safe swaps</h2><p>Regular soy sauce → GF tamari</p><p>Regular Worcestershire → certified GF Worcestershire</p><p>Milk/cream/cheese → soy milk, coconut milk, dairy-free spread</p><p>Regular taco mix → certified gluten-free taco mix with no milk powder</p></section></main>}

    {tab==='health' && <main className="grid two"><section className="card"><h2>Clean-food score guide</h2><p>🟢 80–100: cleaner choice, fewer warning words.</p><p>🟠 55–79: okay/moderate, check additives and label.</p><p>🔴 0–54: processed/caution or contains your risk ingredients.</p></section><section className="card"><h2>History</h2>{history.length?history.map((h,i)=><p key={i}>{h.colour==='green'?'🟢':h.colour==='amber'?'🟠':'🔴'} {h.time}: {h.action}</p>):<p>No actions yet.</p>}</section></main>}

    {tab==='legal' && <main className="card"><h2>Safety wording</h2><p>{TM} is a personal food-planning prototype. It does not diagnose allergies, coeliac disease, intolerance, illness, or medical reactions. Product ingredients can change. OCR/photo reading can miss words, especially if photos are blurry or labels are folded. Always check the current label and follow medical advice.</p><p>Trademark notice: Genevieve App™ is used as the visible brand mark in this prototype.</p></main>}
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
