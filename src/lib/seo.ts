import { site, enderecoLinha } from '@/data/site';
import type { Pergunta } from '@/data/faq';

export const absoluta = (path: string) => `${site.url}${path}`;

/**
 * NAP idêntico ao do Google Business Profile. `geo` e `aggregateRating` ficam de fora de propósito:
 * geo exige coordenadas do Maps (não inventar) e nota própria no site não é elegível a rich result.
 */
export const jsonLdNegocio = () => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${site.url}/#negocio`,
  name: site.nome,
  url: site.url,
  image: `${site.url}/og-image.jpg`,
  telephone: site.telefoneJsonLd,
  description:
    'Marcenaria em Tremembé, zona norte de São Paulo. Móveis planejados sob medida: cozinhas, guarda-roupas, closets, home offices e painéis.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: site.horario.abre,
      closes: site.horario.fecha,
    },
  ],
  sameAs: [site.instagram],
  ...(site.cnpj ? { taxID: site.cnpj } : {}),
});

export const jsonLdFaq = (perguntas: Pergunta[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: perguntas.map((p) => ({
    '@type': 'Question',
    name: p.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: p.resposta },
  })),
});

export const jsonLdMigalhas = (itens: { nome: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: itens.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.nome,
    item: absoluta(it.path),
  })),
});

export { enderecoLinha };
