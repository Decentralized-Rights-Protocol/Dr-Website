import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { FAQ } from '@/components/seo/FAQ'
import { PremiumHero, PremiumPage, PremiumSection } from '@/components/site/PremiumPage'
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'

export const metadata = buildPageMetadata({
  title: 'Human-Rights Blockchain | Rights-First Protocol Design',
  description:
    'Human-rights blockchain with DRP: a decentralized rights protocol that uses AI-verified proofs (PoST/PoAT) and rights-aligned governance to support dignity, privacy, and sustainability.',
  canonical: '/human-rights-blockchain',
})

const faqItems = [
  {
    question: 'What does “human-rights blockchain” mean in DRP?',
    answer:
      'It means the protocol is designed around rights baselines: governance decisions and participation incentives are evaluated against dignity, privacy, and sustainability norms using verifiable proofs and transparent processes.',
  },
  {
    question: 'How does DRP protect privacy while verifying status and activity?',
    answer:
      'DRP uses proof-based verification patterns intended to minimize unnecessary personal exposure. PoST and PoAT focus on verifiable signals and auditable integrity checks, with AI Elders helping validate quality.',
  },
  {
    question: 'Is DRP focused on sustainability?',
    answer:
      'Yes. DRP is designed to align incentives with sustainable participation, helping ensure that economic and governance outcomes consider long-term human development and environmental responsibility.',
  },
  {
    question: 'Does DRP replace legal or institutional processes?',
    answer:
      'No. DRP is infrastructure for verifiable trust—designed to complement institutions and create audit-ready, rights-aware workflows that can be adopted incrementally.',
  },
] as const

export default function HumanRightsBlockchainPage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero
          badge="Human Rights"
          title="A rights-first blockchain for dignity and verifiable trust"
          description="DRP is human-rights-centered blockchain infrastructure. It uses AI-verified Proof of Status (PoST) and Proof of Activity (PoAT) so governance decisions can be explainable, auditable, and rights-aligned."
        />

        <PremiumSection eyebrow="Entity-first explanation" title="Rights are part of the protocol, not a slogan">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-6 w-6 text-pink-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Rights baselines</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">Protocol behavior evaluates proposals against dignity and rights baselines.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">Proof over authority</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">PoST/PoAT turn status and activity into auditable proofs that reduce fraud and abuse.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">AI in service of humanity</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">AI Elders help validate integrity and summarize risks under human accountability.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-cyan-300/20 text-cyan-100" aria-hidden="true">
                  →
                </span>
                <h3 className="text-lg font-semibold text-white">Sustainability aligned</h3>
              </div>
              <p className="mt-3 text-sm text-slate-300">Incentives target sustainable participation and long-term community well-being.</p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Explore next" title="Connect rights to proofs">
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
          </div>
        </PremiumSection>
      </PremiumPage>

      <FAQ items={faqItems as unknown as Array<{ question: string; answer: string }>} title="Human-Rights FAQs" className="pt-0" />
    </>
  )
}

