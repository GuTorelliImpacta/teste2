import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { WhatsAppButton } from './WhatsAppButton';
import { IconClose, IconMenu } from './Icons';

const links = [
  { href: '/#projetos', rotulo: 'Projetos' },
  { href: '/#como-funciona', rotulo: 'Como funciona' },
  { href: '/#por-que-damadi', rotulo: 'Por que a Damadi' },
  { href: '/#faq', rotulo: 'Dúvidas' },
  { href: '/#contato', rotulo: 'Contato' },
];

export function Header() {
  const menu = useRef<HTMLDetailsElement>(null);
  const fechar = () => menu.current?.removeAttribute('open');
  return (
    <header className="sticky top-0 z-40 bg-cream-500">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Damadi junior marcenaria, início" className="shrink-0">
          <Logo className="h-9 w-auto md:h-10" />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded py-2 text-[0.95rem] font-medium text-ink-700 hover:text-copper-700"
                >
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <WhatsAppButton origem="header" className="btn-sm" icone={false}>
            Orçamento
          </WhatsAppButton>
          <details ref={menu} className="group relative lg:hidden">
            <summary
              className="grid size-12 cursor-pointer place-items-center rounded-[var(--radius-brand)] text-ink-900 hover:bg-cream-600/50"
              aria-label="Menu"
            >
              <IconMenu className="group-open:hidden" width={26} height={26} />
              <IconClose className="hidden group-open:block" width={26} height={26} />
            </summary>
            <nav
              aria-label="Menu principal"
              className="absolute right-0 top-14 w-[min(18rem,calc(100vw-2rem))] rounded-[var(--radius-brand)] bg-ink-900 p-2 text-cream-500 shadow-xl on-dark"
            >
              <ul>
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={fechar}
                      className="flex min-h-12 items-center rounded-lg px-4 font-display font-semibold hover:bg-ink-700"
                    >
                      {l.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
      <hr className="filete-solo" />
    </header>
  );
}
