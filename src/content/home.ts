// Content of the home page (alexandrejaques.com). Revenue is updated by hand:
// change `revenue.updated`, the `last30` of each startup and push the new
// month onto every `monthly` array (dropping the oldest, so there are always
// 12). Every number is in euros, without VAT.
//
// Sources for the numbers on 05/11/2026:
// * Oficina Studio: invoices issued by the company (base, without VAT), from
//   the accountant report of 06/10 and the October close (fecho-2026-10.md).
//   November so far is FT/6 to Priceless.
// * Mensagi, Aestum, Oficina Academy, PageXray: gross charges in each Stripe
//   account (Stripe Sigma, 05/11/2026).
// * Mundo Criativo: first paid order on 02/11/2026 (28 EUR), zero orders
//   from the opening on 15/09 until then (Brain projeto/mundo-criativo).

import type { Locale } from "@/lib/i18n"

export type Text = Record<Locale, string>

export type Tone = "acid" | "green" | "blue" | "terra" | "violet" | "cyan" | "neutral" | "red"

export type Startup = {
  id: string
  name: string
  href: string
  description: Text
  tone: Tone
  /** Logo in /public; "cover" fills the tile, "mark" sits on a dark tile. */
  logo?: { src: string; fit: "cover" | "mark" }
  /** Letters for the tile when there is no logo. */
  mark?: string
  kind: "services" | "product"
  badge?: Text
  /** Revenue in the last 30 days. */
  last30: number
  /** One value per month in `revenue.months`, oldest first. */
  monthly: number[]
}

export type SideProject = {
  name: string
  description: Text
  href?: string
  mark: string
  tone: Tone
  badge: Text
  badgeTone?: "live" | "build" | "dead"
}

export const revenue = {
  updated: "2026-11-05",
  /** First day of each month shown in the chart, oldest first. */
  months: [
    "2025-12",
    "2026-01",
    "2026-02",
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
    "2026-07",
    "2026-08",
    "2026-09",
    "2026-10",
    "2026-11",
  ],
  /** The last month is still running: drawn hatched and dashed. */
  lastIsPartial: true,
}

export const startups: Startup[] = [
  {
    id: "oficina-studio",
    name: "Oficina Studio",
    href: "https://aoficinastudio.pt",
    description: {
      en: "Custom AI software for companies that already run on process",
      pt: "Software à medida com IA para empresas que já têm processo",
    },
    tone: "acid",
    logo: { src: "/links/logos/oficina-studio.svg", fit: "cover" },
    kind: "services",
    badge: { en: "Services", pt: "Serviços" },
    last30: 4716.9,
    monthly: [0, 0, 0, 0, 0, 26.02, 0, 0, 1500, 2430, 4776.07, 1327.5],
  },
  {
    id: "mensagi",
    name: "Mensagi",
    href: "https://mensagi.com",
    description: {
      en: "AI customer service and bookings on WhatsApp",
      pt: "Atendimento e marcações com IA no WhatsApp",
    },
    tone: "green",
    logo: { src: "/links/logos/mensagi.svg", fit: "mark" },
    kind: "product",
    last30: 59.79,
    monthly: [0, 0, 0, 0, 0, 0, 0, 19.93, 79.72, 59.79, 59.79, 19.93],
  },
  {
    id: "mundo-criativo",
    name: "Mundo Criativo",
    href: "https://www.mundocriativo.pt",
    description: {
      en: "3D printed NFC plates that turn visits into Google reviews",
      pt: "Placas NFC impressas em 3D que transformam visitas em avaliações Google",
    },
    tone: "terra",
    mark: "MC",
    kind: "product",
    badge: { en: "First sale", pt: "Primeira venda" },
    last30: 28,
    monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28],
  },
  {
    id: "aestum",
    name: "Aestum",
    href: "https://www.aestum.io",
    description: {
      en: "Quotes and takeoffs for HVAC installers, in minutes",
      pt: "Orçamentos e medições para climatização, em minutos",
    },
    tone: "blue",
    logo: { src: "/links/logos/aestum.svg", fit: "mark" },
    kind: "product",
    badge: { en: "Beta", pt: "Beta" },
    last30: 0,
    monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "orquestra-de-um",
    name: "Orquestra de Um",
    href: "https://aoficina.academy",
    description: {
      en: "A community for running a business solo with a team of AI agents",
      pt: "Comunidade para operar sozinho com uma equipa de agentes de IA",
    },
    tone: "violet",
    logo: { src: "/links/logos/orquestra-de-um.svg", fit: "cover" },
    kind: "product",
    badge: { en: "Community", pt: "Comunidade" },
    last30: 0,
    monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "pagexray",
    name: "PageXray AI",
    href: "https://pagexray.io",
    description: {
      en: "Chrome extension for on-page SEO, with an AI audit on demand",
      pt: "Extensão Chrome de SEO na página, com auditoria por IA a pedido",
    },
    tone: "cyan",
    mark: "PX",
    kind: "product",
    badge: { en: "Launched Oct", pt: "Lançada em out." },
    last30: 0,
    monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
]

