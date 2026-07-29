import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const output = new URL('./dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const entries = [
  'index.html', 'app.js', 'logic.js', 'styles.css',
  'manifest.webmanifest', 'service-worker.js', '404.html',
  'assets', 'legal'
];

for (const entry of entries) {
  const source = new URL(`./${entry}`, import.meta.url);
  if (existsSync(source)) {
    await cp(source, new URL(`./dist/${entry}`, import.meta.url), { recursive: true });
  }
}

console.log('GENEVIEVE App Food V24 copied to dist successfully.');
