// Orçamento de bundle da home: JS inicial ≤ 100 KB gzip, peso total ≤ 800 KB.
import { gzipSync } from 'node:zlib';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const LIMITE_JS_GZIP = 100 * 1024;
const LIMITE_TOTAL = 800 * 1024;
const html = readFileSync('dist/index.html', 'utf8');
const refs = new Set(
  [...html.matchAll(/(?:src|href)="(\/[^"]+\.(?:js|css|woff2|avif|webp|jpe?g|png|svg))"/g)].map(
    (m) => m[1],
  ),
);
let js = 0;
let total = 0;
for (const r of refs) {
  const p = join('dist', r);
  const buf = readFileSync(p);
  const gz = gzipSync(buf).length;
  const transferido = /\.(js|css|svg)$/.test(r) ? gz : statSync(p).size;
  total += transferido;
  if (r.endsWith('.js')) js += gz;
  console.log(`${(transferido / 1024).toFixed(1).padStart(7)} KB  ${r}`);
}
console.log(
  `JS inicial: ${(js / 1024).toFixed(1)} KB gzip (limite 100) · total referenciado: ${(total / 1024).toFixed(1)} KB (limite 800)`,
);
if (js > LIMITE_JS_GZIP || total > LIMITE_TOTAL) {
  console.error('Orçamento de bundle estourado.');
  process.exit(1);
}
