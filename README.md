# Finanças

App pessoal de controle financeiro: despesas, receitas, checklist de contas, planejamento de 12 meses, contas fixas, metas e calculadora.

Destaques: lançar falando ou escrevendo ("mercado 89,90"), ler comprovante pela foto (no próprio aparelho), atalhos das categorias mais usadas, "quanto ainda posso gastar" no mês, gráficos, avisos de vencimento com lembrete no calendário, bloqueio com Face ID e tema escuro.

## Como instalar no celular

1. Abra o link do app no navegador (Safari no iPhone, Chrome no Android).
2. iPhone: toque em **Compartilhar → Adicionar à Tela de Início**.
   Android: toque nos **três pontinhos → Instalar app**.
3. O app abre em tela cheia, com ícone próprio, e funciona sem internet.

## Onde ficam os dados

Os dados ficam **somente no aparelho** (armazenamento do navegador). Nada é enviado para este repositório nem para nenhum servidor.

Os comprovantes também ficam só no aparelho e vão junto no backup. Use **Ajustes (engrenagem) → Backup** para exportar um arquivo de tempos em tempos e para importar seus dados em outro aparelho.

A leitura de comprovante baixa o leitor de texto (Tesseract.js, uns 7 MB) na primeira vez que é usada; depois funciona sem internet.

## Arquivos

- `index.html`: o app inteiro
- `manifest.json`: nome, ícone e modo tela cheia
- `sw.js`: permite abrir sem internet
- `icons/`: ícones do app
