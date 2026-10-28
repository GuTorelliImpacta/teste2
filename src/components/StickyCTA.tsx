import { useEffect, useState } from 'react';
import { telLink } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { WhatsAppButton } from './WhatsAppButton';
import { IconPhone } from './Icons';

/** Barra fixa no mobile: aparece depois do hero e some quando o bloco de contato está na tela. */
export function StickyCTA() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    const contato = document.getElementById('contato');
    if (!hero) return;
    let heroVisivel = true;
    let contatoVisivel = false;
    const atualizar = () => setVisivel(!heroVisivel && !contatoVisivel);
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.target === hero) heroVisivel = e.isIntersecting;
        if (e.target === contato) contatoVisivel = e.isIntersecting;
      }
      atualizar();
    });
    io.observe(hero);
    if (contato) io.observe(contato);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visivel}
      inert={visivel ? undefined : ''}
      className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto] gap-2 bg-cream-500 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-transform duration-300 motion-reduce:transition-none lg:hidden ${visivel ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <WhatsAppButton origem="sticky" variante="wa" className="min-h-14">
        Pedir orçamento
      </WhatsAppButton>
      <a
        href={telLink}
        onClick={() => track('click_ligar', { origem: 'sticky' })}
        className="btn btn-outline min-h-14 px-5"
        aria-label="Ligar para a Damadi"
      >
        <IconPhone />
        Ligar
      </a>
    </div>
  );
}
