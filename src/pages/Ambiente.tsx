import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Picture } from '@/components/Picture';
import { Contato } from '@/components/Contato';
import { ambientePorSlug, ambientes } from '@/data/ambientes';
import { projetos } from '@/data/projetos';
import { jsonLdMigalhas, jsonLdNegocio } from '@/lib/seo';
import { mensagemAmbiente } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { NotFound } from './NotFound';

export function Component() {
  const { ambiente: slug } = useParams();
  const a = ambientePorSlug(slug);
  useEffect(() => {
    if (a) track('view_ambiente', { ambiente: a.slug });
  }, [a]);
  if (!a) return <NotFound />;
  const fotos = projetos.filter((p) => p.ambiente === a.slug);
  const outros = ambientes.filter((o) => o.slug !== a.slug);
  const path = `/portfolio/${a.slug}`;

  return (
    <>
      <Seo
        title={`${a.titulo} | Marcenaria Damadi`}
        description={a.descricao}
        path={path}
        jsonLd={[
          jsonLdNegocio(),
          jsonLdMigalhas([
            { nome: 'Início', path: '/' },
            { nome: a.nome, path },
          ]),
        ]}
      />
      <article className="section">
        <div className="wrap">
          <nav aria-label="Você está em" className="text-sm text-ink-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link to="/" className="underline underline-offset-4">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{a.nome}</li>
            </ol>
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h1 className="t-h1 max-w-[18ch]">{a.titulo}</h1>
              <div className="mt-6 max-w-[56ch] space-y-4 text-ink-700">
                {a.texto.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton origem="ambiente" mensagem={mensagemAmbiente(a.nomeWhats)}>
                  Pedir orçamento
                </WhatsAppButton>
                <Link to="/#projetos" className="btn btn-outline">
                  Ver todos os projetos
                </Link>
              </div>
              <p className="mt-4 text-sm text-ink-600">Mande uma foto e as medidas do espaço.</p>
            </div>
            <div>
              {fotos.length > 0 ? (
                <ul className="grid grid-cols-2 gap-3">
                  {fotos.map((p) => (
                    <li key={p.id} className="overflow-hidden rounded-[var(--radius-brand)]">
                      <Picture
                        chave={p.imagem}
                        alt={p.alt}
                        sizes="(min-width: 1024px) 24vw, 46vw"
                      />
                      <p className="mt-1 text-sm text-ink-600">{p.legenda}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  data-placeholder={a.slug}
                  className="ripado losango-clip relative mx-auto grid aspect-square w-full max-w-md place-items-center bg-ink-900 text-center text-cream-500"
                >
                  <div>
                    <p className="font-display text-xl font-bold">{a.nome}</p>
                    <p className="mt-1 text-xs text-cream-600">TODO foto real</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-xl">Outros ambientes</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {outros.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/portfolio/${o.slug}`}
                    className="inline-flex min-h-12 items-center rounded-full border-2 border-khaki-500 px-4 font-display text-[0.9375rem] font-semibold hover:border-ink-900"
                  >
                    {o.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
      <Contato />
    </>
  );
}
