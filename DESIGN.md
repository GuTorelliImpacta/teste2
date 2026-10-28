# Design: "Oficina Contemporânea"

Calor de madeira + precisão geométrica da marca. Um ateliê organizado: acolhedor, confiável, sem frescura.

## Identidade
- **Losango** a 45° (marca) vira máscara (`clip-path`), marcador de lista, número de passo e ícone do mapa.
- **Ripado**: ripas verticais em CSS (`.ripado`, `repeating-linear-gradient`, opacidade 7%). Zero imagem.
- **Colmeia** dos flyers: padrão hexagonal em SVG inline (`.colmeia`, 5% de opacidade).
- **Filetes** finos `khaki` herdam o "—— MARCENARIA ——" do logo (header, rodapé, listas).
- Raio de borda 10 px (`--radius-brand`) + cortes angulares pontuais.
- **Logo**: wordmark provisório em SVG (`components/Logo.tsx`), fiel à estrutura da marca (losango, DAMADI geométrico, "junior" em itálico, MARCENARIA espaçado). Os arquivos de `assets-cliente/` não foram entregues. Pedir o logo em vetor (ver `content/PENDENCIAS.md`).

## Tokens (Tailwind 4, `@theme` em `src/styles/index.css`)
Escalas 50–900 geradas por `node scripts/contrast.mjs` a partir das cores-base.

| Token | Base (500) | Uso |
|---|---|---|
| `cream` | #F4F4EC | fundo principal |
| `olive` | #8B8B5E | seções de destaque (usar 700/800 para fundo com texto creme) |
| `copper` | #B8651B | losango e acentos; CTA usa `copper-600` #9C5517 |
| `khaki` | #C2B280 | filetes, detalhes, chips |
| `ink` | #5B4A3E (900 = #241A14) | texto, rodapé, contato |
| `wa` | #128C4A | botão WhatsApp usa `wa-600` #0F783F |

### Contraste (WCAG AA, calculado por `scripts/contrast.mjs`)
| Par | Razão |
|---|---|
| ink-900 sobre cream-500 | 15,4:1 |
| branco sobre copper-600 (CTA) | 5,6:1 |
| branco sobre wa-600 (WhatsApp) | 5,6:1 |
| cream sobre olive-700 | 6,1:1 |
| cream sobre olive-800 | 9,0:1 |
| khaki-300 sobre olive-800 | 7,1:1 |
| copper-700 sobre cream (links) | 7,0:1 |
| ink-600 sobre cream (texto de apoio) | 8,9:1 |

Ajustes feitos por falha de contraste: o cobre base (4,3:1 com branco) e o verde WhatsApp base (4,3:1) **não** são usados como fundo de botão; usam-se `copper-600` e `wa-600`. O oliva base (3,1:1 com creme) só aparece como decoração; fundos de seção usam `olive-700/800`.

## Superfícies
`cream` → `olive-800` (faixa de confiança) → `cream` → `olive-700` (processo) → `cream` → `copper-700` (espaço pequeno) → `khaki-100` (FAQ) → `ink-900` (contato e rodapé).

## Tipografia
- Títulos: **Sora** (variável, 600–800). Corpo: **Inter** (variável). Self-host WOFF2 latin em `public/fonts/`, `font-display: swap`, fallbacks Arial com `size-adjust`/`ascent-override` para evitar CLS. Preload só da Sora.
- Escala fluida com `clamp()`: H1 32→56 px, H2 28→44 px, corpo 17 px, entrelinha 1,55.

## Componentes
- `Button`/`.btn`: altura ≥ 48 px, 3 variantes (`primary` cobre, `wa` verde, `outline`). Foco com anel cobre de 3 px.
- `Galeria`: grid bento em CSS Grid, chips com `aria-pressed`, lightbox em `<dialog>` nativo.
- `StickyCTA`: só mobile, aparece depois do hero, some quando o contato está na tela, respeita `safe-area-inset-bottom`.
- `Faq`: `<details>/<summary>` (sem JS).
- Header mobile: `<details>` (menu funciona sem JS).

## Movimento
Transições de 150–400 ms. Reveal das seções por **CSS scroll-driven** (`animation-timeline: view()`), sem JS, só quando suportado e fora de `prefers-reduced-motion`; sem suporte, o conteúdo fica visível. Hover de cards só com `transform`.

## Texto
Orçamento de palavras da seção 6 do briefing respeitado: H1 com 7 palavras, subtítulo com 15, respostas de FAQ ≤ 40 palavras, legendas ≤ 12.
