import type { ReactNode } from 'react'

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
    <div className="relative min-h-screen overflow-hidden bg-drp-bg text-white">
      {/* Cinematic Background elements */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-drp-blue blur-[180px] opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-drp-purple blur-[180px] opacity-10" />
      </div>
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
    <section className="pt-40 pb-20">
      <PremiumContainer>
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[10px] font-cinematic text-drp-cyan mb-8">
            {badge}
          </span>
          <h1 className="text-balance text-5xl md:text-7xl font-bold tracking-tight mb-8">
            {title}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-drp-gray leading-relaxed mb-12">
            {description}
          </p>
          {actions ? <div className="flex flex-wrap items-center justify-center gap-6">{actions}</div> : null}
        </div>
      </PremiumContainer>
    </section>
  )
}

export function PremiumSection({ id, eyebrow, title, description, children }: PremiumSectionProps) {
  return (
    <section id={id} className="py-12">
      <PremiumContainer>
        <div className="rounded-[2.5rem] border border-white/5 bg-black/40 p-10 backdrop-blur-md transition-all hover:border-white/10">
          <div className="max-w-4xl">
            {eyebrow ? (
              <p className="text-[10px] font-cinematic text-drp-cyan opacity-60 mb-4">{eyebrow}</p>
            ) : null}
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
            {description ? <p className="text-lg text-drp-gray leading-relaxed">{description}</p> : null}
          </div>
          {children ? <div className="mt-12">{children}</div> : null}
        </div>
      </PremiumContainer>
    </section>
  )
}
