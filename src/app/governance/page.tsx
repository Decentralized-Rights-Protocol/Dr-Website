import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { Vote, Coins, Users, Shield, Clock, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Governance',
  description: 'Learn about DRP governance model, $RIGHTS and $DeRi tokens, voting mechanisms, and how the community participates in protocol decisions.',
}

const governanceFeatures = [
  {
    icon: Vote,
    title: 'Democratic Voting',
    description: 'Community-driven decision making through transparent voting mechanisms.',
    details: ['Proposal submission', 'Community discussion', 'Transparent voting', 'Automatic execution'],
  },
  {
    icon: Shield,
    title: 'Security & Transparency',
    description: 'All governance decisions are recorded on-chain and publicly verifiable.',
    details: ['Immutable records', 'Public audit trail', 'Tamper-proof voting', 'Real-time results'],
  },
  {
    icon: Users,
    title: 'Inclusive Participation',
    description: 'Multiple ways for community members to participate in governance.',
    details: ['Token-based voting', 'Delegation system', 'Community proposals', 'Stakeholder input'],
  },
  {
    icon: Clock,
    title: 'Efficient Process',
    description: 'Streamlined governance process with clear timelines and procedures.',
    details: ['Quick proposal review', 'Automated execution', 'Clear timelines', 'Efficient consensus'],
  },
]

const tokenInfo = [
  {
    token: '$RIGHTS',
    icon: Coins,
    description: 'Governance and utility token for protocol participation and decision-making.',
    features: [
      'Governance voting rights',
      'Protocol fee payments',
      'Staking rewards',
      'Premium features access',
    ],
    distribution: {
      'Community': '40%',
      'Development': '25%',
      'Partnerships': '20%',
      'Reserve': '15%',
    },
  },
  {
    token: '$DeRi',
    icon: TrendingUp,
    description: 'Impact token earned through human rights actions and community contributions.',
    features: [
      'Earned through actions',
      'Impact measurement',
      'Community incentives',
      'Recognition system',
    ],
    distribution: {
      'Human Rights Actions': '60%',
      'Community Contributions': '25%',
      'Partnership Rewards': '10%',
      'Reserve Fund': '5%',
    },
  },
]

const governanceProcess = [
  {
    step: 1,
    title: 'Proposal Submission',
    description: 'Community members submit governance proposals with detailed specifications.',
    duration: '1-3 days',
  },
  {
    step: 2,
    title: 'Community Discussion',
    description: 'Open discussion period for community feedback and proposal refinement.',
    duration: '7-14 days',
  },
  {
    step: 3,
    title: 'Voting Period',
    description: 'Token holders vote on proposals with weighted voting based on stake.',
    duration: '3-7 days',
  },
  {
    step: 4,
    title: 'Execution',
    description: 'Approved proposals are automatically executed on-chain.',
    duration: 'Immediate',
  },
]

export default function GovernancePage() {
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
              <Vote className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              DRP
              <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
                {' '}Governance
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 leading-relaxed">
              Decentralized governance powered by the community, for the community. 
              Every decision is transparent, verifiable, and community-driven.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Governance Features */}
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
              Governance Features
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Our governance model ensures that the DRP protocol remains decentralized, 
              transparent, and responsive to community needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {governanceFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-secondary-600 to-accent-600 mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary-600 to-accent-600 mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Information */}
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
              Token Economics
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Two complementary tokens power the DRP ecosystem: $RIGHTS for governance 
              and $DeRi for impact measurement and community incentives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tokenInfo.map((token, index) => (
              <motion.div
                key={token.token}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-secondary-600 to-accent-600 mr-4">
                    <token.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {token.token}
                  </h3>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  {token.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {token.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary-600 to-accent-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                    Distribution
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(token.distribution).map(([category, percentage]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{category}</span>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">{percentage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Process */}
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
              Governance Process
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              A clear, transparent process for community-driven decision making and protocol evolution.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {governanceProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary-600 to-accent-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                        {step.title}
                      </h3>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Participate in Governance
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Join the DRP community and help shape the future of human rights protection through blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/community"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105"
              >
                Join Community
              </a>
              <a
                href="/whitepaper"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Read Whitepaper
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
