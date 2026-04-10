import Link from 'next/link'
import { HeartHandshake, Sparkles, ShieldCheck, Compass, ArrowRight } from 'lucide-react'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata = buildPageMetadata({
  title: 'About DRP | Our Mission and Core Principles',
  description:
    'Learn about the mission, philosophy, and origin of the Decentralized Rights Protocol (DRP). We are building a human-centered blockchain infrastructure for dignity, accountability, and long-term impact.',
  canonical: '/about',
})

export default function AboutPage() {
  return (
    <PremiumPage>
      <PremiumHero
        badge="About DRP"
        title="A Human-Centered Protocol for the Next Digital Era"
        description="DRP exists to align blockchain infrastructure with dignity, accountability, and long-term human impact."
      />

      <PremiumSection
        eyebrow="Mission"
        title="Why DRP Exists"
        description="Modern systems are powerful but often detached from real human outcomes. DRP bridges this gap by making rights, contribution, and trust verifiable at protocol level."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: HeartHandshake, title: 'Human First', body: 'Technology should enhance dignity and agency, not extract from it.' },
            { icon: ShieldCheck, title: 'Trust by Design', body: 'Security, transparency, and governance are built into system primitives.' },
            { icon: Sparkles, title: 'Future-Ready', body: 'A protocol architecture designed for AI-era and quantum-era realities.' },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <item.icon className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection
        eyebrow="Principles"
        title="Core Philosophy"
        description="We combine protocol rigor with ethical direction. DRP is not a trend product; it is a systems-level commitment."
      >
        <div className="space-y-3">
          {[
            'Rights are not optional features; they are foundational infrastructure requirements.',
            'Governance should reward long-term public value, not short-term extraction.',
            'AI should augment fairness and verification, with transparent human oversight.',
            'Global systems must be accessible, sustainable, and institution-ready.',
          ].map((principle) => (
            <p key={principle} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
              {principle}
            </p>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection
        eyebrow="Origin Story"
        title="From Idea to Protocol"
        description="DRP started with a simple question: what if trust infrastructure could verify meaningful human contribution while preserving fairness and freedom?"
      >
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-6 text-slate-100">
          <Compass className="h-5 w-5 text-amber-200" />
          <p className="mt-3 text-sm leading-relaxed text-amber-100">
            The project evolved from this question into a full protocol model combining quantum-safe cryptography, AI verification, and rights-aligned token economics.
          </p>
        </div>
      </PremiumSection>

      <section className="pb-20 pt-8">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-indigo-300/10 p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">Join the Mission</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Whether you are a builder, institution, researcher, or advocate, DRP is designed for collaborative progress.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/community" className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                Join Community
              </Link>
              <Link href="/whitepaper" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Read Whitepaper
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PremiumPage>
  )
}
