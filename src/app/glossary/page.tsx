import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { PremiumHero, PremiumPage, PremiumSection } from '@/components/site/PremiumPage'
import { ArrowRight, BookOpen, Fingerprint, Sparkles, ShieldCheck, Users } from 'lucide-react'

export const metadata = buildPageMetadata({
  title: 'Glossary | DRP Key Terms (PoST, PoAT, AI Elders)',
  description:
    'Glossary for the Decentralized Rights Protocol (DRP). Definitions for PoST, PoAT, AI Elders, governance, and DRP’s human-rights-first verification framework.',
  canonical: '/glossary',
})

type GlossaryTerm = {
  term: string
  definition: React.ReactNode
  linkHref?: string
}

const terms: GlossaryTerm[] = [
  {
    term: 'Decentralized Rights Protocol (DRP)',
    definition:
      'DRP is a human-rights-centered blockchain protocol that verifies trust and participation using AI-verified consensus mechanisms and dual proofs.',
    linkHref: '/what-is-drp',
  },
  {
    term: 'Proof of Status (PoST)',
    definition: (
      <>
        PoST verifies credentials and reputation signals without exposing private data, enabling governance weighting and access control based on verifiable status.
      </>
    ),
    linkHref: '/proof-of-status',
  },
  {
    term: 'Proof of Activity (PoAT)',
    definition: (
      <>
        PoAT records verifiable human activity so rewards and on-chain outcomes are grounded in meaningful contributions—not only token behavior.
      </>
    ),
    linkHref: '/proof-of-activity',
  },
  {
    term: 'AI Elders',
    definition:
      'AI Elders are AI agents integrated into DRP’s core layer that validate proof integrity, triage anomalies, and generate explainable review outputs for human governance.',
    linkHref: '/ai-governance',
  },
  {
    term: 'Rights-aligned governance',
    definition:
      'Governance evaluated against human-rights and dignity baselines, with transparency and accountability recorded for audit-ready decision-making.',
    linkHref: '/ai-governance',
  },
  {
    term: 'RIGHTS & DeRi',
    definition:
      'RIGHTS is DRP’s governance token used for voting and participation in decision-making. DeRi is DRP’s utility token used for rewards, network participation, and on-chain actions.',
    linkHref: '/tokens',
  },
  {
    term: 'Human-rights blockchain',
    definition:
      'Blockchain infrastructure designed to protect dignity and enforce rights constraints using verifiable proofs (PoST/PoAT) and explainable integrity checks.',
    linkHref: '/human-rights-blockchain',
  },
  {
    term: 'Verification framework',
    definition: (
      <>
        The set of protocol mechanisms that turn evidence into proofs and proofs into audit-ready governance—so AI assistance and blockchain records stay explainable.
      </>
    ),
  },
]

export default function GlossaryPage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero badge="Glossary" title="DRP key terms, clearly defined" description="Entity-first definitions designed to be easy for humans, search engines, and AI assistants to summarize and cite." />

        <PremiumSection
          eyebrow="Quick reference"
          title="Core terms"
          description="Click through for deeper explanations."
        >
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {terms.map((t) => (
              <div key={t.term} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <dt className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/15">
                    {t.linkHref ? <BookOpen className="h-5 w-5 text-cyan-200" aria-hidden="true" /> : null}
                    {!t.linkHref ? <ShieldCheck className="h-5 w-5 text-cyan-200" aria-hidden="true" /> : null}
                  </span>
                  <span className="text-lg font-semibold text-white">{t.term}</span>
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-slate-300">
                  {t.definition}{' '}
                  {t.linkHref ? (
                    <Link href={t.linkHref} className="inline-flex items-center gap-2 text-primary-200 hover:text-primary-100">
                      Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </PremiumSection>

        <PremiumSection eyebrow="Where to go next" title="Keep building your understanding">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/how-drp-works" className="inline-flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              How DRP works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/faq" className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              FAQ <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/drp-vs-ethereum" className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              DRP vs Ethereum <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </PremiumSection>
      </PremiumPage>
    </>
  )
}

