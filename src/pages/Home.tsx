import { Seo } from '@/components/Seo';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Galeria } from '@/components/Galeria';
import { Processo } from '@/components/Processo';
import { Diferenciais } from '@/components/Diferenciais';
import { Faq } from '@/components/Faq';
import { Contato } from '@/components/Contato';
import { faq } from '@/data/faq';
import { jsonLdFaq, jsonLdNegocio } from '@/lib/seo';

export function Component() {
  return (
    <>
      <Seo
        title="Marcenaria Damadi | Móveis planejados sob medida na Zona Norte de SP – Tremembé"
        description="Móveis planejados sob medida em Tremembé, zona norte de São Paulo. Cozinhas, guarda-roupas, closets e painéis. Mais de 20 anos de marcenaria. Peça orçamento pelo WhatsApp."
        path="/"
        jsonLd={[jsonLdNegocio(), jsonLdFaq(faq)]}
      />
      <Hero />
      <TrustBar />
      <Galeria />
      <Processo />
      <Diferenciais />
      <Faq />
      <Contato />
    </>
  );
}
