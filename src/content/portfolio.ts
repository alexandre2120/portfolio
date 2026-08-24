import type { Locale } from "@/lib/i18n"

export type SystemCopy = {
  note: string
  inputs: Array<{ label: string; detail: string }>
  stages: Array<{ number: string; label: string; actions: string[] }>
  result: { label: string; status: string }
  outputs: Array<{ label: string; detail: string }>
}

export type FoldItemCopy = {
  number: string
  label: string
  status: string
  description: string
  href: string
}

export type PortfolioCopy = {
  nav: {
    work: string
    mvps: string
    lab: string
    oficina: string
    about: string
    talk: string
  }
  hero: {
    name: string
    title: string
    chaos: string
    in: string
    systemWord: string
    out: string
    statementPrefix: string
    statementEmphasis: string
    status: string
    location: string
    system: SystemCopy
    foldAria: string
    folds: FoldItemCopy[]
  }
  production: {
    label: string
    headline: string
    intro: string
    caseStudies: Array<{
      number: string
      status: string
      title: string
      summary: string
      problem: string
      build: string
      outcome: string
      tags: string[]
      image: string
      href?: string
      linkLabel?: string
    }>
    shippedLabel: string
    shipped: Array<{
      title: string
      type: string
      status: string
      href?: string
      image: string
    }>
  }
  mvps: {
    label: string
    headline: string
    intro: string
    live: {
      status: string
      title: string
      description: string
      learning: string
      href: string
      image: string
      tags: string[]
    }
  }
  concepts: {
    label: string
    headline: string
    intro: string
    items: Array<{
      status: string
      title: string
      description: string
      learning: string
      image: string
      tags: string[]
    }>
  }
  about: {
    label: string
    headline: string
    intro: string
    body: string
    facts: Array<{ label: string; value: string }>
    methodLabel: string
    methodHeadline: string
    method: Array<{ number: string; title: string; body: string }>
    careerLabel: string
    careerHeadline: string
    chatguruLabel: string
    parallelLabel: string
    roles: Array<{
      period: string
      role: string
      company: string
      detail: string
      parallel?: boolean
    }>
  }
  oficina: {
    label: string
    headline: string
    intro: string
    belief: string
    liveLabel: string
    liveItems: string[]
    roadmapLabel: string
    roadmap: string
    stack: string[]
    cta: string
    href: string
    image: string
  }
  lab: {
    label: string
    headline: string
    intro: string
    currently: Array<{ label: string; value: string }>
    offlineHeadline: string
    offlineBody: string
  }
  testimonials: {
    label: string
    headline: string
    items: Array<{ quote: string; name: string; role: string; initials: string }>
  }
  contact: {
    eyebrow: string
    headline: string
    response: string
    availability: string
    eligibility: string
    relocation: string
    emailLabel: string
    linkedin: string
    github: string
  }
  footer: {
    note: string
    copyright: string
  }
}

