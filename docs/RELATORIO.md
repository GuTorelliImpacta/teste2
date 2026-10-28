# Relatório de auditoria

Medido em 28/10/2026 no build de produção, servido por `scripts/serve.mjs` (headers do `vercel.json`, Brotli, `cleanUrls`), com Lighthouse 12 (mobile = Slow 4G + CPU 4x simulados).

## Lighthouse
| Página | Perfil | Perf | A11y | Boas práticas | SEO | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|---|---|---|
| Home | mobile | 100 | 100 | 100 | 100 | 1,5 s | 0 | 60 ms | 177 KiB |
| Home | desktop | 99 | 100 | 100 | 100 | 0,8 s | 0 | 0 ms | 177 KiB |
| /portfolio/cozinha | mobile | 100 | 100 | 100 | 100 | 1,1 s | 0 | 60 ms | 173 KiB |
| /portfolio/cozinha | desktop | 100 | 100 | 100 | 100 | 0,6 s | 0 | 0 ms | 173 KiB |

Observações:
- Medidas **sem fotos reais**. Com fotos, o LCP do hero passa a ser a imagem (AVIF com `fetchpriority="high"`): remedir após enviar as fotos.
- INP não é medido em laboratório; TBT (60 ms) é o indicador de apoio. Medir INP com dados de campo depois do deploy.
- O servidor de teste não é a Vercel. Sem compressão, o mesmo build marcou 73 no mobile (419 KiB); a Vercel serve Brotli.

## Orçamento de bundle (`npm run check:bundle`)
JS inicial da home: **87,3 KB gzip** (limite 100). Total referenciado pela home: 129 KB (limite 800).

## Acessibilidade
`@axe-core/playwright` (WCAG 2.0/2.1/2.2 A e AA): sem violações sérias ou críticas em `/`, `/portfolio/cozinha`, `/sobre`, `/privacidade`. Navegação por teclado: menu, filtros, FAQ, lightbox (`<dialog>`) e links usam elementos nativos. Contraste AA calculado em `DESIGN.md`. Viewports verificados: 360×640, 390×844, 768×1024, 1440×900, sem rolagem horizontal.

## Segurança
- Headers confirmados na resposta: CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP.
- `scripts/check-csp.mjs`: nenhuma violação de CSP nem erro de hidratação em 5 rotas e ao abrir o mapa.
- `npm audit`: **0 críticas e 0 altas**. 3 moderadas em `react-router` 6 (exigido pelo `vite-react-ssg`), sem caminho de exploração neste site; ver `DECISIONS.md`.
- Sem `dangerouslySetInnerHTML`/`eval`/`innerHTML` (lint bloqueia). Sem segredos no repositório.

## Testes
`npm test` (10 unitários: horário no fuso de SP, links de WhatsApp com escape) e `npm run test:e2e` (11 testes: CTAs de WhatsApp com mensagem correta, Ligar/Maps/Instagram, filtro, barra fixa, menu, FAQ, 404 e axe), todos passando.

## Ainda não verificado (depende de deploy ou de dados do cliente)
- securityheaders.com (meta ≥ A) e Rich Results Test: precisam da URL pública. O JSON-LD está no HTML (`HomeAndConstructionBusiness`, `FAQPage`, `BreadcrumbList`).
- Deploy de preview na Vercel: não executado; faltam conta/projeto e as fotos para o `build:prod` passar.
- Domínio `marcenariadamadi.com.br`, CNPJ, logo vetorial, fotos, prazos, pagamento: ver `content/PENDENCIAS.md`.
