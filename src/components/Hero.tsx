import { site } from '@/data/site';
import { Picture } from './Picture';
import { imagem } from '@/lib/imagens';
import { WhatsAppButton } from './WhatsAppButton';
import { StatusHorario } from './StatusHorario';
import { Logo } from './Logo';

export function Hero() {
  const foto = imagem(site.heroImagem) ? site.heroImagem : '';
  return (
    <section
      id="hero"
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-[85svh] overflow-hidden bg-ink-900 text-cream-500 lg:min-h-0 lg:bg-cream-500 lg:text-ink-900"
    >
      {foto ? (
        <Picture
          chave={foto}
          alt="Projeto de móvel planejado da Marcenaria Damadi"
          sizes="100vw"
          prioridade
          className="absolute inset-0 -z-20 lg:hidden"
        />
      ) : (
        <div
          aria-hidden="true"
          className="ripado colmeia absolute inset-0 -z-10 text-cream-500 lg:hidden"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent lg:hidden"
      />
      <div
        aria-hidden="true"
        className="losango-clip absolute -right-28 -top-24 -z-10 size-72 bg-copper-500 lg:hidden"
      />

      <div className="wrap grid w-full items-center gap-10 pb-12 pt-24 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <div className="mt-auto lg:mt-0">
          <h1 id="hero-titulo" className="t-h1 max-w-[14ch] lg:max-w-[16ch]">
            Móveis planejados sob medida para o seu espaço
          </h1>
          <p className="t-lead mt-5 max-w-[34ch] text-cream-200 lg:max-w-[38ch] lg:text-ink-600">
            Mais de {site.anosExperiencia} anos de marcenaria: projeto cuidadoso, prazo combinado e
            condições especiais de pagamento.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton origem="hero" className="sm:min-w-52" />
            <a href="#projetos" className="btn btn-outline">
              Ver projetos
            </a>
          </div>
          <div className="mt-5 space-y-1 text-sm text-cream-300 lg:text-ink-600">
            <p>Mande uma foto e as medidas do espaço.</p>
            <StatusHorario />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="losango-clip relative mx-auto aspect-square w-full max-w-[34rem] bg-ink-900">
            {foto ? (
              <Picture
                chave={foto}
                alt="Projeto de móvel planejado da Marcenaria Damadi"
                sizes="34rem"
                prioridade
                className="absolute inset-0"
              />
            ) : (
              <div
                data-placeholder="hero"
                className="ripado colmeia absolute inset-0 grid place-items-center text-cream-500"
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <Logo tone="cream" className="w-56" />
                  <p className="text-xs text-cream-600">TODO foto real</p>
                </div>
              </div>
            )}
          </div>
          <div
            aria-hidden="true"
            className="losango-clip absolute -bottom-2 right-2 size-24 bg-copper-500"
          />
        </div>
      </div>
    </section>
  );
}
