import Link from 'next/link'
import { ArrowRight, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { FAQ } from '@/components/seo/FAQ'
import { PremiumHero, PremiumPage, PremiumSection } from '@/components/site/PremiumPage'

export const metadata = buildPageMetadata({
  title: 'AI Governance | AI Elders & Rights-Based Decision Support',
  description:
    'AI governance in DRP: learn how AI Elders provide explainable decision support while rights baselines, transparency, and human accountability remain the final authority.',
  canonical: '/ai-governance',
})

const faqItems: Array<{ question: string; answer: string }> = [
  {
    question: 'What is AI governance in DRP?',
    answer:
      'AI governance in DRP refers to AI Elders providing structured, explainable decision support for proposals and integrity checks—while rights baselines and human oversight keep final accountability.',
  },
  {
    question: 'What do AI Elders actually do?',
    answer:
      'AI Elders help validate proof quality, detect anomalies, summarize proposal implications, and produce reviewable outputs for validators and councils.',
  },
  {
    question: 'Is AI in DRP meant to replace humans?',
    answer:
      'No. DRP uses AI to assist transparency and reliability, but decisions are evaluated against rights constraints and adjudicated through accountable governance processes.',
  },
  {
    question: 'How does this improve governance reliability?',
    answer:
      'By producing explainable integrity reports, surfacing risks early, and standardizing review workflows—so governance decisions are audit-ready and consistently rights-aligned.',
  },
]

export default function AIGovernancePage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero
          badge="AI Governance"
          title="AI Elders provide explainable support, not control"
          description="DRP uses AI Elders to validate proofs, triage risk, and improve proposal quality—so rights-based governance stays transparent, accountable, and trustworthy."
        />

        <PremiumSection
          eyebrow="Definition-first"
          title="DRP’s AI governance is a verification framework"
          description="AI Elders are specialized agents tasked with monitoring integrity—helping communities review evidence with more clarity and consistency."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <BrainCircuit className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Integrity triage</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Detects proof anomalies and potential abuse patterns so review workflows can focus on what matters.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Rights constraints</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Helps enforce baselines so proposals can be evaluated against dignity, privacy, and sustainability norms.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-pink-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Explainable summaries</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Produces reviewable outputs that can be audited and used to inform human governance discussions.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-cyan-300/20 text-cyan-100" aria-hidden="true">
                  →
                </span>
                <h3 className="text-lg font-semibold text-white">Human accountability</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Final authority remains with transparent governance processes that record public rationales.
              </p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Related definitions" title="Explore the proof and rights pieces">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/proof-of-status"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              PoST <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/proof-of-activity"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              PoAT <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/human-rights-blockchain"
              className="inline-flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Human-rights blockchain <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </PremiumSection>
      </PremiumPage>

      <FAQ items={faqItems} title="AI Governance FAQs" className="pt-0" />
    </>
  )
}

