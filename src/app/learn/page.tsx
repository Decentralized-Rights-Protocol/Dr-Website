import Link from 'next/link'
import { ArrowRight, BookOpen, Bot, GraduationCap, Rocket, Sparkles, Trophy, Zap, Star, Flame, CheckCircle, Brain, Send, ChevronRight } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo/seo'
import { Button } from '@/components/ui/button'

export const metadata = buildPageMetadata({
  title: 'Learn DRP | Proof of Status & Proof of Activity',
  description:
    'Start learning the Decentralized Rights Protocol (DRP) from first principles: PoST identity verification, PoAT activity proofs, AI Elders, governance, and quantum-safe security.',
  canonical: '/learn',
})

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
  const levelColors: Record<number, { border: string, badge: string, dot: string }> = {
    1: { border: 'border-emerald-500/25', badge: 'bg-emerald-500/15 text-emerald-400', dot: 'bg-emerald-400' },
    2: { border: 'border-indigo-500/25',  badge: 'bg-indigo-500/15 text-indigo-400',  dot: 'bg-indigo-400' },
    3: { border: 'border-violet-500/25',  badge: 'bg-violet-500/15 text-violet-400',  dot: 'bg-violet-400' },
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative py-20 text-center">
        {/* Decorative orb behind heading */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 
            w-[600px] h-[300px] bg-indigo-600/10 blur-[80px] rounded-full" />
        
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 
              bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 uppercase tracking-wider">
            Learn Hub
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight 
              tracking-tight max-w-3xl mx-auto">
            Learn DRP From First Principles to Protocol Architecture
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            A structured learning journey designed for curious beginners, builders, and governance participants.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/learn/dashboard">
              <Button className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-white 
                  px-7 py-6 font-semibold shadow-lg shadow-indigo-900/40 
                  transition-all duration-200 hover:scale-[1.03] hover:shadow-indigo-700/50">
                <GraduationCap className="mr-2 h-5 w-5" />
                Open Dashboard
              </Button>
            </Link>
            <Link href="/learn/ai-tutor">
              <Button variant="outline" className="rounded-full border-indigo-500/40 
                  text-indigo-300 hover:bg-indigo-500/10 px-7 py-6 font-semibold 
                  transition-all duration-200">
                <Bot className="mr-2 h-5 w-5" />
                Ask AI Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Definitions Section */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-2">Proof of Status (PoST)</h3>
          <p className="text-slate-400 leading-relaxed">Verifiable credential signals without unnecessary private-data exposure.</p>
        </div>
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-2">Proof of Activity (PoAT)</h3>
          <p className="text-slate-400 leading-relaxed">Evidence of meaningful contribution connected to rewards and governance participation.</p>
        </div>
      </section>

      {/* Learning Flight Path */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          { icon: BookOpen, title: 'Guided Curriculum', body: 'Clear sequence with concept-to-application flow.' },
          { icon: Trophy, title: 'Rewarded Learning', body: 'Progress milestones tied to DeRi incentives.' },
          { icon: Rocket, title: 'Builder Readiness', body: 'Moves learners from theory into deployment.' },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
              <item.icon className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.body}</p>
          </article>
        ))}
      </section>

      {/* Curriculum Levels */}
      <div className="space-y-8">
        {curriculumLevels.map((level) => (
          <article key={level.id} className={`rounded-2xl border ${levelColors[level.id].border} bg-slate-900/60 
              backdrop-blur-sm p-6 sm:p-8 shadow-xl`}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 
                    text-xs font-semibold uppercase tracking-wider mb-4 ${levelColors[level.id].badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${levelColors[level.id].dot}`}/>
                  {level.tier}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Level {level.id}: {level.title}
                </h3>
                <p className="mt-3 max-w-3xl text-slate-400 leading-relaxed">
                  {level.description}
                </p>
              </div>
              <div className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs font-medium text-slate-300">
                {level.duration}
              </div>
            </div>

            <div className="grid gap-3 mb-8 sm:grid-cols-2 lg:grid-cols-3">
              {level.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {level.lessons.map((lesson) => (
                <Link
                  key={lesson.href}
                  href={lesson.href}
                  className="group block rounded-xl border border-slate-700/50 
                      bg-slate-800/50 hover:bg-slate-800 hover:border-indigo-500/40 p-5 
                      transition-all duration-200 hover:shadow-lg hover:shadow-indigo-900/20 
                      hover:-translate-y-0.5"
                >
                  <p className="font-semibold text-white text-sm leading-snug group-hover:text-indigo-300 
                      transition-colors">
                    {lesson.title}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span>{lesson.duration}</span>
                    <span className="text-indigo-400 font-medium">{lesson.reward}</span>
                  </div>
                  <span className="mt-4 inline-block text-xs font-medium text-indigo-400 
                      group-hover:translate-x-1 transition-transform duration-150">
                    Start lesson →
                  </span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* AI Tutor CTA */}
      <section className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
        <div className="relative space-y-6">
          <h2 className="text-3xl font-bold text-white">Study with the DRP AI Tutor</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Use the tutor to summarize modules, clarify concepts, and generate practical implementation checklists.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link href="/learn/ai-tutor">
              <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-8 py-6 font-semibold">
                Open AI Tutor
              </Button>
            </Link>
            <Link href="/learn/leaderboard">
              <Button variant="outline" className="rounded-xl border-slate-700 text-white px-8 py-6 font-semibold">
                View Leaderboard
              </Button>
            </Link>
          </div>
          <div className="pt-4">
            <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 text-xs text-amber-300 font-medium">
              <Sparkles className="mr-2 h-4 w-4" />
              Balanced for beginners and technical contributors
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
