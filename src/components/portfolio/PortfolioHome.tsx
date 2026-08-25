"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  Sparkle,
  Wrench,
} from "@phosphor-icons/react"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

import { FoldMenu, type FoldMenuItem } from "@/components/portfolio/FoldMenu"
import {
  SystemMap,
  type SystemMapCopy,
} from "@/components/portfolio/SystemMap"
import { portfolioCopy } from "@/content/portfolio"
import { useTranslation } from "@/lib/i18n"

import styles from "./PortfolioHome.module.css"

const statusTones: FoldMenuItem["statusTone"][] = [
  "live",
  "progress",
  "neutral",
  "studio",
]

const ui = {
  en: {
    skip: "Skip to content",
    systemAria: "How business chaos becomes a working system",
    portraitAlt: "Portrait of Alexandre Jaques",
    inputs: "Business inputs",
    process: "System delivery process",
    outputs: "Working outputs",
    problem: "Problem",
    build: "Build",
    outcome: "Outcome",
    learning: "What it proved",
    openProject: "Open project",
    newWindow: "opens in a new window",
    primaryTrack: "ChatGuru, primary track",
    parallelTrack: "IntegraNinja, part-time in parallel",
    scroll: "Explore the work",
    emailSubject: "A messy problem worth solving",
    primaryNav: "Primary navigation",
    language: "Language",
    technologies: "Technologies",
    disciplines: "Disciplines",
    oficinaAlt: "A Oficina website",
    careerSpan: "Oct 2019 to Nov 2025",
  },
  pt: {
    skip: "Ir para o conteúdo",
    systemAria: "Como o caos do negócio vira um sistema funcional",
    portraitAlt: "Retrato de Alexandre Jaques",
    inputs: "Entradas do negócio",
    process: "Processo de entrega do sistema",
    outputs: "Resultados funcionais",
    problem: "Problema",
    build: "Construção",
    outcome: "Resultado",
    learning: "O que validou",
    openProject: "Abrir projeto",
    newWindow: "abre em uma nova janela",
    primaryTrack: "ChatGuru, trilha principal",
    parallelTrack: "IntegraNinja, part-time em paralelo",
    scroll: "Explorar os projetos",
    emailSubject: "Um problema complexo que vale resolver",
    primaryNav: "Navegação principal",
    language: "Idioma",
    technologies: "Tecnologias",
    disciplines: "Disciplinas",
    oficinaAlt: "Site da A Oficina",
    careerSpan: "out 2019 a nov 2025",
  },
} as const

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

function ExternalLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string
  children: ReactNode
  className?: string
  ariaLabel?: string
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}

function SectionHeading({
  headingId,
  index,
  label,
  headline,
  intro,
  inverted = false,
}: {
  headingId: string
  index: string
  label: string
  headline: string
  intro: string
  inverted?: boolean
}) {
  return (
    <Reveal className={`${styles.sectionHeading} ${inverted ? styles.inverted : ""}`}>
      <div className={styles.sectionMarker}>
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <h2 id={headingId}>{headline}</h2>
      <p>{intro}</p>
    </Reveal>
  )
}

