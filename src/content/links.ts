// Content of /links. Every link here gets a stable `id`: it is the key the
// click tracker and the dashboard use, so never rename an id that already has
// clicks (change the label instead).

export type LinksLocale = "pt" | "en"

type Text = Record<LinksLocale, string>

export type BadgeTone =
  | "acid"
  | "cyan"
  | "terra"
  | "green"
  | "blue"
  | "violet"
  | "rust"
  | "neutral"

export type LinkBadge = {
  label: Text
  tone: BadgeTone
  /** Shows a pulsing dot, for things that are live right now. */
  live?: boolean
}

export type LinkIcon =
  | "linkedin"
  | "github"
  | "instagram"
  | "whatsapp"
  | "email"

export type LinkItem = {
  id: string
  href: string
  title: Text
  description?: Text
  badges?: LinkBadge[]
  /** Accent of the icon tile, a CSS colour token from the page. */
  tone: BadgeTone
  /** Letters in the icon tile when there is no brand icon. */
  mark?: string
  icon?: LinkIcon
  /**
   * Brand logo in public/links/logos. "cover" fills the tile (logos that are
   * already an app icon); "mark" sits on a dark tile with some padding.
   */
  logo?: { src: string; fit: "cover" | "mark" }
}

export type LinkGroup = {
  id: string
  label: Text
  items: LinkItem[]
}

/**
 * Own domains get UTM parameters on the way out, so their own analytics see
 * that the visit came from this page and from which channel.
 */
export const OWN_DOMAINS = [
  "aoficinastudio.pt",
  "aoficina.academy",
  "mensagi.com",
  "aestum.io",
  "alexandrejaques.com",
]

export const profile = {
  name: "Alexandre Jaques",
  role: { pt: "ai integration engineer", en: "ai integration engineer" },
  chips: [
    { pt: "Fundador · Oficina Studio", en: "Founder · Oficina Studio" },
    { pt: "Lisboa · remoto", en: "Lisbon · remote" },
  ],
  status: { pt: "online · lisboa", en: "online · lisbon" },
  footer: "chaos in / system out",
}

export const featured: LinkItem = {
  id: "oficina-studio",
  href: "https://aoficinastudio.pt",
  title: { pt: "Oficina Studio", en: "Oficina Studio" },
  description: {
    pt: "Software à medida com IA para empresas que já têm processo.",
    en: "Custom AI software for companies that already run on process.",
  },
  tone: "acid",
    logo: { src: "/links/logos/oficina-studio.svg", fit: "cover" },
  badges: [
    {
      label: { pt: "agenda aberta", en: "booking open" },
      tone: "acid",
      live: true,
    },
    { label: { pt: "IA à medida", en: "custom AI" }, tone: "cyan" },
    { label: { pt: "aoficinastudio.pt", en: "aoficinastudio.pt" }, tone: "neutral" },
  ],
}

export const pipeline: Text[] = [
  { pt: "pedido", en: "request" },
  { pt: "agente", en: "agent" },
  { pt: "entregue", en: "shipped" },
]

export const socials: LinkItem[] = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/alexandrejaques/",
    title: { pt: "LinkedIn", en: "LinkedIn" },
    tone: "blue",
    icon: "linkedin",
  },
  {
    id: "github",
    href: "https://github.com/alexandre2120",
    title: { pt: "GitHub", en: "GitHub" },
    tone: "neutral",
    icon: "github",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/alexandrejaquees/",
    title: { pt: "Instagram", en: "Instagram" },
    tone: "terra",
    icon: "instagram",
  },
  {
    id: "whatsapp",
    href: "https://wa.me/351910712855?text=Ol%C3%A1%20Alexandre%2C%20vim%20pela%20tua%20p%C3%A1gina%20de%20links.",
    title: { pt: "WhatsApp", en: "WhatsApp" },
    tone: "green",
    icon: "whatsapp",
  },
  {
    id: "email",
    href: "mailto:alexandrjaques@gmail.com",
    title: { pt: "Email", en: "Email" },
    tone: "acid",
    icon: "email",
  },
]

