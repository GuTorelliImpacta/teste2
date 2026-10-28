import { Seo } from '@/components/Seo';
import { Contato } from '@/components/Contato';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { site } from '@/data/site';
import { jsonLdMigalhas } from '@/lib/seo';

export function Component() {
  return (
    <>
      <Seo
        title="Sobre | Marcenaria Damadi, marceneiro em Tremembé"
        description="Mais de 20 anos de marcenaria na zona norte de São Paulo. Conheça a Damadi Junior e peça seu orçamento de móveis planejados."
        path="/sobre"
        jsonLd={[
          jsonLdMigalhas([
            { nome: 'Início', path: '/' },
            { nome: 'Sobre', path: '/sobre' },
          ]),
        ]}
      />
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <h1 className="t-h1 max-w-[16ch]">Marcenaria de oficina, no Tremembé</h1>
            <div className="mt-6 max-w-[56ch] space-y-4 text-ink-700">
              <p>
                A Damadi Junior é uma marcenaria na zona norte de São Paulo, com mais de{' '}
                {site.anosExperiencia} anos de experiência em móveis planejados e sob medida.
              </p>
              <p>
                O trabalho começa na conversa e na medição do espaço. Dali sai o projeto, o móvel é
                produzido e instalado, sempre com prazo e condições combinados antes.
              </p>
              <p>
                Cozinhas, guarda-roupas, closets, home offices, painéis ripados e soluções para
                espaços pequenos.
              </p>
            </div>
            <div className="mt-8">
              <WhatsAppButton origem="ambiente">Pedir orçamento</WhatsAppButton>
            </div>
          </div>
          <ul className="space-y-6 self-start rounded-[var(--radius-brand)] bg-khaki-200 p-6">
            {[
              [`+${site.anosExperiencia} anos`, 'de marcenaria'],
              [site.nota.valor, `no Google, com ${site.nota.avaliacoes} avaliações`],
              ['Seg–sex', 'das 8h30 às 18h'],
            ].map(([a, b]) => (
              <li key={a}>
                <p className="font-display text-3xl font-bold">{a}</p>
                <p className="text-ink-700">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Contato />
    </>
  );
}
