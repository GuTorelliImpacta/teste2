import { site } from '@/data/site';

const BASE = `https://wa.me/${site.telefone.replace('+', '')}`;

export const waLink = (mensagem: string) => `${BASE}?text=${encodeURIComponent(mensagem)}`;

export const mensagemGeral = () => 'Olá! Vim pelo site da Damadi e gostaria de um orçamento.';

export const mensagemAmbiente = (ambiente: string, bairro?: string) => {
  const base = `Olá! Vim pelo site da Damadi e quero um orçamento de ${ambiente}.`;
  const b = bairro?.trim();
  return b ? `${base} Moro em ${b}.` : base;
};

export const mensagemProjeto = (titulo: string) =>
  `Olá! Vi o projeto "${titulo}" no site e quero algo parecido.`;

export const telLink = `tel:${site.telefone}`;
