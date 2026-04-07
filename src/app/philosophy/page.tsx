import { buildPageMetadata } from '@/lib/seo/seo'
import Link from 'next/link'
import { Compass, ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'

export const metadata = buildPageMetadata({
  title: 'DRP Philosophy | Rights-First Trust Infrastructure',
  description:
    'DRP philosophy explains why decentralized rights, proof over authority, and privacy-preserving verification come first—so AI and blockchain protect dignity instead of extracting value.',
  canonical: '/philosophy',
})

export default function PhilosophyPage() {
  return (
    <>
      <StructuredData type="philosophy" />
      <PremiumPage>
        <PremiumHero
          badge="DRP Philosophy"
          title="Rights Before Power, Proof Before Authority"
          description="A human-centered philosophy for trust infrastructure in the AI and blockchain era."
        />

        <PremiumSection
          eyebrow="Definition-first"
          title="Why proofs replace power"
          description="DRP’s philosophy is simple: trust should be grounded in verifiable proofs. PoST and PoAT translate identity and activity into auditable evidence so governance can be rights-aligned and accountable."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-base font-semibold text-white">PoST: verified status</h3>
              <p className="mt-2 text-sm text-slate-300">Governance weighting based on credential proofs, not influence.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-base font-semibold text-white">PoAT: verified activity</h3>
              <p className="mt-2 text-sm text-slate-300">Rewards based on meaningful contribution and transparent evidence.</p>
            </article>
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Why DRP Exists"
          title="Technology Must Protect Dignity"
          description="DRP is built to counter extraction-first systems by embedding fairness, contribution, and transparency into protocol behavior."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: HeartHandshake, title: 'Human Dignity', body: 'Rights are foundational, not optional product features.' },
              { icon: ShieldCheck, title: 'Verifiable Trust', body: 'PoAT and PoST move trust from claims to proofs.' },
              { icon: Compass, title: 'Stewardship Governance', body: 'Governance serves long-term communities, not short-term extraction.' },
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
          title="The Operating Ethics of DRP"
          description="We align protocol incentives with human development, sustainability, and transparent accountability."
        >
          <div className="space-y-3">
            {[
              'Rights before power: system design starts from inherent human rights.',
              'Proof over authority: trust emerges from verifiable action, not status claims.',
              'Accountability without surveillance: privacy-preserving verification by design.',
              'Growth without exploitation: incentives reward useful, sustainable contribution.',
              'AI in service of humanity: transparent assistance with human oversight.',
            ].map((line) => (
              <p key={line} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                {line}
              </p>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection
          eyebrow="Global Foundations"
          title="Grounded in International Frameworks"
          description="DRP translates globally recognized rights and sustainability principles into programmable protocol logic."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              'Universal Declaration of Human Rights',
              'UN Sustainable Development Goals',
              'Ecological and regenerative economics',
              'AI ethics and privacy-by-design frameworks',
            ].map((item) => (
              <article key={item} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <Sparkles className="h-5 w-5 text-cyan-200" />
                <p className="mt-3 text-sm text-slate-300">{item}</p>
              </article>
            ))}
          </div>
        </PremiumSection>

        <section className="pb-20 pt-8">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-indigo-300/10 p-8 text-center">
              <h2 className="text-3xl font-semibold text-white">Explore the Mission in Action</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Move from philosophy to architecture, economics, and governance implementation.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/about" className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                  About DRP
                </Link>
                <Link href="/economics" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Explore Economics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PremiumPage>
    </>
  )
}

