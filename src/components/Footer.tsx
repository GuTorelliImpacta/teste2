import { Link } from 'react-router-dom';
import { site, enderecoLinha } from '@/data/site';
import { Logo } from './Logo';

export function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink-900 pb-28 pt-12 text-cream-300 lg:pb-12">
      <div className="wrap">
        <hr className="filete-solo mb-10 opacity-40" />
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo tone="cream" className="h-10 w-auto" />
            <p className="mt-4 max-w-[34ch] text-sm">
              Móveis planejados sob medida em Tremembé, zona norte de São Paulo.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="space-y-1 text-sm">
              {[
                ['/#projetos', 'Projetos'],
                ['/#como-funciona', 'Como funciona'],
                ['/#faq', 'Dúvidas'],
                ['/#contato', 'Contato'],
              ].map(([href, rotulo]) => (
                <li key={href}>
                  <a href={href} className="inline-flex min-h-10 items-center hover:text-cream-50">
                    {rotulo}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/sobre" className="inline-flex min-h-10 items-center hover:text-cream-50">
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className="inline-flex min-h-10 items-center hover:text-cream-50"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </nav>
          <address className="text-sm not-italic">
            <p>{enderecoLinha}</p>
            <p className="mt-2">
              <a href={`tel:${site.telefone}`} className="hover:text-cream-50">
                {site.telefoneExibicao}
              </a>
            </p>
            <p className="mt-2">Seg–sex, 8h30–18h</p>
          </address>
        </div>
        <p className="mt-10 text-xs text-cream-700">
          © {ano} {site.razaoSocial || site.nome}
          {site.cnpj ? ` · CNPJ ${site.cnpj}` : ''}
        </p>
      </div>
    </footer>
  );
}
