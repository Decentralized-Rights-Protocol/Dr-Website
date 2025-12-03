'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Coins, Shield, TrendingUp, Users, Lock, Zap, Globe } from 'lucide-react'
import { EconomicsHero } from '@/components/economics/EconomicsHero'
import { TokenFlowDiagram } from '@/components/economics/TokenFlowDiagram'

export default function TokenomicsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <EconomicsHero
        title="DRP Dual Token Model"
        subtitle="$RIGHTS governance + $DeRi utility rewards"
      />

      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
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

      {/* Dual Token Overview */}
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
              The Dual Token Architecture
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              DRP uses two complementary tokens to separate governance from utility, ensuring both 
              rights protection and economic activity are properly incentivized.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {/* RIGHTS Token */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border-2 border-indigo-200 dark:border-indigo-900"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
                      $RIGHTS
                    </h3>
                    <p className="text-indigo-700 dark:text-indigo-300">Governance Token</p>
                  </div>
                </div>
                <ul className="space-y-3 text-indigo-800 dark:text-indigo-200">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                    <span>Governance and rights framework</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                    <span>Voting on protocol decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                    <span>Access to rights-protected services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                    <span>Staking for network security</span>
                  </li>
                </ul>
              </motion.div>

              {/* DeRi Token */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200 dark:border-purple-900"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                    <Coins className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                      $DeRi
                    </h3>
                    <p className="text-purple-700 dark:text-purple-300">Utility Token</p>
                  </div>
                </div>
                <ul className="space-y-3 text-purple-800 dark:text-purple-200">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <span>Activity rewards and incentives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <span>Payment for goods and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <span>Learn-to-earn rewards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <span>Staking for additional benefits</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Token Flows */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Token Flows Through the Economy
            </h2>
            <TokenFlowDiagram />
          </motion.div>
        </div>
      </section>

      {/* Fair Launch */}
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
              Fair Launch, No VC Dominance
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                DRP tokens are distributed through a fair launch mechanism that prevents centralization:
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: Users,
                    title: 'Community Distribution',
                    description: 'Tokens are distributed to active participants based on verified contribution, not capital investment.',
                  },
                  {
                    icon: Lock,
                    title: 'No Pre-Mine',
                    description: 'No tokens are reserved for founders, VCs, or insiders. All tokens enter circulation through fair mechanisms.',
                  },
                  {
                    icon: Globe,
                    title: 'Global Access',
                    description: 'Anyone can participate regardless of geographic location or financial status.',
                  },
                  {
                    icon: Zap,
                    title: 'Activity-Based',
                    description: 'Token distribution is tied to verified activity, learning, and contribution, not speculation.',
                  },
                ].map((item, index) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-900"
                  >
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-300">
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

      {/* Staking & Governance */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Staking, Governance, and Access Control
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Staking',
                  description: 'Stake $RIGHTS for network security and earn rewards. Staking also grants governance voting power.',
                  icon: Lock,
                  color: 'from-indigo-500 to-blue-600',
                },
                {
                  title: 'Governance',
                  description: 'Holders of $RIGHTS vote on protocol upgrades, parameter changes, and resource allocation decisions.',
                  icon: Users,
                  color: 'from-purple-500 to-pink-600',
                },
                {
                  title: 'Access Control',
                  description: '$RIGHTS tokens provide access to rights-protected services, premium features, and governance participation.',
                  icon: Shield,
                  color: 'from-green-500 to-emerald-600',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} mb-4`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Layer Diagram */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-12 text-center">
              Rights Layer → Activity Layer → Distribution Layer
            </h2>
            <div className="space-y-6">
              {[
                {
                  layer: 'Rights Layer',
                  token: '$RIGHTS',
                  description: 'Governance, rights framework, and access control',
                  color: 'from-indigo-500 to-blue-600',
                },
                {
                  layer: 'Activity Layer',
                  token: '$DeRi',
                  description: 'Verified activity, learning, and contribution rewards',
                  color: 'from-purple-500 to-pink-600',
                },
                {
                  layer: 'Distribution Layer',
                  token: 'Both',
                  description: 'Fair allocation of resources, goods, and services',
                  color: 'from-green-500 to-emerald-600',
                },
              ].map((layer, index) => (
                <motion.div
                  key={layer.layer}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 border-2 border-neutral-200 dark:border-neutral-700"
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-6 rounded-xl bg-gradient-to-br ${layer.color}`}>
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                          {layer.layer}
                        </h3>
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium">
                          {layer.token}
                        </span>
                      </div>
                      <p className="text-lg text-neutral-600 dark:text-neutral-300">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              Explore Distribution & Governance
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/economics/distribution"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                Distribution Model
              </Link>
              <Link
                href="/economics/governance"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Governance Model
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

