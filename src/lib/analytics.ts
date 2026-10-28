/** Analytics sem cookie (Plausible/Umami). Desligado quando VITE_ANALYTICS_* está vazio. */
export type Evento =
  'click_whatsapp' | 'click_ligar' | 'click_maps' | 'click_instagram' | 'view_ambiente';

type Props = Record<string, string>;

declare global {
  interface Window {
    plausible?: (evento: string, opts?: { props: Props }) => void;
    umami?: { track: (evento: string, props?: Props) => void };
  }
}

export function track(evento: Evento, props: Props = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.plausible?.(evento, { props });
    window.umami?.track(evento, props);
  } catch {
    /* analytics nunca pode quebrar a navegação */
  }
}

export function loadAnalytics() {
  const domain = import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined;
  const src = import.meta.env.VITE_ANALYTICS_SRC as string | undefined;
  if (!domain || !src || document.querySelector('script[data-analytics]')) return;
  const s = document.createElement('script');
  s.defer = true;
  s.src = src;
  s.dataset.domain = domain;
  s.dataset.analytics = 'true';
  document.head.appendChild(s);
}
