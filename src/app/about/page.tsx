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
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: HeartHandshake, title: 'Human First', body: 'Technology should enhance dignity and agency, not extract from it.' },
            { icon: ShieldCheck, title: 'Trust by Design', body: 'Security, transparency, and governance are built into system primitives.' },
            { icon: Sparkles, title: 'Future-Ready', body: 'A protocol architecture designed for AI-era and quantum-era realities.' },
          ].map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-foreground/5 bg-white/5 p-8 transition-all hover:bg-white/10">
              <item.icon className="h-8 w-8 text-drp-cyan mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-sm text-drp-gray leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection
        eyebrow="Principles"
        title="Core Philosophy"
        description="We combine protocol rigor with ethical direction. DRP is not a trend product; it is a systems-level commitment."
      >
        <div className="space-y-4">
          {[
            'Rights are not optional features; they are foundational infrastructure requirements.',
            'Governance should reward long-term public value, not short-term extraction.',
            'AI should augment fairness and verification, with transparent human oversight.',
            'Global systems must be accessible, sustainable, and institution-ready.',
          ].map((principle) => (
            <div key={principle} className="rounded-2xl border border-foreground/5 bg-white/[0.02] px-8 py-4 text-sm text-drp-gray">
              {principle}
            </div>
          ))}
        </div>
      </PremiumSection>

      <section className="pb-32 pt-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-[3rem] border border-foreground/5 bg-gradient-to-br from-drp-cyan/10 via-drp-blue/5 to-transparent p-16 text-center backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Join the Mission</h2>
            <p className="mx-auto max-w-2xl text-lg text-drp-gray mb-12">
              Whether you are a builder, institution, researcher, or advocate, DRP is designed for collaborative progress.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/community" className="px-10 py-4 rounded-full bg-drp-cyan text-drp-bg font-cinematic text-xs font-bold hover:scale-105 transition-transform">
                Join Community
              </Link>
              <Link href="/whitepaper" className="px-10 py-4 rounded-full border border-foreground/10 text-foreground font-cinematic text-xs hover:bg-white/5 transition-colors">
                Read Whitepaper
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PremiumPage>
  )
}
