import { useEffect, useRef } from 'react';
import { Picture } from './Picture';
import { IconClose } from './Icons';
import type { Projeto } from '@/data/projetos';

export function Lightbox({ projeto, aoFechar }: { projeto: Projeto | null; aoFechar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (projeto && !d.open) d.showModal();
    if (!projeto && d.open) d.close();
  }, [projeto]);
  return (
    // Clique no fundo é atalho de mouse; teclado fecha com Esc e pelo botão "Fechar imagem".
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <dialog
      ref={ref}
      aria-label={projeto ? `Projeto: ${projeto.titulo}` : 'Projeto'}
      onClose={aoFechar}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto max-h-[92svh] w-[min(96vw,64rem)] overflow-hidden rounded-[var(--radius-brand)] bg-ink-900 p-0 text-cream-500 on-dark"
    >
      {projeto && (
        <figure className="relative">
          <Picture
            chave={projeto.imagem}
            alt={projeto.alt}
            sizes="(min-width: 1024px) 1024px, 96vw"
            className="max-h-[80svh]"
            imgClassName="max-h-[80svh] object-contain"
          />
          <figcaption className="p-4 text-sm">{projeto.legenda}</figcaption>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="absolute right-2 top-2 grid size-12 place-items-center rounded-full bg-ink-900/80 text-cream-500 hover:bg-ink-700"
            aria-label="Fechar imagem"
          >
            <IconClose />
          </button>
        </figure>
      )}
    </dialog>
  );
}
