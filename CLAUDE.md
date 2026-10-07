# Alexandre Jaques — Portfolio (alexandrejaques.com)

Atualizado a 25/08/2026. Se algo aqui contradisser o código, o código vence:
corrige este ficheiro na mesma sessão.

## O que é

Portfólio pessoal do **Alexandre Jaques**, posicionado como
**AI Integration Engineer** (pipelines de LLM, integrações de API, automação
de workflows). Next.js, repo `alexandre2120/portfolio`. **Desde 07/10/2026 corre no
Coolify da VPS de produtos** (Dockerfile, `output: "standalone"`); saiu da Vercel porque a
equipa `bunniemonki` foi bloqueada (site em 402).

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

## Página de links (`/links`), criada a 07/10/2026

Linktree próprio na direção visual "Consola" (escuro, mono, ácido da Oficina
Studio, uma cor por produto), aprovada pelo Alexandre entre três amostras.

| O quê | Onde |
|---|---|
| Conteúdo (links, badges, cores, PT/EN) | `src/content/links.ts`. O `id` de cada link é a chave dos números: nunca renomear um id que já tenha cliques |
| Página pública | `src/app/links/page.tsx` → `src/components/links/LinksPage.tsx` (PT por omissão, botão EN) |
| Redirecionamento com registo | `src/app/links/go/[id]/route.ts`: regista o clique e faz 302. Domínios próprios (`OWN_DOMAINS`) recebem `utm_source=alexandrejaques.com`, `utm_medium=link-in-bio`, `utm_campaign=<canal de origem>`, `utm_content=<id>` |
| Visitas e cliques em mailto | `src/app/links/api/e/route.ts` (beacon na mesma origem) |
| Painel privado | `/links/painel` (`LinksPainel.tsx`), pede a palavra-passe da API, noindex. Inclui gerador de UTM |
| Serviço dos números | `links-api` na VPS de produtos, `https://links-api.169.58.162.165.sslip.io`, código em `jobseeker/links-api/` (repo privado `alexandre2120/links-api`) |

Como marcar a origem: partilhar `alexandrejaques.com/links?utm_source=instagram&utm_medium=bio`
(o painel gera estes links) ou, à mão, `alexandrejaques.com/links?s=instagram`.

Só a app com `LINKS_TRACK=1` (a de produção no Coolify) envia eventos. Em local, `LINKS_TRACK=1`
com `LINKS_API_URL` e `NEXT_PUBLIC_LINKS_API_URL` a apontar para uma cópia local
da API (`LINKS_SENHA=teste node servidor.mjs`), nunca para a de produção.

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

Correr `build` e `lint` antes de commitar. O deploy é no Coolify da VPS de
produtos a partir do `main` (ver `jobseeker/links-api/README.md` para o padrão de
deploy pela API do Coolify).

## Stack

Next.js 16, React 19, TypeScript strict, Tailwind v4, App Router, CSS Modules
nas secções do redesign, `next-themes` para o tema, i18n por React Context
(EN default, PT no toggle, sem rotas `/en` `/pt`).
