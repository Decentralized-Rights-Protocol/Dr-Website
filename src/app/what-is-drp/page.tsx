import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { FAQ } from '@/components/seo/FAQ'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'
import { ArrowRight, BrainCircuit, Fingerprint, HeartHandshake, ShieldCheck } from 'lucide-react'

export const metadata = buildPageMetadata({
  title: 'What is DRP? | Decentralized Rights Protocol',
  description:
    'What is the Decentralized Rights Protocol (DRP)? Learn the human-rights-centered blockchain protocol that verifies identity and participation using AI Elders and dual proofs: Proof of Status (PoST) and Proof of Activity (PoAT).',
  canonical: '/what-is-drp',
})

const faqItems = [
  {
    question: 'What is the Decentralized Rights Protocol (DRP)?',
    answer:
      'DRP is a human-rights-centered blockchain protocol that verifies trust and real-world participation using AI-verified consensus mechanisms: Proof of Status (PoST) and Proof of Activity (PoAT).',
  },
  {
    question: 'What makes DRP different from Bitcoin or Ethereum?',
    answer:
      'DRP’s design ties governance and rewards to verifiable human credentials and contributions (PoST/PoAT) rather than only to transaction throughput or speculative value.',
  },
  {
    question: 'How do PoST and PoAT work together?',
    answer:
      'PoST validates verified identity and reputation signals for governance weighting, while PoAT records verified activity to support rewards and equitable participation—both reviewed by AI Elders and validators.',
  },
  {
    question: 'Why focus on rights and dignity?',
    answer:
      'DRP evaluates protocol decisions against rights baselines, aiming to prevent extraction-first systems and align incentives with sustainability and human development.',
  },
] as const

export default function WhatIsDRPPage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero badge="What is DRP" title="Infrastructure for verified rights" description="DRP connects identity, activity, and governance into one trust layer for institutions building fair, transparent, and future-resilient systems." />

        <PremiumSection
          eyebrow="Definition-first"
          title="DRP is a blockchain protocol for human rights verification"
          description="DRP is designed to make trust explainable and verifiable: proofs replace assumptions, and AI helps produce audit-ready decisions under human oversight."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Proof of Status (PoST)</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Verifies credentials and reputation signals without exposing private data, supporting governance weighting and access control.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <BrainCircuit className="h-6 w-6 text-blue-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">AI-verified consensus</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Uses AI Elders to triage, verify, and explain integrity checks so participation becomes audit-ready—not just claimed.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-6 w-6 text-pink-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Proof of Activity (PoAT)</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Records verifiable human activity to reward meaningful contribution and help allocate resources more equitably.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Rights-aligned governance</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Evaluates decisions against rights baselines, aiming to protect dignity while preserving transparency and accountability.
              </p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Entity map" title="Core concepts to explore next">
          <nav aria-label="DRP definition links" className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/how-drp-works"
              className="inline-flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              How DRP works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/proof-of-status"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Proof of Status (PoST) <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/proof-of-activity"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Proof of Activity (PoAT) <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              FAQ <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </PremiumSection>
      </PremiumPage>

      <FAQ items={faqItems as unknown as Array<{ question: string; answer: string }>} title="Quick Answers" className="pt-0" />
    </>
  )
}