export const sideProjects: SideProject[] = [
  {
    name: "Timetabled",
    href: "https://timetabled.app",
    description: {
      en: "Any schedule, from PDF, photo or link, into your calendar",
      pt: "Qualquer horário, de PDF, foto ou link, para o calendário",
    },
    mark: "T",
    tone: "blue",
    badge: { en: "Live", pt: "No ar" },
    badgeTone: "live",
  },
  {
    name: "Caixa",
    description: {
      en: "Company finances on Mac and iPhone, invoices read by AI",
      pt: "Finanças da empresa no Mac e no iPhone, faturas lidas por IA",
    },
    mark: "C",
    tone: "acid",
    badge: { en: "Building", pt: "Em construção" },
    badgeTone: "build",
  },
  {
    name: "Eris",
    description: {
      en: "A voice assistant for macOS that runs my day with Claude",
      pt: "Assistente de voz para macOS que corre o meu dia com o Claude",
    },
    mark: "E",
    tone: "violet",
    badge: { en: "Personal", pt: "Pessoal" },
    badgeTone: "build",
  },
  {
    name: "Disparador",
    description: {
      en: "Bulk WhatsApp sender. Now the Campaigns module in Mensagi",
      pt: "Disparos em massa no WhatsApp. Hoje é o módulo Campanhas do Mensagi",
    },
    mark: "D",
    tone: "neutral",
    badge: { en: "Merged", pt: "Fundido" },
    badgeTone: "dead",
  },
]

export const skills: Array<{ group: Text; items: string[] }> = [
  {
    group: { en: "AI and LLMs", pt: "IA e LLMs" },
    items: [
      "Claude, GPT, Gemini APIs",
      "AI agents",
      "RAG",
      "Vision models",
      "MCP servers",
      "Claude Code",
      "Copilot Studio",
    ],
  },
  {
    group: { en: "Integration and automation", pt: "Integração e automação" },
    items: ["n8n", "Make", "REST APIs", "Webhooks", "WhatsApp Cloud API", "Stripe", "HubSpot", "Salesforce"],
  },
  {
    group: { en: "Back-end, data and web", pt: "Back-end, dados e web" },
    items: ["Python", "TypeScript", "Node.js", "PostgreSQL", "Supabase pgvector", "Next.js", "React"],
  },
  {
    group: { en: "Infrastructure", pt: "Infraestrutura" },
    items: ["AWS", "Docker", "Coolify", "VPS", "CI/CD", "Vercel"],
  },
]

export type Role = {
  period: Text
  role: Text
  company: string
  detail: Text
  current?: boolean
  parallel?: boolean
}

