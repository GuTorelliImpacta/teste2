import { Seo } from '@/components/Seo';
import { site } from '@/data/site';

export function Component() {
  return (
    <>
      <Seo
        title="Privacidade | Marcenaria Damadi"
        description="Como o site da Marcenaria Damadi trata dados pessoais, em linguagem simples."
        path="/privacidade"
      />
      <section className="section">
        <div className="wrap max-w-3xl">
          <h1 className="t-h1">Privacidade</h1>
          <div className="mt-8 max-w-[62ch] space-y-8 text-ink-700">
            <div>
              <h2 className="text-xl text-ink-900">O que este site coleta</h2>
              <p className="mt-2">
                Nada que identifique você. O site não tem formulário, não pede cadastro e não usa
                cookies de rastreamento.
              </p>
            </div>
            <div>
              <h2 className="text-xl text-ink-900">Estatísticas de visita</h2>
              <p className="mt-2">
                Se estiver ativa, usamos uma ferramenta de estatísticas sem cookies, que conta
                visitas e cliques em botões de forma anônima, sem identificar pessoas.
              </p>
            </div>
            <div>
              <h2 className="text-xl text-ink-900">WhatsApp, telefone e Instagram</h2>
              <p className="mt-2">
                Ao clicar em “Pedir orçamento”, você sai do site e abre o WhatsApp, serviço de
                terceiro com política própria. A conversa fica entre você e a marcenaria. Usamos seu
                número e as informações que você enviar apenas para responder ao orçamento.
              </p>
            </div>
            <div>
              <h2 className="text-xl text-ink-900">Mapa</h2>
              <p className="mt-2">
                O mapa do Google só é carregado se você clicar em “Ver o mapa aqui”. Até lá, nenhum
                dado vai para o Google.
              </p>
            </div>
            <div>
              <h2 className="text-xl text-ink-900">Seus direitos</h2>
              <p className="mt-2">
                Pela LGPD, você pode pedir acesso, correção ou exclusão dos dados que nos enviou.
                Fale com a gente pelo WhatsApp {site.telefoneExibicao}.
              </p>
            </div>
            <div>
              <h2 className="text-xl text-ink-900">Fotos e depoimentos</h2>
              <p className="mt-2">
                Fotos de ambientes de clientes e depoimentos só são publicados com autorização.
              </p>
            </div>
            <p className="text-sm">
              Responsável: {site.razaoSocial || site.nome}
              {site.cnpj ? ` · CNPJ ${site.cnpj}` : ''}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
