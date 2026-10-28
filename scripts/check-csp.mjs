// Abre as páginas num servidor que aplica os headers do vercel.json (scripts/serve.mjs) e falha em violação de CSP
// ou erro de hidratação. Uso: node scripts/serve.mjs & node scripts/check-csp.mjs
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:4173';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
const problemas = [];
page.on('console', (m) => m.type() === 'error' && problemas.push(`console: ${m.text()}`));
page.on('pageerror', (e) => problemas.push(`pageerror: ${e.message}`));
await page.addInitScript(() =>
  document.addEventListener('securitypolicyviolation', (e) =>
    console.error(`CSP: ${e.violatedDirective} bloqueou ${e.blockedURI}`),
  ),
);
for (const rota of ['/', '/portfolio/cozinha', '/sobre', '/privacidade', '/nao-existe']) {
  await page.goto(BASE + rota, { waitUntil: 'networkidle' });
}
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Ver o mapa aqui' }).click();
await page.waitForSelector('iframe');
await page.getByRole('button', { name: 'Closet', exact: true }).click();
await page.waitForTimeout(800);
await browser.close();
const csps = problemas.filter((p) => !/Failed to load resource.*404/.test(p));
console.log(problemas.length ? problemas.join('\n') : 'sem erros de console nem violações de CSP');
process.exit(csps.length ? 1 : 0);
