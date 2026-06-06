import Link from 'next/link'
import { Download, Eye, ExternalLink, BookOpenText, ShieldCheck, Brain, Scale, Quote, ArrowRight } from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'
import { buildPageMetadata } from '@/lib/seo/seo'
import { WhitepaperActions } from '@/components/whitepaper/WhitepaperActions'

export const metadata = buildPageMetadata({
  title: 'DRP Whitepaper | Quantum-Safe Human Rights Protocol',
  description:
    'Read the Decentralized Rights Protocol (DRP) whitepaper: architecture, AI-verified consensus (PoST/PoAT), token economics, rights-centered governance, and quantum-safe security.',
  canonical: '/whitepaper',
})

export default function WhitepaperPage() {
  const sections = [
    'Executive Summary',
    'Problem Statement',
    'Protocol Architecture',
    'Consensus & Verification',
    'Token Economics',
    'Governance and Rights',
    'Security and Quantum Resilience',
    'Roadmap and Risk',
  ]

  return (
    <>
      <StructuredData type="whitepaper" />
      <PremiumPage>
        <PremiumHero
          badge="Protocol Research"
          title="DRP Whitepaper v0.9"
          description="A rigorous technical blueprint for the Decentralized Rights Protocol, documenting consensus architecture, sustainable economics, and quantum-safe security."
          actions={<WhitepaperActions />}
        />

        <PremiumSection
          eyebrow="Architecture"
          title="The DRP Framework"
          description="DRP is a human-rights-centered blockchain protocol. The whitepaper documents how AI-verified consensus, Proof of Status (PoST), and Proof of Activity (PoAT) work together."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'The Protocol', body: 'A proof-based trust and governance layer for human rights.' },
              { title: 'Consensus', body: 'Verified status and activity become auditable reality proofs.' },
              { title: 'Dignity', body: 'Governance evaluated against rights baselines and sustainability.' },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-foreground/5 bg-white/[0.03] p-8 transition-all hover:bg-white/5">
                <strong className="text-drp-cyan font-cinematic text-[10px] block mb-4 tracking-widest">{item.title}</strong>
                <p className="text-sm text-drp-gray leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Research Index"
          title="Protocol Navigation"
          description="A concise map of the whitepaper sections for investors, builders, and governance reviewers."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-foreground/5 bg-black/40 px-8 py-6 text-sm text-foreground transition-all hover:border-drp-cyan/40 hover:bg-drp-cyan/5 group"
              >
                <span className="mr-4 text-drp-cyan opacity-40 group-hover:opacity-100 transition-opacity font-cinematic">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item}
              </div>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Interactive"
          title="Live Preview"
          description="Examine the official DRP whitepaper directly within the reality layer."
        >
          <div className="overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-black/60 p-4 shadow-2xl">
            <iframe
              src="/whitepaper_v0.5.pdf#toolbar=1&navpanes=0&scrollbar=1"
              className="h-[700px] w-full rounded-[1.5rem]"
              title="DRP Whitepaper Preview"
            />
          </div>
        </PremiumSection>

        <section className="pb-32 pt-16">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="rounded-[3rem] border border-foreground/5 bg-gradient-to-br from-drp-cyan/10 via-drp-blue/5 to-transparent p-16 text-center backdrop-blur-xl">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Deep Dive into Economics</h2>
              <p className="mx-auto max-w-2xl text-lg text-drp-gray mb-12">
                After the whitepaper, explore the protocol implementation details and incentive structures.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/docs" className="px-10 py-4 rounded-full border border-foreground/10 text-foreground font-cinematic text-xs hover:bg-white/5 transition-colors">
                  Explore Docs
                </Link>
                <Link href="/economics" className="px-10 py-4 rounded-full bg-drp-cyan text-drp-bg font-cinematic text-xs font-bold hover:scale-105 transition-transform">
                  Review Economics
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PremiumPage>
    </>
  )
}
