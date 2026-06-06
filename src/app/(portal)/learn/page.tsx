import { listAllLessons } from '@/lib/learn-utils'
import Link from 'next/link'
import { 
  GraduationCap, 
  BookOpen, 
  Shield, 
  Code, 
  Award, 
  Clock, 
  ChevronRight, 
  Zap, 
  Sparkles,
  CheckCircle2,
  Trophy
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LearnHubPage() {
  const allLessons = listAllLessons()
  
  const levels = [
    { 
      id: 1, 
      name: 'Level 1: Foundation', 
      title: 'Blockchain and Rights Fundamentals',
      description: 'Master the core concepts of decentralized systems and human rights verification.', 
      icon: BookOpen,
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10',
      border: 'border-cyan-400/20'
    },
    { 
      id: 2, 
      name: 'Level 2: Intermediate', 
      title: 'DRP Architecture and Consensus',
      description: 'Deep dive into the Elder Quorum, PoST/PoAT mechanisms, and protocol layers.', 
      icon: Shield,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/20'
    },
    { 
      id: 3, 
      name: 'Level 3: Advanced', 
      title: 'Build and Ship on DRP',
      description: 'Learn to use the DRP SDK, build DApps, and contribute to the core protocol.', 
      icon: Code,
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10',
      border: 'border-indigo-400/20'
    },
    { 
      id: 4, 
      name: 'Level 4: Mastery', 
      title: 'Governance and Ecosystem',
      description: 'Master decentralized governance, economic models, and future protocol evolution.', 
      icon: Award,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/20'
    }
  ]

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="relative rounded-[2.5rem] border border-border bg-card/60 p-12 backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <GraduationCap className="w-64 h-64 text-drp-cyan" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-drp-cyan/20 border border-drp-cyan/30">
              <Sparkles className="h-5 w-5 text-drp-cyan" />
            </div>
            <p className="text-xs font-cinematic text-drp-cyan tracking-[0.4em]">Academy v1.0</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground max-w-4xl leading-tight">
            Learn DRP. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-drp-cyan to-blue-400">
              Earn Protocol Rewards.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-drp-gray leading-relaxed">
            Follow a practical roadmap with clear outcomes, compact lessons, and reward checkpoints. 
            Master the future of decentralized rights and earn $DeRi tokens.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border text-xs font-medium text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              20+ Modules
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border text-xs font-medium text-foreground">
              <Trophy className="h-4 w-4 text-amber-400" />
              500+ $DeRi Potential
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border text-xs font-medium text-foreground">
              <Zap className="h-4 w-4 text-cyan-400" />
              Industry Verified
            </div>
          </div>
        </div>
      </header>

      {/* Curriculum Levels */}
      <div className="space-y-16">
        {levels.map((level) => {
          const levelLessons = allLessons.filter(l => l.level === level.id)
          if (levelLessons.length === 0) return null

          return (
            <section key={level.id} className="space-y-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4", level.bg, level.color, level.border, "border")}>
                    {level.name}
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{level.title}</h2>
                  <p className="mt-2 text-drp-gray max-w-2xl">{level.description}</p>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-2xl font-bold text-foreground/20">{levelLessons.length}</p>
                  <p className="text-[10px] font-cinematic text-foreground/10 tracking-widest uppercase">Modules</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {levelLessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/lessons/${lesson.slug}`}
                    className="group relative flex flex-col justify-between rounded-[2rem] border border-border bg-foreground/5 p-8 transition-all hover:bg-foreground/10 hover:border-foreground/20"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={cn("p-3 rounded-xl", level.bg, level.color)}>
                          <level.icon className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-drp-gray">
                          <Clock className="h-3 w-3" />
                          15m
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-drp-cyan transition-colors mb-3">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-drp-gray leading-relaxed line-clamp-2 mb-6">
                        {lesson.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-400/20 flex items-center justify-center">
                          <Trophy className="h-3 w-3 text-amber-400" />
                        </div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          20 $DeRi
                        </span>
                      </div>
                      <div className="p-2 rounded-full bg-foreground/5 group-hover:bg-drp-cyan group-hover:text-background transition-all">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Stats/CTA Footer */}
      <section className="rounded-[2.5rem] border border-border bg-gradient-to-br from-drp-cyan/10 to-blue-500/10 p-12 backdrop-blur-xl">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">Why learn with DRP?</h3>
            <ul className="space-y-4">
              {[
                'Verified on-chain credentials for your profile',
                'Earn governance weight via $RIGHTS tokens',
                'Connect with institutional partners and NGOs',
                'Contribute directly to human rights infrastructure'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-drp-gray">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/40 rounded-3xl p-8 border border-border">
            <h4 className="text-xl font-bold text-foreground mb-4">Start your journey today</h4>
            <p className="text-sm text-drp-gray mb-8">
              Join 2,500+ global stewards who are building a more transparent and equitable future.
            </p>
            <Link 
              href="/lessons/what-is-blockchain"
              className="block w-full text-center py-4 rounded-2xl bg-foreground text-background font-bold hover:bg-drp-cyan transition-colors"
            >
              Take First Lesson
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
