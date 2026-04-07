import Link from 'next/link'
import { Download, Eye, ExternalLink, BookOpenText, ShieldCheck, Brain, Scale, Quote } from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'
import { buildPageMetadata } from '@/lib/seo/seo'
import * as React from 'react'
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
          badge="Protocol Research Portal"
          title="DRP Whitepaper"
          description="A rigorous technical and governance blueprint for the Decentralized Rights Protocol, including consensus architecture, sustainable economics, and quantum-safe security."
          actions={<WhitepaperActions />}
        />

        <PremiumSection
          eyebrow="Definition-first"
          title="What the DRP whitepaper answers"
          description="DRP is a human-rights-centered blockchain protocol. The whitepaper documents how AI-verified consensus, Proof of Status (PoST), and Proof of Activity (PoAT) work together to produce rights-aligned, auditable governance and participation."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
              <strong className="text-white font-semibold">What is DRP?</strong>
              <div className="mt-1">A proof-based trust and governance layer for human rights.</div>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
              <strong className="text-white font-semibold">How do PoST/PoAT work?</strong>
              <div className="mt-1">Verified status and verified activity become auditable proofs.</div>
            </article>
            <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
              <strong className="text-white font-semibold">Why the focus on dignity?</strong>
              <div className="mt-1">Governance is evaluated against rights baselines and sustainability.</div>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Research Index"
          title="Navigate the Protocol"
          description="A concise map of the whitepaper sections for fast investor, builder, and governance review."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {sections.map((item, index) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
              >
                <span className="mr-2 text-cyan-200/80">{String(index + 1).padStart(2, '0')}</span>
                {item}
              </div>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Preview"
          title="Read Before You Download"
          description="Preview the official DRP whitepaper directly in-browser."
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-3">
            <iframe
              src="/whitepaper_v0.5.pdf#toolbar=1&navpanes=0&scrollbar=1"
              className="h-[580px] w-full rounded-xl"
              title="DRP Whitepaper Preview"
            />
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Why Read"
          title="Core Concepts and Strategic Value"
          description="This paper is designed to align technical depth with governance legitimacy and long-term adoption clarity."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: ShieldCheck, title: 'Quantum-Safe by Design', body: 'NIST-aligned cryptographic posture with future-proof trust assumptions.' },
              { icon: Brain, title: 'AI-Verified Participation', body: 'Consensus and contribution logic grounded in verified human activity.' },
              { icon: Scale, title: 'Rights-Aligned Governance', body: 'Governance incentives built around fairness, accountability, and public impact.' },
              { icon: BookOpenText, title: 'Deployable Architecture', body: 'Practical protocol layers and implementation pathways, not abstract theory.' },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <item.icon className="h-5 w-5 text-cyan-200" />
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="References and Integrity"
          title="Citations and Supporting Material"
          description="Methodology and claims are grounded in public research, standards, and industry frameworks."
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p className="rounded-xl border border-white/10 bg-black/25 p-4">NIST Post-Quantum Cryptography standardization publications.</p>
            <p className="rounded-xl border border-white/10 bg-black/25 p-4">Open blockchain governance literature and public consensus analyses.</p>
            <p className="rounded-xl border border-white/10 bg-black/25 p-4">Sustainability and activity-based economic design references used by DRP economics.</p>
            <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5">
              <Quote className="h-5 w-5 text-amber-200" />
              <p className="mt-2 text-amber-100">
                Serious protocols are built on transparent assumptions. The DRP whitepaper is the canonical source for those assumptions.
              </p>
            </div>
          </div>
        </PremiumSection>

        <section className="pb-20 pt-8">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-amber-300/10 p-8 text-center">
              <h2 className="text-3xl font-semibold text-white">Continue the Deep Dive</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Use the whitepaper as your technical anchor, then move into docs and economics for implementation details.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/docs" className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                  Explore Docs
                </Link>
                <Link href="/economics" className="rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
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
