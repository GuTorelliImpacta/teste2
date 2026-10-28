# Site da Marcenaria Damadi Junior

Site institucional + portfólio. Objetivo único: transformar visitante em conversa de orçamento no WhatsApp.
React 18 + TypeScript (strict) + Tailwind 4 + Vite, **pré-renderizado em HTML estático** (`vite-react-ssg`). Sem backend, banco, login ou formulário.

## Rodar

```bash
npm ci
npm run dev          # desenvolvimento
npm run build        # build estático em dist/ (pré-render + pós-processamento)
node scripts/serve.mjs   # serve dist/ como a Vercel (cleanUrls, 404.html, headers de segurança)
```

Outros comandos: `npm run lint`, `npm run typecheck`, `npm test` (unitários), `npm run test:e2e` (CTAs + axe), `npm run check:bundle` (orçamento de JS).

## Publicar

1. Coloque as fotos reais (abaixo) e rode `npm run build:prod`. Ele **falha** enquanto houver placeholder visível, texto `TODO` ou imagem suspeita de flyer/banco (`check:placeholders`).
2. Vercel: importe o repositório. Build `npm run build:prod`, pasta de saída `dist`. Os headers de segurança vêm do `vercel.json`.
3. Variável `VITE_SITE_URL` (ex.: `https://marcenariadamadi.com.br`) define canonical, sitemap, robots e JSON-LD. Veja `.env.example`.
4. Domínio: no painel da Vercel, adicione o domínio e aponte o DNS (registro.br). Só então atualize `VITE_SITE_URL`.
5. Analytics sem cookie (opcional): preencha `VITE_ANALYTICS_DOMAIN` e `VITE_ANALYTICS_SRC` e inclua o domínio do script em `script-src` e `connect-src` no `vercel.json`.
6. Depois do deploy: valide em securityheaders.com e no Rich Results Test, e siga `docs/GOOGLE-BUSINESS-PROFILE.md`.

## Como adicionar um projeto (sem programar)

1. Salve a foto (JPG/PNG, a maior que tiver) em `assets-cliente/projetos/<ambiente>/`. Pastas aceitas: `cozinha`, `guarda-roupa`, `closet`, `home-office`, `sala-paineis`, `espacos-pequenos`. A foto do hero vai em `assets-cliente/hero/`.
2. Rode `npm run images`. Ele gera AVIF/WebP/JPEG em 480/768/1200/1600 px em `public/img/` e imprime a chave de cada foto (ex.: `cozinha-ap-55m2`). O nome do arquivo vira a chave.
3. Em `src/data/projetos.ts`, acrescente um item:

```ts
{
  id: 'cozinha-ap-55m2',
  titulo: 'Cozinha em L em apartamento',
  ambiente: 'cozinha',
  legenda: 'Cozinha em L com cooktop e forno embutidos', // até 12 palavras, só o que é real
  imagem: 'cozinha-ap-55m2',
  alt: 'Cozinha planejada em L com armários de madeira clara',
}
```

4. Para usar uma foto no hero: `heroImagem: 'hero-nome'` em `src/data/site.ts`.
5. `git add public/img src/data` e publique. As pastas `assets-cliente/` (originais) **nunca** vão para o Git nem para o build.

Outros textos editáveis: `src/data/site.ts` (telefone, endereço, horário, prazo, CNPJ), `src/data/faq.ts`, `src/data/ambientes.ts`.

## Estrutura

```
src/components   Header, Hero, TrustBar, Galeria, Lightbox, Processo, Diferenciais, Avaliacoes, Faq, Contato, StickyCTA, Footer, Picture, Seo
src/data         site.ts, projetos.ts, faq.ts, ambientes.ts, imagens.generated.json
src/lib          whatsapp.ts, horario.ts, analytics.ts, seo.ts, imagens.ts (+ testes)
src/pages        Home, Ambiente, Sobre, Privacidade, NotFound
scripts          images, postbuild, check-placeholders, check-bundle, check-csp, serve, brand-assets, screenshots, contrast
content/PENDENCIAS.md   o que falta confirmar com o cliente
docs/            Google Business Profile e relatório de auditoria
DESIGN.md · DECISIONS.md
```

Mais detalhes em `DESIGN.md` (identidade, tokens, contraste) e `DECISIONS.md` (por que cada escolha).
