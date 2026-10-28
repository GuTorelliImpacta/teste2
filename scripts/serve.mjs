// Servidor estático que imita a Vercel (cleanUrls, 404.html e headers do vercel.json). Uso: node scripts/serve.mjs [porta]
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const porta = Number(process.argv[2] || 4173);
const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const headers = JSON.parse(readFileSync('vercel.json', 'utf8')).headers[0].headers;

const arquivo = (url) => {
  const rel = normalize(decodeURIComponent(url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  for (const c of [rel, rel + '.html', join(rel, 'index.html')]) {
    const p = join('dist', c);
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
};

createServer((req, res) => {
  const p = arquivo(req.url || '/');
  const final = p ?? join('dist', '404.html');
  for (const h of headers) res.setHeader(h.key, h.value);
  res.statusCode = p ? 200 : 404;
  res.setHeader('Content-Type', tipos[extname(final)] || 'application/octet-stream');
  res.end(readFileSync(final));
}).listen(porta, () => console.log(`dist em http://localhost:${porta}`));
