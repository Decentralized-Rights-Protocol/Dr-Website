'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Coins, Shield, Users, Activity } from 'lucide-react'

export function TokenFlowDiagram() {
  const flows = [
    {
      from: { icon: Activity, label: 'Verified Activity', color: 'from-blue-500' },
      to: { icon: Coins, label: '$DeRi Rewards', color: 'to-purple-500' },
    },
    {
      from: { icon: Shield, label: 'Rights Framework', color: 'from-green-500' },
      to: { icon: Coins, label: '$RIGHTS Governance', color: 'to-indigo-500' },
    },
    {
      from: { icon: Coins, label: 'Token Distribution', color: 'from-purple-500' },
      to: { icon: Users, label: 'Community', color: 'to-cyan-500' },
    },
  ]

  return (
    <div className="py-12 bg-gradient-to-br from-neutral-50 to-blue-50 dark:from-neutral-900 dark:to-blue-950/20 rounded-2xl">
      <div className="px-8">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
          Token Flow in DRP Economy
        </h3>
        
        <div className="space-y-8">
          {flows.map((flow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-center justify-center gap-4"
            >
              {/* From */}
              <div className="flex flex-col items-center gap-2">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${flow.from.color} to-blue-600`}>
                  <flow.from.icon className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center max-w-[120px]">
                  {flow.from.label}
                </span>
              </div>

              {/* Arrow */}
              <ArrowRight className="h-6 w-6 text-neutral-400" />

              {/* To */}
              <div className="flex flex-col items-center gap-2">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${flow.to.color} to-purple-600`}>
                  <flow.to.icon className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center max-w-[120px]">
                  {flow.to.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

