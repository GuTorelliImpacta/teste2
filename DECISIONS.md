# Decisões

## Stack e renderização
- **Vite + React 18 + `vite-react-ssg` (pré-render estático) em vez de Next.js export.** Funcionou de primeira: 10 rotas viram HTML pronto (home, 6 ambientes, sobre, privacidade, 404), `lazy` por rota e `<Head>` (react-helmet-async) por página. O JSON-LD sai cru no HTML, sem `dangerouslySetInnerHTML`. Next export fica como plano B.
- **React 18 / React Router 6**, porque `vite-react-ssg@0.9` exige `react-router-dom ^6`. Consequência: `npm audit` acusa 3 vulnerabilidades *moderadas* no `react-router` 6 (open redirect em `<Link>/useNavigate` com barra invertida; injeção em `deserializeErrors` na hidratação). O site não tem navegação com URL vinda do usuário nem erros serializados de servidor, então não há caminho de exploração. O CI bloqueia `high` ou superior. Revisar quando o `vite-react-ssg` aceitar Router 7.
- Vite 7 (a 8 ainda não é suportada por todos os plugins) e Tailwind 4 via `@tailwindcss/vite`.
- Dependências de runtime: `react`, `react-dom`, `react-router-dom`, `clsx`. Nada de carrossel, framer-motion, UI kit.

## Posicionamento e conteúdo
- Posicionamento: **"marcenaria experiente, projeto sob medida, prazo cumprido, preço justo"**. Sem "luxo" nem "alto padrão". A copy está em `src/data/*.ts` e nos componentes, e muda em poucos arquivos.
- Nada inventado: sem depoimentos, números de projetos, prazos em dias, preços ou certificações. O que não foi confirmado tem copy neutra e está em `content/PENDENCIAS.md`. Respostas de FAQ nessa condição têm `pendente: true`.
- Nota 5,0 / 6 avaliações aparece como selo com link para o Google Maps. **`aggregateRating` fica fora do JSON-LD**: avaliação "própria" no site não gera rich result e foge da política do Google. `geo` também fica fora (exige coordenadas do Maps; não inventar).
- Horário real: seg–sex 8h30–18h. O indicador "Aberto agora/Fechado" usa o fuso `America/Sao_Paulo` via `Intl`, com texto estático como fallback sem JS (`useSyncExternalStore` com snapshot de servidor).

## Placeholders e bloqueio de publicação
- `assets-cliente/` não foi entregue, então o hero e a galeria usam blocos marcados **`TODO foto real`** (`data-placeholder`). `npm run build:prod` falha enquanto existirem (fonte e HTML gerado). `npm run build` normal continua passando, para desenvolver e para o preview.
- As fotos dos flyers (banco/terceiros) não foram usadas em lugar nenhum. A imagem Open Graph é feita só com a marca (`scripts/brand-assets.mjs`).

## Segurança
- CSP estrita: `script-src 'self'`, `style-src 'self'`. Isso exigiu (1) nenhum `style=""` inline (cor dominante de fotos vai para um CSS gerado, `.cor-<chave>`), (2) desligar o CSS crítico inline do SSG e (3) um pós-build (`scripts/postbuild.mjs`) que **move os 2 scripts inline do SSG** (dados de hidratação e hash do build) **para arquivos externos** `assets/boot-<hash>.js`. Assim não há `unsafe-inline` nem hashes que mudariam a cada build. `scripts/check-csp.mjs` confirma no navegador: zero violações.
- `frame-src https://www.google.com` existe só para o mapa, que carrega apenas sob clique.
- Proibidos por lint: `dangerouslySetInnerHTML`, `eval`, `new Function`, `innerHTML`.
- Links externos com `rel="noopener noreferrer"`; mensagens do WhatsApp com `encodeURIComponent` (testado com aspas e `&`).
- `ignore-scripts`: as dependências instaladas não precisam de `postinstall` próprio além do binário do `sharp`, que o npm resolve por pacote de plataforma. `.npmrc` não desativa scripts para não quebrar o `sharp`/`esbuild`; revisar se algum dia surgir dependência com script novo.

## Performance
- `reveal` por CSS scroll-driven em vez de `IntersectionObserver` (menos JS, sem estado inicial escondido se o JS falhar). O `IntersectionObserver` só existe no `StickyCTA`.
- Menu mobile e FAQ em `<details>`: funcionam sem JS.
- Preload só da fonte Sora. Testado: **tirar** o preload piorou o LCP (2,2 s contra 2,0 s).
- Fontes variáveis em vez de várias instâncias estáticas: 2 arquivos, 82 KB.

## Regras genéricas da skill de design x briefing do cliente
O briefing pede explicitamente filetes finos, ripado em gradiente repetido e colmeia. As regras genéricas da skill `design-taste-frontend` (sem linhas finas, sem gradientes) cedem ao briefing, porque a identidade vem da marca do cliente. Mantidos de fora: monospace, rótulos minúsculos em caixa alta com espaçamento, glassmorphism, sombras em repouso, cards com ícone.

## Deploy e domínio
Vercel (`vercel.json`). O domínio `marcenariadamadi.com.br` **não foi confirmado**: o sandbox não tinha rede para verificar. Se existir um site antigo, planejar redirects 301 antes de trocar o DNS.
