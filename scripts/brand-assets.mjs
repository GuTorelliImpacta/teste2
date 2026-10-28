// Gera og-image.jpg (1200x630) e apple-touch-icon.png com a marca, sem foto de banco.
// Uso: node scripts/brand-assets.mjs  (requer Chromium do Playwright)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const fonte = (f) =>
  `data:font/woff2;base64,${readFileSync(`public/fonts/${f}`).toString('base64')}`;
const css = `
@font-face{font-family:Sora;src:url(${fonte('sora-latin.woff2')});font-weight:100 800}
@font-face{font-family:Inter;src:url(${fonte('inter-latin.woff2')});font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{background:#241a14;color:#f4f4ec;font-family:Inter}
`;
const og = `<style>${css}
body{width:1200px;height:630px;position:relative;overflow:hidden}
.rip{position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 14px,#f4f4ec 14px 16px);opacity:.07}
.d{position:absolute;right:-120px;top:50%;width:620px;height:620px;background:#b8651b;transform:translateY(-50%) rotate(45deg) scale(.72)}
.d2{position:absolute;right:104px;top:50%;width:300px;height:300px;border:22px solid #f4f4ec;transform:translateY(-50%) rotate(45deg) scale(.7);opacity:.95}
.t{position:absolute;left:72px;top:90px}
h1{font-family:Sora;font-weight:800;font-size:132px;letter-spacing:6px;line-height:1}
.j{font-style:italic;font-weight:300;font-size:44px;color:#ca8c54;margin:6px 0 0 4px}
.m{font-family:Sora;font-weight:500;letter-spacing:12px;font-size:22px;margin:18px 0 0 4px;opacity:.85}
.p{position:absolute;left:72px;bottom:70px;font-family:Sora;font-weight:600;font-size:34px;line-height:1.25;max-width:640px}
.p small{display:block;font-family:Inter;font-weight:400;font-size:24px;margin-top:12px;color:#d1c5a0}
</style><div class="rip"></div><div class="d"></div><div class="d2"></div>
<div class="t"><h1>DAMADI</h1><div class="j">junior</div><div class="m">MARCENARIA</div></div>
<div class="p">Móveis planejados sob medida<small>Tremembé, São Paulo · (11) 94622-1978</small></div>`;
const icon = `<style>${css}body{width:180px;height:180px;background:#f4f4ec;display:grid;place-items:center}</style>
<svg width="180" height="180" viewBox="0 0 64 64"><polygon points="32,2 62,32 32,62 2,32" fill="#b8651b"/><polygon points="32,16 48,32 32,48 16,32" fill="none" stroke="#f4f4ec" stroke-width="5"/></svg>`;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 86 });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(icon);
await page.screenshot({ path: 'public/apple-touch-icon.png', type: 'png' });
await browser.close();
console.log('public/og-image.jpg e public/apple-touch-icon.png gerados.');
