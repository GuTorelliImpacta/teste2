export type Pergunta = {
  pergunta: string;
  /** ≤ 40 palavras */
  resposta: string;
  /** true = resposta genérica até o cliente confirmar o dado real (ver content/PENDENCIAS.md) */
  pendente?: boolean;
};

export const faq: Pergunta[] = [
  {
    pergunta: 'Como peço um orçamento?',
    resposta:
      'Clique em “Pedir orçamento” e fale com a gente no WhatsApp. Mande fotos e as medidas do espaço. Respondemos em horário comercial, de segunda a sexta.',
  },
  {
    pergunta: 'O que preciso enviar?',
    resposta:
      'Fotos do ambiente, medidas aproximadas e referências do que você imagina. Se tiver planta ou projeto de arquiteto, envie também. Com isso já conseguimos orientar os próximos passos.',
  },
  {
    pergunta: 'Qual é o prazo de entrega?',
    resposta:
      'O prazo depende do projeto e é combinado antes de fechar o serviço. Nosso compromisso é entregar dentro do que foi combinado.',
    pendente: true,
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Trabalhamos com condições especiais de pagamento. Os detalhes são apresentados junto com o orçamento.',
    pendente: true,
  },
  {
    pergunta: 'Vocês atendem a minha região?',
    resposta:
      'Estamos no Tremembé, na zona norte de São Paulo. Para saber se atendemos o seu endereço, é só mandar o bairro pelo WhatsApp.',
    pendente: true,
  },
  {
    pergunta: 'Posso levar o projeto do meu arquiteto?',
    resposta:
      'Se você já tem projeto ou referências, envie pelo WhatsApp para a gente avaliar e adaptar à medida do espaço.',
    pendente: true,
  },
  {
    pergunta: 'Os móveis têm garantia?',
    resposta: 'Os termos de garantia são combinados junto com o orçamento. Pergunte pelo WhatsApp.',
    pendente: true,
  },
];
