import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export function NotFound() {
  return (
    <section className="section">
      <Seo
        title="Página não encontrada | Marcenaria Damadi"
        description="Esta página não existe. Volte ao início ou fale com a gente pelo WhatsApp."
        path="/404"
        noindex
      />
      <div className="wrap max-w-2xl">
        <h1 className="t-h1">Essa página não está aqui</h1>
        <p className="t-lead mt-4 text-ink-600">
          O endereço pode ter mudado. Volte ao início ou fale direto com a gente.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary">
            Voltar ao início
          </Link>
          <WhatsAppButton origem="ambiente" variante="wa">
            Chamar no WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

export { NotFound as Component };
