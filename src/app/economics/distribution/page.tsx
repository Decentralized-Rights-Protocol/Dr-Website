'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Package, Truck, Scale, Sparkles, Cpu, MapPin, Boxes } from 'lucide-react'
import { EconomicsHero } from '@/components/economics/EconomicsHero'

export default function DistributionPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      <EconomicsHero
        title="Sustainable Supply & Distribution"
        subtitle="AI-driven fair allocation of essentials, quality goods, and premium resources"
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

      {/* Distribution Categories */}
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
              How DRP Distributes Value
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              The DRP distribution model distinguishes between essentials, quality goods, and scarce or premium goods. 
              Each category has its own allocation logic, grounded in rights, dignity, and verified contribution.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[ 
                {
                  title: 'Essentials',
                  description: 'Food, water, healthcare, basic shelter—allocated as rights, not commodities. No human should fall below a rights threshold.',
                },
                {
                  title: 'Quality Goods',
                  description: 'High-quality toys, clothing, carpets, and household items distributed based on verified contribution and community needs.',
                },
                {
                  title: 'Premium Goods',
                  description: 'Scarce resources (premium devices, rare goods) allocated transparently with demand scoring and integrity checks.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700"
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
          </motion.div>
        </div>
      </section>

      {/* Demand Scoring & AI Integrity */}
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
              Demand Scoring and AI Integrity Checks
            </h2>
            <p className="text-lg text-neutral-300 mb-6">
              DRP uses transparent, auditable AI models to score demand and ensure integrity:
            </p>
            <ul className="space-y-4">
              {[
                'Households and communities register needs across essentials, quality goods, and premium categories.',
                'AI models evaluate requests based on rights baselines, contribution scores, and verified circumstances.',
                'Integrity checks detect anomalies, gaming, or fraud, with human oversight from local councils and AI Elders.',
                'Allocation decisions are recorded on-chain, making every distribution event auditable.',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-3 text-neutral-700 dark:text-neutral-200"
                >
                  <span className="mt-1 text-blue-500">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Quality Goods Network */}
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
              Quality Control: The Quality Goods Network
            </h2>
            <p className="text-lg text-neutral-300 mb-6">
              DRP envisions a network of manufacturers, artisans, and logistics partners focused on delivering 
              durable, safe, and rights-aligned products:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: Package,
                  title: 'Certified Quality',
                  description: 'Suppliers undergo quality audits and ongoing monitoring, with community feedback loops.',
                },
                {
                  icon: Sparkles,
                  title: 'Rights-Backed Design',
                  description: 'Products are evaluated for safety, accessibility, and alignment with human development goals.',
                },
                {
                  icon: Truck,
                  title: 'Responsible Logistics',
                  description: 'Distribution partners commit to fair labor practices and sustainable logistics.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                >
                  <item.icon className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Supply Chain Redesign */}
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
              Supply Chain Redesign: Local-First and Rights-Weighted
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-xl bg-transparent-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-white mb-3">
                  Local-First Distribution
                </h3>
                <p className="text-neutral-300">
                  Goods are sourced and distributed locally wherever possible, reducing emissions and 
                  empowering local economies. Global supply chains are used strategically, not by default.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-transparent-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-white mb-3">
                  AI Demand Prediction
                </h3>
                <p className="text-neutral-300">
                  AI models anticipate demand for essentials and quality goods, preventing shortages and 
                  minimizing waste while respecting rights-based priorities.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-transparent-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-white mb-3">
                  Rights-Weighted Allocation
                </h3>
                <p className="text-neutral-300">
                  Allocation algorithms prioritize vulnerable populations and those with historically 
                  limited access, correcting structural injustice over time.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-transparent-800 border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold text-white mb-3">
                  Transparent Routing
                </h3>
                <p className="text-neutral-300">
                  Every major distribution decision—who receives what, when, and why—is logged on-chain for 
                  community and institutional audit.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Diagrams */}
      <section className="py-16 bg-transparent-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              AI → Fair Allocation → Delivery
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <div className="flex flex-col items-center">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-3">
                  <Cpu className="h-10 w-10 text-white" />
                </div>
                <span className="font-semibold text-white">AI Demand Engine</span>
              </div>
              <div className="text-4xl text-neutral-400">→</div>
              <div className="flex flex-col items-center">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 mb-3">
                  <Scale className="h-10 w-10 text-white" />
                </div>
                <span className="font-semibold text-white">Fair Allocation</span>
              </div>
              <div className="text-4xl text-neutral-400">→</div>
              <div className="flex flex-col items-center">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 mb-3">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <span className="font-semibold text-white">Delivery Network</span>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-6">
              Quality Goods Network Model
            </h3>
            <p className="text-lg text-neutral-300 mb-8">
              A mesh of local hubs, manufacturers, and logistics nodes coordinated by AI and governed by 
              human rights principles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Local Hubs', 'Makers & Factories', 'Logistics Partners', 'Community Councils', 'AI Elders'].map((node) => (
                <div
                  key={node}
                  className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100"
                >
                  {node}
                </div>
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
              Explore Governance & Global Impact
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/economics/governance"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                Governance Model
              </Link>
              <Link
                href="/economics/global"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Global Economics
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

