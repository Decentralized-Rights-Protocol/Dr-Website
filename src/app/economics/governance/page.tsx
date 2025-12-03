'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Activity, Network, AlertTriangle, Gavel } from 'lucide-react'
import { EconomicsHero } from '@/components/economics/EconomicsHero'

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <EconomicsHero
        title="Human-Centric Governance Model"
        subtitle="AI Elders, proofs, and rights-backed decision-making"
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

      {/* AI Elders Concept */}
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
              AI Elders: Ethical AI as Guardians, Not Rulers
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
              AI Elders are specialized AI systems tasked with monitoring the integrity of the DRP economy—
              not to control humans, but to protect them. They:
            </p>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-200">
              <li>• Monitor asset flows for signs of corruption, exploitation, or systemic bias</li>
              <li>• Flag anomalies and potential abuses for human review</li>
              <li>• Enforce rights constraints (no one falls below basic rights thresholds)</li>
              <li>• Provide transparent, explainable reports to communities and institutions</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Proof Systems */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              Proof of Status (PoST) and Proof of Activities (PoAT)
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  Proof of Status (PoST)
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Encodes verified credentials (education, professional status, institutional recognition) 
                  without exposing private data. Used for governance weighting and access control.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  Proof of Activities (PoAT)
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Records verified human activity (work, learning, civic engagement) to inform rewards, 
                  representation, and distribution decisions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cross-Chain Recovery & Reporting */}
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
              Cross-Chain Recovery and Anonymous Reporting
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  Cross-Chain Recovery of Lost Assets
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Using rights-backed identity and multi-chain attestations, DRP can recover lost assets 
                  when users lose keys, subject to strict governance and community oversight.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  Anonymous Reporting & Justice Framework
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Whistleblowers and vulnerable individuals can report abuse or corruption anonymously. 
                  AI Elders triage reports, and human councils adjudicate using transparent, rights-based norms.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rights-Backed Decision Making */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              Rights-Backed Decision-Making
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
              Every governance decision in DRP is evaluated against a rights charter inspired by global 
              human rights frameworks and adapted for decentralized contexts.
            </p>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-200">
              <li>• No decision may violate basic human rights baselines</li>
              <li>• All major decisions are recorded on-chain with public rationales</li>
              <li>• Minority protections prevent tyranny of the majority</li>
              <li>• Impact assessments evaluate effects on human development and sustainability</li>
            </ul>
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
              See It in Action
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Explore the DRP explorer to see how governance, activity, and distribution appear on-chain.
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

