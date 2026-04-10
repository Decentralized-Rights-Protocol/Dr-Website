import Link from 'next/link'
import { Calendar, CheckCircle2, Clock3, Milestone, ArrowRight } from 'lucide-react'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata = buildPageMetadata({
  title: 'DRP Roadmap | Future of Rights-Centered Protocol Economy',
  description:
    'Explore the Decentralized Rights Protocol (DRP) roadmap. From foundation to global expansion, see our transparent execution timeline for core protocol delivery and ecosystem scaling.',
  canonical: '/roadmap',
})

const roadmapItems = [
  {
    quarter: 'Q4 2025',
    title: 'Foundation Phase',
    status: 'completed',
    description: 'Core protocol development and initial testing',
    features: [
      'Core blockchain architecture design',
      'Quantum-safe cryptography implementation',
      'Initial consensus mechanism',
      'Basic smart contract framework',
      'Developer documentation v1.0',
    ],
    icon: CheckCircle2,
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-300/10',
  },
  {
    quarter: 'Q1 2026',
    title: 'Testnet Launch',
    status: 'completed',
    description: 'Public testnet launch and community feedback',
    features: [
      'Public testnet deployment',
      'Community testing program',
      'Bug fixes and optimizations',
      'Security audit phase 1',
      'Governance framework implementation',
    ],
    icon: CheckCircle2,
    color: 'text-emerald-300',
    bgColor: 'bg-emerald-300/10',
  },
  {
    quarter: 'Q1 2026',
    title: 'Mainnet Preparation',
    status: 'current',
    description: 'Final preparations for mainnet launch',
    features: [
      'Security audit phase 2',
      'Performance optimizations',
      'Final testing and bug fixes',
      'Token distribution preparation',
      'Partnership announcements',
    ],
    icon: Clock3,
    color: 'text-cyan-200',
    bgColor: 'bg-cyan-300/10',
  },
  {
    quarter: 'Q2 2026',
    title: 'Mainnet Launch',
    status: 'upcoming',
    description: 'Mainnet launch and initial partnerships',
    features: [
      'Mainnet deployment',
      'Token launch and distribution',
      'Initial validator onboarding',
      'First human rights organizations integration',
      'Community governance activation',
    ],
    icon: Milestone,
    color: 'text-indigo-200',
    bgColor: 'bg-indigo-300/10',
  },
  {
    quarter: 'Q2 2026',
    title: 'Ecosystem Growth',
    status: 'upcoming',
    description: 'Expanding the DRP ecosystem and partnerships',
    features: [
      'SDK releases for major languages',
      'Mobile application development',
      'Integration with major NGOs',
      'Advanced governance features',
      'Cross-chain interoperability',
    ],
    icon: Milestone,
    color: 'text-indigo-200',
    bgColor: 'bg-indigo-300/10',
  },
  {
    quarter: 'Q3 2026',
    title: 'Global Expansion',
    status: 'upcoming',
    description: 'Scaling globally and adding advanced features',
    features: [
      'Multi-language support',
      'Regional validator networks',
      'Advanced privacy features',
      'AI-powered verification tools',
      'International partnerships',
    ],
    icon: Milestone,
    color: 'text-indigo-200',
    bgColor: 'bg-indigo-300/10',
  },
]

const upcomingFeatures = [
  {
    title: 'Mobile SDK',
    description: 'Native mobile SDKs for iOS and Android development',
    timeline: 'Q1 2026',
  },
  {
    title: 'Cross-Chain Bridge',
    description: 'Interoperability with other blockchain networks',
    timeline: 'Q1 2026',
  },
  {
    title: 'AI Verification',
    description: 'Machine learning-powered content verification',
    timeline: 'Q2 2026',
  },
  {
    title: 'Privacy Layer',
    description: 'Advanced zero-knowledge proof implementation',
    timeline: 'Q2 2026',
  },
]

export default function RoadmapPage() {
  return (
    <PremiumPage>
      <PremiumHero
        badge="Future Roadmap"
        title="Milestones for a Rights-Centered Protocol Economy"
        description="A transparent execution timeline across core protocol delivery, ecosystem scale, and global impact rollouts."
      />

      <PremiumSection
        eyebrow="Protocol Timeline"
        title="From Foundation to Global Expansion"
        description="We focus on high-signal milestones: security posture, network reliability, ecosystem tooling, and governance maturity."
      >
        <div className="relative">
          <div className="absolute left-3 top-0 h-full w-px bg-white/15" />
          <div className="space-y-12">
            {roadmapItems.map((item) => (
              <div key={`${item.quarter}-${item.title}`} className="relative flex items-start">
                <div className={`absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 ${item.bgColor}`}>
                  <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                </div>
                <article className="ml-12 flex-1 rounded-2xl border border-white/10 bg-black/30 p-6">
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.bgColor} ${item.color}`}>
                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                    {item.quarter}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-slate-300">{item.description}</p>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {item.features.map((feature) => (
                      <div key={feature} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-300">
                        {feature}
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </PremiumSection>

      <PremiumSection
        eyebrow="Future Modules"
        title="Upcoming Product and Ecosystem Tracks"
        description="Near-term initiatives that increase utility for developers, institutions, and communities."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingFeatures.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  {feature.timeline}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </PremiumSection>

      <section className="pb-20 pt-8">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-indigo-300/10 p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">Build With Us in Public</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Our roadmap is intentionally collaborative. Join the community and help prioritize what ships next.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="https://discord.gg/k8auUAqF" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                Join Discord
              </a>
              <Link href="/community" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PremiumPage>
  )
}