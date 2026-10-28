import { useState } from 'react';
import { site, enderecoLinha } from '@/data/site';
import { track } from '@/lib/analytics';
import { telLink } from '@/lib/whatsapp';
import { WhatsAppButton } from './WhatsAppButton';
import { StatusHorario } from './StatusHorario';
import { IconInstagram, IconPhone, IconPin } from './Icons';

export function Contato() {
  const [mapa, setMapa] = useState(false);
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="ripado on-dark bg-ink-900 py-20 text-cream-500 lg:py-28"
    >
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="contato-titulo" className="t-h2 max-w-[16ch]">
            Vamos começar pela medição
          </h2>
          <p className="t-lead mt-4 max-w-[36ch] text-cream-300">
            Mande uma foto e as medidas do espaço. Respondemos em horário comercial (seg–sex,
            8h30–18h).
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton origem="rodape" variante="wa">
              Chamar no WhatsApp
            </WhatsAppButton>
            <a href={telLink} onClick={() => track('click_ligar')} className="btn btn-outline">
              <IconPhone /> Ligar {site.telefoneExibicao}
            </a>
          </div>
          <StatusHorario className="mt-5 text-cream-300" />
        </div>

        <div className="space-y-6">
          <address className="not-italic">
            <p className="flex items-start gap-3">
              <IconPin className="mt-1 shrink-0 text-copper-400" />
              <span>{enderecoLinha}</span>
            </p>
            <p className="mt-2 pl-8 text-cream-300">Segunda a sexta, das 8h30 às 18h.</p>
          </address>
          <div className="flex flex-wrap gap-3">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('click_maps', { origem: 'contato' })}
              className="btn btn-outline btn-sm"
            >
              <IconPin width={18} height={18} /> Como chegar
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('click_instagram')}
              className="btn btn-outline btn-sm"
            >
              <IconInstagram width={18} height={18} /> {site.instagramUsuario}
            </a>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-brand)] bg-ink-800">
            {mapa ? (
              <iframe
                title="Mapa: Marcenaria Damadi, Tremembé"
                src={site.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="aspect-[4/3] w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setMapa(true)}
                className="colmeia relative isolate grid aspect-[4/3] w-full place-items-center text-center hover:bg-ink-700"
              >
                <span className="flex flex-col items-center gap-3">
                  <span className="losango-clip grid size-16 place-items-center bg-copper-500">
                    <IconPin className="text-white" />
                  </span>
                  <span className="font-display font-semibold">Ver o mapa aqui</span>
                  <span className="max-w-[28ch] text-sm text-cream-300">
                    Carrega o Google Maps só quando você pedir.
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
