import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { ambientes, ambientePorSlug } from '@/data/ambientes';
import { projetos, type Projeto } from '@/data/projetos';
import { mensagemAmbiente, mensagemProjeto } from '@/lib/whatsapp';
import { Picture } from './Picture';
import { WhatsAppButton } from './WhatsAppButton';
import { Lightbox } from './Lightbox';
import { Link } from 'react-router-dom';
import { IconArrow } from './Icons';

/** Posições do grid bento (repetem). */
const spans = [
  'col-span-2 row-span-2 lg:col-span-2',
  'col-span-1',
  'col-span-1',
  'col-span-2 lg:col-span-1 lg:row-span-2',
  'col-span-1',
  'col-span-1',
];

export function Galeria() {
  const [filtro, setFiltro] = useState<string>('todos');
  const [aberto, setAberto] = useState<Projeto | null>(null);

  const itens = useMemo(
    () => (filtro === 'todos' ? projetos : projetos.filter((p) => p.ambiente === filtro)),
    [filtro],
  );
  const vazios =
    projetos.length === 0
      ? filtro === 'todos'
        ? ambientes
        : ambientes.filter((a) => a.slug === filtro)
      : [];

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 id="projetos-titulo" className="t-h2">
            Projetos por ambiente
          </h2>
          <p className="t-lead mt-4 text-ink-600">
            Escolha o ambiente e veja o que a gente já resolveu.
          </p>
        </div>

        <div role="group" aria-label="Filtrar por ambiente" className="mt-8 flex flex-wrap gap-2">
          {[{ slug: 'todos', nome: 'Todos' }, ...ambientes].map((a) => (
            <button
              key={a.slug}
              type="button"
              aria-pressed={filtro === a.slug}
              onClick={() => setFiltro(a.slug)}
              className={clsx(
                'min-h-12 rounded-full border-2 px-4 font-display text-[0.9375rem] font-semibold transition-colors',
                filtro === a.slug
                  ? 'border-ink-900 bg-ink-900 text-cream-500'
                  : 'border-khaki-500 text-ink-800 hover:border-ink-900',
              )}
            >
              {a.nome}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid auto-rows-[11rem] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[14rem] lg:grid-cols-4 lg:gap-4">
          {itens.map((p, i) => (
            <li
              key={p.id}
              className={clsx(
                'card-hover group relative overflow-hidden rounded-[var(--radius-brand)] bg-ink-900',
                spans[i % spans.length],
              )}
            >
              <button
                type="button"
                onClick={() => setAberto(p)}
                className="absolute inset-0 z-10"
                aria-label={`Ampliar: ${p.titulo}`}
              />
              <Picture
                chave={p.imagem}
                alt={p.alt}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="h-full"
                imgClassName="zoom-img"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/90 to-transparent p-3 pt-10 text-cream-500">
                <p className="text-sm font-medium">{p.legenda}</p>
                <WhatsAppButton
                  origem="card"
                  variante="link"
                  icone={false}
                  mensagem={mensagemProjeto(p.titulo)}
                  className="relative z-20 mt-1 inline-block py-2 text-sm font-semibold underline underline-offset-4"
                >
                  Quero algo assim
                </WhatsAppButton>
              </div>
            </li>
          ))}
          {vazios.map((a, i) => (
            <li
              key={a.slug}
              data-placeholder={a.slug}
              className={clsx(
                'ripado relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-brand)] bg-ink-900 p-4 text-cream-500',
                spans[i % spans.length],
              )}
            >
              <span className="losango-mark" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg font-bold leading-tight lg:text-xl">
                  {a.nome}
                </h3>
                <p className="mt-1 text-xs text-cream-600">TODO foto real</p>
                <WhatsAppButton
                  origem="card"
                  variante="link"
                  icone={false}
                  mensagem={mensagemAmbiente(a.nomeWhats)}
                  className="mt-1 inline-block py-2 text-sm font-semibold underline underline-offset-4"
                >
                  Quero algo assim
                </WhatsAppButton>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-[var(--radius-brand)] bg-khaki-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-bold">Gostou? Fale sobre o seu ambiente.</p>
          <WhatsAppButton
            origem="galeria"
            mensagem={mensagemAmbiente(
              filtro === 'todos'
                ? 'móveis planejados'
                : (ambientePorSlug(filtro)?.nomeWhats ?? 'móveis planejados'),
            )}
          >
            Pedir orçamento
          </WhatsAppButton>
        </div>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {ambientes.map((a) => (
            <li key={a.slug}>
              <Link
                to={`/portfolio/${a.slug}`}
                className="inline-flex min-h-11 items-center gap-1 font-medium text-copper-700 underline underline-offset-4"
              >
                {a.nome} <IconArrow width={16} height={16} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox projeto={aberto} aoFechar={() => setAberto(null)} />
    </section>
  );
}