export const groups: LinkGroup[] = [
  {
    id: "produtos",
    label: { pt: "produtos e comunidade", en: "products and community" },
    items: [
      {
        id: "orquestra-de-um",
        href: "https://aoficina.academy",
        title: { pt: "Orquestra de Um", en: "Orquestra de Um" },
        description: {
          pt: "Opera sozinho com uma equipa de agentes",
          en: "Run solo with a team of AI agents",
        },
        tone: "terra",
        logo: { src: "/links/logos/orquestra-de-um.svg", fit: "cover" },
        mark: "O",
        badges: [
          { label: { pt: "comunidade", en: "community" }, tone: "terra" },
          { label: { pt: "30 EUR/mês", en: "30 EUR/mo" }, tone: "neutral" },
        ],
      },
      {
        id: "mensagi",
        href: "https://mensagi.com",
        title: { pt: "Mensagi", en: "Mensagi" },
        description: {
          pt: "Atendimento com IA no WhatsApp",
          en: "AI customer service on WhatsApp",
        },
        tone: "green",
        logo: { src: "/links/logos/mensagi.svg", fit: "mark" },
        mark: "M",
        badges: [
          {
            label: { pt: "em produção", en: "in production" },
            tone: "green",
            live: true,
          },
          { label: { pt: "SaaS", en: "SaaS" }, tone: "neutral" },
        ],
      },
      {
        id: "aestum",
        href: "https://www.aestum.io",
        title: { pt: "Aestum", en: "Aestum" },
        description: {
          pt: "Orçamentos e medições para climatização",
          en: "Quotes and takeoffs for HVAC",
        },
        tone: "blue",
        logo: { src: "/links/logos/aestum.svg", fit: "mark" },
        mark: "A",
        badges: [
          { label: { pt: "beta", en: "beta" }, tone: "blue" },
          { label: { pt: "aestum.io", en: "aestum.io" }, tone: "neutral" },
        ],
      },
    ],
  },
  {
    id: "conteudo",
    label: { pt: "conteúdo", en: "content" },
    items: [
      {
        id: "editar-video-claude",
        href: "https://aoficina.academy/editar-video-com-claude",
        title: { pt: "Editar vídeo com Claude", en: "Editing video with Claude" },
        description: {
          pt: "O método que uso nos meus vídeos",
          en: "The method behind my videos",
        },
        tone: "violet",
        mark: "▶",
        badges: [
          { label: { pt: "grátis", en: "free" }, tone: "violet" },
          { label: { pt: "novo", en: "new" }, tone: "rust" },
        ],
      },
      {
        id: "instagram-studio",
        href: "https://www.instagram.com/aoficina.studio/",
        title: { pt: "@aoficina.studio", en: "@aoficina.studio" },
        description: {
          pt: "Bastidores dos projetos do estúdio",
          en: "Behind the scenes of the studio",
        },
        tone: "rust",
        logo: { src: "/links/logos/oficina-studio.svg", fit: "cover" },
        icon: "instagram",
        badges: [{ label: { pt: "instagram", en: "instagram" }, tone: "neutral" }],
      },
      {
        id: "portfolio",
        href: "https://alexandrejaques.com",
        title: { pt: "Portfólio", en: "Portfolio" },
        description: {
          pt: "Case studies, arquitetura e percurso",
          en: "Case studies, architecture and career",
        },
        tone: "neutral",
        logo: { src: "/links/logos/portfolio.svg", fit: "mark" },
        mark: "AJ",
        badges: [{ label: { pt: "case studies", en: "case studies" }, tone: "neutral" }],
      },
    ],
  },
]

export const allLinks: LinkItem[] = [
  featured,
  ...socials,
  ...groups.flatMap((group) => group.items),
]

export function findLink(id: string): LinkItem | undefined {
  return allLinks.find((link) => link.id === id)
}

export const linksCopy = {
  featuredLabel: { pt: "em destaque", en: "featured" },
  socialLabel: { pt: "redes e contacto", en: "social and contact" },
  switchTo: { pt: "EN", en: "PT" },
  switchLabel: { pt: "Mudar para inglês", en: "Switch to Portuguese" },
}
