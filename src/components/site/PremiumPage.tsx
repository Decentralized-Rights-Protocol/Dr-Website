import type { ReactNode } from 'react'

interface PremiumPageProps { children: ReactNode }
interface PremiumSectionProps {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PremiumPage({ children }: PremiumPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-[#030308] text-gray-900 dark:text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00bfff]/5 blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#a855f7]/5 blur-[180px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function PremiumContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>
}

export function PremiumHero({ badge, title, description, actions }: {
  badge: string; title: string; description: string; actions?: ReactNode
}) {
  return (
    <section className="pt-40 pb-20 border-b border-gray-100 dark:border-white/5">
      <PremiumContainer>
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center border border-[#00e5cc]/30 bg-[#00e5cc]/8 px-5 py-1.5 text-[10px] font-bold tracking-widest text-[#00e5cc] uppercase mb-8">
            {badge}
          </span>
          <h1 className="text-balance text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-8">{title}</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-500 dark:text-white/45 leading-relaxed mb-12">{description}</p>
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
        <div className="border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14] p-8 lg:p-12 transition-all hover:border-gray-200 dark:hover:border-white/12">
          <div className="max-w-4xl">
            {eyebrow ? <p className="text-[10px] font-bold tracking-widest uppercase text-[#00e5cc] mb-4">{eyebrow}</p> : null}
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">{title}</h2>
            {description ? <p className="text-base text-gray-500 dark:text-white/45 leading-relaxed">{description}</p> : null}
          </div>
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </PremiumContainer>
    </section>
  )
}