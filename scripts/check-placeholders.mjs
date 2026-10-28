// Bloqueia publicar com placeholder visível, imagem de flyer/banco ou texto TODO.
// Uso: `node scripts/check-placeholders.mjs` (fonte) e `... --dist` (HTML gerado).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const erros = [];
const avisos = [];
const emDist = process.argv.includes('--dist');

const ler = (p) => readFileSync(p, 'utf8');

if (!emDist) {
  const projetosSrc = ler('src/data/projetos.ts');
  if (/export const projetos: Projeto\[\] = \[\s*\]/.test(projetosSrc)) {
    erros.push('src/data/projetos.ts está vazio: faltam projetos com foto real.');
  }
  const site = ler('src/data/site.ts');
  if (/heroImagem:\s*''/.test(site))
    erros.push("site.heroImagem vazio: o hero ainda mostra o bloco 'TODO foto real'.");

  const manifest = JSON.parse(ler('src/data/imagens.generated.json'));
  for (const chave of Object.keys(manifest)) {
    if (/flyer|banco|stock|shutterstock|freepik/i.test(chave))
      erros.push(`Imagem suspeita de flyer/banco no manifesto: ${chave}`);
  }
  for (const m of projetosSrc.matchAll(/imagem:\s*'([^']+)'/g)) {
    if (!manifest[m[1]])
      erros.push(
        `projetos.ts usa a imagem '${m[1]}' que não existe no manifesto (rode npm run images).`,
      );
  }
  const heroChave = site.match(/heroImagem:\s*'([^']+)'/)?.[1];
  if (heroChave && !manifest[heroChave])
    erros.push(`site.heroImagem '${heroChave}' não existe no manifesto.`);

  const faq = ler('src/data/faq.ts');
  const pend = (faq.match(/pendente:\s*true/g) || []).length;
  if (pend)
    avisos.push(
      `${pend} respostas do FAQ ainda genéricas (pendente: true). Ver content/PENDENCIAS.md.`,
    );
  if (/prazo:\s*''/.test(site))
    avisos.push('site.prazo vazio: exibindo "Prazo combinado em contrato".');
  if (/cnpj:\s*''/.test(site))
    avisos.push('CNPJ não informado: omitido do rodapé e da privacidade.');
} else {
  const walk = (d) =>
    readdirSync(d).flatMap((f) => {
      const p = join(d, f);
      return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
    });
  if (!existsSync('dist')) erros.push('dist/ não existe. Rode npm run build primeiro.');
  else
    for (const f of walk('dist')) {
      const html = ler(f);
      if (/data-placeholder/.test(html))
        erros.push(`${f}: placeholder visível (data-placeholder).`);
      if (/TODO/.test(html.replace(/<script[\s\S]*?<\/script>/g, '')))
        erros.push(`${f}: texto "TODO" no HTML.`);
      if (/lorem ipsum/i.test(html)) erros.push(`${f}: lorem ipsum.`);
    }
}

for (const a of avisos) console.warn(`aviso: ${a}`);
if (erros.length) {
  for (const e of erros) console.error(`ERRO: ${e}`);
  console.error(`\ncheck:placeholders falhou (${erros.length}). Build de produção bloqueado.`);
  process.exit(1);
}
console.log('check:placeholders limpo.');
