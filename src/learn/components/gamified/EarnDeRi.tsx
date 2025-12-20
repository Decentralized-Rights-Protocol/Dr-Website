'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

interface EarnDeRiProps {
  amount: number
  reason?: string
  className?: string
}

/**
 * EarnDeRi - Indicator showing $DeRi token rewards
 * Gamification element to motivate learning
 */
export function EarnDeRi({ amount, reason, className = '' }: EarnDeRiProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, type: 'spring' }}
      className={`inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/40 rounded-lg px-4 py-2 ${className}`}
    >
      <CurrencyDollarIcon className="h-5 w-5 text-green-400" />
      <span className="font-semibold text-green-300">
        +{amount} $DeRi
      </span>
      {reason && (
        <span className="text-sm text-neutral-300">• {reason}</span>
      )}
    </motion.div>
  )
}