const en: PortfolioCopy = {
  nav: {
    work: "Work",
    mvps: "MVPs",
    lab: "Lab",
    oficina: "A Oficina",
    about: "About",
    talk: "Let's talk",
  },
  hero: {
    name: "Alexandre Jaques",
    title: "AI Integration Engineer",
    chaos: "CHAOS",
    in: "IN.",
    systemWord: "SYSTEM",
    out: "OUT.",
    statementPrefix: "LLMs, APIs and automation for",
    statementEmphasis: "real business systems.",
    status: "Available now",
    location: "Lisbon, Portugal",
    system: {
      note: "business problem first",
      inputs: [
        { label: "Customers", detail: "unclear needs" },
        { label: "Email", detail: "unstructured" },
        { label: "CRM", detail: "siloed" },
        { label: "Data", detail: "scattered" },
        { label: "APIs", detail: "inconsistent" },
      ],
      stages: [
        { number: "1", label: "Understand", actions: ["Discover", "Clarify", "Map context"] },
        { number: "2", label: "Connect", actions: ["Integrate", "Orchestrate", "Validate"] },
        { number: "3", label: "Ship", actions: ["Automate", "Deploy", "Measure"] },
      ],
      result: { label: "Working systems", status: "Live" },
      outputs: [
        { label: "Internal tools", detail: "faster operations" },
        { label: "AI agents", detail: "reliable execution" },
        { label: "Automations", detail: "less manual work" },
        { label: "Insights", detail: "better decisions" },
        { label: "Integrations", detail: "connected stack" },
      ],
    },
    foldAria: "Explore work by maturity",
    folds: [
      {
        number: "01",
        label: "Production",
        status: "Live",
        description: "Systems in use. Real teams. Real outcomes.",
        href: "#work",
      },
      {
        number: "02",
        label: "Live MVPs",
        status: "In progress",
        description: "Working products being validated in the market.",
        href: "#mvps",
      },
      {
        number: "03",
        label: "Concepts",
        status: "Exploring",
        description: "Ideas made tangible before the build decision.",
        href: "#concepts",
      },
      {
        number: "04",
        label: "A Oficina",
        status: "Live venture",
        description: "The workshop where the method becomes a system.",
        href: "#a-oficina",
      },
    ],
  },
  production: {
    label: "Proven in production",
    headline: "Proof, not promises.",
    intro:
      "The strongest work is not a gallery of screens. It is the path from a business constraint to something people can actually use.",
    caseStudies: [
      {
        number: "01",
        status: "Private client system",
        title: "Semantic search over support history",
        summary: "A RAG workflow that turns years of solved tickets into usable context during triage.",
        problem: "Resolutions lived inside old Freshservice tickets, so agents repeatedly solved familiar issues from scratch.",
        build: "Freshservice ingestion, Supabase pgvector, embeddings, n8n synchronization, retrieval and agent handoff.",
        outcome: "Past resolutions became available during triage as part of an automation program that reduced manual effort by 60%.",
        tags: ["RAG", "Freshservice", "Supabase", "n8n", "LLM APIs"],
        image: "/images/projects/chatguru-tool.png",
      },
      {
        number: "02",
        status: "Live product",
        title: "JIPPfy, AI on the WhatsApp API",
        summary: "A working product for businesses that need first-line WhatsApp conversations handled consistently.",
        problem: "Small teams were answering the same customer questions manually throughout the day.",
        build: "Next.js, WhatsApp API, LLM workflows, automation, conversation state and production monitoring.",
        outcome: "First-line replies run in production, with a clear escalation path for conversations that need a person.",
        tags: ["Next.js", "WhatsApp API", "AI agents", "Automation"],
        image: "/images/projects/jippfy.png",
        href: "https://www.jippfy.pt",
        linkLabel: "Open live product",
      },
      {
        number: "03",
        status: "15+ client deliveries",
        title: "CRM and ERP integration delivery",
        summary: "Integration work across the less glamorous systems where operations either flow or stop.",
        problem: "Teams retyped information between HubSpot, Pipedrive, Salesforce, SAP and custom systems.",
        build: "Discovery, process mapping, REST APIs, webhooks, n8n, Make and Python services, from scope to handoff.",
        outcome: "Projects across legal, retail, healthcare, real estate and professional services reduced manual effort by 60%.",
        tags: ["REST APIs", "Webhooks", "Python", "n8n", "Make"],
        image: "/images/projects/agency.png",
      },
    ],
    shippedLabel: "Other shipped work",
    shipped: [
      {
        title: "ChatGuru Import Tool",
        type: "Functional internal utility",
        status: "Shipped",
        href: "https://cgtools.vercel.app",
        image: "/images/projects/chatguru-tool.png",
      },
      {
        title: "The Skin Aesthetic",
        type: "Client website",
        status: "Shipped",
        href: "https://www.theskinaesthetic.pt",
        image: "/images/projects/theskinaesthetic.png",
      },
      {
        title: "BunnieMonki Agency",
        type: "Service website",
        status: "Archived delivery",
        image: "/images/projects/agency.png",
      },
    ],
  },
  mvps: {
    label: "Live MVPs",
    headline: "Small enough to learn. Real enough to fail.",
    intro:
      "MVPs are separated from mature production work on purpose. They prove a behavior, a market or an operating model, not a finished company.",
    live: {
      status: "Live beta",
      title: "BunnieMonki Marketplace",
      description:
        "A marketplace MVP built to test catalog, discovery, seller operations and the path from browsing to transaction.",
      learning:
        "The build made the operational cost of marketplace complexity visible early, before treating the concept as a mature product.",
      href: "https://bunniemonki.com",
      image: "/images/projects/bunniemonki.png",
      tags: ["Next.js", "Fastify", "PostgreSQL", "Marketplace"],
    },
  },
  concepts: {
    label: "Concepts",
    headline: "Thinking made visible.",
    intro:
      "These are product explorations, not production claims. Their value is in framing the problem, testing the flow and making a decision easier.",
    items: [
      {
        status: "Concept, 9 screens",
        title: "Padel App",
        description:
          "A multi-role product concept connecting players, clubs and organizers through schedules, events and balanced matches.",
        learning: "One shared product needs radically different priorities for each role.",
        image: "/mockups/padel-01.jpg",
        tags: ["Product design", "Multi-role flows", "Community"],
      },
      {
        status: "Concept, 8 screens",
        title: "Daillo",
        description:
          "A conversational wellbeing concept that turns a chat into a daily, inspectable supplement routine.",
        learning: "AI advice only becomes useful when it resolves into clear actions and history.",
        image: "/mockups/daillo-01.jpg",
        tags: ["AI product", "Mobile UX", "Daily workflow"],
      },
    ],
  },
  about: {
    label: "About and method",
    headline: "Somewhere between business and code.",
    intro:
      "I do not start with the technology. I start with what needs to happen, who is doing it today and where the process breaks.",
    body:
      "Six continuous years at ChatGuru took me from the first Customer Success hire to Director. Alongside that path, I ran IntegraNinja part-time and delivered integration work for clients. That mix of customers, operations, product and engineering is the reason I can translate between a business problem and the system required to solve it.",
    facts: [
      { label: "Based in", value: "Lisbon, Portugal" },
      { label: "From", value: "Brazil" },
      { label: "Work authorization", value: "European Union" },
      { label: "Availability", value: "Immediate, full-time" },
      { label: "Open to", value: "Remote EU/US, Lisbon hybrid, relocation" },
      {
        label: "Languages",
        value: "Portuguese, native; English, full professional proficiency; Spanish, basic",
      },
    ],
    methodLabel: "The method",
    methodHeadline: "Chaos in. System out.",
    method: [
      { number: "01", title: "Understand", body: "Observe the current operation and find the actual constraint." },
      { number: "02", title: "Diagnose", body: "Separate symptoms from the problem worth solving." },
      { number: "03", title: "Scope", body: "Reduce ambiguity to a measurable first system." },
      { number: "04", title: "Build", body: "Connect the smallest set of tools that can do the job reliably." },
      { number: "05", title: "Ship and learn", body: "Put it in reality, measure failure and improve the operating model." },
    ],
    careerLabel: "Career",
    careerHeadline: "One company. Four roles. One parallel studio.",
    chatguruLabel: "Primary track",
    parallelLabel: "Part-time, in parallel",
    roles: [
      {
        period: "Oct 2019 to 2020",
        role: "Customer Success Analyst",
        company: "ChatGuru",
        detail: "First CS hire, building onboarding and support workflows from the ground up.",
      },
      {
        period: "2020",
        role: "Customer Success Manager",
        company: "ChatGuru",
        detail: "Built the team and established onboarding, retention and expansion processes.",
      },
      {
        period: "Nov 2020 to Jan 2025",
        role: "Head of Operations",
        company: "ChatGuru",
        detail: "Led cross-functional teams and automation that reduced manual work by 60%.",
      },
      {
        period: "Jan 2025 to Nov 2025",
        role: "Director",
        company: "ChatGuru",
        detail: "Led strategy across product, operations and engineering, including the AI chatbot roadmap.",
      },
      {
        period: "Jul 2021 to Jan 2025",
        role: "Founder",
        company: "IntegraNinja",
        detail: "Independent integration consultancy for 15+ clients, run part-time alongside ChatGuru.",
        parallel: true,
      },
    ],
  },
  oficina: {
    label: "Everything led to this",
    headline: "A Oficina.",
    intro:
      "A live venture where the same method becomes public: understand a real problem, build the system, expose what breaks and teach from production evidence.",
    belief: "Businesses do not need more AI demos. They need systems that survive the real world.",
    liveLabel: "Live today",
    liveItems: [
      "Public academy and resource delivery",
      "Lead capture and private operations panel",
      "Content workflows for Instagram and Threads",
      "Postgres data layer, Docker and Coolify deployment",
    ],
    roadmapLabel: "Where it goes next",
    roadmap:
      "Grow the learning path and community only after the systems, content and delivery model have earned the right to scale.",
    stack: ["Next.js", "TypeScript", "Postgres", "Docker", "Automation", "Analytics"],
    cta: "Enter A Oficina",
    href: "https://aoficina.academy",
    image: "/images/a-oficina-live.png",
  },
  lab: {
    label: "Lab and offline",
    headline: "Experiments, side quests and useful mistakes.",
    intro:
      "The Lab is where small tools, AI workflows and physical ideas can be tested without pretending every experiment is a startup.",
    currently: [
      { label: "Building", value: "A Oficina and AI integration systems" },
      { label: "Learning", value: "AI and Machine Learning Engineering" },
      { label: "Exploring", value: "Reliable agents, evaluation and human handoffs" },
      { label: "Based in", value: "Lisbon" },
    ],
    offlineHeadline: "Enough about work.",
    offlineBody:
      "Outside the screen: photography, coffee, 3D printing, travel, Brazil, Portugal and making random things just to understand how they work.",
  },
  testimonials: {
    label: "What colleagues say",
    headline: "Trusted when the work gets messy.",
    items: [
      {
        quote:
          "Alexandre was our very first hire at ChatGuru. He is versatile, committed, responsible, easy to work with and someone you can trust completely.",
        name: "Fernando Cavalcanti",
        role: "CEO and Co-Founder, ChatGuru",
        initials: "FC",
      },
      {
        quote:
          "Alex played a key role in our growth. He learns fast, adapts quickly and consistently delivered what we needed, even in the most demanding moments.",
        name: "Iaron Simis",
        role: "Co-Founder and CTO, ChatGuru",
        initials: "IS",
      },
    ],
  },
  contact: {
    eyebrow: "Have a messy problem?",
    headline: "I like those.",
    response: "Tell me what needs to work in the real world.",
    availability: "Available immediately for full-time roles",
    eligibility: "Based in Lisbon, authorized to work in the EU",
    relocation: "Open to remote EU/US, Lisbon hybrid and relocation",
    emailLabel: "Email Alexandre",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: {
    note: "Made with an unreasonable amount of attention to detail.",
    copyright: "© 2026 Alexandre Jaques",
  },
}

const pt: PortfolioCopy = {
  nav: {
    work: "Projetos",
    mvps: "MVPs",
    lab: "Lab",
    oficina: "A Oficina",
    about: "Sobre",
    talk: "Vamos conversar",
  },
  hero: {
    name: "Alexandre Jaques",
    title: "AI Integration Engineer",
    chaos: "CAOS",
    in: "ENTRA.",
    systemWord: "SISTEMA",
    out: "SAI.",
    statementPrefix: "LLMs, APIs e automação para",
    statementEmphasis: "sistemas reais de negócio.",
    status: "Disponível agora",
    location: "Lisboa, Portugal",
    system: {
      note: "o problema do negócio primeiro",
      inputs: [
        { label: "Clientes", detail: "necessidades pouco claras" },
        { label: "E-mail", detail: "sem estrutura" },
        { label: "CRM", detail: "em silos" },
        { label: "Dados", detail: "espalhados" },
        { label: "APIs", detail: "inconsistentes" },
      ],
      stages: [
        { number: "1", label: "Entender", actions: ["Descobrir", "Clarificar", "Mapear contexto"] },
        { number: "2", label: "Conectar", actions: ["Integrar", "Orquestrar", "Validar"] },
        { number: "3", label: "Entregar", actions: ["Automatizar", "Publicar", "Medir"] },
      ],
      result: { label: "Sistemas funcionando", status: "No ar" },
      outputs: [
        { label: "Ferramentas internas", detail: "operação mais rápida" },
        { label: "Agentes de IA", detail: "execução confiável" },
        { label: "Automações", detail: "menos trabalho manual" },
        { label: "Insights", detail: "decisões melhores" },
        { label: "Integrações", detail: "stack conectada" },
      ],
    },
    foldAria: "Explorar projetos por maturidade",
    folds: [
      {
        number: "01",
        label: "Produção",
        status: "No ar",
        description: "Sistemas em uso. Equipes reais. Resultados reais.",
        href: "#work",
      },
      {
        number: "02",
        label: "MVPs no ar",
        status: "Em andamento",
        description: "Produtos funcionais sendo validados no mercado.",
        href: "#mvps",
      },
      {
        number: "03",
        label: "Conceitos",
        status: "Explorando",
        description: "Ideias tangíveis antes da decisão de construir.",
        href: "#concepts",
      },
      {
        number: "04",
        label: "A Oficina",
        status: "Projeto no ar",
        description: "A oficina onde o método vira sistema.",
        href: "#a-oficina",
      },
    ],
  },
  production: {
    label: "Comprovado em produção",
    headline: "Provas, não promessas.",
    intro:
      "Os melhores projetos não são uma galeria de telas. São o caminho de uma restrição do negócio até algo que as pessoas conseguem usar.",
    caseStudies: [
      {
        number: "01",
        status: "Sistema privado de cliente",
        title: "Busca semântica no histórico de suporte",
        summary: "Um workflow RAG que transforma anos de tickets resolvidos em contexto útil durante a triagem.",
        problem: "As resoluções ficavam presas em tickets antigos do Freshservice, então os agentes repetiam soluções do zero.",
        build: "Ingestão do Freshservice, Supabase pgvector, embeddings, sincronização em n8n, retrieval e handoff para agentes.",
        outcome: "Resoluções antigas passaram a aparecer na triagem, dentro de um programa de automação que reduziu o esforço manual em 60%.",
        tags: ["RAG", "Freshservice", "Supabase", "n8n", "APIs de LLM"],
        image: "/images/projects/chatguru-tool.png",
      },
      {
        number: "02",
        status: "Produto no ar",
        title: "JIPPfy, IA na WhatsApp API",
        summary: "Um produto funcional para negócios que precisam manter a primeira linha de atendimento do WhatsApp consistente.",
        problem: "Equipes pequenas respondiam manualmente às mesmas dúvidas de clientes ao longo do dia.",
        build: "Next.js, WhatsApp API, workflows de LLM, automação, estado das conversas e monitoramento em produção.",
        outcome: "As respostas de primeira linha rodam em produção, com um caminho claro de escalada para conversas que precisam de uma pessoa.",
        tags: ["Next.js", "WhatsApp API", "Agentes de IA", "Automação"],
        image: "/images/projects/jippfy.png",
        href: "https://www.jippfy.pt",
        linkLabel: "Abrir produto no ar",
      },
      {
        number: "03",
        status: "Mais de 15 entregas",
        title: "Entrega de integrações CRM e ERP",
        summary: "Integrações nos sistemas menos glamorosos onde a operação flui ou para.",
        problem: "Equipes redigitavam informações entre HubSpot, Pipedrive, Salesforce, SAP e sistemas customizados.",
        build: "Descoberta, mapeamento do processo, REST APIs, webhooks, n8n, Make e serviços Python, do escopo ao handoff.",
        outcome: "Projetos em jurídico, varejo, saúde, imobiliário e serviços profissionais reduziram o esforço manual em 60%.",
        tags: ["REST APIs", "Webhooks", "Python", "n8n", "Make"],
        image: "/images/projects/agency.png",
      },
    ],
    shippedLabel: "Outros projetos entregues",
    shipped: [
      {
        title: "ChatGuru Import Tool",
        type: "Ferramenta interna funcional",
        status: "Entregue",
        href: "https://cgtools.vercel.app",
        image: "/images/projects/chatguru-tool.png",
      },
      {
        title: "The Skin Aesthetic",
        type: "Site de cliente",
        status: "Entregue",
        href: "https://www.theskinaesthetic.pt",
        image: "/images/projects/theskinaesthetic.png",
      },
      {
        title: "BunnieMonki Agency",
        type: "Site de serviços",
        status: "Entrega arquivada",
        image: "/images/projects/agency.png",
      },
    ],
  },
  mvps: {
    label: "MVPs no ar",
    headline: "Pequeno para aprender. Real para falhar.",
    intro:
      "MVPs ficam separados do trabalho maduro em produção de propósito. Eles validam um comportamento, um mercado ou um modelo de operação, não uma empresa pronta.",
    live: {
      status: "Beta no ar",
      title: "BunnieMonki Marketplace",
      description:
        "Um MVP de marketplace construído para testar catálogo, descoberta, operação de vendedores e o caminho da navegação até a transação.",
      learning:
        "O projeto deixou o custo operacional da complexidade de um marketplace visível antes de tratar o conceito como produto maduro.",
      href: "https://bunniemonki.com",
      image: "/images/projects/bunniemonki.png",
      tags: ["Next.js", "Fastify", "PostgreSQL", "Marketplace"],
    },
  },
  concepts: {
    label: "Conceitos",
    headline: "Pensamento visível.",
    intro:
      "Estas são explorações de produto, não alegações de produção. O valor está em enquadrar o problema, testar o fluxo e facilitar uma decisão.",
    items: [
      {
        status: "Conceito, 9 telas",
        title: "Padel App",
        description:
          "Um conceito multiperfil conectando jogadores, clubes e organizadores por agendas, eventos e partidas equilibradas.",
        learning: "Um único produto precisa atender prioridades radicalmente diferentes para cada perfil.",
        image: "/mockups/padel-01.jpg",
        tags: ["Product design", "Fluxos multiperfil", "Comunidade"],
      },
      {
        status: "Conceito, 8 telas",
        title: "Daillo",
        description:
          "Um conceito conversacional de bem-estar que transforma um chat numa rotina diária e verificável de suplementos.",
        learning: "Conselhos de IA só ficam úteis quando se transformam em ações claras e histórico.",
        image: "/mockups/daillo-01.jpg",
        tags: ["Produto de IA", "UX mobile", "Workflow diário"],
      },
    ],
  },
  about: {
    label: "Sobre e método",
    headline: "Em algum lugar entre negócio e código.",
    intro:
      "Eu não começo pela tecnologia. Começo pelo que precisa acontecer, por quem faz isso hoje e por onde o processo quebra.",
    body:
      "Seis anos contínuos na ChatGuru me levaram de primeiro contratado de Customer Success a Director. Em paralelo, mantive a IntegraNinja part-time e entreguei integrações para clientes. Essa mistura de clientes, operações, produto e engenharia é a razão pela qual consigo traduzir um problema do negócio no sistema necessário para resolvê-lo.",
    facts: [
      { label: "Baseado em", value: "Lisboa, Portugal" },
      { label: "De", value: "Brasil" },
      { label: "Permissão de trabalho", value: "União Europeia" },
      { label: "Disponibilidade", value: "Imediata, full-time" },
      { label: "Aberto a", value: "Remoto EU/US, híbrido em Lisboa, relocation" },
      {
        label: "Idiomas",
        value: "Português nativo; inglês com proficiência profissional plena; espanhol básico",
      },
    ],
    methodLabel: "O método",
    methodHeadline: "Caos entra. Sistema sai.",
    method: [
      { number: "01", title: "Entender", body: "Observar a operação atual e encontrar a restrição de verdade." },
      { number: "02", title: "Diagnosticar", body: "Separar os sintomas do problema que vale a pena resolver." },
      { number: "03", title: "Definir escopo", body: "Reduzir a ambiguidade ao primeiro sistema mensurável." },
      { number: "04", title: "Construir", body: "Conectar o menor conjunto de ferramentas que faça o trabalho com confiança." },
      { number: "05", title: "Entregar e aprender", body: "Colocar na realidade, medir falhas e melhorar o modelo operacional." },
    ],
    careerLabel: "Carreira",
    careerHeadline: "Uma empresa. Quatro cargos. Um estúdio em paralelo.",
    chatguruLabel: "Trilha principal",
    parallelLabel: "Part-time, em paralelo",
    roles: [
      {
        period: "out 2019 a 2020",
        role: "Customer Success Analyst",
        company: "ChatGuru",
        detail: "Primeiro contratado de CS, construindo onboarding e suporte desde o início.",
      },
      {
        period: "2020",
        role: "Customer Success Manager",
        company: "ChatGuru",
        detail: "Construí a equipe e os processos de onboarding, retenção e expansão.",
      },
      {
        period: "nov 2020 a jan 2025",
        role: "Head of Operations",
        company: "ChatGuru",
        detail: "Liderei equipes multifuncionais e automações que reduziram o trabalho manual em 60%.",
      },
      {
        period: "jan 2025 a nov 2025",
        role: "Director",
        company: "ChatGuru",
        detail: "Liderei estratégia em produto, operações e engenharia, incluindo o roadmap do chatbot de IA.",
      },
      {
        period: "jul 2021 a jan 2025",
        role: "Founder",
        company: "IntegraNinja",
        detail: "Consultoria independente de integrações para mais de 15 clientes, mantida part-time em paralelo à ChatGuru.",
        parallel: true,
      },
    ],
  },
  oficina: {
    label: "Tudo levou até aqui",
    headline: "A Oficina.",
    intro:
      "Um projeto no ar onde o mesmo método se torna público: entender um problema real, construir o sistema, mostrar o que quebra e ensinar a partir de evidências de produção.",
    belief: "Negócios não precisam de mais demos de IA. Precisam de sistemas que sobrevivam à realidade.",
    liveLabel: "No ar hoje",
    liveItems: [
      "Academia pública e entrega de materiais",
      "Captação de leads e painel privado de operação",
      "Workflows de conteúdo para Instagram e Threads",
      "Postgres, Docker e deploy no Coolify",
    ],
    roadmapLabel: "O que vem depois",
    roadmap:
      "Expandir a jornada de aprendizado e a comunidade apenas depois de os sistemas, o conteúdo e a entrega conquistarem o direito de escalar.",
    stack: ["Next.js", "TypeScript", "Postgres", "Docker", "Automação", "Analytics"],
    cta: "Entrar n'A Oficina",
    href: "https://aoficina.academy",
    image: "/images/a-oficina-live.png",
  },
  lab: {
    label: "Lab e offline",
    headline: "Experimentos, desvios e erros úteis.",
    intro:
      "O Lab é onde pequenas ferramentas, workflows de IA e ideias físicas podem ser testados sem fingir que cada experimento é uma startup.",
    currently: [
      { label: "Construindo", value: "A Oficina e sistemas de integração com IA" },
      { label: "Aprendendo", value: "Engenharia de IA e Machine Learning" },
      { label: "Explorando", value: "Agentes confiáveis, avaliação e handoffs humanos" },
      { label: "Baseado em", value: "Lisboa" },
    ],
    offlineHeadline: "Chega de trabalho.",
    offlineBody:
      "Fora da tela: fotografia, café, impressão 3D, viagens, Brasil, Portugal e coisas aleatórias feitas só para entender como funcionam.",
  },
  testimonials: {
    label: "O que colegas dizem",
    headline: "Confiança quando o trabalho fica confuso.",
    items: [
      {
        quote:
          "O Alexandre foi a nossa primeira contratação na ChatGuru. É versátil, comprometido, responsável, fácil de trabalhar e alguém em quem se pode confiar completamente.",
        name: "Fernando Cavalcanti",
        role: "CEO e Co-Fundador, ChatGuru",
        initials: "FC",
      },
      {
        quote:
          "O Alex teve um papel fundamental no nosso crescimento. Aprende rápido, adapta-se e entrega o que precisamos, mesmo nos momentos mais exigentes.",
        name: "Iaron Simis",
        role: "Co-Fundador e CTO, ChatGuru",
        initials: "IS",
      },
    ],
  },
  contact: {
    eyebrow: "Tem um problema confuso?",
    headline: "Eu gosto desses.",
    response: "Conte o que precisa funcionar no mundo real.",
    availability: "Disponível imediatamente para vagas full-time",
    eligibility: "Baseado em Lisboa, autorizado a trabalhar na UE",
    relocation: "Aberto a remoto EU/US, híbrido em Lisboa e relocation",
    emailLabel: "Enviar e-mail",
    linkedin: "LinkedIn",
    github: "GitHub",
  },
  footer: {
    note: "Feito com uma quantidade pouco razoável de atenção aos detalhes.",
    copyright: "© 2026 Alexandre Jaques",
  },
}

export const portfolioCopy: Record<Locale, PortfolioCopy> = { en, pt }
