import type { ImagemGerada } from '@/lib/imagens';

export type Projeto = {
  id: string;
  titulo: string;
  ambiente: string; // slug de ambientes.ts
  /** ≤ 12 palavras, só fatos reais do projeto. */
  legenda: string;
  /** Chave gerada por `npm run images` (arquivo em assets-cliente/projetos/<ambiente>/). */
  imagem: string;
  alt: string;
};

/**
 * Lista de projetos reais. Para adicionar um: coloque a foto em assets-cliente/projetos/<ambiente>/,
 * rode `npm run images` e acrescente um item aqui (veja o README).
 * Enquanto estiver vazia, a galeria mostra espaços "TODO foto real" e o build de produção é bloqueado.
 */
export const projetos: Projeto[] = [];

export type { ImagemGerada };
