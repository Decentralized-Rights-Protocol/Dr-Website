'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock, Rocket } from 'lucide-react'

interface RoadmapItem {
  id: string
  title: string
  description: string
  date: string
  status: 'completed' | 'current' | 'upcoming'
  category: 'Foundation' | 'Development' | 'Launch' | 'Growth'
}

const roadmapItems: RoadmapItem[] = [
  {
    id: '1',
    title: 'Protocol Foundation',
    description: 'Core blockchain architecture design and quantum-safe cryptography implementation.',
    date: 'Q1 2024',
    status: 'completed',
    category: 'Foundation',
  },
  {
    id: '2',
    title: 'Token Economics',
    description: 'Design and implementation of $RIGHTS and $DeRi token mechanics.',
    date: 'Q2 2024',
    status: 'completed',
    category: 'Foundation',
  },
  {
    id: '3',
    title: 'Testnet Launch',
    description: 'Public testnet deployment with initial governance features.',
    date: 'Q3 2024',
    status: 'completed',
    category: 'Development',
  },
  {
    id: '4',
    title: 'Security Audits',
    description: 'Comprehensive security audits and penetration testing.',
    date: 'Q4 2024',
    status: 'current',
    category: 'Development',
  },
  {
    id: '5',
    title: 'Mainnet Launch',
    description: 'Public mainnet deployment with full governance capabilities.',
    date: 'Q1 2025',
    status: 'upcoming',
    category: 'Launch',
  },
  {
    id: '6',
    title: 'Ecosystem Expansion',
    description: 'Partnership integrations and third-party application development.',
    date: 'Q2 2025',
    status: 'upcoming',
    category: 'Growth',
  },
  {
    id: '7',
    title: 'Global Adoption',
    description: 'International partnerships and regulatory compliance frameworks.',
    date: 'Q3 2025',
    status: 'upcoming',
    category: 'Growth',
  },
]

const categoryColors = {
  Foundation: 'from-blue-500 to-indigo-500',
  Development: 'from-purple-500 to-pink-500',
  Launch: 'from-green-500 to-emerald-500',
  Growth: 'from-orange-500 to-amber-500',
}

const statusIcons = {
  completed: CheckCircle,
  current: Clock,
  upcoming: Circle,
}

const statusColors = {
  completed: 'text-green-500',
  current: 'text-blue-500',
  upcoming: 'text-neutral-400',
}

export function RoadmapTimeline() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50 dark:bg-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Our
            <span className="bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
              {' '}Roadmap
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            A clear path forward for building the future of human rights protection through blockchain technology.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary-600 via-accent-600 to-neutral-300 dark:to-neutral-600" />

          <div className="space-y-12">
            {roadmapItems.map((item, index) => {
              const StatusIcon = statusIcons[item.status]
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 transform -translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${categoryColors[item.category]} border-4 border-white dark:border-neutral-800`}>
                      <StatusIcon className={`w-6 h-6 ${statusColors[item.status]} -m-1`} />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Category badge */}
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[item.category]} mb-3`}>
                        {item.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Date */}
                      <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <StatusIcon className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-secondary-600 to-accent-600 text-white font-semibold hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105 cursor-pointer">
            <Rocket className="mr-2 h-5 w-5" />
            <span>Join Our Journey</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
