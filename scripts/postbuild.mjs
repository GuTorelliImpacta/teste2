// Pós-processamento do build estático:
//  1. move scripts inline para arquivos externos (CSP `script-src 'self'` sem 'unsafe-inline')
//  2. gera sitemap.xml e robots.txt com a URL do site
//  3. publica 404.html
import { createHash } from 'node:crypto';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const SITE = (process.env.VITE_SITE_URL || 'https://marcenariadamadi.com.br').replace(/\/$/, '');

const htmls = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) htmls.push(p);
  }
})(DIST);

mkdirSync(join(DIST, 'assets'), { recursive: true });
let externalizados = 0;
for (const file of htmls) {
  let html = readFileSync(file, 'utf8');
  html = html.replace(/<script>([\s\S]*?)<\/script>/g, (_, code) => {
    const hash = createHash('sha256').update(code).digest('hex').slice(0, 10);
    const nome = `boot-${hash}.js`;
    writeFileSync(join(DIST, 'assets', nome), code);
    externalizados++;
    return `<script src="/assets/${nome}"></script>`;
  });
  // O Helmet empurra o <meta charset> para longe do início; o navegador exige que fique nos primeiros 1024 bytes.
  const charset = html.match(/<meta charset="[^"]*"\s*\/?>/i)?.[0];
  if (charset) html = html.replace(charset, '').replace(/<head>/, `<head>${charset}`);
  writeFileSync(file, html);
}

const rotas = htmls
  .map(
    (f) =>
      '/' +
      relative(DIST, f)
        .split(sep)
        .join('/')
        .replace(/index\.html$/, '')
        .replace(/\/$/, ''),
  )
  .filter((r) => !r.startsWith('/404'))
  .map((r) => (r === '/' ? '/' : r))
  .sort();
const hoje = new Date().toISOString().slice(0, 10);
const urls = rotas
  .map((r) => `  <url><loc>${SITE}${r === '/' ? '/' : r}</loc><lastmod>${hoje}</lastmod></url>`)
  .join('\n');
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
);

const nf = join(DIST, '404', 'index.html');
if (existsSync(nf)) {
  cpSync(nf, join(DIST, '404.html'));
  rmSync(join(DIST, '404'), { recursive: true });
}
console.log(
  `[postbuild] ${externalizados} scripts inline externalizados, ${rotas.length} rotas no sitemap, 404.html ${existsSync(join(DIST, '404.html')) ? 'ok' : 'AUSENTE'}`,
);
