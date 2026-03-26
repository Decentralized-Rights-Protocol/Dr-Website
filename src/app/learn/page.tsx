import Link from 'next/link'
import { ArrowRight, BookOpen, Bot, GraduationCap, Rocket, Sparkles, Trophy } from 'lucide-react'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'

interface CurriculumTier {
  id: number
  tier: string
  title: string
  description: string
  duration: string
  outcomes: string[]
  lessons: Array<{ href: string; title: string; duration: string; reward: string }>
}

const curriculumLevels: CurriculumTier[] = [
  {
    id: 1,
    tier: 'Foundation',
    title: 'Blockchain and Rights Fundamentals',
    description: 'Build a clean conceptual base around blockchain mechanics, cryptography, and rights-centric systems design.',
    duration: '4 modules • 90 min',
    outcomes: [
      'Understand trust minimization and decentralized architecture',
      'Explain cryptographic integrity and signatures',
      'Connect blockchain primitives to human-rights outcomes',
    ],
    lessons: [
      { href: '/learn/lesson/1-1', title: 'What is Blockchain?', duration: '25m', reward: '20 DeRi' },
      { href: '/learn/lesson/1-2', title: 'Cryptography and Hashing', duration: '20m', reward: '15 DeRi' },
      { href: '/learn/lesson/1-3', title: 'Consensus Basics', duration: '25m', reward: '20 DeRi' },
      { href: '/learn/lesson/1-4', title: 'Smart Contracts 101', duration: '30m', reward: '25 DeRi' },
    ],
  },
  {
    id: 2,
    tier: 'Intermediate',
    title: 'DRP Architecture and Consensus',
    description: 'Move into protocol layers, PoST/PoAT coordination, and governance reliability across real-world deployments.',
    duration: '4 modules • 110 min',
    outcomes: [
      'Map DRP layers and data flow',
      'Explain PoST and PoAT role separation',
      'Understand Elder Quorum governance logic',
    ],
    lessons: [
      { href: '/learn/lesson/2-1', title: 'DRP Architecture', duration: '25m', reward: '20 DeRi' },
      { href: '/learn/lesson/2-2', title: 'PoST and PoAT', duration: '25m', reward: '20 DeRi' },
      { href: '/learn/lesson/2-3', title: 'Elder Quorum', duration: '30m', reward: '25 DeRi' },
      { href: '/learn/lesson/2-4', title: 'Activity Proofs', duration: '35m', reward: '30 DeRi' },
    ],
  },
  {
    id: 3,
    tier: 'Advanced',
    title: 'Build and Ship on DRP',
    description: 'Apply SDK workflows to build production-grade apps and contribution pathways across the DRP ecosystem.',
    duration: '4 modules • 130 min',
    outcomes: [
      'Set up DRP SDK and testing workflows',
      'Build app logic with verification hooks',
      'Deploy and contribute safely in open collaboration',
    ],
    lessons: [
      { href: '/learn/lesson/3-1', title: 'DRP Development Kit', duration: '30m', reward: '25 DeRi' },
      { href: '/learn/lesson/3-2', title: 'Building DApps', duration: '40m', reward: '35 DeRi' },
      { href: '/learn/lesson/3-3', title: 'Contributing to DRP', duration: '25m', reward: '20 DeRi' },
      { href: '/learn/lesson/3-4', title: 'Testing and Deployment', duration: '35m', reward: '30 DeRi' },
    ],
  },
]

export default function LearnPage() {
  return (
    <PremiumPage>
      <PremiumHero
        badge="Learn Hub"
        title="Learn DRP From First Principles to Protocol Architecture"
        description="A structured learning journey designed for curious beginners, builders, and governance participants."
        actions={
          <>
            <Link href="/learn/dashboard" className="inline-flex items-center rounded-xl border border-cyan-200/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              <GraduationCap className="mr-2 h-4 w-4" />
              Open Dashboard
            </Link>
            <Link href="/learn/ai-tutor" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
              <Bot className="mr-2 h-4 w-4" />
              Ask AI Tutor
            </Link>
          </>
        }
      />

      <PremiumSection
        eyebrow="Learning Flight Path"
        title="Beginner to Advanced Progression"
        description="Follow a practical roadmap with clear outcomes, compact lessons, and reward checkpoints."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: BookOpen, title: 'Guided Curriculum', body: 'Clear sequence with concept-to-application flow.' },
            { icon: Trophy, title: 'Rewarded Learning', body: 'Progress milestones tied to DeRi incentives.' },
            { icon: Rocket, title: 'Builder Readiness', body: 'Moves learners from theory into deployment.' },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <item.icon className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </PremiumSection>

      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="space-y-5">
            {curriculumLevels.map((level) => (
              <article key={level.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">{level.tier}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      Level {level.id}: {level.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-slate-300">{level.description}</p>
                  </div>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {level.duration}
                  </span>
                </div>

                <div className="mt-6 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  {level.outcomes.map((outcome) => (
                    <p key={outcome} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                      {outcome}
                    </p>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {level.lessons.map((lesson) => (
                    <Link
                      key={lesson.href}
                      href={lesson.href}
                      className="group rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-400/10"
                    >
                      <p className="text-sm font-semibold text-white">{lesson.title}</p>
                      <p className="mt-2 text-xs text-slate-400">{lesson.duration}</p>
                      <p className="mt-1 text-xs text-cyan-200">{lesson.reward}</p>
                      <span className="mt-4 inline-flex items-center text-xs font-semibold text-cyan-100">
                        Start lesson
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PremiumSection
        eyebrow="Guided Intelligence"
        title="Study with the DRP AI Tutor"
        description="Use the tutor to summarize modules, clarify concepts, and generate practical implementation checklists."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/learn/ai-tutor" className="rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
            Open AI Tutor
          </Link>
          <Link href="/learn/leaderboard" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            View Leaderboard
          </Link>
          <span className="inline-flex items-center rounded-xl border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-xs text-amber-100">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Balanced for beginners and technical contributors
          </span>
        </div>
      </PremiumSection>
    </PremiumPage>
  )
}
