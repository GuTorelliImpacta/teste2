/** Dados do negócio. Tudo que muda sem tocar em componente mora aqui. */
export const site = {
  nome: 'Marcenaria Damadi Junior',
  nomeCurto: 'Damadi',
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://marcenariadamadi.com.br',
  telefone: '+5511946221978',
  telefoneExibicao: '(11) 94622-1978',
  telefoneJsonLd: '+55 11 94622-1978',
  instagram: 'https://www.instagram.com/marcenariadamadi',
  instagramUsuario: '@marcenariadamadi',
  endereco: {
    rua: 'Rua Carmésia, 42',
    bairro: 'Tremembé',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '02350-060',
  },
  /** Abre a busca do endereço no Google Maps (sem inventar coordenadas). */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Carm%C3%A9sia+42+Trememb%C3%A9+S%C3%A3o+Paulo+SP+02350-060',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Rua+Carm%C3%A9sia+42+Trememb%C3%A9+S%C3%A3o+Paulo+SP&output=embed',
  /** Horário de atendimento: segunda a sexta. */
  horario: { dias: [1, 2, 3, 4, 5], abre: '08:30', fecha: '18:00' },
  horarioTexto: 'Seg–sex, 8h30–18h',
  nota: { valor: '5,0', avaliacoes: 6 },
  anosExperiencia: '20',
  /** Vazio = "Prazo combinado em contrato, sem surpresa". Preencher com o prazo real (ex.: "30 a 45 dias"). */
  prazo: '',
  /** Vazios = não exibidos. Ver content/PENDENCIAS.md. */
  cnpj: '',
  razaoSocial: '',
  /** Primeira foto real do hero: chave gerada por `npm run images` (ex.: 'hero-cozinha'). Vazio = bloco tipográfico. */
  heroImagem: '',
} as const;

export const enderecoLinha = `${site.endereco.rua} – ${site.endereco.bairro}, ${site.endereco.cidade} – ${site.endereco.uf}, ${site.endereco.cep}`;
