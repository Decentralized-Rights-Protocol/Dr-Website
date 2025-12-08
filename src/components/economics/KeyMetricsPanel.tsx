'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, Zap, Shield } from 'lucide-react'

interface Metric {
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
}

interface KeyMetricsPanelProps {
  metrics: Metric[]
  title?: string
  className?: string
}

export function KeyMetricsPanel({ metrics, title = 'Key Metrics', className = '' }: KeyMetricsPanelProps) {
  const getIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
      default:
        return null
    }
  }

  const getChangeColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400'
      case 'down':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-neutral-600 dark:text-neutral-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 ${className}`}
    >
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-2">
              {metric.icon && (
                <div className="text-blue-600 dark:text-blue-400">
                  {metric.icon}
                </div>
              )}
              {metric.change && (
                <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor(metric.trend)}`}>
                  {getIcon(metric.trend)}
                  <span>{metric.change}</span>
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Comment for developer: Replace mock metrics with real data from API/backend */}
      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-4 italic">
        * Metrics shown are mock values. Connect to real-time data sources in production.
      </p>
    </motion.div>
  )
}
