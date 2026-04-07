import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { PremiumHero, PremiumPage, PremiumSection } from '@/components/site/PremiumPage'
import { FAQ } from '@/components/seo/FAQ'
import { ArrowRight, Activity, Sparkles, Users } from 'lucide-react'

export const metadata = buildPageMetadata({
  title: 'Proof of Activity (PoAT) | DRP Contribution Verification',
  description:
    'Proof of Activity (PoAT) in DRP verifies meaningful human participation. Learn how PoAT links verified contributions to rewards and rights-aligned distribution using AI-reviewed integrity checks.',
  canonical: '/proof-of-activity',
})

const faqItems = [
  {
    question: 'What is Proof of Activity (PoAT)?',
    answer:
      'Proof of Activity (PoAT) validates and records real-world contributions. Participants submit cryptographic evidence of meaningful activity, and AI Elders help validate integrity.',
  },
  {
    question: 'What kinds of activity can be verified?',
    answer:
      'PoAT is designed for contributions like work, learning, civic engagement, community building, and other verifiable activities that create value for the DRP ecosystem.',
  },
  {
    question: 'How does PoAT affect rewards?',
    answer:
      'Verified activities can be rewarded with DeRi tokens. PoAT helps align economic incentives with real-world participation rather than speculation.',
  },
  {
    question: 'How is PoAT different from PoST?',
    answer:
      'PoST verifies identity and credential status signals for governance weighting. PoAT verifies activity and contribution evidence for rewards and equitable participation.',
  },
] as const

export default function ProofOfActivityPage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero
          badge="Proof of Activity"
          title="PoAT rewards verified contribution"
          description="PoAT links meaningful human activity to transparent records and rights-aligned incentives—validated by AI Elders and reviewed by validators."
        />

        <PremiumSection eyebrow="Definition-first" title="PoAT in one sentence">
          <p className="text-sm leading-relaxed text-slate-300">
            Proof of Activity (PoAT) is DRP’s contribution verification mechanism. It records evidence of meaningful participation so that rewards and on-chain outcomes are grounded in verifiable activity—making trust measurable, explainable, and accountable.
          </p>
        </PremiumSection>

        <PremiumSection eyebrow="What PoAT verifies" title="Activity signals that map to real value">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Meaningful work</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">Evidence of completed tasks and outcomes that benefit the ecosystem.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-emerald-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Community participation</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">Participation and collaboration that can be credibly evidenced and audited.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-amber-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Learning and credential growth</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">Progress that can be translated into verifiable achievements over time.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-cyan-300/20 text-cyan-100" aria-hidden="true">
                  →
                </span>
                <h3 className="text-lg font-semibold text-white">Audit-ready provenance</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">PoAT is designed to connect outcomes to accountable actors with timestamps and review trails.</p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Next" title="Read PoST to complete the proof set">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/proof-of-status"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Proof of Status (PoST) <ArrowRight className="h-4 w-4" aria-hidden="true" />
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

      <FAQ items={faqItems as unknown as Array<{ question: string; answer: string }>} title="PoAT FAQs" className="pt-0" />
    </>
  )
}

