import { site } from '@/data/site';
import { Avaliacoes } from './Avaliacoes';
import { WhatsAppButton } from './WhatsAppButton';
import { mensagemAmbiente } from '@/lib/whatsapp';

const itens = [
  {
    titulo: `Mais de ${site.anosExperiencia} anos de marcenaria`,
    texto: 'Experiência de oficina em cada projeto.',
  },
  { titulo: 'Excelente custo-benefício', texto: 'Qualidade de marcenaria com preço justo.' },
  { titulo: 'Condições especiais de pagamento', texto: 'Apresentadas junto com o orçamento.' },
  { titulo: 'Entrega dentro do prazo', texto: 'O prazo é combinado e cumprido.' },
];

export function Diferenciais() {
  return (
    <>
      <section id="por-que-damadi" aria-labelledby="diferenciais-titulo" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="diferenciais-titulo" className="t-h2">
              Por que a Damadi
            </h2>
            <p className="t-lead mt-4 max-w-[34ch] text-ink-600">
              Marcenaria experiente, projeto sob medida, prazo cumprido, preço justo.
            </p>
            <Avaliacoes className="mt-8" />
          </div>
          <ul>
            {itens.map((i) => (
              <li
                key={i.titulo}
                className="reveal flex gap-4 border-t border-khaki-500 py-6 first:border-t-0 first:pt-0"
              >
                <span className="losango-mark mt-3" aria-hidden="true" />
                <div>
                  <h3 className="text-xl lg:text-2xl">{i.titulo}</h3>
                  <p className="mt-1 text-ink-600">{i.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="pequeno-titulo"
        className="ripado colmeia bg-copper-700 py-14 text-white lg:py-20"
      >
        <div className="wrap flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="pequeno-titulo" className="t-h2 max-w-[18ch]">
              Pouco espaço? A gente aproveita cada centímetro.
            </h2>
            <p className="mt-3 max-w-[40ch] text-copper-100">
              Móveis planejados aproveitam até mesmo os espaços mínimos.
            </p>
          </div>
          <WhatsAppButton
            origem="galeria"
            mensagem={mensagemAmbiente('espaço pequeno')}
            className="!bg-ink-900 hover:!bg-ink-800"
          >
            Pedir orçamento
          </WhatsAppButton>
        </div>
      </section>
    </>
  );
}
