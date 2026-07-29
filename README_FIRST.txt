GENEVIEVE App™ FOOD V19.4 — START HERE
======================================

THIS VERSION FIXES THE VERCEL ERROR:
"Error: The pattern api/product.mjs ... does not match any Serverless Functions"

WHAT TO UPLOAD
1. Extract this ZIP.
2. Open the extracted folder.
3. Upload every item INSIDE it to the ROOT of the Food App GitHub repository.
4. At the top level of GitHub you must see index.html, app.js, vercel.json and the api folder.
5. Inside api you must see product.mjs and search.mjs.

DO NOT
- Put all files inside another V19.4 folder in GitHub.
- Add these files to the Dog Park repository.
- set a Vercel Output Directory.
- add a Build Command.

VERCEL SETTINGS
- Framework Preset: Other
- Root Directory: leave blank unless this repository intentionally stores the app in a subfolder
- Build Command: leave blank
- Output Directory: leave blank
- Install Command: leave blank

After deployment open:
/api/product?barcode=4901515129889
It should show JSON beginning with {"ok":true.
