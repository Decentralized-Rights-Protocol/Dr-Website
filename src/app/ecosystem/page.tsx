import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { Building2, Users, Globe, Shield, Zap, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ecosystem',
  description: 'Discover the Decentralized Rights Protocol ecosystem including partners, use cases, integrations, and applications building on DRP.',
}

const partners = [
  {
    name: 'Amnesty International',
    logo: '/partners/amnesty.png',
    description: 'Global human rights organization using DRP for secure documentation and verification.',
    category: 'Human Rights',
  },
  {
    name: 'UN Human Rights',
    logo: '/partners/un.png',
    description: 'United Nations agency leveraging DRP for transparent reporting and accountability.',
    category: 'International',
  },
  {
    name: 'Human Rights Watch',
    logo: '/partners/hrw.png',
    description: 'Independent organization using DRP for immutable evidence collection and storage.',
    category: 'Human Rights',
  },
  {
    name: 'Blockchain for Good',
    logo: '/partners/bfg.png',
    description: 'Consortium of blockchain companies focused on social impact and human rights.',
    category: 'Technology',
  },
]

const useCases = [
  {
    icon: Shield,
    title: 'Documentation & Verification',
    description: 'Immutable storage and verification of human rights violations, evidence, and testimonies.',
    benefits: ['Tamper-proof records', 'Global accessibility', 'Privacy protection'],
  },
  {
    icon: Users,
    title: 'Community Governance',
    description: 'Decentralized decision-making for human rights organizations and community groups.',
    benefits: ['Transparent voting', 'Inclusive participation', 'Auditable decisions'],
  },
  {
    icon: Globe,
    title: 'Cross-Border Collaboration',
    description: 'Secure communication and coordination between international human rights defenders.',
    benefits: ['Encrypted messaging', 'Secure file sharing', 'Anonymous reporting'],
  },
  {
    icon: Heart,
    title: 'Resource Distribution',
    description: 'Transparent and efficient distribution of humanitarian aid and resources.',
    benefits: ['Traceable donations', 'Reduced corruption', 'Direct beneficiary access'],
  },
  {
    icon: Zap,
    title: 'Smart Contracts for Rights',
    description: 'Automated execution of human rights agreements and legal frameworks.',
    benefits: ['Self-executing contracts', 'Reduced bureaucracy', 'Faster resolution'],
  },
  {
    icon: Building2,
    title: 'Institutional Integration',
    description: 'Integration with existing legal and governmental systems for seamless adoption.',
    benefits: ['Regulatory compliance', 'System interoperability', 'Scalable implementation'],
  },
]

const integrations = [
  {
    name: 'Legal Systems',
    description: 'Integration with court systems and legal databases for evidence verification.',
    status: 'In Development',
  },
  {
    name: 'Government Databases',
    description: 'Secure connection to official government records and citizen databases.',
    status: 'Planned',
  },
  {
    name: 'NGO Networks',
    description: 'Direct integration with NGO management systems and reporting tools.',
    status: 'Active',
  },
  {
    name: 'Media Platforms',
    description: 'Verification tools for journalists and media organizations.',
    status: 'Beta',
  },
  {
    name: 'Academic Institutions',
    description: 'Research collaboration and academic verification systems.',
    status: 'Planned',
  },
  {
    name: 'Corporate ESG',
    description: 'Environmental, Social, and Governance reporting and verification.',
    status: 'In Development',
  },
]

export default function EcosystemPage() {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              DRP
              <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
                {' '}Ecosystem
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 leading-relaxed">
              A growing network of partners, applications, and integrations working together 
              to protect and advance human rights through blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
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
              Our Partners
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Leading organizations and institutions working with us to build a more just and transparent world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-secondary-600 to-accent-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {partner.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                  {partner.category}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
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
              Use Cases
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Real-world applications of DRP technology in human rights protection and verification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-secondary-600 to-accent-600 mb-4">
                  <useCase.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {useCase.description}
                </p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary-600 to-accent-600 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
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
              Integrations
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Seamless integration with existing systems and platforms to maximize impact and adoption.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {integration.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    integration.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : integration.status === 'In Development'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : integration.status === 'Beta'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
                  }`}>
                    {integration.status}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {integration.description}
                </p>
              </motion.div>
            ))}
          </div>
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
              Join Our Ecosystem
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Become a partner, build on DRP, or integrate our technology into your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:partnerships@decentralizedrights.com"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105"
              >
                Become a Partner
              </a>
              <a
                href="/docs"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Developer Resources
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
