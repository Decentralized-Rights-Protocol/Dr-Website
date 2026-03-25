'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
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
  UserRoundCheck,
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
    icon: UserRoundCheck,
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

const sectionReveal = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
}

export function DRPLandingExperience() {
  const [activeImpact, setActiveImpact] = useState('education')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const currentImpact = useMemo(
    () => impactTabs.find((tab) => tab.key === activeImpact) ?? impactTabs[0],
    [activeImpact],
  )

  return (
    <div className="relative overflow-hidden bg-[#030712] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[130px]" />
        <div className="absolute top-[38%] -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-300/10 blur-[120px]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
        <motion.div initial="hidden" animate="visible" variants={sectionReveal} className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Decentralized Rights Protocol
          </p>
          <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Infrastructure for verified rights
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-amber-200 bg-clip-text text-transparent">
              in a machine-speed world
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
            DRP connects identity, activity, and governance into one trust layer for institutions building fair, transparent, and future-resilient systems.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/whitepaper" className="inline-flex items-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_45px_rgba(34,211,238,0.28)] transition hover:bg-cyan-300">
              Read Whitepaper <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/docs" className="inline-flex items-center rounded-xl border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
              Explore Documentation
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3"
        >
          {['Verifiable Institutions', 'Human-Centered Economics', 'Transparent Governance'].map((label, i) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/30">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">System {`0${i + 1}`}</p>
              <p className="mt-2 text-sm font-medium text-slate-200">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionReveal}>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Protocol capabilities</h2>
          <p className="mt-3 max-w-2xl text-slate-300">A modern bento grid focused on proof systems, governance, and real-world utility.</p>
        </motion.div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_35px_rgba(56,189,248,0.15)]"
            >
              <feature.icon className="h-8 w-8 text-cyan-200 transition group-hover:text-cyan-100" />
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['01', 'Verify status', 'Institutions and participants issue attestations with clear trust boundaries.'],
            ['02', 'Record activity', 'Contributions and outcomes are signed, timestamped, and linked to accountable actors.'],
            ['03', 'Govern transparently', 'Governance decisions are reviewed with AI support and executed through auditable logic.'],
          ].map(([step, title, desc], index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-200">{step}</p>
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-red-300/20 bg-red-400/5 p-7">
            <h3 className="flex items-center text-xl font-semibold text-red-200">
              <XCircle className="mr-2 h-5 w-5" /> What is broken
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Opaque identity systems and fragmented trust networks.</li>
              <li>Non-portable records and unverifiable impact claims.</li>
              <li>Governance controlled by visibility, not verified contribution.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-7">
            <h3 className="flex items-center text-xl font-semibold text-emerald-100">
              <CheckCircle2 className="mr-2 h-5 w-5" /> What DRP solves
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-100">
              <li>Verifiable status and activity across institutions and geographies.</li>
              <li>Auditable governance workflows with explainable AI assistance.</li>
              <li>Infrastructure that aligns incentives with rights and measurable impact.</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal}>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Impact and vision</h2>
          <p className="mt-3 max-w-2xl text-slate-300">A cross-sector protocol surface designed for public and institutional deployment.</p>
        </motion.div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_2fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="grid grid-cols-2 gap-2">
              {impactTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveImpact(tab.key)}
                  className={`flex items-center justify-center rounded-xl border px-3 py-2 text-sm transition ${
                    tab.key === activeImpact
                      ? 'border-cyan-300/50 bg-cyan-300/20 text-cyan-100'
                      : 'border-white/10 bg-black/10 text-slate-300 hover:border-cyan-300/30'
                  }`}
                  type="button"
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            key={currentImpact.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300/10 to-blue-400/10 p-8"
          >
            <currentImpact.icon className="h-8 w-8 text-cyan-200" />
            <h3 className="mt-4 text-2xl font-semibold text-white">{currentImpact.title}</h3>
            <p className="mt-3 max-w-2xl text-slate-200">{currentImpact.copy}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal}>
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        </motion.div>
        <div className="mt-8 space-y-3">
          {faqItems.map((item, index) => (
            <div key={item.question} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <button
                onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={openFaq === index}
                type="button"
              >
                <span className="text-sm font-medium text-slate-100">{item.question}</span>
                <ChevronDown className={`h-5 w-5 text-slate-300 transition ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index ? <p className="px-5 pb-4 text-sm text-slate-300">{item.answer}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
