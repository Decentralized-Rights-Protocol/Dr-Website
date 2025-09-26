import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { MessageSquare, Twitter, Github, Linkedin, Mail, Users, MessageCircle, Calendar, BookOpen } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the Decentralized Rights Protocol community. Connect with like-minded individuals, participate in governance, and help build the future of human rights protection.',
}

const socialLinks = [
  {
    name: 'Discord',
    href: 'https://discord.gg/drp',
    icon: MessageSquare,
    description: 'Join our Discord server for real-time discussions, updates, and community events.',
    color: 'from-indigo-500 to-purple-500',
    members: '2.5K+',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/De_Rights',
    icon: Twitter,
    description: 'Follow us on Twitter for the latest news, updates, and announcements.',
    color: 'from-blue-400 to-cyan-500',
    members: '15K+',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Decentralized-Rights-Protocol',
    icon: Github,
    description: 'Contribute to our open-source codebase and participate in development.',
    color: 'from-gray-600 to-gray-800',
    members: '500+',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/decentralized-rights-protocol',
    icon: Linkedin,
    description: 'Connect with our professional network and stay updated on career opportunities.',
    color: 'from-blue-600 to-blue-800',
    members: '1.2K+',
  },
]

const communityFeatures = [
  {
    icon: Users,
    title: 'Global Community',
    description: 'Connect with human rights defenders, blockchain enthusiasts, and technology innovators from around the world.',
    stats: '10,000+ Members',
  },
  {
    icon: MessageCircle,
    title: 'Active Discussions',
    description: 'Participate in meaningful conversations about human rights, blockchain technology, and protocol governance.',
    stats: '50+ Daily Messages',
  },
  {
    icon: Calendar,
    title: 'Regular Events',
    description: 'Join our weekly community calls, governance meetings, and educational workshops.',
    stats: '3+ Events Weekly',
  },
  {
    icon: BookOpen,
    title: 'Learning Resources',
    description: 'Access comprehensive documentation, tutorials, and educational materials about DRP and blockchain technology.',
    stats: '100+ Resources',
  },
]

const upcomingEvents = [
  {
    title: 'Community Governance Call',
    date: '2024-12-28',
    time: '2:00 PM UTC',
    description: 'Monthly community call to discuss governance proposals and protocol updates.',
    type: 'Governance',
  },
  {
    title: 'Blockchain for Human Rights Workshop',
    date: '2025-01-05',
    time: '3:00 PM UTC',
    description: 'Educational workshop on how blockchain technology can protect human rights.',
    type: 'Education',
  },
  {
    title: 'Developer Meetup',
    date: '2025-01-12',
    time: '4:00 PM UTC',
    description: 'Technical meetup for developers building on the DRP protocol.',
    type: 'Technical',
  },
  {
    title: 'Partnership Announcement',
    date: '2025-01-20',
    time: '1:00 PM UTC',
    description: 'Major partnership announcement with international human rights organization.',
    type: 'Announcement',
  },
]

const waysToContribute = [
  {
    title: 'Governance Participation',
    description: 'Vote on proposals, submit governance ideas, and help shape the protocol\'s future.',
    requirements: 'Hold $RIGHTS tokens',
  },
  {
    title: 'Development Contributions',
    description: 'Contribute to our open-source codebase, report bugs, and suggest improvements.',
    requirements: 'Technical skills',
  },
  {
    title: 'Community Building',
    description: 'Help moderate discussions, organize events, and welcome new community members.',
    requirements: 'Community spirit',
  },
  {
    title: 'Content Creation',
    description: 'Create educational content, tutorials, and documentation for the community.',
    requirements: 'Writing skills',
  },
  {
    title: 'Translation',
    description: 'Help translate our content and documentation into different languages.',
    requirements: 'Bilingual skills',
  },
  {
    title: 'Partnership Development',
    description: 'Connect us with human rights organizations and potential partners.',
    requirements: 'Network connections',
  },
]

export default function CommunityPage() {
  // Validate data to prevent build errors
  const safeSocialLinks = socialLinks || []
  const safeCommunityFeatures = communityFeatures || []
  const safeUpcomingEvents = upcomingEvents || []
  const safeWaysToContribute = waysToContribute || []

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
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Join Our
              <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
                {' '}Community
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 leading-relaxed">
              Connect with like-minded individuals, participate in governance, and help build 
              the future of human rights protection through blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
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
              Connect With Us
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Join our community across multiple platforms and stay connected with the latest updates and discussions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeSocialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <social.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {social.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
                  {social.description}
                </p>
                <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {social.members} members
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
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
              Community Features
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Our community offers multiple ways to connect, learn, and contribute to the DRP ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safeCommunityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-secondary-600 to-accent-600 mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
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
              Upcoming Events
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Join our regular community events, workshops, and governance meetings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {safeUpcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'Governance' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : event.type === 'Education'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : event.type === 'Technical'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  }`}>
                    {event.type}
                  </span>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {(() => {
                      try {
                        return new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      } catch (error) {
                        return event.date
                      }
                    })()}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
                  {event.description}
                </p>
                <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  {event.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Contribute */}
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
              Ways to Contribute
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              There are many ways to contribute to the DRP community, regardless of your background or skill level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeWaysToContribute.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  {way.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {way.description}
                </p>
                <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  Requirements: {way.requirements}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Subscribe to our newsletter for the latest updates, announcements, and community highlights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105"
              >
                Subscribe to Newsletter
              </Link>
              <a
                href="mailto:hello@decentralizedrights.com"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
