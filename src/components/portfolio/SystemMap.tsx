"use client"

import Image from "next/image"
import {
  ArrowBendDownRight,
  ChartLineUp,
  Circle,
  Code,
  Database,
  EnvelopeSimple,
  GridFour,
  Lightning,
  PuzzlePiece,
  Robot,
  UsersThree,
  Wrench,
  type Icon,
} from "@phosphor-icons/react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

import styles from "./SystemMap.module.css"

export type SystemMapNodeCopy = {
  label: string
  detail: string
}

export type SystemMapStageCopy = {
  label: string
  steps: string[]
}

export type SystemMapCopy = {
  ariaLabel: string
  chaosLabel: string
  inLabel: string
  systemLabel: string
  outLabel: string
  portraitAlt: string
  portraitName: string
  portraitRole: string
  inputNote: string
  inputGroupLabel: string
  inputs: {
    customers: SystemMapNodeCopy
    email: SystemMapNodeCopy
    crm: SystemMapNodeCopy
    data: SystemMapNodeCopy
    apis: SystemMapNodeCopy
  }
  processGroupLabel: string
  stages: {
    understand: SystemMapStageCopy
    connect: SystemMapStageCopy
    ship: SystemMapStageCopy
  }
  result: SystemMapNodeCopy
  outputGroupLabel: string
  outputs: {
    internalTools: SystemMapNodeCopy
    aiAgents: SystemMapNodeCopy
    automations: SystemMapNodeCopy
    insights: SystemMapNodeCopy
    integrations: SystemMapNodeCopy
  }
}

export type SystemMapProps = {
  copy: SystemMapCopy
  className?: string
}

const INPUT_NODES = [
  { key: "customers", Icon: UsersThree },
  { key: "email", Icon: EnvelopeSimple },
  { key: "crm", Icon: GridFour },
  { key: "data", Icon: Database },
  { key: "apis", Icon: Code },
] as const satisfies ReadonlyArray<{
  key: keyof SystemMapCopy["inputs"]
  Icon: Icon
}>

const PROCESS_STAGES = ["understand", "connect", "ship"] as const satisfies
  ReadonlyArray<keyof SystemMapCopy["stages"]>

const OUTPUT_NODES = [
  { key: "internalTools", Icon: ChartLineUp },
  { key: "aiAgents", Icon: Robot },
  { key: "automations", Icon: Lightning },
  { key: "insights", Icon: Wrench },
  { key: "integrations", Icon: PuzzlePiece },
] as const satisfies ReadonlyArray<{
  key: keyof SystemMapCopy["outputs"]
  Icon: Icon
}>

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.085,
    },
  },
}

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const portraitVariants: Variants = {
  hidden: { opacity: 0, y: -16, rotate: -1.8 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: -0.6,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const lineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1.1, delay: 0.3, ease: [0.65, 0, 0.35, 1] },
  },
}

function NodeCard({
  node,
  IconComponent,
  variant,
}: {
  node: SystemMapNodeCopy
  IconComponent: Icon
  variant: "input" | "output"
}) {
  const variantClassName = variant === "output" ? styles.output : ""

  return (
    <div className={`${styles.nodeCard} ${variantClassName}`}>
      <IconComponent aria-hidden="true" size={17} weight="light" />
      <span className={styles.nodeText}>
        <strong>{node.label}</strong>
        <small>{node.detail}</small>
      </span>
    </div>
  )
}

export function SystemMap({ copy, className }: SystemMapProps) {
  const shouldReduceMotion = useReducedMotion()
  const rootClassName = className
    ? `${styles.root} ${className}`
    : styles.root

  return (
    <motion.section
      className={rootClassName}
      aria-label={copy.ariaLabel}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className={styles.srOnly}>{copy.ariaLabel}</h2>

      <div className={styles.sheet}>
        <div className={styles.displayWords} aria-hidden="true">
          <motion.span className={styles.chaos} variants={nodeVariants}>
            {copy.chaosLabel}
          </motion.span>
          <motion.span className={styles.inWord} variants={nodeVariants}>
            {copy.inLabel}<b>.</b>
          </motion.span>
          <motion.span className={styles.system} variants={nodeVariants}>
            {copy.systemLabel}
          </motion.span>
          <motion.span className={styles.outWord} variants={nodeVariants}>
            {copy.outLabel}<b>.</b>
          </motion.span>
        </div>

        <motion.figure className={styles.portrait} variants={portraitVariants}>
          <Circle
            aria-hidden="true"
            className={styles.pin}
            size={19}
            weight="fill"
          />
          <span className={styles.tape} aria-hidden="true" />
          <div className={styles.portraitImage}>
            <Image
              src="/images/portrait-warm.png"
              alt={copy.portraitAlt}
              fill
              priority
              sizes="(max-width: 760px) 150px, 180px"
            />
          </div>
          <figcaption className={styles.portraitCaption}>
            <strong>{copy.portraitName}</strong>
            <span>{copy.portraitRole}</span>
          </figcaption>
        </motion.figure>

        <div className={styles.mainFlow}>
          <motion.span
            className={styles.flowLine}
            aria-hidden="true"
            variants={lineVariants}
          />

          <div className={styles.inputZone}>
            <p className={styles.inputNote}>
              {copy.inputNote}
              <ArrowBendDownRight
                aria-hidden="true"
                className={styles.noteArrow}
                size={32}
                weight="light"
              />
            </p>
            <div className={styles.tangle} aria-hidden="true">
              <Image
                src="/images/system-tangle.png"
                alt=""
                fill
                priority
                sizes="320px"
              />
            </div>
            <motion.ul
              className={styles.nodeList}
              aria-label={copy.inputGroupLabel}
              variants={groupVariants}
            >
              {INPUT_NODES.map(({ key, Icon: IconComponent }) => (
                <motion.li key={key} variants={nodeVariants}>
                  <NodeCard
                    node={copy.inputs[key]}
                    IconComponent={IconComponent}
                    variant="input"
                  />
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.ol
            className={styles.processZone}
            aria-label={copy.processGroupLabel}
            variants={groupVariants}
          >
            {PROCESS_STAGES.map((key, index) => {
              const stage = copy.stages[key]

              return (
                <motion.li
                  className={styles.stage}
                  key={key}
                  variants={nodeVariants}
                >
                  <span className={styles.stageNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{stage.label}</h3>
                  <ul>
                    {stage.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </motion.li>
              )
            })}
          </motion.ol>

          <div className={styles.resultZone}>
            <motion.article className={styles.resultCard} variants={nodeVariants}>
              <h3>{copy.result.label}</h3>
              <p>
                <span aria-hidden="true" />
                {copy.result.detail}
              </p>
            </motion.article>

            <motion.ul
              className={styles.outputList}
              aria-label={copy.outputGroupLabel}
              variants={groupVariants}
            >
              {OUTPUT_NODES.map(({ key, Icon: IconComponent }) => (
                <motion.li key={key} variants={nodeVariants}>
                  <NodeCard
                    node={copy.outputs[key]}
                    IconComponent={IconComponent}
                    variant="output"
                  />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