export function PortfolioHome() {
  const { locale, setLocale } = useTranslation()
  const copy = portfolioCopy[locale]
  const labels = ui[locale]

  const system = copy.hero.system
  const systemMapCopy: SystemMapCopy = {
    ariaLabel: labels.systemAria,
    chaosLabel: copy.hero.chaos,
    inLabel: copy.hero.in.replace(/\.$/, ""),
    systemLabel: copy.hero.systemWord,
    outLabel: copy.hero.out.replace(/\.$/, ""),
    portraitAlt: labels.portraitAlt,
    portraitName: copy.hero.name,
    portraitRole: copy.hero.title,
    inputNote: system.note,
    inputGroupLabel: labels.inputs,
    inputs: {
      customers: system.inputs[0],
      email: system.inputs[1],
      crm: system.inputs[2],
      data: system.inputs[3],
      apis: system.inputs[4],
    },
    processGroupLabel: labels.process,
    stages: {
      understand: {
        label: system.stages[0].label,
        steps: system.stages[0].actions,
      },
      connect: {
        label: system.stages[1].label,
        steps: system.stages[1].actions,
      },
      ship: {
        label: system.stages[2].label,
        steps: system.stages[2].actions,
      },
    },
    result: {
      label: system.result.label,
      detail: system.result.status,
    },
    outputGroupLabel: labels.outputs,
    outputs: {
      internalTools: system.outputs[0],
      aiAgents: system.outputs[1],
      automations: system.outputs[2],
      insights: system.outputs[3],
      integrations: system.outputs[4],
    },
  }

  const foldItems: FoldMenuItem[] = copy.hero.folds.map((item, index) => ({
    ...item,
    statusTone: statusTones[index],
  }))

  const mailHref = `mailto:alexandrjaques@gmail.com?subject=${encodeURIComponent(labels.emailSubject)}`

  return (
    <div className={styles.root}>
      <a className={styles.skipLink} href="#content">
        {labels.skip}
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top" aria-label={`${copy.hero.name}, ${copy.hero.title}`}>
            <span className={styles.monogram}>AJ.</span>
            <span className={styles.identity}>
              <strong>{copy.hero.name}</strong>
              <small>{copy.hero.title}</small>
            </span>
          </a>

          <nav className={styles.primaryNav} aria-label={labels.primaryNav}>
            <a href="#work">{copy.nav.work}</a>
            <a href="#mvps">{copy.nav.mvps}</a>
            <a href="#lab">{copy.nav.lab}</a>
            <a href="#a-oficina">{copy.nav.oficina}</a>
            <a href="#about">{copy.nav.about}</a>
          </nav>

          <div className={styles.headerActions}>
            <div className={styles.language} aria-label={labels.language} role="group">
              <button
                type="button"
                aria-pressed={locale === "en"}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                aria-pressed={locale === "pt"}
                onClick={() => setLocale("pt")}
              >
                PT
              </button>
            </div>
            <a className={styles.headerCta} href={mailHref}>
              {copy.nav.talk}
              <ArrowUpRight aria-hidden="true" size={16} weight="bold" />
            </a>
          </div>
        </div>
      </header>

      <main id="content">
        <section className={styles.hero} id="top" aria-labelledby="hero-title">
          <h1 className={styles.srOnly} id="hero-title">
            {copy.hero.name}, {copy.hero.title}. {copy.hero.chaos} {copy.hero.in} {copy.hero.systemWord} {copy.hero.out}
          </h1>

          <div className={styles.heroMeta}>
            <span className={styles.availability}>
              <i aria-hidden="true" />
              {copy.hero.status}
            </span>
            <span>
              <MapPin aria-hidden="true" size={15} />
              {copy.hero.location}
            </span>
            <a href="#work">
              {labels.scroll}
              <ArrowDown aria-hidden="true" size={15} />
            </a>
          </div>

          <div className={styles.mapFrame}>
            <div className={styles.heroStatement}>
              <span>{copy.hero.statementPrefix}</span>
              <strong>{copy.hero.statementEmphasis}</strong>
            </div>
            <SystemMap copy={systemMapCopy} />
          </div>

          <FoldMenu
            ariaLabel={copy.hero.foldAria}
            className={styles.foldMenu}
            initialActiveIndex={3}
            items={foldItems}
          />
        </section>

        <section className={styles.section} id="work" aria-labelledby="production-heading">
          <div className={styles.container}>
            <SectionHeading
              headingId="production-heading"
              index="01"
              label={copy.production.label}
              headline={copy.production.headline}
              intro={copy.production.intro}
            />

            <div className={styles.caseList}>
              {copy.production.caseStudies.map((project, index) => (
                <Reveal
                  className={`${styles.caseStudy} ${index % 2 ? styles.caseReverse : ""}`}
                  key={project.title}
                >
                  <figure className={styles.caseVisual}>
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(max-width: 820px) 100vw, 52vw"
                    />
                    <figcaption>
                      <span>{project.number}</span>
                      <span>{project.status}</span>
                    </figcaption>
                  </figure>

                  <article className={styles.caseCopy}>
                    <div className={styles.caseKicker}>
                      <span>{project.number}</span>
                      <span className={styles.statusLine}>{project.status}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className={styles.caseSummary}>{project.summary}</p>

                    <dl className={styles.proofList}>
                      <div>
                        <dt>{labels.problem}</dt>
                        <dd>{project.problem}</dd>
                      </div>
                      <div>
                        <dt>{labels.build}</dt>
                        <dd>{project.build}</dd>
                      </div>
                      <div className={styles.outcomeRow}>
                        <dt>{labels.outcome}</dt>
                        <dd>{project.outcome}</dd>
                      </div>
                    </dl>

                    <div className={styles.caseFooter}>
                      <ul className={styles.tags} aria-label={labels.technologies}>
                        {project.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      {project.href ? (
                        <ExternalLink
                          href={project.href}
                          className={styles.textLink}
                          ariaLabel={`${project.linkLabel ?? labels.openProject}, ${labels.newWindow}`}
                        >
                          {project.linkLabel ?? labels.openProject}
                          <ArrowUpRight aria-hidden="true" size={18} />
                        </ExternalLink>
                      ) : null}
                      {project.secondaryHref ? (
                        <Link
                          href={project.secondaryHref}
                          className={styles.textLink}
                        >
                          {project.secondaryLabel ?? labels.openProject}
                          <ArrowUpRight aria-hidden="true" size={18} />
                        </Link>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className={styles.shippedBlock}>
              <div className={styles.subheading}>
                <span>01.B</span>
                <h3>{copy.production.shippedLabel}</h3>
              </div>
              <div className={styles.shippedList}>
                {copy.production.shipped.map((project, index) => {
                  const rowContent = (
                    <>
                      <span className={styles.shippedNumber}>0{index + 1}</span>
                      <span className={styles.shippedThumb}>
                        <Image src={project.image} alt="" fill sizes="120px" />
                      </span>
                      <span className={styles.shippedTitle}>{project.title}</span>
                      <span className={styles.shippedType}>{project.type}</span>
                      <span className={styles.shippedStatus}>
                        <i aria-hidden="true" />
                        {project.status}
                      </span>
                      {project.href ? (
                        <ArrowUpRight aria-hidden="true" size={20} />
                      ) : (
                        <span className={styles.shippedNoLink} aria-hidden="true">•</span>
                      )}
                    </>
                  )

                  return project.href ? (
                    <ExternalLink
                      className={styles.shippedRow}
                      href={project.href}
                      key={project.title}
                      ariaLabel={`${project.title}, ${labels.newWindow}`}
                    >
                      {rowContent}
                    </ExternalLink>
                  ) : (
                    <div className={styles.shippedRow} key={project.title}>
                      {rowContent}
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.maturitySection}`} id="mvps" aria-labelledby="mvp-heading">
          <div className={styles.container}>
            <SectionHeading
              headingId="mvp-heading"
              index="02"
              label={copy.mvps.label}
              headline={copy.mvps.headline}
              intro={copy.mvps.intro}
            />

            <Reveal className={styles.mvpFeature}>
              <div className={styles.mvpImage}>
                <Image
                  src={copy.mvps.live.image}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 62vw"
                />
                <span>{copy.mvps.live.status}</span>
              </div>
              <article className={styles.mvpCopy}>
                <div className={styles.liveStamp}>
                  <span aria-hidden="true" />
                  {copy.mvps.live.status}
                </div>
                <h3>{copy.mvps.live.title}</h3>
                <p>{copy.mvps.live.description}</p>
                <div className={styles.learningNote}>
                  <Sparkle aria-hidden="true" size={22} weight="light" />
                  <div>
                    <span>{labels.learning}</span>
                    <p>{copy.mvps.live.learning}</p>
                  </div>
                </div>
                <ul className={styles.tags} aria-label={labels.technologies}>
                  {copy.mvps.live.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <ExternalLink
                  href={copy.mvps.live.href}
                  className={styles.blockLink}
                  ariaLabel={`${labels.openProject}, ${labels.newWindow}`}
                >
                  {labels.openProject}
                  <ArrowUpRight aria-hidden="true" size={20} />
                </ExternalLink>
              </article>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.conceptsSection}`} id="concepts" aria-labelledby="concepts-heading">
          <div className={styles.container}>
            <SectionHeading
              headingId="concepts-heading"
              index="03"
              label={copy.concepts.label}
              headline={copy.concepts.headline}
              intro={copy.concepts.intro}
            />

            <div className={styles.conceptGrid}>
              {copy.concepts.items.map((concept, index) => (
                <Reveal className={styles.conceptCard} delay={index * 0.08} key={concept.title}>
                  <figure className={styles.conceptVisual}>
                    <span className={styles.conceptIndex}>0{index + 1}</span>
                    <Image
                      src={concept.image}
                      alt=""
                      fill
                      sizes="(max-width: 720px) 100vw, 48vw"
                    />
                    <figcaption>{concept.status}</figcaption>
                  </figure>
                  <div className={styles.conceptCopy}>
                    <h3>{concept.title}</h3>
                    <p>{concept.description}</p>
                    <div className={styles.conceptLearning}>
                      <span>{labels.learning}</span>
                      <p>{concept.learning}</p>
                    </div>
                    <ul className={styles.tags} aria-label={labels.disciplines}>
                      {concept.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="about" aria-labelledby="about-heading">
          <div className={styles.container}>
            <SectionHeading
              headingId="about-heading"
              index="04"
              label={copy.about.label}
              headline={copy.about.headline}
              intro={copy.about.intro}
            />

            <Reveal className={styles.aboutIntro}>
              <div className={styles.aboutPortrait}>
                <Image
                  src="/images/portrait-editorial.jpg"
                  alt={labels.portraitAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 34vw"
                />
                <span>{copy.hero.name}<br />{copy.hero.location}</span>
              </div>
              <div className={styles.aboutText}>
                <p>{copy.about.body}</p>
                <dl className={styles.factGrid}>
                  {copy.about.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal className={styles.methodBlock}>
              <div className={styles.subheading}>
                <span>{copy.about.methodLabel}</span>
                <h3>{copy.about.methodHeadline}</h3>
              </div>
              <ol className={styles.methodList}>
                {copy.about.method.map((step) => (
                  <li key={step.number}>
                    <span className={styles.methodNumber}>{step.number}</span>
                    <span className={styles.methodDot} aria-hidden="true" />
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className={styles.careerBlock}>
              <div className={styles.subheading}>
                <span>{copy.about.careerLabel}</span>
                <h3>{copy.about.careerHeadline}</h3>
              </div>
              <div className={styles.careerTracks}>
                <div className={styles.careerTrack} aria-label={labels.primaryTrack} role="group">
                  <div className={styles.trackLabel}>
                    <span>{copy.about.chatguruLabel}</span>
                    <strong>ChatGuru</strong>
                    <small>{labels.careerSpan}</small>
                  </div>
                  <ol>
                    {copy.about.roles.filter((role) => !role.parallel).map((role) => (
                      <li key={`${role.period}-${role.role}`}>
                        <span>{role.period}</span>
                        <h4>{role.role}</h4>
                        <p>{role.detail}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                {copy.about.roles.filter((role) => role.parallel).map((role) => (
                  <article className={styles.parallelTrack} aria-label={labels.parallelTrack} key={role.role}>
                    <span>{copy.about.parallelLabel}</span>
                    <strong>{role.company}</strong>
                    <h4>{role.role}</h4>
                    <small>{role.period}</small>
                    <p>{role.detail}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.oficinaSection} id="a-oficina" aria-labelledby="oficina-heading">
          <div className={styles.container}>
            <SectionHeading
              headingId="oficina-heading"
              index="05"
              label={copy.oficina.label}
              headline={copy.oficina.headline}
              intro={copy.oficina.intro}
              inverted
            />

            <Reveal className={styles.oficinaHero}>
              <div className={styles.oficinaVisual}>
                <Image
                  src={copy.oficina.image}
                  alt={labels.oficinaAlt}
                  fill
                  sizes="(max-width: 820px) 100vw, 68vw"
                />
              </div>
              <blockquote>{copy.oficina.belief}</blockquote>
            </Reveal>

            <Reveal className={styles.oficinaDetails}>
              <div className={styles.livePanel}>
                <h3>
                  <span aria-hidden="true" />
                  {copy.oficina.liveLabel}
                </h3>
                <ul>
                  {copy.oficina.liveItems.map((item) => (
                    <li key={item}>
                      <CheckCircle aria-hidden="true" size={18} weight="light" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.roadmapPanel}>
                <span>{copy.oficina.roadmapLabel}</span>
                <p>{copy.oficina.roadmap}</p>
                <ul className={styles.darkTags} aria-label={labels.technologies}>
                  {copy.oficina.stack.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <ExternalLink
                href={copy.oficina.href}
                className={styles.oficinaCta}
                ariaLabel={`${copy.oficina.cta}, ${labels.newWindow}`}
              >
                <Wrench aria-hidden="true" size={25} weight="light" />
                <span>{copy.oficina.cta}</span>
                <ArrowUpRight aria-hidden="true" size={26} />
              </ExternalLink>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.labSection}`} id="lab" aria-labelledby="lab-heading">
          <div className={styles.container}>
            <SectionHeading
              headingId="lab-heading"
              index="06"
              label={copy.lab.label}
              headline={copy.lab.headline}
              intro={copy.lab.intro}
            />

            <div className={styles.labGrid}>
              <Reveal className={styles.currentlyBoard}>
                <div className={styles.boardHeader}>
                  <span>STATUS BOARD</span>
                  <span>{copy.hero.location}</span>
                </div>
                <dl>
                  {copy.lab.currently.map((item, index) => (
                    <div key={item.label}>
                      <dt>0{index + 1} / {item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className={styles.offlineStory} delay={0.08}>
                <div className={styles.offlineImages}>
                  <div className={styles.offlineImageBack}>
                    <Image
                      src="/images/portrait-venetian.jpg"
                      alt={labels.portraitAlt}
                      fill
                      sizes="(max-width: 760px) 70vw, 28vw"
                    />
                  </div>
                  <div className={styles.offlineImageFront}>
                    <Image
                      src="/images/portrait-warm.png"
                      alt=""
                      fill
                      sizes="(max-width: 760px) 44vw, 18vw"
                    />
                  </div>
                </div>
                <div className={styles.offlineCopy}>
                  <h3>{copy.lab.offlineHeadline}</h3>
                  <p>{copy.lab.offlineBody}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.testimonialSection}`} aria-labelledby="testimonials-heading">
          <div className={styles.container}>
            <SectionHeading
              headingId="testimonials-heading"
              index="07"
              label={copy.testimonials.label}
              headline={copy.testimonials.headline}
              intro=""
            />
            <div className={styles.testimonialGrid}>
              {copy.testimonials.items.map((testimonial, index) => (
                <Reveal className={styles.testimonial} delay={index * 0.08} key={testimonial.name}>
                  <span className={styles.quoteMark} aria-hidden="true">“</span>
                  <blockquote>{testimonial.quote}</blockquote>
                  <footer>
                    <span className={styles.initials}>{testimonial.initials}</span>
                    <span>
                      <strong>{testimonial.name}</strong>
                      <small>{testimonial.role}</small>
                    </span>
                  </footer>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contactSection} id="contact" aria-labelledby="contact-heading">
          <div className={styles.contactGrid}>
            <div className={styles.contactHeader}>
              <span>{copy.contact.eyebrow}</span>
              <h2 id="contact-heading">{copy.contact.headline}</h2>
              <p>{copy.contact.response}</p>
            </div>
            <div className={styles.contactFacts}>
              <span>{copy.contact.availability}</span>
              <span>{copy.contact.eligibility}</span>
              <span>{copy.contact.relocation}</span>
            </div>
            <a className={styles.emailLink} href={mailHref}>
              <EnvelopeSimple aria-hidden="true" size={28} weight="light" />
              <span>{copy.contact.emailLabel}</span>
              <ArrowRight aria-hidden="true" size={30} />
            </a>
            <div className={styles.socialLinks}>
              <ExternalLink
                href="https://www.linkedin.com/in/alexandrejaques"
                ariaLabel={`${copy.contact.linkedin}, ${labels.newWindow}`}
              >
                <LinkedinLogo aria-hidden="true" size={20} />
                {copy.contact.linkedin}
                <ArrowUpRight aria-hidden="true" size={15} />
              </ExternalLink>
              <ExternalLink
                href="https://github.com/alexandre2120"
                ariaLabel={`${copy.contact.github}, ${labels.newWindow}`}
              >
                <GithubLogo aria-hidden="true" size={20} />
                {copy.contact.github}
                <ArrowUpRight aria-hidden="true" size={15} />
              </ExternalLink>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>{copy.footer.copyright}</span>
          <span>{copy.footer.note}</span>
          <a href="#top">
            TOP
            <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </footer>
      </main>
    </div>
  )
}
