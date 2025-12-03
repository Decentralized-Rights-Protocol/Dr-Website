'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Globe, Shield, Sparkles, Activity, Coins, Package, Users, Building2 } from 'lucide-react'
import { EconomicsHero } from '@/components/economics/EconomicsHero'
import { SystemComparison } from '@/components/economics/SystemComparison'

const economicsPages = [
  {
    href: '/economics/sre',
    title: 'Sustainable Rights Economy (SRE)',
    description: 'Rights-backed distribution, AI scoring, and SDG integration',
    icon: Shield,
    color: 'from-green-500 to-emerald-600',
  },
  {
    href: '/economics/abe',
    title: 'Activity-Based Economy (ABE)',
    description: 'Value = Verified Human Activity + Sustainable Contribution',
    icon: Activity,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    href: '/economics/tokenomics',
    title: 'DRP Dual Token Model',
    description: '$RIGHTS governance + $DeRi utility rewards',
    icon: Coins,
    color: 'from-purple-500 to-pink-600',
  },
  {
    href: '/economics/distribution',
    title: 'Sustainable Supply & Distribution',
    description: 'AI-driven fair allocation and quality goods network',
    icon: Package,
    color: 'from-orange-500 to-red-600',
  },
  {
    href: '/economics/governance',
    title: 'Human-Centric Governance',
    description: 'AI Elders, Proof of Status, and rights-backed decisions',
    icon: Users,
    color: 'from-indigo-500 to-blue-600',
  },
  {
    href: '/economics/global',
    title: 'Global Economic Impact',
    description: 'For governments, communities, businesses, and WEF stakeholders',
    icon: Globe,
    color: 'from-cyan-500 to-teal-600',
  },
]

export default function EconomicsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <EconomicsHero
        title="DRP Economics: The Sustainable Rights Economy (SRE)"
        subtitle="Replacing extraction with verified human activity"
        description="A new economic paradigm where human dignity, sustainability, and verified contribution replace surveillance, inequality, and environmental degradation."
      />

      {/* Current Economic Crisis */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              The Current Economic Crisis
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-6">
                Our current economic system behaves like &quot;The Alien&quot;—an inhuman force that extracts value, 
                surveils populations, and perpetuates inequality. It treats human beings as resources to be 
                optimized rather than rights-holders to be empowered.
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                <strong className="text-neutral-900 dark:text-white">The Problem:</strong> We have an 
                extraction-based economy where:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600 dark:text-neutral-300 mb-6">
                <li>AI is used as a ruler (surveillance, control, optimization of humans)</li>
                <li>Value flows upward to centralized entities</li>
                <li>Inequality is built into the system by design</li>
                <li>Environmental degradation is externalized</li>
                <li>Human dignity is ignored in favor of efficiency metrics</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI as Auditor, Not Ruler */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              AI as Auditor, Not Ruler
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              DRP flips the script: Instead of AI surveilling and controlling humans, AI serves as a 
              transparent auditor that verifies human activity, ensures fairness, and maintains the integrity 
              of the rights-based distribution system.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-3">
                  Current System: AI as Ruler
                </h3>
                <ul className="space-y-2 text-red-800 dark:text-red-200">
                  <li>• Surveillance and control</li>
                  <li>• Optimization of humans</li>
                  <li>• Opaque decision-making</li>
                  <li>• Centralized power</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3">
                  DRP System: AI as Auditor
                </h3>
                <ul className="space-y-2 text-green-800 dark:text-green-200">
                  <li>• Verification and transparency</li>
                  <li>• Empowerment of humans</li>
                  <li>• Open, auditable processes</li>
                  <li>• Decentralized governance</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* System Comparison */}
      <SystemComparison />

      {/* DRP Mission */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              DRP&apos;s Mission: Replace Extraction with Verified Human Activity
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              The Sustainable Rights Economy (SRE) is built on three core principles:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Activity,
                  title: 'Verified Activity',
                  description: 'Human contribution is verified, not surveilled. Value flows to those who create it.',
                },
                {
                  icon: Shield,
                  title: 'Rights-Backed',
                  description: 'Distribution is based on human rights, not extraction. Dignity is the metric.',
                },
                {
                  icon: Sparkles,
                  title: 'Sustainable',
                  description: 'Environmental and social sustainability are rewarded, not externalized.',
                },
              ].map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                >
                  <Icon className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Economics Pages Grid */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Explore DRP Economics
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Deep dive into each aspect of the Sustainable Rights Economy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {economicsPages.map((page, index) => (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={page.href}
                  className="group block h-full p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${page.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <page.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {page.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                    {page.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Explore the DRP Economy?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover how the Sustainable Rights Economy transforms value creation, distribution, and governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/explorer"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                View Explorer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/whitepaper"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Read Whitepaper
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

