import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { track } from '@/lib/analytics';
import { mensagemGeral, waLink } from '@/lib/whatsapp';
import { IconWhatsApp } from './Icons';

export type OrigemCta =
  'header' | 'hero' | 'galeria' | 'card' | 'sticky' | 'rodape' | 'processo' | 'ambiente';

type Props = {
  origem: OrigemCta;
  mensagem?: string;
  children?: ReactNode;
  className?: string;
  variante?: 'primary' | 'wa' | 'link';
  icone?: boolean;
};

export function WhatsAppButton({
  origem,
  mensagem = mensagemGeral(),
  children = 'Pedir orçamento',
  className,
  variante = 'primary',
  icone = true,
}: Props) {
  return (
    <a
      href={waLink(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('click_whatsapp', { origem })}
      className={clsx(
        variante !== 'link' && 'btn',
        variante === 'primary' && 'btn-primary',
        variante === 'wa' && 'btn-wa',
        className,
      )}
    >
      {icone && <IconWhatsApp />}
      {children}
    </a>
  );
}
