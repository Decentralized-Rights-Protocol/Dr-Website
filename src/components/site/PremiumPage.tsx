import type { ReactNode } from 'react'
import { ParticleBackground } from '@/components/particle-background'

interface PremiumPageProps {
  children: ReactNode
}

interface PremiumSectionProps {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PremiumPage({ children }: PremiumPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-100">
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.16),transparent_36%),radial-gradient(circle_at_50%_80%,rgba(251,191,36,0.08),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.14]" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function PremiumContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>
}

export function PremiumHero({
  badge,
  title,
  description,
  actions,
}: {
  badge: string
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
      <PremiumContainer>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            {badge}
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">{description}</p>
          {actions ? <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{actions}</div> : null}
        </div>
      </PremiumContainer>
    </section>
  )
}

export function PremiumSection({ id, eyebrow, title, description, children }: PremiumSectionProps) {
  return (
    <section id={id} className="py-10 sm:py-14">
      <PremiumContainer>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-10">
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">{eyebrow}</p>
            ) : null}
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
            {description ? <p className="mt-4 text-slate-300">{description}</p> : null}
          </div>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </PremiumContainer>
    </section>
  )
}
