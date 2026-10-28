import manifest from '@/data/imagens.generated.json';

export type Fonte = { w: number; url: string };
export type ImagemGerada = {
  width: number;
  height: number;
  cor: string;
  avif: Fonte[];
  webp: Fonte[];
  jpeg: Fonte[];
};

const imagens = manifest as Record<string, ImagemGerada>;

export const imagem = (chave: string | undefined) => (chave ? imagens[chave] : undefined);
