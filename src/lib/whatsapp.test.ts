import { describe, expect, it } from 'vitest';
import { mensagemAmbiente, mensagemGeral, mensagemProjeto, telLink, waLink } from './whatsapp';

const texto = (url: string) => decodeURIComponent(new URL(url).searchParams.get('text') ?? '');

describe('whatsapp', () => {
  it('monta o link com o número correto e mensagem codificada', () => {
    const url = waLink(mensagemGeral());
    expect(url.startsWith('https://wa.me/5511946221978?text=')).toBe(true);
    expect(texto(url)).toBe('Olá! Vim pelo site da Damadi e gostaria de um orçamento.');
  });
  it('mensagem por ambiente, com e sem bairro', () => {
    expect(mensagemAmbiente('cozinha planejada')).toBe(
      'Olá! Vim pelo site da Damadi e quero um orçamento de cozinha planejada.',
    );
    expect(mensagemAmbiente('closet', ' Jaçanã ')).toContain('Moro em Jaçanã.');
  });
  it('escapa aspas e caracteres perigosos do título do projeto', () => {
    const url = waLink(mensagemProjeto('Cozinha "L" & cia #1'));
    expect(texto(url)).toBe(
      'Olá! Vi o projeto "Cozinha "L" & cia #1" no site e quero algo parecido.',
    );
    expect(url).not.toContain('&cia');
  });
  it('link de telefone', () => {
    expect(telLink).toBe('tel:+5511946221978');
  });
});
