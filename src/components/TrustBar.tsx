import { site } from '@/data/site';
import { IconStar } from './Icons';

export function TrustBar() {
  const itens = [
    {
      icone: <IconStar className="text-khaki-400" width={18} height={18} />,
      texto: `${site.nota.valor} no Google`,
    },
    {
      icone: <span className="losango-mark" />,
      texto: `+${site.anosExperiencia} anos de experiência`,
    },
    { icone: <span className="losango-mark" />, texto: 'Entrega no prazo' },
    { icone: <span className="losango-mark" />, texto: 'Condições especiais' },
  ];
  return (
    <section aria-label="Diferenciais" className="bg-olive-800 text-cream-500">
      <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-3 py-5 lg:flex lg:justify-between lg:py-6">
        {itens.map((i) => (
          <li
            key={i.texto}
            className="flex items-center gap-3 font-display text-[0.9375rem] font-semibold"
          >
            {i.icone}
            {i.texto}
          </li>
        ))}
      </ul>
    </section>
  );
}
