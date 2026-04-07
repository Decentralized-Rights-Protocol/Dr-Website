import Link from 'next/link'
import { BookOpen, Code, Zap, Users, ArrowRight } from 'lucide-react'
import { PremiumHero, PremiumSection } from '@/components/site/PremiumPage'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata = buildPageMetadata({
  title: 'DRP Docs | Getting Started, Consensus & AI',
  description:
    'Developer documentation for the Decentralized Rights Protocol (DRP): getting started, consensus (PoST/PoAT), AI Elders, and post-quantum security.',
  canonical: '/docs',
})

const docSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of DRP and set up your development environment',
    href: '/docs/getting-started',
    icon: BookOpen,
    color: 'bg-primary-600',
    topics: ['Python 3.10+ Setup', 'Testnet Node', 'Basic P2P Networking', 'First Steps'],
  },
  {
    title: 'Consensus & AI',
    description: 'Understand Proof of Status, Proof of Activities, and AI verification',
    href: '/docs/consensus',
    icon: Code,
    color: 'bg-secondary-600',
    topics: ['Proof of Status (PoS)', 'Proof of Activities (PoA)', 'AI Elders', 'Verification System'],
  },
  {
    title: 'Post-Quantum Security',
    description: 'Quantum-resistant cryptography and security features',
    href: '/docs/security',
    icon: Zap,
    color: 'bg-accent-600',
    topics: ['CRYSTALS-Kyber', 'CRYSTALS-Dilithium', 'Key Management', 'Quantum Resistance'],
  },
  {
    title: 'Repository Structure',
    description: 'Explore the Dr-Blockchain codebase and modules',
    href: '/docs/repository',
    icon: Code,
    color: 'bg-primary-600',
    topics: ['Source Code', 'Tests', 'Examples', 'Scripts'],
  },
  {
    title: 'Examples & Demos',
    description: 'Practical examples and post-quantum security demos',
    href: '/docs/examples',
    icon: BookOpen,
    color: 'bg-secondary-600',
    topics: ['Post-Quantum Demo', 'Testnet Examples', 'AI Verification', 'Best Practices'],
  },
  {
    title: 'Community',
    description: 'Join the developer community and contribute to DRP',
    href: '/docs/community',
    icon: Users,
    color: 'bg-accent-600',
    topics: ['Contributing', 'Discord', 'GitHub', 'Research'],
  },
]

export default function DocsPage() {
  return (
    <>
      <PremiumHero
        badge="Developer Documentation"
        title="DRP Technical Docs"
        description="Everything you need to understand, integrate, and build on the Decentralized Rights Protocol."
      />

      <PremiumSection
        eyebrow="Quick Start"
        title="Launch a Node in Minutes"
        description="Clone the repository, install dependencies, and run your first DRP testnet node."
      >
        <div className="mb-6 rounded-xl border border-white/10 bg-black/35 p-4 font-mono text-sm">
          <div className="text-neutral-400"># Clone the DRP Blockchain repository</div>
          <div className="text-green-400">git clone https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain.git</div>
          <div className="text-neutral-400 mt-2"># Install dependencies</div>
          <div className="text-green-400">pip install -r requirements.txt</div>
          <div className="text-neutral-400 mt-2"># Run the testnet node</div>
          <div className="text-blue-300">python src/node.py</div>
        </div>
        <Link href="/docs/getting-started" className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </PremiumSection>

      <PremiumSection eyebrow="Sections" title="Documentation Map">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {docSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group relative rounded-2xl border border-white/10 bg-black/30 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-400/10"
            >
              <div className="flex items-center gap-x-4 mb-4">
                <div className={`${section.color} rounded-lg p-3`}>
                  <section.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-100">{section.title}</h3>
              </div>
              <p className="mb-4 text-slate-300">{section.description}</p>
              <div className="space-y-1">
                {section.topics.map((topic) => (
                  <div key={topic} className="text-sm text-slate-400">
                    • {topic}
                  </div>
                ))}
              </div>
              <ArrowRight className="absolute right-8 top-8 h-5 w-5 text-slate-400 transition-colors group-hover:text-cyan-100" />
            </Link>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection eyebrow="Support and Contributions" title="Build and Improve with the Community">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-8">
            <h3 className="mb-4 text-xl font-semibold text-white">Need Help?</h3>
            <p className="mb-6 text-slate-300">Join our community channels and use the FAQ for rapid answers.</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/community" className="inline-flex items-center rounded-lg border border-cyan-300/40 bg-cyan-300/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Join Community</Link>
              <Link href="/docs/faq" className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">View FAQ</Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 p-8">
            <h3 className="mb-4 text-xl font-semibold text-white">Contribute</h3>
            <p className="mb-6 text-slate-300">Help improve docs and developer onboarding quality.</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain/docs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-lg border border-cyan-300/40 bg-cyan-300/90 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Edit on GitHub</Link>
              <Link href="/docs/contributing" className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Contributing Guide</Link>
            </div>
          </div>
        </div>
      </PremiumSection>
    </>
  )
}