export const career: Role[] = [
  {
    period: { en: "Nov 2025 to now", pt: "Nov 2025 até hoje" },
    role: { en: "Founder, Applied AI Engineer", pt: "Fundador, Applied AI Engineer" },
    company: "Oficina Studio",
    detail: {
      en: "My own company. AI software for clients in Portugal (an auction cataloguing app, a RAG layer over 14,700 service desk tickets, e-commerce) and the products above.",
      pt: "A minha empresa. Software com IA para clientes em Portugal (app de catalogação para uma leiloeira, RAG sobre 14.700 tickets de service desk, e-commerce) e os produtos acima.",
    },
    current: true,
  },
  {
    period: { en: "Jan 2025 to Nov 2025", pt: "Jan 2025 a Nov 2025" },
    role: { en: "Director", pt: "Diretor" },
    company: "ChatGuru",
    detail: {
      en: "Strategy across product, operations and engineering. Owned the AI chatbot roadmap and the integration architecture.",
      pt: "Estratégia de produto, operações e engenharia. Dono do roadmap do chatbot de IA e da arquitetura de integração.",
    },
  },
  {
    period: { en: "Nov 2020 to Jan 2025", pt: "Nov 2020 a Jan 2025" },
    role: { en: "Head of Operations", pt: "Head of Operations" },
    company: "ChatGuru",
    detail: {
      en: "Led teams of 15+. Automation that cut manual work by 60%, onboarding integrations that cut time to value by 40%.",
      pt: "Liderou equipas de mais de 15 pessoas. Automação que cortou 60% do trabalho manual e integrações de onboarding que cortaram 40% do tempo até valor.",
    },
  },
  {
    period: { en: "Oct 2019 to Nov 2020", pt: "Out 2019 a Nov 2020" },
    role: { en: "Customer Success Analyst, then Manager", pt: "Customer Success Analyst, depois Manager" },
    company: "ChatGuru",
    detail: {
      en: "First Customer Success hire. Built the team and its onboarding, retention and expansion processes.",
      pt: "Primeira contratação de Customer Success. Montou a equipa e os processos de onboarding, retenção e expansão.",
    },
  },
  {
    period: { en: "Jul 2021 to Jan 2025", pt: "Jul 2021 a Jan 2025" },
    role: { en: "Founder, part-time", pt: "Fundador, em part-time" },
    company: "IntegraNinja",
    detail: {
      en: "Integration consultancy for 15+ clients alongside ChatGuru: CRM and ERP integrations, LLM pipelines, a serverless AWS pipeline.",
      pt: "Consultoria de integração para mais de 15 clientes, em paralelo à ChatGuru: CRM e ERP, pipelines de LLM, um pipeline serverless na AWS.",
    },
    parallel: true,
  },
]

export const socials = [
  { id: "linkedin", href: "https://www.linkedin.com/in/alexandrejaques/", label: "LinkedIn" },
  { id: "github", href: "https://github.com/alexandre2120", label: "GitHub" },
  { id: "youtube", href: "https://www.youtube.com/@alexandrjaques", label: "YouTube" },
  { id: "instagram", href: "https://www.instagram.com/alexandrejaquees/", label: "Instagram" },
] as const

export const email = "alexandrjaques@gmail.com"

export const copy = {
  en: {
    role: "Applied AI Engineer",
    tagline:
      "Six years from first Customer Success hire to Director at a WhatsApp SaaS. Now I build AI software, for clients and for myself.",
    stats: [
      { value: "1", label: "company" },
      { value: "6", label: "products live" },
      { value: "0", label: "investors" },
    ],
    status: "Open to partnerships and new ventures",
    location: "Lisbon, Portugal",
    emailCta: "Email me",
    revenueSuffix: "in the last 12 months",
    revenueNote: "Invoiced revenue without VAT, services and products together. Updated",
    services: "Services",
    products: "Products",
    inProgress: "in progress",
    startupsTitle: "My startups",
    perMonth: "/mo",
    last30: "last 30 days",
    alsoTitle: "Also built",
    skillsTitle: "Skills",
    careerTitle: "Career",
    now: "Now",
    parallel: "In parallel",
    languages: "Portuguese, native. English, full professional proficiency. Spanish, basic.",
    switchTo: "PT",
    switchLabel: "Mudar para português",
    footer: "Chaos in, system out.",
  },
  pt: {
    role: "Applied AI Engineer",
    tagline:
      "Seis anos da primeira contratação de Customer Success a Diretor num SaaS de WhatsApp. Hoje construo software com IA, para clientes e para mim.",
    stats: [
      { value: "1", label: "empresa" },
      { value: "6", label: "produtos no ar" },
      { value: "0", label: "investidores" },
    ],
    status: "Aberto a parcerias e novos negócios",
    location: "Lisboa, Portugal",
    emailCta: "Enviar email",
    revenueSuffix: "nos últimos 12 meses",
    revenueNote: "Faturação sem IVA, serviços e produtos juntos. Atualizado a",
    services: "Serviços",
    products: "Produtos",
    inProgress: "em curso",
    startupsTitle: "As minhas startups",
    perMonth: "/mês",
    last30: "últimos 30 dias",
    alsoTitle: "Também construí",
    skillsTitle: "Competências",
    careerTitle: "Percurso",
    now: "Agora",
    parallel: "Em paralelo",
    languages: "Português, nativo. Inglês, fluência profissional plena. Espanhol, básico.",
    switchTo: "EN",
    switchLabel: "Switch to English",
    footer: "Caos entra, sistema sai.",
  },
} satisfies Record<Locale, unknown>
