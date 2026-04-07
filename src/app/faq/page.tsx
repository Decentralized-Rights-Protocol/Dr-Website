import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo/seo'
import { StructuredData } from '@/components/seo/StructuredData'
import { FAQ } from '@/components/seo/FAQ'
import { PremiumHero, PremiumPage, PremiumSection } from '@/components/site/PremiumPage'
import { ArrowRight, HelpCircle } from 'lucide-react'

export const metadata = buildPageMetadata({
  title: 'FAQ | Decentralized Rights Protocol (DRP)',
  description:
    'Frequently asked questions about the Decentralized Rights Protocol (DRP): what DRP is, how PoST and PoAT work, what AI Elders do, and why DRP is focused on rights, dignity, and sustainability.',
  canonical: '/faq',
})

const faqItems = [
  {
    question: 'What is DRP?',
    answer:
      'DRP (Decentralized Rights Protocol) is a human-rights-centered blockchain that uses AI-verified consensus mechanisms (Proof of Status and Proof of Activity) to create a trust-based, sustainable, and secure decentralized network.',
  },
  {
    question: 'How does DRP work (high level)?',
    answer:
      'DRP verifies credentials and participation through PoST (identity/status) and PoAT (activity/contribution). AI Elders help validate integrity and produce explainable outputs that support rights-aligned governance and transparent decisions.',
  },
  {
    question: 'What is Proof of Status (PoST)?',
    answer:
      'PoST verifies user identity and reputation by encoding verified credentials without exposing private data. PoST supports governance weighting and access control based on verifiable status.',
  },
  {
    question: 'What is Proof of Activity (PoAT)?',
    answer:
      'PoAT validates and records real-world contributions. Participants submit cryptographic evidence of activity, and AI Elders and validators verify authenticity and integrity before rewards and records are finalized.',
  },
  {
    question: 'What are AI Elders?',
    answer:
      'AI Elders are autonomous AI agents integrated into DRP’s core layer. They verify activities, detect fraud, optimize network integrity workflows, and produce reviewable summaries for human governance.',
  },
  {
    question: 'What makes DRP different from other blockchains?',
    answer:
      'DRP prioritizes human dignity, privacy-preserving verification, AI-assisted integrity checks, and sustainability-first governance. Instead of centering incentives only on transaction behavior, DRP ties participation and governance to verifiable status and activity.',
  },
  {
    question: 'Is DRP quantum-safe?',
    answer:
      'Yes. DRP is designed to use NIST-approved post-quantum cryptographic algorithms for long-term security.',
  },
  {
    question: 'How can I run or participate in DRP?',
    answer:
      'Start with the Learn and Docs sections to understand node setup, consensus basics, and verification workflows. The Getting Started guide shows how to run a DRP testnet node.',
  },
  {
    question: 'What tokens does DRP use?',
    answer:
      'DRP uses a dual-token model: $RIGHTS for governance and voting, and $DeRi for utility, rewards, and network participation.',
  },
] as const

export default function FAQRootPage() {
  return (
    <>
      <StructuredData />
      <PremiumPage>
        <PremiumHero
          badge="FAQ"
          title="Answers for builders, institutions, and human-rights advocates"
          description="Quick, definition-first explanations designed for search engines and AI assistants."
        />

        <PremiumSection
          eyebrow="Definition-first"
          title="How to use this FAQ"
          description="If you’re new to DRP, start with “What is DRP?”, then review PoST and PoAT. For governance context, read the AI Elders answer."
        >
          <div className="mt-0 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/what-is-drp"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              What is DRP? <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/how-drp-works"
              className="inline-flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              How it works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/glossary"
              className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Glossary <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </PremiumSection>
      </PremiumPage>

      <FAQ items={faqItems as unknown as Array<{ question: string; answer: string }>} title="Frequently Asked Questions" className="pt-0" />
    </>
  )
}

