# Pendências (dados a confirmar com o cliente)

Nada abaixo foi inventado. Onde faltava o dado, o site usa texto neutro ou omite o campo.

## Bloqueiam a publicação (`npm run build:prod` falha)
- [ ] **12–24 fotos reais** de projetos (3–6 por ambiente: cozinha, guarda-roupa, closet, home office, sala/painéis, espaços pequenos), em arquivo original, luz natural. Hoje a galeria e as páginas de ambiente mostram `TODO foto real`.
- [ ] **Foto do hero** (`site.heroImagem`).
- [ ] Confirmar que as 3 fotos do perfil do Google (logo sobre painel, guarda-roupa de correr, cozinha com cooktop e forno) são projetos dele e enviar os originais.

## Dados do negócio
- [ ] **CNPJ e razão social** (é "Damadi Móveis e Decorações" ou outro?). Rodapé e privacidade omitem até serem preenchidos em `src/data/site.ts`.
- [ ] **Logo em vetor** (SVG/AI/PDF). Hoje há um wordmark provisório em SVG.
- [ ] **Domínio** `marcenariadamadi.com.br`: existe? Quem registrou? Há site antigo? Acesso ao registro.br/DNS.
- [ ] **Prazos reais** em semanas (`site.prazo`). Hoje: "Prazo combinado em contrato, sem surpresa".
- [ ] **Formas de pagamento** reais (FAQ "pagamento" está genérico).
- [ ] **Garantia** (FAQ "garantia" está genérico).
- [ ] **Região atendida** e se atende sábado por agendamento.
- [ ] Significado do campo **"Entrega 09:00–17:00"** do Google.
- [ ] **Avaliações reais autorizadas** (texto e nome) e o **link do perfil no Google**. Hoje há só o selo 5,0 / 6 avaliações apontando para a busca no Maps.
- [ ] **Coordenadas** do perfil no Maps (para `geo` no JSON-LD).
- [ ] Autorização para usar o nome **"Junior"** na copy ("Falar com o Junior").
- [ ] **Posicionamento**: custo-benefício (adotado) ou alto padrão.
- [ ] Se atende projetos de arquiteto (FAQ genérico hoje).

## FAQ com resposta genérica (`pendente: true` em `src/data/faq.ts`)
Prazo, pagamento, região, projeto de arquiteto, garantia.
