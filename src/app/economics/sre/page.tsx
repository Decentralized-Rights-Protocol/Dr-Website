'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Target, Leaf, Brain, Users, CheckCircle } from 'lucide-react'
import { EconomicsHero } from '@/components/economics/EconomicsHero'
import { PillarCard } from '@/components/economics/PillarCard'

const sdgGoals = [
  { number: 1, name: 'No Poverty', description: 'Rights-based distribution ensures basic needs are met' },
  { number: 2, name: 'Zero Hunger', description: 'Food security through verified contribution' },
  { number: 3, name: 'Good Health', description: 'Healthcare access based on human rights' },
  { number: 4, name: 'Quality Education', description: 'Learning-to-earn model incentivizes education' },
  { number: 7, name: 'Affordable Energy', description: 'Renewable energy usage rewarded' },
  { number: 8, name: 'Decent Work', description: 'Verified work receives fair compensation' },
  { number: 9, name: 'Innovation', description: 'Infrastructure supports sustainable development' },
  { number: 10, name: 'Reduced Inequality', description: 'Rights-based allocation reduces disparities' },
  { number: 11, name: 'Sustainable Cities', description: 'Community-driven urban development' },
  { number: 12, name: 'Responsible Consumption', description: 'Quality goods, not waste' },
  { number: 16, name: 'Peace & Justice', description: 'Transparent governance and accountability' },
  { number: 17, name: 'Partnerships', description: 'Global collaboration for rights protection' },
]

const pillars = [
  {
    icon: Users,
    title: 'Human Development',
    description: 'The Sustainable Rights Economy prioritizes human dignity, capability development, and rights fulfillment. Every economic decision is evaluated through the lens of human development: Does this action enhance human capabilities? Does it respect fundamental rights? Does it contribute to human flourishing?',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Environmental sustainability is not an afterthought but a core economic principle. Renewable energy usage, low carbon footprints, and sustainable practices are directly rewarded in the SRE. The economy operates within planetary boundaries, recognizing that long-term human rights depend on a healthy planet.',
  },
  {
    icon: Brain,
    title: 'AI Trust Layer',
    description: 'AI serves as a transparent auditor and verifier, not a controller. The AI Trust Layer ensures that activity verification is fair, transparent, and auditable. AI scoring systems are open-source, explainable, and subject to human oversight. This creates trust without surveillance.',
  },
  {
    icon: Target,
    title: 'Blockchain Transparency',
    description: 'All economic transactions, distributions, and governance decisions are recorded on a quantum-safe blockchain. This ensures transparency, prevents corruption, and enables auditability. The blockchain serves as an immutable record of rights fulfillment and economic justice.',
  },
]

