'use client'

import { motion } from 'framer-motion'
import { ArrowRight, X, Check } from 'lucide-react'

export function SystemComparison() {
  const oldSystem = [
    'Extraction-based economy',
    'AI as ruler (surveillance)',
    'Centralized control',
    'Inequality by design',
    'Environmental degradation',
    'Human dignity ignored',
  ]

  const newSystem = [
    'Activity-verified economy',
    'AI as auditor (transparency)',
    'Decentralized governance',
    'Rights-based distribution',
    'Sustainability rewarded',
    'Human dignity as metric',
  ]

  return (
    <div className="py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Old System vs DRP System
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            The transformation from extraction to verification
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Old System */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900"
          >
            <div className="flex items-center gap-3 mb-6">
              <X className="h-8 w-8 text-red-600 dark:text-red-400" />
              <h3 className="text-2xl font-bold text-red-900 dark:text-red-100">
                The Alien Economy
              </h3>
            </div>
            <p className="text-red-800 dark:text-red-200 mb-6">
              Current system: extraction, surveillance, inequality
            </p>
            <ul className="space-y-3">
              {oldSystem.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-red-700 dark:text-red-300"
                >
                  <X className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-4 rounded-full bg-gradient-to-r from-red-500 to-green-500"
            >
              <ArrowRight className="h-8 w-8 text-white" />
            </motion.div>
          </div>

          {/* New System */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-900"
          >
            <div className="flex items-center gap-3 mb-6">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">
                DRP Economy
              </h3>
            </div>
            <p className="text-green-800 dark:text-green-200 mb-6">
              Sustainable Rights Economy: verification, transparency, dignity
            </p>
            <ul className="space-y-3">
              {newSystem.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-green-700 dark:text-green-300"
                >
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

