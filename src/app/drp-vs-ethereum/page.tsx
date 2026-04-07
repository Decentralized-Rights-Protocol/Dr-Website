import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { PremiumHero, PremiumPage, PremiumSection } from '@/components/site/PremiumPage'
import { FAQ } from '@/components/seo/FAQ'
import { ArrowRight, Scale, ShieldCheck, Zap } from 'lucide-react'

export const metadata = buildPageMetadata({
  title: 'DRP vs Ethereum | Rights-First Proofs & AI Verification',
  description:
    'DRP vs Ethereum: compare how DRP’s AI-verified Proof of Status (PoST) and Proof of Activity (PoAT) differ from Ethereum’s general-purpose execution and asset-centric incentives.',
  canonical: '/drp-vs-ethereum',
})

const faqItems = [
  {
    question: 'Is DRP “Ethereum but with better consensus”?',
    answer:
      'Not exactly. DRP focuses on rights-first verification (PoST/PoAT) and rights-aligned governance. Ethereum is a general-purpose smart contract platform; DRP targets a different trust and incentives layer.',
  },
  {
    question: 'How is PoST/PoAT different from typical on-chain reputation?',
    answer:
      'PoST/PoAT are proof-based mechanisms intended to encode verified status and activity with AI-reviewed integrity checks—so trust can be summarized and audited against evidence.',
  },
  {
    question: 'What does AI verification mean in practice?',
    answer:
      'AI Elders help validate proof quality, detect anomalies, and produce explainable review outputs. This is meant to improve governance reliability and reduce fraud opportunities.',
  },
  {
    question: 'Why compare DRP to Ethereum at all?',
    answer:
      'Because Ethereum is a common baseline for builders. This comparison helps clarify where DRP differs: rights verification, governance constraints, and activity-based participation.',
  },
] as const

export default function DRPVSEthereumPage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero
          badge="DRP vs Ethereum"
          title="Different trust goals, different proof systems"
          description="DRP and Ethereum can both support decentralized apps, but DRP is engineered specifically for rights verification and AI-assisted integrity—using PoST and PoAT."
        />

        <PremiumSection eyebrow="Key differences" title="Where DRP changes the design equation">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Rights-aligned governance</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                DRP evaluates proposals against rights baselines and ties decisions to verifiable participation signals.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Proof of Status + Activity</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                PoST/PoAT connect identity and contribution evidence to governance and reward logic in a structured, auditable way.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-blue-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">AI-verified integrity checks</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                AI Elders help validate proof quality and detect anomalies, generating explainable review outputs.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-cyan-300/20 text-cyan-100" aria-hidden="true">
                  →
                </span>
                <h3 className="text-lg font-semibold text-white">Activity-based incentives</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                DRP aims to align rewards with real contributions and sustainability rather than only with transaction throughput.
              </p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Read more" title="Use these pages to get the complete picture">
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
              href="/ai-governance"
              className="inline-flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              AI Governance <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </PremiumSection>
      </PremiumPage>

      <FAQ items={faqItems as unknown as Array<{ question: string; answer: string }>} title="DRP vs Ethereum FAQs" className="pt-0" />
    </>
  )
}

