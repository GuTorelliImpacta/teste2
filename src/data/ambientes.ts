export type Ambiente = {
  slug: string;
  nome: string;
  /** Texto usado no WhatsApp: "orçamento de [AMBIENTE]" */
  nomeWhats: string;
  titulo: string;
  /** <title> da página, ≤ 60 caracteres */
  seoTitulo: string;
  descricao: string;
  texto: string[];
};

export const ambientes: Ambiente[] = [
  {
    slug: 'cozinha',
    seoTitulo: 'Cozinha planejada em Tremembé, SP | Marcenaria Damadi',
    nome: 'Cozinha',
    nomeWhats: 'cozinha planejada',
    titulo: 'Cozinha planejada sob medida em Tremembé, SP',
    descricao:
      'Cozinha planejada feita sob medida pela Marcenaria Damadi, na zona norte de São Paulo. Peça seu orçamento pelo WhatsApp.',
    texto: [
      'Na cozinha, cada centímetro conta. O projeto parte da medida real do espaço para posicionar armários, bancada, cooktop, forno e eletrodomésticos do jeito que você usa o dia a dia.',
      'Cozinhas em L, em U, lineares ou com ilha: a gente desenha a que cabe no seu ambiente e conversa com você sobre acabamentos e ferragens antes de produzir.',
      'Mande uma foto e as medidas do espaço no WhatsApp para começar.',
    ],
  },
  {
    slug: 'guarda-roupa',
    seoTitulo: 'Guarda-roupa sob medida na Zona Norte SP | Damadi',
    nome: 'Guarda-roupa e dormitório',
    nomeWhats: 'guarda-roupa ou dormitório',
    titulo: 'Guarda-roupa sob medida e dormitório planejado na zona norte de SP',
    descricao:
      'Guarda-roupa sob medida e dormitório planejado, com portas de abrir ou de correr, pela Marcenaria Damadi em Tremembé, São Paulo.',
    texto: [
      'Um guarda-roupa sob medida ocupa a parede inteira sem sobra e sem vão perdido. Portas de abrir ou de correr, gavetas, prateleiras e cabideiros são distribuídos conforme a sua rotina.',
      'Também fazemos cabeceiras, criados e painéis para o dormitório ficar com uma linguagem só, do chão ao teto.',
      'Conte o que você guarda e mande as medidas do quarto: a gente ajuda a organizar o espaço.',
    ],
  },
  {
    slug: 'closet',
    seoTitulo: 'Closet planejado sob medida em Tremembé | Damadi',
    nome: 'Closet',
    nomeWhats: 'closet',
    titulo: 'Closet planejado sob medida em Tremembé, São Paulo',
    descricao:
      'Closet planejado sob medida pela Marcenaria Damadi, zona norte de São Paulo. Organização completa para roupas, calçados e acessórios.',
    texto: [
      'O closet bem planejado deixa tudo à vista e ao alcance: roupas, calçados, bolsas e acessórios, cada um no seu lugar. O projeto considera a altura de cada peça e a circulação do espaço.',
      'Serve para o quarto grande e também para aquele cantinho que ninguém sabia como aproveitar.',
      'Fale com a gente pelo WhatsApp e envie fotos e medidas do local.',
    ],
  },
  {
    slug: 'home-office',
    seoTitulo: 'Home office planejado em Tremembé, SP | Damadi',
    nome: 'Home office',
    nomeWhats: 'home office',
    titulo: 'Home office planejado sob medida na zona norte de São Paulo',
    descricao:
      'Home office planejado sob medida pela Marcenaria Damadi em Tremembé. Bancada, estantes e nichos pensados para o seu trabalho.',
    texto: [
      'Um bom home office começa pela bancada na altura certa, com espaço para equipamentos, cabos organizados e iluminação bem pensada. A partir disso entram estantes, gavetas e nichos.',
      'Dá para encaixar o escritório em um canto da sala, no quarto ou em um espaço pequeno, sem abrir mão de conforto e organização.',
      'Mande as medidas e fotos do local pelo WhatsApp.',
    ],
  },
  {
    slug: 'sala-paineis',
    seoTitulo: 'Painel ripado e móveis de sala em SP | Damadi',
    nome: 'Sala e painéis ripados',
    nomeWhats: 'sala ou painel ripado',
    titulo: 'Painel ripado e móveis para sala sob medida em Tremembé, SP',
    descricao:
      'Painéis ripados, racks e estantes sob medida para sala, pela Marcenaria Damadi, na zona norte de São Paulo. Peça seu orçamento.',
    texto: [
      'O painel ripado traz madeira, textura e calor para a sala. Pode receber a TV, nichos e iluminação, e ainda esconder fios e equipamentos.',
      'Racks, estantes e aparadores sob medida completam o ambiente e aproveitam bem cada parede.',
      'Envie uma foto da parede e as medidas para a gente começar a conversa.',
    ],
  },
  {
    slug: 'espacos-pequenos',
    seoTitulo: 'Móveis para espaços pequenos em SP | Damadi',
    nome: 'Espaços pequenos',
    nomeWhats: 'espaço pequeno',
    titulo: 'Móveis planejados para espaços pequenos em Tremembé, SP',
    descricao:
      'Móveis planejados para apartamentos e espaços pequenos, aproveitando cada centímetro. Marcenaria Damadi, zona norte de São Paulo.',
    texto: [
      'Pouco espaço pede projeto, não improviso. Móveis planejados aproveitam até os espaços mínimos: nichos, vãos, cantos e alturas que o móvel de loja não alcança.',
      'O objetivo é ganhar área de circulação e guardar mais, sem deixar o ambiente pesado.',
      'Mande as medidas e fotos do espaço pelo WhatsApp e veja o que dá para fazer.',
    ],
  },
];

export const ambientePorSlug = (slug: string | undefined) => ambientes.find((a) => a.slug === slug);
