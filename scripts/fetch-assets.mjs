// One-off import of the site images from the previous devoxx.gr site.
// scripts/assets.txt lists "<new path>\t<old path>" per line.
// Usage: npm run fetch-assets   (skips files that already exist in public/)
import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = process.env.ASSET_ORIGIN || 'https://devoxx.gr';
const list = (await readFile(join(root, 'scripts/assets.txt'), 'utf8')).split('\n').filter(Boolean);

let fetched = 0, skipped = 0, failed = 0;
for (const line of list) {
  const [path, source] = line.split('\t');
  const target = join(root, 'public', path);
  try { await access(target); skipped++; continue; } catch {}
  try {
    const res = await fetch(/^https?:/.test(source) ? source : origin + encodeURI(source));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await res.arrayBuffer()));
    fetched++;
  } catch (err) {
    failed++;
    console.warn(`could not fetch ${path}: ${err.message}`);
  }
}
console.log(`assets: ${fetched} fetched, ${skipped} already present, ${failed} failed`);
