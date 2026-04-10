'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  Fingerprint,
  Globe2,
  GraduationCap,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Sprout,
  UserCheck,
  XCircle,
} from 'lucide-react'

type FeatureCard = {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

type ImpactTab = {
  key: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  copy: string
}

const featureCards: FeatureCard[] = [
  {
    title: 'Proof of Status',
    description: 'Portable attestations that verify trust and capability without exposing personal data.',
    icon: Fingerprint,
  },
  {
    title: 'Proof of Activity',
    description: 'On-chain evidence of meaningful participation, rewards, and community contribution.',
    icon: UserCheck,
  },
  {
    title: 'AI-Assisted Governance',
    description: 'Decision support agents improve transparency, proposal quality, and institutional memory.',
    icon: BrainCircuit,
  },
  {
    title: 'Transparent Verification',
    description: 'Verifiable, auditable flows for identity and action provenance across institutions.',
    icon: ShieldCheck,
  },
  {
    title: 'Human Rights Infrastructure',
    description: 'A protocol layer designed for dignity, access, and cross-border accountability.',
    icon: Globe2,
  },
  {
    title: 'Future-Ready Architecture',
    description: 'Modular stack engineered for post-quantum adaptation and long-term interoperability.',
    icon: CircuitBoard,
  },
]

const impactTabs: ImpactTab[] = [
  {
    key: 'education',
    title: 'Education',
    icon: GraduationCap,
    copy: 'Learners prove verified progress, institutions issue portable credentials, and funding can track measurable outcomes.',
  },
  {
    key: 'healthcare',
    title: 'Healthcare',
    icon: HeartPulse,
    copy: 'Patients and providers exchange trusted attestations with privacy-first controls and fraud-resistant records.',
  },
  {
    key: 'agriculture',
    title: 'Agriculture',
    icon: Sprout,
    copy: 'Farm-to-market activities become verifiable claims, improving financing, traceability, and resilience.',
  },
  {
    key: 'identity',
    title: 'Identity',
    icon: Fingerprint,
    copy: 'Human identity becomes portable, consent-driven, and defensible across apps, regions, and institutions.',
  },
  {
    key: 'governance',
    title: 'Governance',
    icon: BrainCircuit,
    copy: 'Public decisions gain transparent records, accountable voting pathways, and trusted civic participation.',
  },
  {
    key: 'sustainability',
    title: 'Sustainability',
    icon: Leaf,
    copy: 'Impact programs can verify real-world actions and tie incentives to measurable environmental outcomes.',
  },
]

const faqItems = [
  {
    question: 'How is DRP different from a standard blockchain identity project?',
    answer:
      'DRP combines identity, activity, and governance proofs in one protocol so rights, participation, and institutional trust are all verifiable in a single lifecycle.',
  },
  {
    question: 'Is DRP only for governments?',
    answer:
      'No. DRP is designed for governments, NGOs, enterprises, and communities that need credible verification infrastructure.',
  },
  {
    question: 'Can DRP integrate with existing systems?',
    answer:
      'Yes. DRP follows a modular architecture and is designed for incremental integration with existing identity, workflow, and audit systems.',
  },
  {
    question: 'Why AI-assisted governance?',
    answer:
      'AI helps structure proposals, detect inconsistencies, and surface risks, while final authority remains transparent and human-governed.',
  },
]

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } },
}

