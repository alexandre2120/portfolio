"use client"

import Link from "next/link"
import { useTranslation, type Locale } from "@/lib/i18n"

type HostKind = "vercel" | "vps" | "managed" | "ext"

type ArchNode = {
  name: string
  desc: string
  host: HostKind
  hostLabel: string
}

type DecisionCard = {
  num: string
  title: string
  body: string
}

type ProcessStep = {
  num: string
  title: string
  body: string
}

type CaseStudyContent = {
  back: string
  kicker: string
  titleA: string
  titleB: string
  lede: string
  meta: Array<{ label: string; value: string }>
  stats: Array<{ value: string; label: string }>
  problem: {
    num: string
    label: string
    title: string
    paragraphs: string[]
    goalLabel: string
    goals: string[]
  }
  process: {
    num: string
    label: string
    title: string
    intro: string
    steps: ProcessStep[]
  }
  architecture: {
    num: string
    label: string
    title: string
    intro: string
    rows: ArchNode[][]
    legend: Array<{ host: HostKind; label: string }>
    footnote: string
  }
  decisions: {
    num: string
    label: string
    title: string
    intro: string
    cards: DecisionCard[]
  }
  aiWorkflow: {
    num: string
    label: string
    title: string
    paragraphs: string[]
    quote: string
  }
  status: {
    num: string
    label: string
    title: string
    body: string
    stack: string[]
    ctaLabel: string
    ctaHref: string
  }
}

