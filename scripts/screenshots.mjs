// Screenshots de página inteira nos 4 viewports do critério de aceite.
// Uso: BASE=http://localhost:4173 OUT=/caminho node scripts/screenshots.mjs [rota ...]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4173';
const OUT = process.env.OUT || 'screenshots';
const rotas = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const viewports = [
  ['360x640', 360, 640],
  ['390x844', 390, 844],
  ['768x1024', 768, 1024],
  ['1440x900', 1440, 900],
];
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
});
for (const [nome, width, height] of viewports) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const rota of rotas) {
    await page.goto(BASE + rota, { waitUntil: 'networkidle' });
    const slug = rota === '/' ? 'home' : rota.replace(/\W+/g, '-').replace(/^-|-$/g, '');
    await page.screenshot({ path: `${OUT}/${slug}-${nome}.png`, fullPage: true });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    console.log(`${slug} ${nome}: overflow-x=${overflow}`);
  }
  await ctx.close();
}
await browser.close();