export function DRPLandingExperience() {
  const [activeImpact, setActiveImpact] = useState('education')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const currentImpact = useMemo(
    () => impactTabs.find((tab) => tab.key === activeImpact) ?? impactTabs[0],
    [activeImpact],
  )

  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[130px] dark:bg-cyan-500/20" />
        <div className="absolute top-[38%] -left-24 h-72 w-72 rounded-full bg-accent/20 blur-[120px] dark:bg-blue-500/20" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/20 blur-[120px] dark:bg-amber-300/10" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8 lg:pt-40">
        <motion.div initial="hidden" animate="visible" variants={sectionReveal} className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Decentralized Rights Protocol
          </p>
          <h1 className="mt-10 text-6xl font-bold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
            Infrastructure for
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent dark:from-cyan-300 dark:via-blue-300 dark:to-amber-200">
              verified rights
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
            DRP connects identity, activity, and governance into one trust layer for institutions building fair, transparent, and future-resilient systems.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <Link href="/whitepaper" className="inline-flex items-center rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-2xl transition hover:scale-105 hover:opacity-90">
              Read Whitepaper <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/docs" className="inline-flex items-center rounded-2xl border border-border bg-card/50 px-8 py-4 text-base font-bold text-card-foreground backdrop-blur-md transition hover:scale-105 hover:bg-accent hover:text-accent-foreground">
              Explore Documentation
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-3"
        >
          {['Verifiable Institutions', 'Human-Centered Economics', 'Transparent Governance'].map((label, i) => (
            <div key={label} className="group rounded-3xl border border-border bg-card/30 p-8 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)]">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/40">System {`0${i + 1}`}</p>
              <p className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Protocol capabilities</h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-foreground/70">A modern bento grid focused on proof systems, governance, and real-world utility.</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-3xl border border-border bg-card/40 p-10 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.15)]"
            >
              <div className="inline-flex rounded-2xl bg-primary/10 p-4 transition group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-8 text-2xl font-bold tracking-tight">{feature.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/70">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">How it works</h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['01', 'Verify status', 'Institutions and participants issue attestations with clear trust boundaries.'],
            ['02', 'Record activity', 'Contributions and outcomes are signed, timestamped, and linked to accountable actors.'],
            ['03', 'Govern transparently', 'Governance decisions are reviewed with AI support and executed through auditable logic.'],
          ].map(([step, title, desc], index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl border border-border bg-card/30 p-10 backdrop-blur-xl transition hover:border-primary/40"
            >
              <p className="text-lg font-bold tracking-[0.3em] text-primary">{step}</p>
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/70">{desc}</p>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <p className="text-8xl font-black">{step}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-red-500/20 bg-red-500/5 p-10 backdrop-blur-2xl transition hover:border-red-500/40">
            <h3 className="flex items-center text-2xl font-bold text-red-500">
              <XCircle className="mr-3 h-7 w-7" /> What is broken
            </h3>
            <ul className="mt-8 space-y-5 text-base text-foreground/70">
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/50" />
                Opaque identity systems and fragmented trust networks.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/50" />
                Non-portable records and unverifiable impact claims.
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/50" />
                Governance controlled by visibility, not verified contribution.
              </li>
            </ul>
          </div>
          <div className="rounded-[2.5rem] border border-emerald-500/30 bg-emerald-500/5 p-10 backdrop-blur-2xl transition hover:border-emerald-500/50">
            <h3 className="flex items-center text-2xl font-bold text-emerald-500">
              <CheckCircle2 className="mr-3 h-7 w-7" /> What DRP solves
            </h3>
            <ul className="mt-8 space-y-5 text-base text-foreground">
              <li className="flex items-start">
                <CheckCircle2 className="mr-3 mt-1 h-5 w-5 text-emerald-500" />
                Verifiable status and activity across institutions and geographies.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="mr-3 mt-1 h-5 w-5 text-emerald-500" />
                Auditable governance workflows with explainable AI assistance.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="mr-3 mt-1 h-5 w-5 text-emerald-500" />
                Infrastructure that aligns incentives with rights and measurable impact.
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Impact and vision</h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-foreground/70">A cross-sector protocol surface designed for public and institutional deployment.</p>
        </motion.div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-3xl border border-border bg-card/30 p-4 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {impactTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveImpact(tab.key)}
                  className={`flex items-center justify-start rounded-2xl border px-5 py-4 text-sm font-semibold transition-all ${
                    tab.key === activeImpact
                      ? 'border-primary/50 bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]'
                      : 'border-transparent text-foreground/60 hover:bg-white/5'
                  }`}
                  type="button"
                >
                  <tab.icon className={`mr-3 h-5 w-5 ${tab.key === activeImpact ? 'animate-pulse' : ''}`} />
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            key={currentImpact.key}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-[2.5rem] border border-border bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-12 backdrop-blur-2xl"
          >
            <div className="inline-flex rounded-2xl bg-primary p-4 text-primary-foreground shadow-2xl">
              <currentImpact.icon className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-4xl font-bold tracking-tight">{currentImpact.title}</h3>
            <p className="mt-6 text-xl leading-relaxed text-foreground/90">{currentImpact.copy}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently asked questions</h2>
        </motion.div>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card/30 backdrop-blur-xl transition hover:border-primary/30"
            >
              <button
                onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                className="flex w-full items-center justify-between px-8 py-6 text-left"
                aria-expanded={openFaq === index}
                type="button"
              >
                <span className="text-base font-bold">{item.question}</span>
                <div className={`rounded-full bg-accent/20 p-2 transition-transform duration-300 ${openFaq === index ? 'rotate-180 bg-primary/20 text-primary' : 'text-foreground/50'}`}>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-8 pb-8 text-base leading-relaxed text-foreground/70">{item.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
    )
    }