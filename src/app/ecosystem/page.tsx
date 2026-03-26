import Link from 'next/link'
import { Layers, Orbit, Users, Landmark, Wrench, ShieldCheck, ArrowRight } from 'lucide-react'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'

export default function EcosystemPage() {
  return (
    <PremiumPage>
      <PremiumHero
        badge="Ecosystem Architecture"
        title="The DRP Network as a Living System"
        description="Explore protocol layers, governance roles, token utility, and collaboration pathways across the DRP ecosystem."
      />

      <PremiumSection
        eyebrow="Protocol Layers"
        title="Modular by Design, Integrated by Purpose"
        description="DRP architecture separates concerns for resilience while maintaining coherent data and governance flow."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Application Layer', body: 'Human-facing apps for identity, contribution, and governance interaction.' },
            { title: 'Protocol Layer', body: 'Rules and standards governing rights-aware transaction semantics.' },
            { title: 'Consensus Layer', body: 'PoST and PoAT mechanisms validating participation and trust.' },
            { title: 'Network Layer', body: 'Validator and communication infrastructure securing global operations.' },
          ].map((layer) => (
            <article key={layer.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <Layers className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 text-lg font-semibold text-white">{layer.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{layer.body}</p>
            </article>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection
        eyebrow="Roles and Orbit"
        title="Who Participates in DRP"
        description="Each participant type strengthens network legitimacy and practical utility."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { icon: Wrench, title: 'Builders', body: 'Create applications and infrastructure on top of DRP primitives.' },
            { icon: Users, title: 'Communities', body: 'Coordinate participation, education, and grassroots adoption.' },
            { icon: Landmark, title: 'Institutions', body: 'Integrate DRP rails for trustworthy, transparent operations.' },
            { icon: ShieldCheck, title: 'Validators', body: 'Secure consensus and ensure high-integrity network behavior.' },
          ].map((role) => (
            <article key={role.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <role.icon className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 text-lg font-semibold text-white">{role.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{role.body}</p>
            </article>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection
        eyebrow="Token and Governance Utility"
        title="Economic and Decision Layers"
        description="DRP aligns utility with rights and accountability through dual-token mechanics and governance workflows."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Orbit className="h-5 w-5 text-cyan-200" />
            <h3 className="mt-3 text-lg font-semibold text-white">$DeRi Utility Circuit</h3>
            <p className="mt-2 text-sm text-slate-300">
              Used for ecosystem participation, activity-linked flows, and practical protocol interactions.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Landmark className="h-5 w-5 text-cyan-200" />
            <h3 className="mt-3 text-lg font-semibold text-white">$RIGHTS Governance Circuit</h3>
            <p className="mt-2 text-sm text-slate-300">
              Enables governance voice, protocol stewardship, and long-horizon network decision alignment.
            </p>
          </article>
        </div>
      </PremiumSection>

      <section className="pb-20 pt-8">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-indigo-300/10 p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">Explore the Full Architecture in Detail</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Continue into economics, roadmap, and whitepaper pages for implementation depth.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/economics" className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                Explore Economics
              </Link>
              <Link href="/whitepaper" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Open Whitepaper
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PremiumPage>
  )
}
