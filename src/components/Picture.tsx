import { imagem } from '@/lib/imagens';
import { clsx } from 'clsx';

type Props = {
  chave: string;
  alt: string;
  sizes: string;
  /** Imagem do LCP: sem lazy, com fetchpriority alta. */
  prioridade?: boolean;
  className?: string;
  imgClassName?: string;
};

const srcSet = (f: { w: number; url: string }[]) => f.map((s) => `${s.url} ${s.w}w`).join(', ');

export function Picture({ chave, alt, sizes, prioridade, className, imgClassName }: Props) {
  const img = imagem(chave);
  if (!img) return null;
  const fallback = img.jpeg[Math.min(1, img.jpeg.length - 1)];
  return (
    <picture className={clsx('block', `cor-${chave}`, className)}>
      <source type="image/avif" srcSet={srcSet(img.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(img.webp)} sizes={sizes} />
      <img
        src={fallback?.url}
        srcSet={srcSet(img.jpeg)}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={alt}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding={prioridade ? 'sync' : 'async'}
        fetchPriority={prioridade ? 'high' : 'auto'}
        className={clsx('h-full w-full object-cover', imgClassName)}
      />
    </picture>
  );
}
