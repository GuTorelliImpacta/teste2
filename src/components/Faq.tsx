import { faq } from '@/data/faq';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="section bg-khaki-100">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 id="faq-titulo" className="t-h2">
          Dúvidas frequentes
        </h2>
        <div>
          {faq.map((p) => (
            <details key={p.pergunta} className="group border-t border-khaki-500 last:border-b">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 font-display text-lg font-semibold">
                {p.pergunta}
                <span
                  aria-hidden="true"
                  className="losango-mark transition-transform group-open:rotate-[135deg]"
                />
              </summary>
              <p className="max-w-[60ch] pb-5 text-ink-700">{p.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
