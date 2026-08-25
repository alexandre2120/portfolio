# Alexandre Jaques — Portfolio (alexandrejaques.com)

Atualizado a 25/08/2026. Se algo aqui contradisser o código, o código vence:
corrige este ficheiro na mesma sessão.

## O que é

Portfólio pessoal do **Alexandre Jaques**, posicionado como
**AI Integration Engineer** (pipelines de LLM, integrações de API, automação
de workflows). Next.js na Vercel, repo `alexandre2120/portfolio`.

Serve o redesign **"Chaos In / System Out"** (PR #7, merged 24/08/2026):
tipografia Anton + General Sans, paleta de papel, secções por maturidade.

## Onde vive o conteúdo (importante)

**Toda a copy da home está em `src/content/portfolio.ts`**, num objeto `en` e
num objeto `pt` que cumprem o tipo `PortfolioCopy`. Editar conteúdo é editar
esse ficheiro, e mais nada. O componente que o consome é
`src/components/portfolio/PortfolioHome.tsx`.

`src/content/en.json` e `pt.json` são do i18n genérico e **não alimentam a
home**. A pasta `src/components/sections/` foi apagada a 25/08/2026: era o
layout pré-redesign, já não era importada por ninguém.

## Estrutura da home

| Secção | id | Fonte |
|---|---|---|
| Hero, sistema e fold menu | `#top` | `copy.hero` |
| 01 Produção (3 case studies + entregues) | `#work` | `copy.production` |
| 02 MVPs no ar | `#mvps` | `copy.mvps` |
| 03 Conceitos | `#concepts` | `copy.concepts` |
| A Oficina | `#a-oficina` | `copy.oficina` |
| Sobre, método e carreira | `#about` | `copy.about` |
| Lab e offline | `#lab` | `copy.lab` |
| Testemunhos e contacto | `#contact` | `copy.testimonials`, `copy.contact` |

Página separada: `/projects/mensagemz`, o case study de arquitetura do Mensagi
(`src/components/case-studies/MensagemzCaseStudy.tsx`). **Está ligada a partir
do case study 01 da home** através dos campos `secondaryHref`/`secondaryLabel`.
Se mexeres nisso, confirma que não volta a ficar órfã.

## O que está listado hoje

Produção: Mensagi (SaaS no ar, sociedade), busca semântica no histórico de
suporte (ChatGuru), entregas de integração CRM/ERP. Entregues: Disparador,
Mundo Criativo, loja e-commerce de cliente (anonimizada), ChatGuru Import Tool,
The Skin Aesthetic. MVP: Orçamentista. Conceitos: Padel App, Daillo.

Removidos a 25/08/2026 por decisão do Alexandre: JIPPfy e BunnieMonki
(marketplace e agência).

## Regras de conteúdo (não negociáveis)

* Título: **AI Integration Engineer**. React/Next é skill secundária.
  **Nunca mencionar Flutter.**
* Métrica de automação: **sempre 60%** de redução de trabalho manual.
* Inglês: "full professional proficiency". Nunca "B2", nunca Duolingo.
* Carreira: ChatGuru contínua Out/2019 a Nov/2025 com progressão interna
  (CS Analyst → CS Manager → Head of Operations → Director); IntegraNinja como
  consultoria part-time em paralelo (Jul/2021 a Jan/2025).
* Disponibilidade: full-time imediata. Nunca "selective freelance".
* **Nunca usar travessão (em dash)** em texto em nome do Alexandre. Usar
  vírgulas, dois pontos ou parênteses.
* Fronteiras: projetos de sociedade (Mensagi, Disparador) podem ser nomeados;
  clientes diretos aparecem **anonimizados**, sem nome nem link.

## Imagens

`public/images/projects/`. Capturadas com Chrome headless:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars --virtual-time-budget=10000 \
  --window-size=1440,900 --screenshot=saida.png https://url
```

Atenção ao formato: a caixa do case study é panorâmica (cerca de 16:10) e a
caixa do MVP é **vertical** (cerca de 0.72), por isso `orcamentista.png` foi
capturado a 1000x1400. `object-fit: cover` corta o que não couber.

## Workflow

```bash
npm run dev
npm run build
npm run lint
```

Correr `build` e `lint` antes de commitar. O deploy na Vercel é automático
depois do merge no `main`.

## Stack

Next.js 16, React 19, TypeScript strict, Tailwind v4, App Router, CSS Modules
nas secções do redesign, `next-themes` para o tema, i18n por React Context
(EN default, PT no toggle, sem rotas `/en` `/pt`).