export default function SREPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      {/* Hero */}
      <EconomicsHero
        title="Sustainable Rights Economy (SRE)"
        subtitle="Rights-backed distribution powered by AI verification and blockchain transparency"
      />

      {/* Navigation */}
      <div className="border-b border-white/20 bg-transparent">
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

      {/* Definition Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              What is the Sustainable Rights Economy?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-neutral-300 mb-6">
                The Sustainable Rights Economy (SRE) is an economic paradigm that replaces extraction with 
                verification, surveillance with transparency, and inequality with rights-based distribution. 
                It is built on the principle that economic value should flow to those who create it through 
                verified human activity, sustainable contribution, and community service.
              </p>
              <p className="text-lg text-neutral-300 mb-6">
                In the SRE, distribution is not based on ownership of capital or extraction of resources, 
                but on <strong className="text-white">verified contribution</strong> 
                to human development, sustainability, and community well-being.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rights-Backed Distribution */}
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
              How Rights-Backed Distribution Works
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-300 mb-6">
                Rights-backed distribution means that economic resources are allocated based on fundamental 
                human rights rather than market power or capital ownership. The system recognizes that every 
                human being has inherent rights to:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-neutral-300 mb-6">
                <li><strong className="text-white">Basic Needs:</strong> Food, water, shelter, healthcare, education</li>
                <li><strong className="text-white">Dignity:</strong> Recognition of human worth and contribution</li>
                <li><strong className="text-white">Participation:</strong> Voice in economic and governance decisions</li>
                <li><strong className="text-white">Development:</strong> Opportunity to develop capabilities and flourish</li>
              </ul>
              <p className="text-lg text-neutral-300">
                Distribution algorithms prioritize these rights, ensuring that even those who cannot 
                contribute economically (due to age, disability, or circumstances) receive basic support 
                as a matter of right, not charity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Scoring */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              AI Scoring: Contribution, Sustainability, Learning, Community Service
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-300 mb-6">
                AI in the SRE serves as a transparent scoring system that evaluates multiple dimensions 
                of contribution:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {[
                  {
                    title: 'Contribution Score',
                    description: 'Measures verified work, learning, and productive activity. Open-source algorithms ensure fairness.',
                  },
                  {
                    title: 'Sustainability Score',
                    description: 'Rewards renewable energy usage, low carbon footprint, and sustainable practices.',
                  },
                  {
                    title: 'Learning Score',
                    description: 'Incentivizes education, skill development, and knowledge sharing through the learn-to-earn model.',
                  },
                  {
                    title: 'Community Service Score',
                    description: 'Recognizes volunteer work, community building, and civic engagement.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-900"
                  >
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-neutral-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Incentives */}
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
              Clean Incentives: Renewable Energy, Good Behavior, Verified Effort
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-300 mb-6">
                The SRE creates positive feedback loops by directly rewarding behaviors that benefit 
                individuals, communities, and the planet:
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: Leaf,
                    title: 'Renewable Energy Usage',
                    description: 'Households and businesses using solar, wind, or other renewable sources receive higher sustainability scores and economic rewards.',
                  },
                  {
                    icon: CheckCircle,
                    title: 'Good Behavior',
                    description: 'Community service, civic engagement, and positive social contributions are verified and rewarded.',
                  },
                  {
                    icon: Target,
                    title: 'Verified Effort',
                    description: 'Work, learning, and productive activity are verified through the Activity-Based Economy, ensuring fair compensation.',
                  },
                ].map((item, index) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SDG Integration - Redesigned */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                SDG Integration: Mapping DRP Mechanisms to UN Goals
              </h2>
              <p className="text-xl text-neutral-300 mb-2">
                The Sustainable Rights Economy directly addresses 12 of the 17 UN Sustainable Development Goals
              </p>
              <p className="text-lg text-neutral-400">
                Through rights-based distribution, verified activity, and AI-driven resource allocation
              </p>
            </div>

            {/* SDG Impact Table */}
            <div className="mb-12 overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">SDG Goal</th>
                    <th className="px-6 py-4 text-left font-semibold">DRP Mechanism</th>
                    <th className="px-6 py-4 text-left font-semibold">Input Metrics</th>
                    <th className="px-6 py-4 text-left font-semibold">Economic Output</th>
                    <th className="px-6 py-4 text-center font-semibold">Impact Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold flex items-center justify-center">
                          1
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">No Poverty</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Rights-based distribution floor
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Basic needs verification, activity credits
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Guaranteed minimum allocation, wealth distribution
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white font-bold flex items-center justify-center">
                          2
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Zero Hunger</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Food security through verified contribution
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Agricultural activity, food production verification
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Food access tokens, supply chain transparency
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-semibold">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white font-bold flex items-center justify-center">
                          3
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Good Health</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Healthcare access based on human rights
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Health service verification, wellness activities
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Healthcare access tokens, preventive care rewards
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 text-white font-bold flex items-center justify-center">
                          4
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Quality Education</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Learn-to-earn model incentivizes education
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Learning activity verification, knowledge sharing
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Education rewards, skill development tokens
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 text-white font-bold flex items-center justify-center">
                          7
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Affordable Energy</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Renewable energy usage rewarded
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Energy production verification, renewable source tracking
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Energy credits, sustainability bonuses
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-semibold">
                        Medium
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-pink-600 text-white font-bold flex items-center justify-center">
                          8
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Decent Work</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Verified work receives fair compensation
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Work activity verification, productivity metrics
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Fair wages, work quality rewards
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold flex items-center justify-center">
                          9
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Innovation</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Infrastructure supports sustainable development
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Innovation activity, R&D contributions
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Innovation grants, technology development rewards
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-semibold">
                        Medium
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white font-bold flex items-center justify-center">
                          10
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Reduced Inequality</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Rights-based allocation reduces disparities
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Status accrual, activity credits, redistribution metrics
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Lower Gini coefficient, equitable wealth distribution
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-xs font-semibold">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 text-white font-bold flex items-center justify-center">
                          11
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Sustainable Cities</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Community-driven urban development
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Community service, urban planning participation
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Community development tokens, infrastructure rewards
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-semibold">
                        Medium
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold flex items-center justify-center">
                          12
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Responsible Consumption</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Quality goods, not waste
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Consumption verification, product quality tracking
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Quality goods network, waste reduction rewards
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-semibold">
                        Medium
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold flex items-center justify-center">
                          16
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Peace & Justice</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Transparent governance and accountability
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Governance participation, transparency metrics
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Accountable systems, transparent decision-making
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center">
                          17
                        </div>
                        <span className="font-semibold text-neutral-900 dark:text-white">Partnerships</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-700 dark:text-neutral-300">
                      Global collaboration for rights protection
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Cross-border collaboration, partnership verification
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      Global network effects, collaborative rewards
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                        Medium
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Systems Flow Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                DRP → SDG Impact Flow
              </h3>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-900">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Input Layer */}
                  <div className="text-center">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 mb-3 shadow-md">
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Inputs</h4>
                      <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1 text-left">
                        <li>• Verified Activities</li>
                        <li>• Rights Claims</li>
                        <li>• Energy Usage</li>
                        <li>• Governance Participation</li>
                      </ul>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 relative">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-indigo-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                  </div>

                  {/* DRP Mechanisms */}
                  <div className="text-center">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 mb-3 shadow-md">
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">DRP Mechanisms</h4>
                      <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1 text-left">
                        <li>• AI Scoring</li>
                        <li>• Rights-Based Distribution</li>
                        <li>• Activity Verification</li>
                        <li>• Governance Algorithms</li>
                      </ul>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500 to-green-500 relative">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-green-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                  </div>

                  {/* Output Layer */}
                  <div className="text-center">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 mb-3 shadow-md">
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Economic Outputs</h4>
                      <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1 text-left">
                        <li>• Wealth Distribution</li>
                        <li>• Access to Resources</li>
                        <li>• Community Resilience</li>
                        <li>• SDG Progress</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* SDG Impact Metrics */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 text-center shadow-md">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">12</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">SDGs Addressed</div>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 text-center shadow-md">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">70%</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">High Impact Goals</div>
                  </div>
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 text-center shadow-md">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">100%</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Rights-Based</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              The Four Pillars of SRE
            </h2>
            <p className="text-xl text-neutral-300">
              The foundation of the Sustainable Rights Economy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} {...pillar} index={index} />
            ))}
          </div>
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
              Ready to Learn More?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Explore how the Activity-Based Economy and Tokenomics support the SRE
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/economics/abe"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                Activity-Based Economy
              </Link>
              <Link
                href="/economics/tokenomics"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Tokenomics
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

