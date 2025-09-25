import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { Shield, Users, Globe, Heart, Target, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About DRP',
  description: 'Learn about the Decentralized Rights Protocol mission, vision, and the team building the future of human rights protection through blockchain technology.',
}

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Quantum-safe cryptography and robust security measures to protect sensitive human rights data.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Decentralized governance ensuring that the protocol serves the needs of human rights defenders worldwide.',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Building solutions that work across borders, cultures, and legal systems to protect human rights universally.',
  },
  {
    icon: Heart,
    title: 'Humanitarian Focus',
    description: 'Every decision is guided by our commitment to protecting and advancing human rights globally.',
  },
  {
    icon: Target,
    title: 'Transparency',
    description: 'Open-source technology and transparent governance processes that anyone can verify and participate in.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Cutting-edge blockchain technology combined with proven human rights protection methodologies.',
  },
]

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Founder & CEO',
    bio: 'Former UN Human Rights Officer with 15+ years in international law and blockchain technology.',
    image: '/team/sarah-chen.jpg',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    bio: 'Blockchain architect and quantum cryptography expert, previously at IBM Research.',
    image: '/team/marcus-rodriguez.jpg',
  },
  {
    name: 'Aisha Patel',
    role: 'Head of Governance',
    bio: 'Decentralized governance specialist with experience in DAO design and community building.',
    image: '/team/aisha-patel.jpg',
  },
  {
    name: 'David Kim',
    role: 'Head of Partnerships',
    bio: 'Former Amnesty International director, now building strategic partnerships for DRP.',
    image: '/team/david-kim.jpg',
  },
]

export default function AboutPage() {
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
              About
              <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
                {' '}DRP
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 leading-relaxed">
              We're building the future of human rights protection through decentralized, 
              quantum-safe blockchain technology that empowers communities worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                To create a decentralized, transparent, and secure platform that protects, 
                verifies, and advances human rights globally through blockchain technology.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
                  The Problem We're Solving
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  Human rights violations continue to occur worldwide, often hidden from public view. 
                  Traditional systems for documenting and protecting human rights are centralized, 
                  vulnerable to censorship, and lack transparency.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We believe that blockchain technology can provide the transparency, security, 
                  and decentralization needed to create a more just and equitable world.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  A world where human rights are protected by technology that cannot be censored, 
                  where communities have the tools to document and verify violations, and where 
                  justice is transparent and accessible to all.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              These core principles guide everything we do at the Decentralized Rights Protocol.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-secondary-600 to-accent-600 mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Our Team
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              A diverse team of experts in blockchain technology, human rights law, 
              and decentralized governance working together to build a better future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-secondary-600 to-accent-600 p-1">
                  <div className="w-full h-full rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                    <span className="text-2xl font-bold text-neutral-600 dark:text-neutral-400">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
