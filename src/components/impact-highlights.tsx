'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Heart, GraduationCap, Leaf, Shield, Users, Globe } from 'lucide-react'

const highlights = [
  {
    icon: Heart,
    title: 'Healthcare Access',
    description: 'Ensuring medical records are secure, verifiable, and accessible across borders while maintaining patient privacy.',
    stats: '1M+ Records Protected',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: GraduationCap,
    title: 'Education Rights',
    description: 'Creating immutable academic credentials and enabling global access to quality education resources.',
    stats: '500K+ Students Served',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Leaf,
    title: 'Environmental Justice',
    description: 'Tracking carbon credits, monitoring environmental violations, and promoting sustainable practices.',
    stats: '10K+ Carbon Credits',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Digital Rights',
    description: 'Protecting online privacy, combating censorship, and ensuring free access to information.',
    stats: '5M+ Users Protected',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Users,
    title: 'Community Governance',
    description: 'Enabling transparent, democratic decision-making processes for human rights organizations.',
    stats: '100+ Organizations',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Connecting human rights defenders worldwide and facilitating cross-border collaboration.',
    stats: '50+ Countries',
    color: 'from-cyan-500 to-teal-500',
  },
]

export function ImpactHighlights() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Impacting Lives Through
            <span className="bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
              {' '}Technology
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Our blockchain protocol is already making a difference in critical areas of human rights protection, 
            creating measurable impact across the globe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-lg">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${highlight.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <highlight.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {highlight.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {highlight.description}
                </p>

                {/* Stats */}
                <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {highlight.stats}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary-600/5 to-accent-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-secondary-600 to-accent-600 text-white font-medium hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105 cursor-pointer">
            <span>Join the Movement</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
