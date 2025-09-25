import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { Download, FileText, Clock, Users, Shield, Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Whitepaper',
  description: 'Read the complete Decentralized Rights Protocol whitepaper to understand our technical architecture, tokenomics, and roadmap for building a quantum-safe blockchain for human rights protection.',
}

const sections = [
  {
    title: 'Executive Summary',
    description: 'Overview of the Decentralized Rights Protocol and its mission to protect human rights through blockchain technology.',
    icon: FileText,
  },
  {
    title: 'Technical Architecture',
    description: 'Deep dive into our quantum-safe blockchain infrastructure, consensus mechanisms, and security protocols.',
    icon: Shield,
  },
  {
    title: 'Token Economics',
    description: 'Detailed analysis of $RIGHTS and $DeRi token mechanics, distribution, and utility within the ecosystem.',
    icon: Users,
  },
  {
    title: 'Governance Model',
    description: 'How decentralized governance works in DRP, including proposal mechanisms and voting systems.',
    icon: Globe,
  },
  {
    title: 'Implementation Roadmap',
    description: 'Timeline and milestones for protocol development, testing, and mainnet launch.',
    icon: Clock,
  },
  {
    title: 'Use Cases & Applications',
    description: 'Real-world applications of DRP technology in human rights protection and verification.',
    icon: FileText,
  },
]

const keyFeatures = [
  'Quantum-safe cryptography for future-proof security',
  'Decentralized governance with transparent voting',
  'Dual token system ($RIGHTS and $DeRi)',
  'Cross-chain interoperability',
  'Privacy-preserving verification systems',
  'Scalable consensus mechanism',
  'Open-source and auditable codebase',
  'Global accessibility and inclusivity',
]

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              DRP
              <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
                {' '}Whitepaper
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 leading-relaxed mb-8">
              The complete technical and economic specification for the Decentralized Rights Protocol.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/whitepaper_v0.5.pdf"
                download
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </Link>
              <div className="text-sm text-neutral-400">
                Version 0.5 • Last updated: December 2024
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
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
              Key Features
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Discover the innovative features that make DRP the leading blockchain protocol for human rights protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary-600 to-accent-600 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Whitepaper Sections */}
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
              Whitepaper Sections
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Explore the comprehensive documentation covering all aspects of the DRP protocol.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-secondary-600 to-accent-600 mb-4">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {section.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {section.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Reader */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Read Online
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              Access the whitepaper directly in your browser with our interactive reader.
            </p>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
              <div className="w-full h-96 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Interactive whitepaper reader coming soon
                  </p>
                  <Link
                    href="/whitepaper_v0.5.pdf"
                    target="_blank"
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-lg hover:from-secondary-700 hover:to-accent-700 transition-all duration-300"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Open PDF in New Tab
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Join the Movement?
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Download the whitepaper, join our community, and help us build the future of human rights protection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/whitepaper_v0.5.pdf"
                download
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Whitepaper
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
