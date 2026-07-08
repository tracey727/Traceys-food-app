# Genevieve App™ Food Safety

A Vite + React prototype for a gluten-free and dairy-aware pantry meal planning app branded as **Genevieve App™ Food Safety**.

## What it does

- Saves a personal food profile for Tracey.
- Tracks pantry/fridge/freezer items.
- Marks ingredients as safe, label-check, trace-dairy, hidden-gluten risk, milk/cream risk, or avoid.
- Generates meal ideas from the ticked pantry.
- Gives every meal a Genevieve App™ style rating:
  - Green = lower risk
  - Amber = check labels / use caution
  - Red = avoid for today
- Includes a reaction diary and a safety board.

## Correct trademark placement

Use **Genevieve App™** when naming the product brand.

The ™ symbol belongs beside the full brand name, not beside generic feature names. Correct examples:

- Genevieve App™
- Genevieve App™ Food Safety
- Genevieve App™ result

Do not put ™ beside generic words such as Pantry, Meals, Food Safety, Reaction Risk, or Safety Board by themselves.

The folder name, npm package name, and technical filenames do not use ™ because GitHub, Vercel, npm, and zip tools can reject or mishandle special characters.

## Local test

```bash
npm install
npm run build
```

## Vercel settings

When importing the GitHub repo into Vercel:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: leave blank if these files are at the top of the repo

## Safety wording

Genevieve App™ Food Safety is a personal pantry and meal-planning prototype. It does not diagnose, treat, prevent, or predict allergies, coeliac disease, intolerance, anaphylaxis, or medical reactions. Always check product packaging and allergen statements, and follow qualified medical advice.
