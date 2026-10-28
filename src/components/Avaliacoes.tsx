import { clsx } from 'clsx';
import { site } from '@/data/site';
import { track } from '@/lib/analytics';
import { IconStar } from './Icons';

/** Selo da nota do Google. Nenhum depoimento fictício: textos de clientes só entram com autorização. */
export function Avaliacoes({ className }: { className?: string }) {
  return (
    <a
      href={site.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('click_maps', { origem: 'avaliacoes' })}
      className={clsx(
        'inline-flex items-center gap-4 rounded-[var(--radius-brand)] bg-khaki-200 px-5 py-4 hover:bg-khaki-300',
        className,
      )}
    >
      <span className="font-display text-4xl font-bold leading-none">{site.nota.valor}</span>
      <span className="flex flex-col gap-1">
        <span className="flex text-copper-600" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <IconStar key={i} width={18} height={18} />
          ))}
        </span>
        <span className="text-sm text-ink-700">{site.nota.avaliacoes} avaliações no Google</span>
      </span>
    </a>
  );
}