const CONTENT: Record<Locale, CaseStudyContent> = {
  en: {
    back: "Back to portfolio",
    kicker: "Case study · Flagship project",
    titleA: "Mensagemz",
    titleB: "AI messaging platform",
    lede: "A multi-tenant SaaS that gives service businesses in Brazil and Portugal one place for WhatsApp conversations, CRM, scheduling, payments and an AI copilot. Designed, specified and engineered end to end by one person, with AI as a force multiplier at every stage.",
    meta: [
      { label: "Role", value: "Founder, solo engineer" },
      { label: "Type", value: "Multi-tenant B2B SaaS" },
      { label: "Timeline", value: "2026, in active development" },
      { label: "Method", value: "Spec-first, AI-assisted" },
    ],
    stats: [
      { value: "5", label: "Deployable apps in one monorepo" },
      { value: "16", label: "Locked architecture decisions (D1 to D16)" },
      { value: "6", label: "Sequenced delivery milestones" },
      { value: "1", label: "Engineer, end to end" },
    ],
    problem: {
      num: "/01",
      label: "The problem",
      title: "Service businesses run on WhatsApp, their tools don't.",
      paragraphs: [
        "In Brazil and Portugal, clinics, salons, studios and independent professionals live inside WhatsApp. Bookings, reminders, payment requests and the entire customer history are scattered across chat threads, paper agendas and spreadsheets.",
        "The existing tooling solves one slice at a time: a chatbot here, a booking page there, a CRM that ignores messaging entirely. Most of it is priced and designed for enterprises, not for a solo professional or a three-person team.",
      ],
      goalLabel: "Design goal",
      goals: [
        "One omnichannel inbox: WhatsApp Cloud API, Instagram DM and WhatsApp Web behind a single abstraction",
        "CRM with contacts, tags, notes, tasks, tickets and pipelines",
        "Scheduling with a public booking page and automated 24h reminders",
        "Payment links and billing through local gateways (Brazil and Portugal)",
        "An AI copilot that drafts replies and summaries, with a human approval queue by default",
      ],
    },
    process: {
      num: "/02",
      label: "The process",
      title: "Spec first, decisions on record, code last.",
      intro: "Before the first line of product code, the whole system existed on paper: a versioned engineering spec, a set of explicit architecture decisions, and a milestone plan sequenced by risk. That discipline is what makes a solo build of this size manageable.",
      steps: [
        {
          num: "01",
          title: "Understand the domain",
          body: "Mapped how service businesses actually operate on WhatsApp in both markets: booking flows, no-show pain, payment habits, channel constraints and the rules of each messaging API.",
        },
        {
          num: "02",
          title: "Write the spec (v1.0)",
          body: "A single versioned document covering the domain model, API surface, multi-tenancy and security model, AI behavior, operational requirements and explicit non-goals for V1.",
        },
        {
          num: "03",
          title: "Lock decisions as ADRs",
          body: "Sixteen recorded decisions (D1 to D16), each with trade-offs. Examples: reminders are deterministic system templates with zero LLM involvement (D6), the milestone order and V1 cuts (D12), the storage bucket strategy (D16).",
        },
        {
          num: "04",
          title: "Sequence by risk and value",
          body: "Milestones ordered M3, M4, M4b, M5, M7, M6: core domain first, then the official WhatsApp Cloud API before the reverse-engineered channel, then billing as an explicit gate before scale features like the public API.",
        },
        {
          num: "05",
          title: "Cut scope deliberately",
          body: "Features that didn't earn their complexity were moved out of V1 and recorded as such: the link shortener module, the AI autopilot mode (approval queue ships first), and the invoicing module.",
        },
        {
          num: "06",
          title: "Build with AI, verify as an engineer",
          body: "Every phase (research, spec writing, architecture, implementation, ops planning) executed solo with AI pair-work, with human review, tests and explicit budgets keeping the output honest.",
        },
      ],
    },
    architecture: {
      num: "/03",
      label: "Architecture",
      title: "What runs where, and why.",
      intro: "A pnpm + Turborepo monorepo with five deployable apps. Only the front end lives on Vercel; the API, workers and Redis run on a VPS via Docker Compose (the same images as local dev); database, auth and storage are managed Postgres (Supabase). Every external dependency sits behind an adapter.",
      rows: [
        [
          {
            name: "Client browser",
            desc: "Tenant app, platform admin, public booking and link pages",
            host: "ext",
            hostLabel: "Users",
          },
        ],
        [
          {
            name: "apps/web · Next.js",
            desc: "UI plus BFF layer: the browser never talks to providers, and this app never holds provider secrets",
            host: "vercel",
            hostLabel: "Vercel",
          },
        ],
        [
          {
            name: "apps/api · Fastify",
            desc: "Core API: auth, RBAC, domain rules, webhooks, OpenAPI. Versioned prefixes /v1, /public/v1, /internal/v1",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
          {
            name: "apps/worker-jobs · BullMQ",
            desc: "Schedules, 24h reminders, AI orchestration, outbound webhook delivery with retries",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
          {
            name: "Redis + BullMQ",
            desc: "Queues, delayed jobs, rate limiting, short-lived cache",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
        ],
        [
          {
            name: "Supabase",
            desc: "Postgres with row-level security for tenant isolation, Auth, Storage buckets (D16)",
            host: "managed",
            hostLabel: "Managed",
          },
          {
            name: "LLM provider",
            desc: "Server-only platform key, OpenAI-compatible API. Tool calls validated with Zod, usage metered in tokens",
            host: "ext",
            hostLabel: "External API",
          },
          {
            name: "Provider adapters",
            desc: "WhatsApp Cloud (Gupshup/Meta), Instagram DM, payments (Asaas BR, Stripe PT), invoicing post-V1",
            host: "ext",
            hostLabel: "BYO credentials",
          },
        ],
        [
          {
            name: "apps/instance-manager",
            desc: "Private API that provisions and restarts WhatsApp Web containers. The only service with Docker socket access",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
          {
            name: "apps/baileys-worker × N",
            desc: "One container per connected WhatsApp Web number: isolated session, encrypted volume",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
        ],
      ],
      legend: [
        { host: "vercel", label: "Vercel" },
        { host: "vps", label: "VPS · Docker Compose" },
        { host: "managed", label: "Managed service" },
        { host: "ext", label: "External / bring-your-own" },
      ],
      footnote: "Tenants connect their own channel and payment credentials (bring-your-own keys). The platform's attack surface and vendor lock-in shrink at the same time: any adapter can be swapped without touching domain logic.",
    },
    decisions: {
      num: "/04",
      label: "Engineering decisions",
      title: "The choices that carry the system.",
      intro: "A selection of the recorded decisions, chosen for what they say about designing a production SaaS as one person.",
      cards: [
        {
          num: "D·A",
          title: "BFF as a security boundary",
          body: "The Next.js app is UI plus backend-for-frontend only. Provider secrets exist exclusively server-side behind the core API, so a compromised client or edge function exposes nothing.",
        },
        {
          num: "D·B",
          title: "Multi-tenancy enforced in the database",
          body: "Tenant isolation is not a convention in application code: it is row-level security in Postgres. Every query runs inside a tenant context the database itself enforces.",
        },
        {
          num: "D·C",
          title: "Adapters everywhere",
          body: "MessageProvider, PaymentProvider, LLMProvider, InvoiceProvider: every external vendor sits behind an interface. Swapping Gupshup, Stripe or the LLM vendor is an implementation detail, not a rewrite.",
        },
        {
          num: "D·D",
          title: "Queue-first for everything that can fail",
          body: "Reminders, AI runs, webhook deliveries and channel sends all go through BullMQ with retries, backoff and idempotency keys. The API stays fast; the workers absorb the chaos.",
        },
        {
          num: "D·E",
          title: "AI with budgets, not vibes",
          body: "Token usage is metered per tenant per day, with hard budgets per run, per session and per tenant. Conversation context is a sliding window plus a persisted summary. Routine reminders are deterministic templates: zero LLM cost on the hot path (D6).",
        },
        {
          num: "D·F",
          title: "Container-per-number isolation",
          body: "Each WhatsApp Web session runs in its own container with an encrypted volume. The only component allowed to touch the Docker socket is a minimal private service, which keeps the blast radius small by construction.",
        },
        {
          num: "D·G",
          title: "Plans as data, not code",
          body: "Feature flags and numeric limits live in a plan_entitlements table. Packaging and gating change from the admin panel, with no deploy involved.",
        },
        {
          num: "D·H",
          title: "Portability by default",
          body: "Everything ships as Docker Compose with the same images in dev and production. No component depends on a service that cannot be replaced.",
        },
      ],
    },
    aiWorkflow: {
      num: "/05",
      label: "Solo × AI",
      title: "One engineer, an AI multiplier.",
      paragraphs: [
        "This project is also its own experiment: how far can one person carry a production-grade SaaS when AI is used deliberately at every stage? Research, market analysis, the spec, the decision records, the architecture, the code and the operational planning were all produced in tight loops between me and AI tooling.",
        "The method matters more than the tools. AI drafts, I direct and verify: every architectural decision is recorded with its trade-offs, every generated artifact is reviewed like a pull request from a very fast junior engineer, and interactive models (like a full cost and capacity simulator) are built to pressure-test decisions before they harden into code.",
      ],
      quote: "AI doesn't replace the engineering. It compresses the distance between a decision and its consequences.",
    },
    status: {
      num: "/06",
      label: "Status",
      title: "In active development.",
      body: "The platform is being built toward V1 along the milestone plan above: core messaging and scheduling domain, official WhatsApp Cloud API integration, billing, then the WhatsApp Web fleet and the public API. This page covers the engineering; commercial details are deliberately out of scope.",
      stack: [
        "TypeScript",
        "Next.js",
        "Fastify",
        "PostgreSQL + RLS",
        "Supabase",
        "Redis",
        "BullMQ",
        "Docker",
        "Turborepo",
        "pnpm",
        "Zod",
        "OpenAPI",
        "LLM orchestration",
        "Vercel",
      ],
      ctaLabel: "Let's talk",
      ctaHref: "/#contact",
    },
  },
  pt: {
    back: "Voltar ao portfólio",
    kicker: "Case study · Maior projeto",
    titleA: "Mensagemz",
    titleB: "Plataforma de mensagens com IA",
    lede: "Um SaaS multi-tenant que dá a negócios de serviços no Brasil e em Portugal um só lugar para conversas de WhatsApp, CRM, agenda, pagamentos e um copiloto de IA. Desenhado, especificado e construído de ponta a ponta por uma pessoa, com IA como multiplicador em todas as fases.",
    meta: [
      { label: "Papel", value: "Founder, engenheiro solo" },
      { label: "Tipo", value: "SaaS B2B multi-tenant" },
      { label: "Período", value: "2026, em desenvolvimento" },
      { label: "Método", value: "Spec-first, com IA" },
    ],
    stats: [
      { value: "5", label: "Apps num só monorepo" },
      { value: "16", label: "Decisões de arquitetura registadas (D1 a D16)" },
      { value: "6", label: "Milestones sequenciados por risco" },
      { value: "1", label: "Engenheiro, de ponta a ponta" },
    ],
    problem: {
      num: "/01",
      label: "O problema",
      title: "Negócios de serviços vivem no WhatsApp, as ferramentas não.",
      paragraphs: [
        "No Brasil e em Portugal, clínicas, salões, estúdios e profissionais independentes vivem dentro do WhatsApp. Agendamentos, lembretes, cobranças e todo o histórico do cliente ficam espalhados por conversas, agendas de papel e planilhas.",
        "As ferramentas existentes resolvem uma fatia de cada vez: um chatbot aqui, uma página de agendamento ali, um CRM que ignora mensagens por completo. E quase tudo é desenhado e precificado para empresas grandes, não para um profissional solo ou uma equipa de três pessoas.",
      ],
      goalLabel: "Objetivo de design",
      goals: [
        "Um inbox omnichannel: WhatsApp Cloud API, Instagram DM e WhatsApp Web atrás de uma única abstração",
        "CRM com contactos, tags, notas, tarefas, tickets e pipelines",
        "Agenda com página pública de marcação e lembretes automáticos de 24h",
        "Links de pagamento e cobrança com gateways locais (Brasil e Portugal)",
        "Um copiloto de IA que rascunha respostas e resumos, com fila de aprovação humana por padrão",
      ],
    },
    process: {
      num: "/02",
      label: "O processo",
      title: "Primeiro a spec, decisões registadas, código por último.",
      intro: "Antes da primeira linha de código de produto, o sistema inteiro existia no papel: uma spec de engenharia versionada, um conjunto de decisões de arquitetura explícitas e um plano de milestones ordenado por risco. É essa disciplina que torna viável construir algo desta dimensão sozinho.",
      steps: [
        {
          num: "01",
          title: "Entender o domínio",
          body: "Mapeei como negócios de serviços realmente operam no WhatsApp nos dois mercados: fluxos de marcação, dor dos no-shows, hábitos de pagamento, restrições de cada canal e as regras de cada API de mensagens.",
        },
        {
          num: "02",
          title: "Escrever a spec (v1.0)",
          body: "Um documento único e versionado cobrindo o modelo de domínio, a superfície de API, o modelo de multi-tenancy e segurança, o comportamento da IA, requisitos operacionais e non-goals explícitos para a V1.",
        },
        {
          num: "03",
          title: "Travar decisões como ADRs",
          body: "Dezasseis decisões registadas (D1 a D16), cada uma com os seus trade-offs. Exemplos: lembretes são templates de sistema determinísticos, sem LLM (D6), a ordem de milestones e os cortes da V1 (D12), a estratégia de buckets de storage (D16).",
        },
        {
          num: "04",
          title: "Sequenciar por risco e valor",
          body: "Milestones na ordem M3, M4, M4b, M5, M7, M6: primeiro o domínio central, depois a API oficial do WhatsApp Cloud antes do canal por engenharia reversa, e billing como gate explícito antes de features de escala como a API pública.",
        },
        {
          num: "05",
          title: "Cortar escopo de propósito",
          body: "Features que não justificavam a sua complexidade saíram da V1 e ficaram registadas como tal: o módulo de encurtador de links, o modo autopilot da IA (a fila de aprovação sai primeiro) e o módulo de faturação.",
        },
        {
          num: "06",
          title: "Construir com IA, verificar como engenheiro",
          body: "Todas as fases (pesquisa, escrita da spec, arquitetura, implementação, planeamento de operações) executadas a solo com IA como par, com revisão humana, testes e orçamentos explícitos a manter o resultado honesto.",
        },
      ],
    },
    architecture: {
      num: "/03",
      label: "Arquitetura",
      title: "O que corre onde, e porquê.",
      intro: "Um monorepo pnpm + Turborepo com cinco apps deployáveis. Só o front-end vive na Vercel; API, workers e Redis correm num VPS via Docker Compose (as mesmas imagens do ambiente local); banco, auth e storage são Postgres gerenciado (Supabase). Toda dependência externa fica atrás de um adapter.",
      rows: [
        [
          {
            name: "Navegador do cliente",
            desc: "App do tenant, admin da plataforma, páginas públicas de marcação e links",
            host: "ext",
            hostLabel: "Utilizadores",
          },
        ],
        [
          {
            name: "apps/web · Next.js",
            desc: "UI mais camada BFF: o browser nunca fala com providers, e esta app nunca guarda segredos de providers",
            host: "vercel",
            hostLabel: "Vercel",
          },
        ],
        [
          {
            name: "apps/api · Fastify",
            desc: "API central: auth, RBAC, regras de domínio, webhooks, OpenAPI. Prefixos versionados /v1, /public/v1, /internal/v1",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
          {
            name: "apps/worker-jobs · BullMQ",
            desc: "Agendamentos, lembretes de 24h, orquestração de IA, entrega de webhooks com retries",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
          {
            name: "Redis + BullMQ",
            desc: "Filas, jobs atrasados, rate limiting, cache de curta duração",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
        ],
        [
          {
            name: "Supabase",
            desc: "Postgres com row-level security para isolamento de tenants, Auth, buckets de Storage (D16)",
            host: "managed",
            hostLabel: "Gerenciado",
          },
          {
            name: "Provider de LLM",
            desc: "Chave da plataforma, só no servidor, API compatível com OpenAI. Tool calls validadas com Zod, uso medido em tokens",
            host: "ext",
            hostLabel: "API externa",
          },
          {
            name: "Adapters de providers",
            desc: "WhatsApp Cloud (Gupshup/Meta), Instagram DM, pagamentos (Asaas BR, Stripe PT), faturação pós-V1",
            host: "ext",
            hostLabel: "Credenciais do tenant",
          },
        ],
        [
          {
            name: "apps/instance-manager",
            desc: "API privada que provisiona e reinicia containers de WhatsApp Web. O único serviço com acesso ao Docker socket",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
          {
            name: "apps/baileys-worker × N",
            desc: "Um container por número de WhatsApp Web conectado: sessão isolada, volume criptografado",
            host: "vps",
            hostLabel: "VPS · Docker",
          },
        ],
      ],
      legend: [
        { host: "vercel", label: "Vercel" },
        { host: "vps", label: "VPS · Docker Compose" },
        { host: "managed", label: "Serviço gerenciado" },
        { host: "ext", label: "Externo / credenciais próprias" },
      ],
      footnote: "Os tenants conectam as próprias credenciais de canal e de pagamento (bring-your-own keys). A superfície de ataque da plataforma e o lock-in de fornecedores encolhem ao mesmo tempo: qualquer adapter pode ser trocado sem tocar na lógica de domínio.",
    },
    decisions: {
      num: "/04",
      label: "Decisões de engenharia",
      title: "As escolhas que sustentam o sistema.",
      intro: "Uma seleção das decisões registadas, escolhidas pelo que dizem sobre desenhar um SaaS de produção sendo uma pessoa só.",
      cards: [
        {
          num: "D·A",
          title: "BFF como fronteira de segurança",
          body: "A app Next.js é só UI mais backend-for-frontend. Segredos de providers existem exclusivamente no servidor, atrás da API central: um cliente comprometido não expõe nada.",
        },
        {
          num: "D·B",
          title: "Multi-tenancy imposto no banco",
          body: "O isolamento de tenants não é uma convenção no código da aplicação: é row-level security no Postgres. Toda query corre dentro de um contexto de tenant que o próprio banco impõe.",
        },
        {
          num: "D·C",
          title: "Adapters em todo o lado",
          body: "MessageProvider, PaymentProvider, LLMProvider, InvoiceProvider: todo fornecedor externo fica atrás de uma interface. Trocar Gupshup, Stripe ou o fornecedor de LLM é detalhe de implementação, não um rewrite.",
        },
        {
          num: "D·D",
          title: "Fila primeiro para tudo o que pode falhar",
          body: "Lembretes, runs de IA, entregas de webhooks e envios de canal passam todos pelo BullMQ com retries, backoff e chaves de idempotência. A API continua rápida; os workers absorvem o caos.",
        },
        {
          num: "D·E",
          title: "IA com orçamentos, não com fé",
          body: "O uso de tokens é medido por tenant por dia, com orçamentos rígidos por run, por sessão e por tenant. O contexto da conversa é uma janela deslizante mais um resumo persistido. Lembretes de rotina são templates determinísticos: custo de LLM zero no caminho quente (D6).",
        },
        {
          num: "D·F",
          title: "Isolamento container-por-número",
          body: "Cada sessão de WhatsApp Web corre no seu próprio container com volume criptografado. O único componente autorizado a tocar no Docker socket é um serviço privado mínimo, o que mantém o raio de explosão pequeno por construção.",
        },
        {
          num: "D·G",
          title: "Planos como dados, não como código",
          body: "Flags de features e limites numéricos vivem numa tabela plan_entitlements. Empacotamento e gating mudam no painel de admin, sem deploy.",
        },
        {
          num: "D·H",
          title: "Portabilidade por padrão",
          body: "Tudo é entregue como Docker Compose com as mesmas imagens em dev e produção. Nenhum componente depende de um serviço que não possa ser substituído.",
        },
      ],
    },
    aiWorkflow: {
      num: "/05",
      label: "Solo × IA",
      title: "Um engenheiro, um multiplicador de IA.",
      paragraphs: [
        "Este projeto é também a sua própria experiência: até onde uma pessoa consegue levar um SaaS de nível de produção quando a IA é usada de forma deliberada em todas as fases? A pesquisa, a análise de mercado, a spec, os registos de decisão, a arquitetura, o código e o planeamento operacional foram todos produzidos em ciclos curtos entre mim e ferramentas de IA.",
        "O método importa mais do que as ferramentas. A IA rascunha, eu dirijo e verifico: toda decisão de arquitetura fica registada com os seus trade-offs, todo artefacto gerado é revisto como um pull request de um júnior muito rápido, e modelos interativos (como um simulador completo de custo e capacidade) são construídos para testar decisões sob pressão antes de virarem código.",
      ],
      quote: "A IA não substitui a engenharia. Ela comprime a distância entre uma decisão e as suas consequências.",
    },
    status: {
      num: "/06",
      label: "Estado",
      title: "Em desenvolvimento ativo.",
      body: "A plataforma está a ser construída rumo à V1 seguindo o plano de milestones acima: domínio central de mensagens e agenda, integração oficial com o WhatsApp Cloud API, billing, e depois a frota de WhatsApp Web e a API pública. Esta página cobre a engenharia; os detalhes comerciais ficam de fora de propósito.",
      stack: [
        "TypeScript",
        "Next.js",
        "Fastify",
        "PostgreSQL + RLS",
        "Supabase",
        "Redis",
        "BullMQ",
        "Docker",
        "Turborepo",
        "pnpm",
        "Zod",
        "OpenAPI",
        "Orquestração de LLM",
        "Vercel",
      ],
      ctaLabel: "Vamos conversar",
      ctaHref: "/#contact",
    },
  },
}

function SectionHead({
  num,
  label,
  title,
}: {
  num: string
  label: string
  title: string
}) {
  return (
    <div className="cs-head reveal">
      <div className="num-col">
        <div className="big">{num}</div>
        <div className="lab">{label}</div>
      </div>
      <div className="title-col">
        <h2>{title}</h2>
      </div>
    </div>
  )
}

export function MensagemzCaseStudy() {
  const { locale } = useTranslation()
  const c = CONTENT[locale]

  return (
    <article className="cs">
      {/* ── Hero ── */}
      <header className="cs-hero">
        <div className="wrap">
          <Link href="/" className="cs-back mono">
            ← {c.back}
          </Link>
          <div className="eyebrow" style={{ marginTop: 28 }}>
            <span className="cs-flag">★</span>
            {c.kicker}
          </div>
          <h1>
            {c.titleA}
            <span className="it"> {c.titleB}</span>
          </h1>
          <p className="cs-lede">{c.lede}</p>
          <div className="cs-meta">
            {c.meta.map((m) => (
              <div key={m.label} className="cs-meta-item">
                <span className="lab">{m.label}</span>
                <span className="val">{m.value}</span>
              </div>
            ))}
          </div>
          <div className="cs-stats">
            {c.stats.map((s) => (
              <div key={s.label} className="cs-stat">
                <div className="v">{s.value}</div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── 01 Problem ── */}
      <section className="cs-section">
        <div className="wrap">
          <SectionHead
            num={c.problem.num}
            label={c.problem.label}
            title={c.problem.title}
          />
          <div className="cs-cols">
            <div className="cs-col-text">
              {c.problem.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="cs-p">
                  {p}
                </p>
              ))}
            </div>
            <div className="cs-goal">
              <span className="mono">{c.problem.goalLabel}</span>
              <ul>
                {c.problem.goals.map((g) => (
                  <li key={g.slice(0, 24)}>{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 Process ── */}
      <section className="cs-section cs-alt">
        <div className="wrap">
          <SectionHead
            num={c.process.num}
            label={c.process.label}
            title={c.process.title}
          />
          <p className="cs-p cs-intro">{c.process.intro}</p>
          <div className="cs-steps">
            {c.process.steps.map((s) => (
              <div key={s.num} className="cs-step">
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Architecture ── */}
      <section className="cs-section">
        <div className="wrap">
          <SectionHead
            num={c.architecture.num}
            label={c.architecture.label}
            title={c.architecture.title}
          />
          <p className="cs-p cs-intro">{c.architecture.intro}</p>
          <div className="cs-arch">
            {c.architecture.rows.map((row, i) => (
              <div key={row[0].name}>
                {i > 0 && <div className="cs-arrow">▼</div>}
                <div className="cs-arch-row">
                  {row.map((node) => (
                    <div key={node.name} className={`cs-node host-${node.host}`}>
                      <div className="nt">{node.name}</div>
                      <div className="nd">{node.desc}</div>
                      <span className="host">{node.hostLabel}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="cs-legend">
              {c.architecture.legend.map((l) => (
                <span key={l.host}>
                  <i className={`sw host-${l.host}`} />
                  {l.label}
                </span>
              ))}
            </div>
            <p className="cs-footnote">{c.architecture.footnote}</p>
          </div>
        </div>
      </section>

      {/* ── 04 Decisions ── */}
      <section className="cs-section cs-alt">
        <div className="wrap">
          <SectionHead
            num={c.decisions.num}
            label={c.decisions.label}
            title={c.decisions.title}
          />
          <p className="cs-p cs-intro">{c.decisions.intro}</p>
          <div className="cs-cards">
            {c.decisions.cards.map((card) => (
              <div key={card.title} className="cs-card">
                <span className="num">{card.num}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 Solo × AI ── */}
      <section className="cs-section">
        <div className="wrap">
          <SectionHead
            num={c.aiWorkflow.num}
            label={c.aiWorkflow.label}
            title={c.aiWorkflow.title}
          />
          <div className="cs-cols">
            <div className="cs-col-text">
              {c.aiWorkflow.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="cs-p">
                  {p}
                </p>
              ))}
            </div>
            <blockquote className="cs-quote">{c.aiWorkflow.quote}</blockquote>
          </div>
        </div>
      </section>

      {/* ── 06 Status ── */}
      <section className="cs-section cs-alt">
        <div className="wrap">
          <SectionHead
            num={c.status.num}
            label={c.status.label}
            title={c.status.title}
          />
          <p className="cs-p cs-intro">{c.status.body}</p>
          <div className="cs-chips">
            {c.status.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className="cs-cta">
            <Link href={c.status.ctaHref} className="btn btn-primary">
              {c.status.ctaLabel} <span className="arr">↗</span>
            </Link>
            <Link href="/" className="btn">
              {c.back}
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
