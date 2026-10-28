import { site } from '@/data/site';
import { WhatsAppButton } from './WhatsAppButton';
import { mensagemGeral } from '@/lib/whatsapp';

const passos = [
  { titulo: 'Conversa e medição', texto: 'Você conta o que precisa e a gente mede o espaço.' },
  { titulo: 'Projeto', texto: 'Desenhamos o móvel para a sua medida e o seu uso.' },
  { titulo: 'Produção', texto: 'O móvel é feito sob medida na nossa marcenaria.' },
  { titulo: 'Instalação', texto: 'Montagem no seu espaço, dentro do prazo combinado.' },
];

export function Processo() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="processo-titulo"
      className="ripado section bg-olive-700 text-cream-500"
    >
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="processo-titulo" className="t-h2">
            Como funciona
          </h2>
          <p className="t-lead mt-4 max-w-[32ch] text-cream-200">
            {site.prazo ? `Prazo: ${site.prazo}.` : 'Prazo combinado em contrato, sem surpresa.'}
          </p>
          <div className="mt-8 hidden lg:block">
            <WhatsAppButton origem="processo" mensagem={mensagemGeral()}>
              Começar pela medição
            </WhatsAppButton>
          </div>
        </div>
        <ol className="space-y-8">
          {passos.map((p, i) => (
            <li key={p.titulo} className="reveal flex gap-5">
              <span
                className="relative grid size-12 shrink-0 place-items-center"
                aria-hidden="true"
              >
                <span className="losango-clip absolute inset-0 bg-copper-500" />
                <span className="relative font-display text-lg font-bold text-white">{i + 1}</span>
              </span>
              <div>
                <h3 className="text-xl">{p.titulo}</h3>
                <p className="mt-1 max-w-[40ch] text-cream-200">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="lg:hidden">
          <WhatsAppButton origem="processo" mensagem={mensagemGeral()} className="w-full sm:w-auto">
            Começar pela medição
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
