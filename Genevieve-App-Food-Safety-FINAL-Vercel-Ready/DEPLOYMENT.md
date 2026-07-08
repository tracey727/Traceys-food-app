# Deployment Check

This version is Vercel-ready.

## Files that must be in the GitHub repo root

- package.json
- package-lock.json
- index.html
- vite.config.js
- vercel.json
- src/main.jsx
- src/styles.css

## Do not upload

- node_modules
- dist

Vercel creates `dist` itself when it runs `npm run build`.

## GitHub upload method

Unzip this file. Open the unzipped folder. Upload the files and the `src` folder into the GitHub repository root.

The GitHub repo must show `package.json` immediately on the first page. If `package.json` is inside another folder, Vercel may not deploy unless Root Directory is set to that folder.

## Vercel build settings

- Framework Preset: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

If Vercel asks for Node version, choose Node 20.
