import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { PremiumHero, PremiumPage, PremiumSection } from '@/components/site/PremiumPage'
import { FAQ } from '@/components/seo/FAQ'
import { ArrowRight, CheckCircle2, Fingerprint, Search, Sparkles } from 'lucide-react'

export const metadata = buildPageMetadata({
  title: 'How DRP Works | PoST, PoAT & AI Elders',
  description:
    'How does DRP work? Learn the DRP flow: PoST verifies credentials and readiness, PoAT verifies contributions, and AI Elders help validate integrity so governance decisions become explainable and auditable.',
  canonical: '/how-drp-works',
})

const faqItems = [
  {
    question: 'What happens first in DRP?',
    answer:
      'DRP starts by validating status signals using Proof of Status (PoST). This establishes the verifiable credentials needed for governance weighting and access control.',
  },
  {
    question: 'How are contributions verified?',
    answer:
      'Contributions are verified through Proof of Activity (PoAT). Participants submit evidence of meaningful activity, and AI Elders help validate integrity before rewards and records are finalized.',
  },
  {
    question: 'What is the role of AI Elders?',
    answer:
      'AI Elders triage and explain integrity checks. They help detect anomalies and produce reviewable outputs, while human governance remains accountable for final decisions.',
  },
  {
    question: 'Is DRP only about rewards?',
    answer:
      'No. DRP also uses proofs to improve governance reliability and rights-aligned resource allocation, so decisions are evaluated against rights baselines—not only economic outcomes.',
  },
] as const

export default function HowDRPWorksPage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero
          badge="How it works"
          title="From proof to rights-backed decisions"
          description="DRP turns identity and real-world activity into verifiable proofs, then uses AI-assisted validation to support transparent governance and sustainable outcomes."
        />

        <PremiumSection eyebrow="Step-by-step flow" title="DRP’s proof pipeline">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">1) Verify status (PoST)</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Institutions and participants provide proofs of verified credentials. PoST encodes status signals without exposing private data.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Search className="h-6 w-6 text-blue-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">2) Record activity (PoAT)</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Participants submit evidence of meaningful contributions. PoAT links outcomes to accountable actors and timestamps.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-amber-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">3) Validate integrity (AI Elders)</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                AI Elders triage and validate proof quality, detect anomalies, and provide explainable review outputs for validators.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-pink-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">4) Govern transparently</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Rights-aligned governance evaluates proposals against dignity and sustainability baselines, then records decisions on-chain.
              </p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Start learning with the right page" title="Jump to the core definitions">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              href="/ai-governance"
              className="inline-flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              AI Governance <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/human-rights-blockchain"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Human-rights blockchain <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </PremiumSection>
      </PremiumPage>

      <FAQ items={faqItems as unknown as Array<{ question: string; answer: string }>} title="How DRP Answers Common Questions" className="pt-0" />
    </>
  )
}

