import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const STORAGE_KEY = 'genevieve-app-food-safety-tm-v3';

const defaultProfile = {
  name: 'Tracey',
  glutenRule: 'avoid',
  milkRule: 'avoid',
  creamRule: 'avoid',
  dairyTraceRule: 'caution',
  todayBodyMode: 'normal',
  notes: 'Gluten-free. Dairy-free for milk and cream. Some foods with dairy-derived ingredients may be tolerated only when labels and body symptoms are okay.'
};

const pantrySeed = [
  { id: 'chicken-breast', name: 'Chicken breast', category: 'Protein', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: 'Plain chicken is usually low risk.' },
  { id: 'bacon', name: 'Bacon', category: 'Protein', have: true, gluten: 'check', dairy: 'none', processed: true, personal: 'amber', notes: 'Check marinades, smoke flavouring, and gluten-containing additives.' },
  { id: 'carrot', name: 'Carrot', category: 'Vegetable', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' },
  { id: 'pumpkin', name: 'Pumpkin', category: 'Vegetable', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' },
  { id: 'potato', name: 'Potato', category: 'Vegetable', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' },
  { id: 'corn', name: 'Corn', category: 'Vegetable', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' },
  { id: 'soy-milk', name: 'Soy milk', category: 'Dairy alternative', have: true, gluten: 'safe', dairy: 'none', processed: true, personal: 'green', notes: 'Use as milk replacement.' },
  { id: 'olive-oil-spread', name: 'Olive oil spread', category: 'Fat', have: true, gluten: 'safe', dairy: 'trace', processed: true, personal: 'amber', notes: 'Some spreads contain milk solids. Check the label.' },
  { id: 'olive-oil', name: 'Olive oil', category: 'Fat', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' },
  { id: 'sesame-oil', name: 'Sesame oil', category: 'Fat', have: true, gluten: 'safe', dairy: 'none', processed: true, personal: 'green', notes: '' },
  { id: 'gf-plain-flour', name: 'GF plain flour', category: 'Flour', have: true, gluten: 'safe', dairy: 'none', processed: true, personal: 'green', notes: 'Use instead of wheat flour.' },
  { id: 'gf-sr-flour', name: 'GF self raising flour', category: 'Flour', have: true, gluten: 'safe', dairy: 'none', processed: true, personal: 'green', notes: '' },
  { id: 'soy-sauce', name: 'Soy sauce', category: 'Sauce', have: true, gluten: 'check', dairy: 'none', processed: true, personal: 'amber', notes: 'Use gluten-free soy sauce or tamari only.' },
  { id: 'worcestershire-sauce', name: 'Worcestershire sauce', category: 'Sauce', have: true, gluten: 'check', dairy: 'none', processed: true, personal: 'amber', notes: 'Check label. Some brands contain barley malt vinegar or wheat-derived ingredients.' },
  { id: 'tomato-paste', name: 'Tomato paste', category: 'Sauce', have: true, gluten: 'safe', dairy: 'none', processed: true, personal: 'green', notes: '' },
  { id: 'mustard-powder', name: 'Mustard powder', category: 'Spice', have: true, gluten: 'safe', dairy: 'none', processed: true, personal: 'green', notes: '' },
  { id: 'curry-powder', name: 'Curry powder', category: 'Spice', have: true, gluten: 'check', dairy: 'none', processed: true, personal: 'amber', notes: 'Spice blends can contain anti-caking agents or wheat traces.' },
  { id: 'gf-taco-mix', name: 'GF taco mix', category: 'Seasoning', have: true, gluten: 'safe', dairy: 'trace', processed: true, personal: 'amber', notes: 'Even gluten-free blends can contain milk powder. Check dairy line.' },
  { id: 'honey', name: 'Honey', category: 'Sweetener', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' },
  { id: 'peanut-butter', name: 'Peanut butter', category: 'Spread', have: true, gluten: 'check', dairy: 'trace', processed: true, personal: 'amber', notes: 'Check may-contain statement if sensitive today.' },
  { id: 'salt', name: 'Salt', category: 'Seasoning', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' },
  { id: 'pepper', name: 'Pepper', category: 'Seasoning', have: true, gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' },
  { id: 'italian-herbs', name: 'Italian herbs', category: 'Seasoning', have: true, gluten: 'safe', dairy: 'none', processed: true, personal: 'green', notes: '' }
];

const mealTemplates = [
  {
    id: 'lowest-risk-tray-bake',
    title: 'Lowest-Risk Chicken & Veg Tray Bake',
    type: 'Whole-food dinner',
    ingredients: ['Chicken breast', 'Potato', 'Pumpkin', 'Carrot', 'Olive oil', 'Salt', 'Pepper', 'Italian herbs'],
    steps: [
      'Dice potato, pumpkin and carrot into similar sizes.',
      'Coat with olive oil, salt, pepper and Italian herbs.',
      'Add chicken breast pieces and roast until the chicken is cooked through.',
      'Keep sauces off this meal when your body feels reactive.'
    ],
    why: 'This uses plain whole foods and avoids milk, cream, wheat flour and high-risk sauces.'
  },
  {
    id: 'soy-creamy-bake',
    title: 'Creamy Soy Chicken, Bacon & Pumpkin Bake',
    type: 'Comfort meal',
    ingredients: ['Chicken breast', 'Bacon', 'Pumpkin', 'Potato', 'Carrot', 'Soy milk', 'GF plain flour', 'Olive oil spread', 'Salt', 'Pepper', 'Italian herbs'],
    steps: [
      'Roast the pumpkin, potato and carrot first.',
      'Brown chicken and bacon in a pan.',
      'Whisk soy milk with a little GF flour to make a dairy-free sauce.',
      'Use olive oil instead of olive oil spread if the spread has milk solids.',
      'Combine and bake until thick and hot.'
    ],
    why: 'Good dairy-free comfort option, but bacon and olive spread need label checking.'
  },
  {
    id: 'tomato-skillet',
    title: 'Tomato Chicken, Corn & Potato Skillet',
    type: 'Fast pan meal',
    ingredients: ['Chicken breast', 'Potato', 'Corn', 'Tomato paste', 'Olive oil', 'Salt', 'Pepper', 'Italian herbs'],
    steps: [
      'Pan-fry diced potato until nearly soft.',
      'Add chicken pieces and cook through.',
      'Stir in corn, tomato paste, herbs, salt and pepper.',
      'Add a splash of water to turn the tomato paste into a light sauce.'
    ],
    why: 'Keeps flavour high without soy sauce, Worcestershire sauce, milk or cream.'
  },
  {
    id: 'mild-curry-bowl',
    title: 'Mild Dairy-Free Curry Chicken Bowl',
    type: 'Saucy meal',
    ingredients: ['Chicken breast', 'Potato', 'Pumpkin', 'Carrot', 'Soy milk', 'Curry powder', 'GF plain flour', 'Salt', 'Pepper'],
    steps: [
      'Cook chicken and vegetables until tender.',
      'Sprinkle in curry powder and GF plain flour.',
      'Add soy milk slowly while stirring to make a mild sauce.',
      'Simmer until thick and check seasoning.'
    ],
    why: 'No cream needed, but curry powder should be checked for gluten traces.'
  },
  {
    id: 'taco-potato-bowl',
    title: 'Taco Chicken Potato Bowl',
    type: 'Higher flavour',
    ingredients: ['Chicken breast', 'Potato', 'Corn', 'GF taco mix', 'Tomato paste', 'Salt', 'Pepper'],
    steps: [
      'Cook diced potato until soft and golden.',
      'Add chicken and cook through.',
      'Add corn, tomato paste and taco mix.',
      'Stop and check the taco mix dairy line before using it on a sensitive day.'
    ],
    why: 'Tasty, but taco seasoning is a common hidden dairy and additive risk.'
  },
  {
    id: 'peanut-stir-fry',
    title: 'Peanut Soy Chicken Stir Fry',
    type: 'Label-check meal',
    ingredients: ['Chicken breast', 'Carrot', 'Corn', 'Peanut butter', 'Soy sauce', 'Sesame oil', 'Honey'],
    steps: [
      'Stir-fry chicken, carrot and corn in sesame oil.',
      'Mix peanut butter, a little soy sauce and honey into a sauce.',
      'Use gluten-free soy sauce or tamari only.',
      'Toss sauce through at the end so it does not burn.'
    ],
    why: 'Great flavour, but soy sauce and peanut butter both need label checks.'
  },
  {
    id: 'worcestershire-bacon-hash',
    title: 'Bacon, Potato & Veg Hash',
    type: 'Breakfast or dinner',
    ingredients: ['Bacon', 'Potato', 'Carrot', 'Corn', 'Worcestershire sauce', 'Olive oil', 'Salt', 'Pepper'],
    steps: [
      'Pan-fry potato until browned.',
      'Add bacon, carrot and corn.',
      'Use only a small splash of Worcestershire sauce after confirming the label.',
      'Serve as-is or with leftover chicken.'
    ],
    why: 'Good pantry meal, but Worcestershire sauce and bacon are label-check items.'
  }
];

const categoryOrder = ['Protein', 'Vegetable', 'Dairy alternative', 'Sauce', 'Seasoning', 'Spice', 'Flour', 'Fat', 'Sweetener', 'Spread', 'Other'];

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || String(Date.now());
}

function getInitialState() {
  return {
    profile: defaultProfile,
    foods: pantrySeed,
    diary: [],
    selectedMealId: '',
    search: '',
    category: 'All'
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.foods)) return getInitialState();
    return {
      ...getInitialState(),
      ...saved,
      profile: { ...defaultProfile, ...(saved.profile || {}) },
      foods: saved.foods.map((f) => ({ ...f, id: f.id || slugify(f.name) })),
      diary: Array.isArray(saved.diary) ? saved.diary : []
    };
  } catch {
    return getInitialState();
  }
}

function ingredientByName(foods, name) {
  return foods.find((food) => food.name.toLowerCase() === name.toLowerCase());
}

function scoreIngredient(food, profile) {
  if (!food) return { points: 6, level: 'amber', reasons: ['Ingredient not in pantry yet.'] };

  let points = 0;
  const reasons = [];

  if (food.gluten === 'contains') {
    points += 100;
    reasons.push(`${food.name}: contains gluten.`);
  } else if (food.gluten === 'check') {
    points += 18;
    reasons.push(`${food.name}: check gluten-free label.`);
  }

  if (food.dairy === 'milk') {
    points += 100;
    reasons.push(`${food.name}: contains milk.`);
  } else if (food.dairy === 'cream') {
    points += 100;
    reasons.push(`${food.name}: contains cream.`);
  } else if (food.dairy === 'other') {
    points += profile.dairyTraceRule === 'avoid' ? 55 : 22;
    reasons.push(`${food.name}: contains dairy-derived ingredients.`);
  } else if (food.dairy === 'trace') {
    points += profile.dairyTraceRule === 'avoid' ? 35 : 14;
    reasons.push(`${food.name}: may contain dairy traces.`);
  }

  if (food.processed) {
    points += 4;
    if (food.gluten === 'check' || food.dairy === 'trace' || food.dairy === 'other') {
      reasons.push(`${food.name}: processed item, label needs checking.`);
    }
  }

  if (food.personal === 'amber') {
    points += 10;
    reasons.push(`${food.name}: you marked this as caution.`);
  }
  if (food.personal === 'red') {
    points += 60;
    reasons.push(`${food.name}: you marked this as avoid.`);
  }

  if (profile.todayBodyMode === 'sensitive') points = Math.round(points * 1.25);
  if (profile.todayBodyMode === 'flare') points = Math.round(points * 1.55);

  const level = points >= 70 ? 'red' : points >= 22 ? 'amber' : 'green';
  return { points, level, reasons };
}

function scoreMeal(meal, foods, profile) {
  const used = meal.ingredients.map((name) => ingredientByName(foods, name)).filter(Boolean);
  const available = meal.ingredients.filter((name) => ingredientByName(foods, name)?.have);
  const missing = meal.ingredients.filter((name) => !ingredientByName(foods, name)?.have);
  const scoreParts = meal.ingredients.map((name) => scoreIngredient(ingredientByName(foods, name), profile));
  const reasons = scoreParts.flatMap((part) => part.reasons);
  const rawScore = scoreParts.reduce((sum, part) => sum + part.points, 0) + missing.length * 4;
  const score = Math.min(100, rawScore);

  let level = 'green';
  if (score >= 70 || scoreParts.some((part) => part.level === 'red')) level = 'red';
  else if (score >= 22 || scoreParts.some((part) => part.level === 'amber')) level = 'amber';

  const fit = Math.round((available.length / meal.ingredients.length) * 100);
  const label = level === 'green' ? 'Likely safe today' : level === 'amber' ? 'Use caution' : 'Avoid today';
  const headline = level === 'green'
    ? 'No major gluten, milk, or cream flags detected from your saved pantry rules.'
    : level === 'amber'
      ? 'This meal has label-check or dairy-trace items. Safer when your body feels normal.'
      : 'This meal contains an avoid-level flag from your personal safety rules.';

  return { ...meal, used, available, missing, score, level, label, headline, reasons, fit };
}

function buildSmartSuggestions(foods, profile) {
  const have = foods.filter((food) => food.have);
  const byCategory = (category) => have.filter((food) => food.category === category).map((food) => food.name);
  const proteins = byCategory('Protein');
  const veg = byCategory('Vegetable');
  const sauces = byCategory('Sauce');
  const fats = byCategory('Fat');
  const seasonings = have.filter((food) => ['Seasoning', 'Spice'].includes(food.category)).map((food) => food.name);
  const dairyAlt = byCategory('Dairy alternative');
  const flour = byCategory('Flour');

  const dynamicMeals = [];
  const firstProtein = proteins[0];
  const mainVeg = veg.slice(0, 4);

  if (firstProtein && mainVeg.length >= 2) {
    dynamicMeals.push({
      id: 'smart-clean-plate',
      title: `Genevieve App™ Clean Plate: ${firstProtein} & ${mainVeg.slice(0, 3).join(', ')}`,
      type: 'Generated from your pantry',
      ingredients: [firstProtein, ...mainVeg.slice(0, 3), fats[0] || 'Olive oil', 'Salt', 'Pepper'].filter(Boolean),
      steps: [
        'Use this as your safest base meal when you want fewer processed ingredients.',
        'Cook the protein separately so you can control seasoning.',
        'Roast or pan-cook the vegetables with oil, salt and pepper.',
        'Add sauces only after Genevieve App™ marks them green or amber for the day.'
      ],
      why: 'Genevieve App™ built this from lower-risk pantry foods you ticked as available.'
    });
  }

  if (firstProtein && dairyAlt[0] && flour[0] && mainVeg.length >= 2) {
    dynamicMeals.push({
      id: 'smart-creamy-sauce',
      title: `Dairy-Free ${firstProtein} in Soy Sauce Base`,
      type: 'Generated comfort meal',
      ingredients: [firstProtein, ...mainVeg.slice(0, 2), dairyAlt[0], flour[0], fats[0] || 'Olive oil', 'Salt', 'Pepper'].filter(Boolean),
      steps: [
        'Cook the protein and vegetables first.',
        `Whisk ${dairyAlt[0]} with a small spoon of ${flour[0]} for a dairy-free creamy sauce.`,
        'Simmer gently until thick.',
        'Skip any spread that lists milk solids or cream.'
      ],
      why: 'This replaces milk or cream with your dairy alternative.'
    });
  }

  if (firstProtein && sauces[0] && mainVeg.length >= 1) {
    dynamicMeals.push({
      id: 'smart-sauce-pan',
      title: `Pan Meal with ${firstProtein}, ${mainVeg[0]} & ${sauces[0]}`,
      type: 'Generated label-check meal',
      ingredients: [firstProtein, mainVeg[0], sauces[0], ...(seasonings.slice(0, 2)), fats[0] || 'Olive oil'].filter(Boolean),
      steps: [
        `Check the ${sauces[0]} label before using it.`,
        'Cook protein and vegetables first.',
        'Add only a small amount of sauce at the end.',
        'Save this one for a normal-body day if the sauce is amber.'
      ],
      why: 'This uses what you have, but sauce-based meals often need label checking.'
    });
  }

  return dynamicMeals.map((meal) => scoreMeal(meal, foods, profile));
}

function classNameFor(level) {
  return `status ${level}`;
}

function statusEmoji(level) {
  return level === 'green' ? '🟢' : level === 'amber' ? '🟡' : '🔴';
}

function cycle(current, values) {
  const index = values.indexOf(current);
  return values[(index + 1) % values.length];
}

function App() {
  const [state, setState] = useState(loadState);
  const [newFood, setNewFood] = useState({ name: '', category: 'Other', gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' });
  const [activeTab, setActiveTab] = useState('meals');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const { foods, profile, diary, search, category } = state;

  const scoredMeals = useMemo(() => {
    const fixed = mealTemplates.map((meal) => scoreMeal(meal, foods, profile));
    const smart = buildSmartSuggestions(foods, profile);
    return [...smart, ...fixed].sort((a, b) => b.fit - a.fit || a.score - b.score);
  }, [foods, profile]);

  const visibleFoods = useMemo(() => {
    const term = search.trim().toLowerCase();
    return foods
      .filter((food) => category === 'All' || food.category === category)
      .filter((food) => !term || food.name.toLowerCase().includes(term) || food.notes.toLowerCase().includes(term))
      .sort((a, b) => Number(b.have) - Number(a.have) || categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) || a.name.localeCompare(b.name));
  }, [foods, search, category]);

  const categories = ['All', ...Array.from(new Set([...categoryOrder, ...foods.map((food) => food.category)])).filter(Boolean)];
  const pantryCount = foods.filter((food) => food.have).length;
  const greenMeals = scoredMeals.filter((meal) => meal.level === 'green').length;
  const amberMeals = scoredMeals.filter((meal) => meal.level === 'amber').length;
  const redMeals = scoredMeals.filter((meal) => meal.level === 'red').length;
  const labelChecks = foods.filter((food) => food.have && (food.gluten === 'check' || food.dairy === 'trace' || food.dairy === 'other' || food.processed)).slice(0, 6);
  const selectedMeal = scoredMeals.find((meal) => meal.id === state.selectedMealId) || scoredMeals[0];
  const shoppingList = useMemo(() => Array.from(new Set(scoredMeals.slice(0, 5).flatMap((meal) => meal.missing))).filter(Boolean), [scoredMeals]);

  function updateProfile(key, value) {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
  }

  function updateFood(id, patch) {
    setState((prev) => ({ ...prev, foods: prev.foods.map((food) => (food.id === id ? { ...food, ...patch } : food)) }));
  }

  function deleteFood(id) {
    setState((prev) => ({ ...prev, foods: prev.foods.filter((food) => food.id !== id) }));
  }

  function addFood() {
    const name = newFood.name.trim();
    if (!name) return;
    const id = slugify(name);
    const exists = foods.some((food) => food.id === id || food.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      setState((prev) => ({ ...prev, foods: prev.foods.map((food) => food.id === id || food.name.toLowerCase() === name.toLowerCase() ? { ...food, have: true } : food) }));
    } else {
      setState((prev) => ({ ...prev, foods: [...prev.foods, { ...newFood, id, name, have: true }] }));
    }
    setNewFood({ name: '', category: 'Other', gluten: 'safe', dairy: 'none', processed: false, personal: 'green', notes: '' });
  }

  function logDiary(symptom, severity) {
    const entry = {
      id: Date.now(),
      at: new Date().toLocaleString(),
      mealTitle: selectedMeal?.title || 'Meal not selected',
      symptom,
      severity,
      mealLevel: selectedMeal?.level || 'amber',
      ingredients: selectedMeal?.ingredients || []
    };
    setState((prev) => ({ ...prev, diary: [entry, ...prev.diary].slice(0, 30) }));
  }

  function resetDemo() {
    if (window.confirm('Reset this app back to the starter pantry and diary?')) {
      setState(getInitialState());
    }
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'genevieve-app-food-safety-data.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="appShell">
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">GENEVIEVE APP™ · FOOD SAFETY</p>
          <h1><span className="brandScript">Genevieve App™</span><br />Pantry meals matched to your gluten-free and dairy-aware body rules.</h1>
          <p>
            Tick what you have, mark hidden gluten or dairy risks, then let Genevieve App™ rate meal ideas as green, amber or red for today.
          </p>
          <div className="heroActions">
            <button onClick={() => setActiveTab('meals')}>Build meals</button>
            <button className="secondary" onClick={() => setActiveTab('pantry')}>Edit pantry</button>
          </div>
        </div>
        <div className="safetyBoard">
          <div className="boardTop">
            <span>Today’s body mode</span>
            <select value={profile.todayBodyMode} onChange={(event) => updateProfile('todayBodyMode', event.target.value)}>
              <option value="normal">Normal</option>
              <option value="sensitive">Sensitive</option>
              <option value="flare">Flare / very cautious</option>
            </select>
          </div>
          <div className="boardGrid">
            <strong>{pantryCount}</strong><small>pantry items ticked</small>
            <strong>{greenMeals}</strong><small>green meals</small>
            <strong>{amberMeals}</strong><small>amber meals</small>
            <strong>{redMeals}</strong><small>red meals</small>
          </div>
        </div>
      </section>

      <nav className="tabs" aria-label="App sections">
        {[
          ['meals', 'Meal builder'],
          ['pantry', 'Pantry'],
          ['profile', 'Food rules'],
          ['diary', 'Reaction diary'],
          ['safety', 'Safety board']
        ].map(([id, label]) => (
          <button key={id} className={activeTab === id ? 'active' : ''} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </nav>

      {activeTab === 'meals' && (
        <section className="layout">
          <aside className="panel stickyPanel">
            <h2>Genevieve App™ result</h2>
            <p className="muted">Best meal is sorted by pantry fit first, then lower reaction risk.</p>
            {selectedMeal && (
              <div className={`bestMeal ${selectedMeal.level}`}>
                <span>{statusEmoji(selectedMeal.level)} {selectedMeal.label}</span>
                <h3>{selectedMeal.title}</h3>
                <p>{selectedMeal.headline}</p>
                <div className="meter" aria-label="Pantry fit"><i style={{ width: `${selectedMeal.fit}%` }} /></div>
                <small>{selectedMeal.fit}% pantry fit · {selectedMeal.score}/100 risk score</small>
              </div>
            )}
            <div className="miniList">
              <h3>Shopping gaps</h3>
              {shoppingList.length === 0 ? <p className="muted">No gaps in top meals.</p> : shoppingList.map((item) => <span key={item}>{item}</span>)}
            </div>
          </aside>

          <section className="mealGrid">
            {scoredMeals.map((meal) => (
              <article key={meal.id} className={`mealCard ${meal.level}`} onClick={() => setState((prev) => ({ ...prev, selectedMealId: meal.id }))}>
                <div className="cardTop">
                  <span className={classNameFor(meal.level)}>{statusEmoji(meal.level)} {meal.label}</span>
                  <b>{meal.fit}% fit</b>
                </div>
                <h2>{meal.title}</h2>
                <p className="type">{meal.type}</p>
                <p>{meal.why}</p>
                <div className="ingredients">
                  {meal.ingredients.map((name) => {
                    const food = ingredientByName(foods, name);
                    const part = scoreIngredient(food, profile);
                    return <span key={name} className={food?.have ? part.level : 'missing'}>{food?.have ? statusEmoji(part.level) : '⚪'} {name}</span>;
                  })}
                </div>
                {meal.reasons.length > 0 && (
                  <details>
                    <summary>Why this rating?</summary>
                    <ul>{meal.reasons.slice(0, 8).map((reason, index) => <li key={index}>{reason}</li>)}</ul>
                  </details>
                )}
                <details>
                  <summary>Cooking steps</summary>
                  <ol>{meal.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                </details>
              </article>
            ))}
          </section>
        </section>
      )}

      {activeTab === 'pantry' && (
        <section className="layout pantryLayout">
          <aside className="panel">
            <h2>Add food</h2>
            <label>Food name<input value={newFood.name} onChange={(event) => setNewFood({ ...newFood, name: event.target.value })} placeholder="Example: rice, tuna, coconut milk" /></label>
            <label>Category
              <select value={newFood.category} onChange={(event) => setNewFood({ ...newFood, category: event.target.value })}>
                {categoryOrder.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>Gluten status
              <select value={newFood.gluten} onChange={(event) => setNewFood({ ...newFood, gluten: event.target.value })}>
                <option value="safe">Confirmed gluten-free</option>
                <option value="check">Check gluten label</option>
                <option value="contains">Contains gluten</option>
              </select>
            </label>
            <label>Dairy status
              <select value={newFood.dairy} onChange={(event) => setNewFood({ ...newFood, dairy: event.target.value })}>
                <option value="none">No dairy</option>
                <option value="trace">May contain dairy</option>
                <option value="other">Contains dairy-derived ingredient</option>
                <option value="milk">Contains milk</option>
                <option value="cream">Contains cream</option>
              </select>
            </label>
            <label className="inline"><input type="checkbox" checked={newFood.processed} onChange={(event) => setNewFood({ ...newFood, processed: event.target.checked })} /> Processed / packet food</label>
            <label>Personal mark
              <select value={newFood.personal} onChange={(event) => setNewFood({ ...newFood, personal: event.target.value })}>
                <option value="green">Green: usually fine</option>
                <option value="amber">Amber: caution</option>
                <option value="red">Red: avoid</option>
              </select>
            </label>
            <label>Notes<textarea value={newFood.notes} onChange={(event) => setNewFood({ ...newFood, notes: event.target.value })} placeholder="Brand, label warning, symptoms, etc." /></label>
            <button className="primary" onClick={addFood}>Add to pantry</button>
          </aside>

          <section className="panel">
            <div className="toolbar">
              <input value={search} onChange={(event) => setState((prev) => ({ ...prev, search: event.target.value }))} placeholder="Search pantry" />
              <select value={category} onChange={(event) => setState((prev) => ({ ...prev, category: event.target.value }))}>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="foodTable">
              {visibleFoods.map((food) => {
                const risk = scoreIngredient(food, profile);
                return (
                  <div key={food.id} className="foodRow">
                    <button className={food.have ? 'tick on' : 'tick'} onClick={() => updateFood(food.id, { have: !food.have })}>{food.have ? '✓' : '+'}</button>
                    <div className="foodMain">
                      <strong>{food.name}</strong>
                      <small>{food.category} · {statusEmoji(risk.level)} {risk.level} · {food.notes || 'No notes'}</small>
                    </div>
                    <button title="Cycle gluten status" onClick={() => updateFood(food.id, { gluten: cycle(food.gluten, ['safe', 'check', 'contains']) })}>Gluten: {food.gluten}</button>
                    <button title="Cycle dairy status" onClick={() => updateFood(food.id, { dairy: cycle(food.dairy, ['none', 'trace', 'other', 'milk', 'cream']) })}>Dairy: {food.dairy}</button>
                    <button title="Cycle personal mark" onClick={() => updateFood(food.id, { personal: cycle(food.personal, ['green', 'amber', 'red']) })}>You: {food.personal}</button>
                    <button className="danger" onClick={() => deleteFood(food.id)}>Delete</button>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      )}

      {activeTab === 'profile' && (
        <section className="panel profilePanel">
          <h2>Your food rules</h2>
          <div className="ruleGrid">
            <label>Your name<input value={profile.name} onChange={(event) => updateProfile('name', event.target.value)} /></label>
            <label>Gluten rule
              <select value={profile.glutenRule} onChange={(event) => updateProfile('glutenRule', event.target.value)}>
                <option value="avoid">Avoid gluten</option>
              </select>
            </label>
            <label>Milk rule
              <select value={profile.milkRule} onChange={(event) => updateProfile('milkRule', event.target.value)}>
                <option value="avoid">Avoid milk</option>
              </select>
            </label>
            <label>Cream rule
              <select value={profile.creamRule} onChange={(event) => updateProfile('creamRule', event.target.value)}>
                <option value="avoid">Avoid cream</option>
              </select>
            </label>
            <label>Dairy traces
              <select value={profile.dairyTraceRule} onChange={(event) => updateProfile('dairyTraceRule', event.target.value)}>
                <option value="caution">Caution, not automatic red</option>
                <option value="avoid">Avoid traces today</option>
              </select>
            </label>
            <label>Today body mode
              <select value={profile.todayBodyMode} onChange={(event) => updateProfile('todayBodyMode', event.target.value)}>
                <option value="normal">Normal</option>
                <option value="sensitive">Sensitive</option>
                <option value="flare">Flare / very cautious</option>
              </select>
            </label>
          </div>
          <label>Personal notes<textarea value={profile.notes} onChange={(event) => updateProfile('notes', event.target.value)} /></label>
          <div className="explainer">
            <h3>How Genevieve App™ rates food</h3>
            <p><b>Green</b> means the saved rules do not detect major gluten, milk or cream flags.</p>
            <p><b>Amber</b> means label check, processed food, may-contain dairy, dairy-derived ingredients, or something you personally marked caution.</p>
            <p><b>Red</b> means gluten, milk, cream, or an item you personally marked avoid.</p>
          </div>
        </section>
      )}

      {activeTab === 'diary' && (
        <section className="layout">
          <aside className="panel">
            <h2>Log reaction</h2>
            <label>Meal eaten
              <select value={selectedMeal?.id || ''} onChange={(event) => setState((prev) => ({ ...prev, selectedMealId: event.target.value }))}>
                {scoredMeals.map((meal) => <option key={meal.id} value={meal.id}>{statusEmoji(meal.level)} {meal.title}</option>)}
              </select>
            </label>
            <div className="symptomButtons">
              {[
                ['Fine', 0],
                ['Bloated', 2],
                ['Stomach pain', 3],
                ['Skin reaction', 3],
                ['Tired', 2],
                ['Other', 1]
              ].map(([label, severity]) => <button key={label} onClick={() => logDiary(label, severity)}>{label}</button>)}
            </div>
            <p className="muted">This does not diagnose anything. It helps you notice personal patterns over time.</p>
          </aside>
          <section className="panel">
            <h2>Recent diary</h2>
            {diary.length === 0 ? <p className="muted">No entries yet.</p> : diary.map((entry) => (
              <div key={entry.id} className="diaryEntry">
                <strong>{entry.at}</strong>
                <span>{statusEmoji(entry.mealLevel)} {entry.mealTitle}</span>
                <p>{entry.symptom} · severity {entry.severity}/3</p>
                <small>{entry.ingredients.join(', ')}</small>
              </div>
            ))}
          </section>
        </section>
      )}

      {activeTab === 'safety' && (
        <section className="layout">
          <aside className="panel legalPanel">
            <h2>Safety and legal wording</h2>
            <p>
              Genevieve App™ Food Safety is a personal pantry and meal-planning prototype. It does not diagnose, treat, prevent, or predict allergies, coeliac disease, intolerance, anaphylaxis, or medical reactions.
            </p>
            <p>
              Always check product packaging and allergen statements. Follow advice from your doctor, dietitian, allergist, or other qualified health professional.
            </p>
            <p className="tradeNotice">Trademark notice: Genevieve App™ is used as the product brand. The ™ symbol belongs beside the full brand name, not beside generic words like Food Safety, Pantry, Meals, or Reaction Risk.</p>
          </aside>
          <section className="panel">
            <h2>Action board</h2>
            <div className="actionCards">
              <div><b>🟢 Cook today</b><span>{greenMeals} meals have no major rule flags.</span></div>
              <div><b>🟡 Check labels</b><span>{amberMeals} meals contain caution items.</span></div>
              <div><b>🔴 Avoid</b><span>{redMeals} meals trigger avoid-level flags.</span></div>
            </div>
            <h3>Top label checks in your pantry</h3>
            {labelChecks.length === 0 ? <p className="muted">No label checks from ticked pantry items.</p> : labelChecks.map((food) => (
              <div key={food.id} className="labelCheck"><b>{food.name}</b><span>{food.notes || 'Check gluten and dairy lines.'}</span></div>
            ))}
            <div className="dataButtons">
              <button onClick={exportData}>Export my data</button>
              <button className="danger" onClick={resetDemo}>Reset demo</button>
            </div>
          </section>
        </section>
      )}
      <footer className="appFooter">
        <strong>Genevieve App™</strong> <span>Food Safety · Personal pantry and meal-planning prototype</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
