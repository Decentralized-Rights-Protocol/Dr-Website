'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Globe, Building, Users, Briefcase, Sparkles, Leaf } from 'lucide-react'
import { EconomicsHero } from '@/components/economics/EconomicsHero'

export default function GlobalEconomicsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      <EconomicsHero
        title="DRP&apos;s Impact on Global Economics"
        subtitle="From Ghana testnets to WEF-level policy conversations"
      />

      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-transparent-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <Link
            href="/economics"
            className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Economics Overview
          </Link>
        </div>
      </div>

      {/* Stakeholder Sections */}
      <section className="py-16 bg-transparent-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              A New Global Economy for All Stakeholders
            </h2>
            <p className="text-lg text-neutral-300 mb-8">
              DRP&apos;s Sustainable Rights Economy proposes a post-capitalist model where verified contribution, 
              sustainability, and human dignity replace extraction, speculation, and systemic inequality.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-white mb-2">
                  For Governments
                </h3>
                <p className="text-neutral-300">
                  Rights-based distribution, transparent welfare systems, and AI-verified impact reporting 
                  enable smarter social policy and reduced corruption.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-white mb-2">
                  For Communities
                </h3>
                <p className="text-neutral-300">
                  Local-first distribution, community councils, and learn-to-earn models empower communities 
                  to co-govern resources and opportunities.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-white mb-2">
                  For Businesses
                </h3>
                <p className="text-neutral-300">
                  New markets for rights-backed services, quality goods, and sustainability-linked products, 
                  with transparent impact metrics.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-white mb-2">
                  For the Global South
                </h3>
                <p className="text-neutral-300">
                  Direct access to a global economic fabric that values contribution over capital, with 
                  local testbeds (such as in Ghana) informing global policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WEF-Level Narrative */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Why WEF Stakeholders Will Care
            </h2>
            <p className="text-lg text-neutral-300 mb-6">
              At a World Economic Forum (WEF) or World Bank level, DRP offers:
            </p>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-200">
              <li>• A concrete blueprint for moving beyond GDP toward human development metrics</li>
              <li>• An operational model for rights-based economics, not just theory</li>
              <li>• A way to align AI, blockchain, and sustainability under a single, auditable framework</li>
              <li>• A demonstration that global south pilots can inform global north policy, not the reverse</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Replacing Broken Capitalism */}
      <section className="py-16 bg-transparent-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              From Broken Capitalism to Verified Contribution
            </h2>
            <p className="text-lg text-neutral-300 mb-6">
              DRP does not propose a minor reform of capitalism. It proposes a new base layer where:
            </p>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-200 mb-6">
              <li>• Capital is no longer the sole gatekeeper of opportunity</li>
              <li>• Contribution is measured, verified, and rewarded transparently</li>
              <li>• Environmental externalities are priced into the system, not ignored</li>
              <li>• Human dignity is a first-order variable, not an afterthought</li>
            </ul>
            <p className="text-lg text-neutral-300">
              This is not a utopian fantasy—it is an architecture, implementable step by step, starting with 
              local pilots and expanding into global networks of rights-backed, AI-verified economic collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Human Development & Green Incentives */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text:white mb-6">
              Human Development, Rights-Based Economics, and Green Incentives
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-xl bg-transparent-800 border border-neutral-200 dark:border-neutral-700">
                <Users className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Human Development
                </h3>
                <p className="text-neutral-300">
                  Capabilities, education, health, and dignity are explicit economic objectives, not side effects.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-transparent-800 border border-neutral-200 dark:border-neutral-700">
                <Globe className="h-8 w-8 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Rights-Based Economics
                </h3>
                <p className="text-neutral-300">
                  Allocation algorithms are constrained by rights charters and human dignity metrics.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-transparent-800 border border-neutral-200 dark:border-neutral-700">
                <Leaf className="h-8 w-8 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Green Incentives
                </h3>
                <p className="text-neutral-300">
                  Renewable energy use, low-carbon lifestyles, and ecosystem restoration are rewarded as primary contributions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Connect Economics to Reality
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Visit the DRP explorer to see how blocks, transactions, and proofs form the fabric of the new economy.
            </p>
            <Link
              href="/explorer"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              Open Explorer
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

