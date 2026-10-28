import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const NUMERO = '5511946221978';
const decodificar = (href: string) =>
  decodeURIComponent(new URL(href).searchParams.get('text') ?? '');

test('CTAs de WhatsApp abrem com número e mensagem corretos', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('#hero a[href^="https://wa.me/"]');
  const href = (await hero.getAttribute('href'))!;
  expect(href).toContain(`wa.me/${NUMERO}`);
  expect(decodificar(href)).toBe('Olá! Vim pelo site da Damadi e gostaria de um orçamento.');

  const card = page.locator('#projetos li a[href^="https://wa.me/"]').first();
  expect(decodificar((await card.getAttribute('href'))!)).toContain(
    'quero um orçamento de cozinha planejada',
  );
});

test('Ligar, Como chegar e Instagram', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#contato a[href="tel:+5511946221978"]')).toBeVisible();
  await expect(page.locator('#contato a[href*="google.com/maps"]')).toHaveAttribute(
    'rel',
    /noopener/,
  );
  await expect(page.locator('#contato a[href*="instagram.com/marcenariadamadi"]')).toBeVisible();
});

test('filtro de ambientes usa aria-pressed', async ({ page }) => {
  await page.goto('/');
  const chip = page.getByRole('button', { name: 'Closet', exact: true });
  await chip.click();
  await expect(chip).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#projetos [data-placeholder]')).toHaveCount(1);
});

test('barra fixa só aparece no mobile depois do hero', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const barra = page.locator('div[aria-hidden]:has(> a:text("Pedir orçamento"))').last();
  await expect(barra).toHaveAttribute('aria-hidden', 'true');
  await page.locator('#projetos').scrollIntoViewIfNeeded();
  await expect(barra).toHaveAttribute('aria-hidden', 'false');
});

test('menu mobile abre sem JS (details) e navega por teclado', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByLabel('Menu', { exact: true }).click();
  await expect(page.getByRole('navigation', { name: 'Menu principal' })).toBeVisible();
});

test('FAQ abre e fecha com <details>', async ({ page }) => {
  await page.goto('/');
  const item = page.locator('#faq details').first();
  await item.locator('summary').click();
  await expect(item).toHaveAttribute('open', '');
});

test('páginas de ambiente e 404 respondem com h1', async ({ page }) => {
  await page.goto('/portfolio/closet');
  await expect(page.locator('h1')).toContainText('Closet');
  await page.goto('/nao-existe');
  await expect(page.locator('h1')).toBeVisible();
});

for (const rota of ['/', '/portfolio/cozinha', '/sobre', '/privacidade']) {
  test(`axe sem violações sérias em ${rota}`, async ({ page }) => {
    await page.goto(rota);
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze();
    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(
      graves,
      JSON.stringify(
        graves.map((v) => [v.id, v.nodes.map((n) => n.target)]),
        null,
        1,
      ),
    ).toEqual([]);
  });
}
