// Gera AVIF + WebP + JPEG em 480/768/1200/1600 a partir de assets-cliente/.
//   assets-cliente/projetos/<ambiente>/*.jpg   -> chave "<ambiente>-<arquivo>"
//   assets-cliente/hero/*.jpg                   -> chave "hero-<arquivo>"
// Saída: public/img/*, src/data/imagens.generated.json, src/styles/imagens.generated.css
// Os originais nunca entram no build.
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, extname, join } from 'node:path';

const RAIZ = 'assets-cliente';
const OUT = 'public/img';
const LARGURAS = [480, 768, 1200, 1600];
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const listar = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => EXT.has(extname(f).toLowerCase()))
        .map((f) => join(dir, f))
    : [];

const fontes = [];
for (const f of listar(join(RAIZ, 'hero')))
  fontes.push({ chave: `hero-${slug(basename(f, extname(f)))}`, arquivo: f });
const projetosDir = join(RAIZ, 'projetos');
if (existsSync(projetosDir))
  for (const amb of readdirSync(projetosDir)) {
    const d = join(projetosDir, amb);
    if (statSync(d).isDirectory())
      for (const f of listar(d))
        fontes.push({ chave: `${slug(amb)}-${slug(basename(f, extname(f)))}`, arquivo: f });
  }

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const manifesto = {};
let css = '/* Gerado por scripts/images.mjs. Não editar. */\n';
for (const { chave, arquivo } of fontes) {
  const buf = readFileSync(arquivo);
  const hash = createHash('sha1').update(buf).digest('hex').slice(0, 8);
  const base = sharp(buf).rotate();
  const meta = await sharp(buf).rotate().metadata();
  const origW = meta.autoOrient?.width ?? meta.width;
  const origH = meta.autoOrient?.height ?? meta.height;
  const larguras = [
    ...new Set(LARGURAS.filter((w) => w < origW).concat(Math.min(origW, LARGURAS.at(-1)))),
  ].sort((a, b) => a - b);
  const entrada = { width: origW, height: origH, avif: [], webp: [], jpeg: [] };
  for (const w of larguras) {
    const redim = base.clone().resize({ width: w, withoutEnlargement: true });
    const h = Math.round((origH * w) / origW);
    for (const [fmt, ext, opts] of [
      ['avif', 'avif', { quality: 55, effort: 4 }],
      ['webp', 'webp', { quality: 75 }],
      ['jpeg', 'jpg', { quality: 78, mozjpeg: true }],
    ]) {
      const nome = `${chave}-${w}-${hash}.${ext}`;
      await redim.clone()[fmt](opts).toFile(join(OUT, nome));
      entrada[fmt].push({ w, url: `/img/${nome}` });
    }
    entrada.width = w === larguras.at(-1) ? w : entrada.width;
    entrada.height = w === larguras.at(-1) ? h : entrada.height;
  }
  const { dominant } = await sharp(buf).stats();
  const cor =
    '#' + [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, '0')).join('');
  css += `.cor-${chave}{background-color:${cor}}\n`;
  manifesto[chave] = entrada;
  console.log(`✓ ${chave} (${larguras.join('/')})`);
}
writeFileSync('src/data/imagens.generated.json', JSON.stringify(manifesto, null, 2) + '\n');
writeFileSync('src/styles/imagens.generated.css', css);
console.log(`${fontes.length} imagem(ns) processada(s).`);
