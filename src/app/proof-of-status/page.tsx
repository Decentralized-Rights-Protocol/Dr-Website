import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { PremiumHero, PremiumPage, PremiumSection } from '@/components/site/PremiumPage'
import { FAQ } from '@/components/seo/FAQ'
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from 'lucide-react'

export const metadata = buildPageMetadata({
  title: 'Proof of Status (PoST) | DRP Identity Verification',
  description:
    'What is Proof of Status (PoST) in DRP? PoST verifies identity and credentials for governance weighting and access control using privacy-preserving proofs and AI-reviewed integrity checks.',
  canonical: '/proof-of-status',
})

const faqItems = [
  {
    question: 'What is Proof of Status (PoST)?',
    answer:
      'Proof of Status (PoST) is DRP’s identity verification mechanism. It encodes verified credentials and reputation signals without exposing sensitive private data.',
  },
  {
    question: 'What is PoST used for in governance?',
    answer:
      'PoST informs governance weighting and access control. It helps ensure that rights-aligned decisions consider verified status signals grounded in credential proofs.',
  },
  {
    question: 'Does PoST require surveillance?',
    answer:
      'DRP is designed for privacy-preserving verification. PoST aims to verify without unnecessary personal exposure, and AI Elders help validate integrity rather than perform invasive monitoring.',
  },
  {
    question: 'How does PoST relate to PoAT?',
    answer:
      'PoST focuses on verified identity and capability signals, while Proof of Activity (PoAT) verifies meaningful contributions. Together they support balanced governance and equitable participation.',
  },
] as const

export default function ProofOfStatusPage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero
          badge="Proof of Status"
          title="PoST verifies identity with proof, not claims"
          description="PoST turns credentials into verifiable status signals that support rights-aligned governance while minimizing unnecessary private-data exposure."
        />

        <PremiumSection eyebrow="Definition" title="PoST in one sentence">
          <p className="text-sm leading-relaxed text-slate-300">
            Proof of Status (PoST) is DRP’s identity verification mechanism: it encodes verified credentials and reputation signals so governance can weight participation based on verifiable status rather than authority or unverifiable claims.
          </p>
        </PremiumSection>

        <PremiumSection eyebrow="How it’s used" title="Where PoST fits in the DRP protocol">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Verified credentials</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Institutions and participants contribute credential proofs (education, professional status, institutional recognition) with clear trust boundaries.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Governance weighting</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                PoST outputs are used for governance weighting and access control so decisions can be rights-aligned and accountable.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-pink-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">AI-reviewed integrity</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                AI Elders help validate proof quality and detect anomalies, producing reviewable outputs for validators and councils.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-cyan-300/20 text-cyan-100" aria-hidden="true">
                  →
                </span>
                <h3 className="text-lg font-semibold text-white">Trust boundaries</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                PoST is designed to separate what’s verifiable from what’s not, making assumptions auditable and reducing fraud opportunities.
              </p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Next" title="Read PoAT after PoST">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/proof-of-activity"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Proof of Activity (PoAT) <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/how-drp-works"
              className="inline-flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              How DRP works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </PremiumSection>
      </PremiumPage>

      <FAQ items={faqItems as unknown as Array<{ question: string; answer: string }>} title="PoST FAQs" className="pt-0" />
    </>
  )
}

