'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Activity, CheckCircle, Leaf, BookOpen, Users, TrendingUp, Shield } from 'lucide-react'
import { EconomicsHero } from '@/components/economics/EconomicsHero'

const contributionTypes = [
  {
    icon: BookOpen,
    title: 'Learning Proofs',
    description: 'Education, skill development, and knowledge sharing are verified and rewarded. The learn-to-earn model incentivizes continuous learning.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Activity,
    title: 'Work Proofs',
    description: 'Productive work, whether formal employment or community contribution, is verified and fairly compensated.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: Shield,
    title: 'Health Proofs',
    description: 'Health maintenance, preventive care, and wellness activities contribute to individual and community well-being.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Users,
    title: 'Civic Action Proofs',
    description: 'Community service, civic engagement, and participation in governance are recognized and rewarded.',
    color: 'from-orange-500 to-red-600',
  },
]

const greenScoringProofs = [
  {
    title: 'Renewable Energy Usage',
    description: 'Households and businesses using solar, wind, or other renewable sources receive sustainability bonuses.',
  },
  {
    title: 'Low Carbon Footprint',
    description: 'Transportation choices, consumption patterns, and lifestyle decisions that reduce emissions are rewarded.',
  },
  {
    title: 'Sustainable Practices',
    description: 'Waste reduction, recycling, water conservation, and other environmental practices contribute to green scores.',
  },
  {
    title: 'Carbon Offset Activities',
    description: 'Tree planting, ecosystem restoration, and other carbon-negative activities are verified and rewarded.',
  },
]

export default function ABEPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      <EconomicsHero
        title="Activity-Based Economy (ABE)"
        subtitle="Value = Verified Human Activity + Sustainable Contribution"
      />

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

      {/* Core Principle */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
              <TrendingUp className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Core Equation</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">
              Value = Verified Human Activity + Sustainable Contribution
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              In the Activity-Based Economy, economic value is not extracted from ownership or speculation, 
              but created through verified human contribution and sustainable practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verification Without Surveillance */}
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
              How DRP Verifies Activity Without Cameras or Microphones
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-neutral-300 mb-6">
                Unlike surveillance capitalism, DRP verifies activity through <strong className="text-white">proof systems</strong> 
                that respect privacy and dignity:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {[
                  {
                    title: 'Proof of Activity (PoAT)',
                    description: 'Users submit encrypted proofs of activity (work, learning, community service) that are verified by AI without revealing private details. The proof is cryptographically signed and stored on IPFS.',
                  },
                  {
                    title: 'Proof of Status (PoST)',
                    description: 'Institutional verification of credentials, education, employment, or status without exposing personal data. Uses zero-knowledge proofs where possible.',
                  },
                  {
                    title: 'Blockchain Verification',
                    description: 'All proofs are recorded on the blockchain, creating an immutable, auditable record of contribution without surveillance.',
                  },
                  {
                    title: 'AI Scoring',
                    description: 'Open-source AI algorithms score contributions based on verified proofs, ensuring fairness and transparency without invasive monitoring.',
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

      {/* Contribution Proofs */}
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
              Contribution Proofs: Learning, Work, Health, Civic Actions
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              The Activity-Based Economy recognizes multiple forms of valuable contribution:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {contributionTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {type.title}
                  </h3>
                  <p className="text-neutral-300">
                    {type.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Green Scoring */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Sustainability Rewards</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Green Scoring Proofs: Renewable Usage, Low Carbon Footprint
              </h2>
              <p className="text-xl text-neutral-300">
                Environmental sustainability is directly rewarded in the Activity-Based Economy
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {greenScoringProofs.map((proof, index) => (
                <motion.div
                  key={proof.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white dark:bg-neutral-800 border-2 border-green-200 dark:border-green-900"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {proof.title}
                      </h3>
                      <p className="text-neutral-300">
                        {proof.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Diagram */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              Effort → Verification → Rewards
            </h2>
            <div className="relative">
              {/* Flow Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {[
                  { icon: Activity, label: 'Human Effort', color: 'from-blue-500 to-cyan-600' },
                  { icon: Shield, label: 'AI Verification', color: 'from-purple-500 to-pink-600' },
                  { icon: TrendingUp, label: 'Token Rewards', color: 'from-green-500 to-emerald-600' },
                ].map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`p-8 rounded-2xl bg-gradient-to-br ${step.color} mb-4`}>
                      <step.icon className="h-12 w-12 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-white">
                      {step.label}
                    </span>
                    {index < 2 && (
                      <div className="hidden md:block absolute left-[calc(33.33%+4rem)] top-1/2 -translate-y-1/2">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          className="text-4xl text-neutral-400"
                        >
                          →
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-center text-lg text-neutral-300 mt-12">
              The Activity-Based Economy creates a transparent, fair loop where verified contribution 
              directly translates to economic reward, without extraction or surveillance.
            </p>
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
              Ready to Explore Tokenomics?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Learn how $RIGHTS and $DeRi tokens power the Activity-Based Economy
            </p>
            <Link
              href="/economics/tokenomics"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              View Tokenomics
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

