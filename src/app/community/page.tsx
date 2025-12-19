'use client'

import { useEffect } from 'react'
import { Github, Mail, Users, MessageSquare, Calendar, BookOpen, Linkedin, Instagram } from 'lucide-react'
import { XIcon, DiscordIcon } from '@/components/custom-icons'
import { ParticleBackground } from '@/components/particle-background'

const socialLinks = [
  {
    name: 'Discord',
    description: 'Join our active Discord community for real-time discussions',
    href: 'https://discord.gg/k8auUAqF',
    icon: DiscordIcon,
    color: 'bg-indigo-600',
    members: '2,500+',
  },
  {
    name: 'GitHub',
    description: 'Contribute to our open-source codebase and documentation',
    href: 'https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain',
    icon: Github,
    color: 'bg-neutral-800',
    members: '500+',
  },
  {
    name: 'X (Twitter)',
    description: 'Follow us for the latest updates and announcements',
    href: 'https://twitter.com/De_Rights',
    icon: XIcon,
    color: 'bg-black',
    members: '10K+',
  },
  {
    name: 'Instagram',
    description: 'Follow our visual journey and behind-the-scenes content',
    href: 'https://instagram.com/decentralized_rights',
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    members: '5K+',
  },
  {
    name: 'LinkedIn',
    description: 'Connect with our professional network',
    href: 'https://linkedin.com/company/drp-protocol',
    icon: Linkedin,
    color: 'bg-blue-700',
    members: '1K+',
  },
]

const communityStats = [
  { label: 'Active Contributors', value: '150+' },
  { label: 'Countries Represented', value: '45+' },
  { label: 'Human Rights Organizations', value: '25+' },
  { label: 'Lines of Code', value: '100K+' },
]

type CommunityEvent = {
  title: string
  date: string
  type: string
  description: string
  url?: string
}

const events: CommunityEvent[] = [
  {
    title: 'UN Human Rights Council – Thematic Discussion',
    date: 'June 2025 (TBA)',
    type: 'UN Event',
    description:
      'UN Human Rights Council thematic discussion on digital rights, AI governance, and human rights protections.',
    url: 'https://www.ohchr.org/en/hr-bodies/hrc',
  },
  {
    title: 'UN Internet Governance Forum 2025',
    date: 'Q4 2025 (TBA)',
    type: 'UN Event',
    description:
      'Global multi‑stakeholder forum on public policy issues related to the Internet, digital rights, and governance.',
    url: 'https://www.intgovforum.org/',
  },
  {
    title: 'Ethereum Devcon',
    date: '2025 (Date TBA)',
    type: 'Blockchain Conference',
    description:
      'Flagship Ethereum developer conference bringing together builders, researchers, and protocol designers.',
    url: 'https://devcon.org/',
  },
  {
    title: 'Web3 Summit',
    date: '2025 (Date TBA)',
    type: 'Blockchain Conference',
    description:
      'Conference focused on decentralized web, interoperability, and the future of Web3 infrastructure.',
    url: 'https://web3summit.com/',
  },
]

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>
      
      <div className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl animate-fade-in-up">
            Join Our Community
          </h1>
          <p className="mt-4 text-xl text-neutral-300 animate-fade-in-up delay-200">
            Connect with developers, human rights advocates, and contributors 
            building the future of decentralized human rights protection.
          </p>
        </div>

        {/* Community Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {communityStats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                <div className="text-3xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Connect With Us
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-primary-600 dark:hover:ring-primary-400 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-x-4 mb-4">
                  <div className={`${link.color} p-3 rounded-lg`}>
                    <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      {link.members} members
                    </p>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Signup (Tally embed) */}
        <NewsletterSignupTally />

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Upcoming Events
          </h2>
          {events.length === 0 ? (
            <div className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 p-6 text-center shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                No upcoming events are currently scheduled. Check back soon for new UN sessions and major blockchain conferences.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700"
                >
                  <div className="flex items-center gap-x-3 mb-4">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {event.date}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                    {event.description}
                  </p>
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Learn more
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ways to Contribute */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Ways to Contribute
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Code
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Contribute to our open-source codebase and help build the protocol
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Documentation
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Help improve our documentation and make DRP more accessible
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-accent-100 dark:bg-accent-900/20 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Community
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Help others learn and grow in our Discord and forums
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Advocacy
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Spread awareness about human rights and blockchain technology
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers, advocates, and contributors working together 
            to protect human rights through technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/k8auUAqF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Join Discord
            </a>
            <a
              href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-base font-medium rounded-md text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              View on GitHub
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewsletterSignupTally() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://tally.so/widgets/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="mb-16 p-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Get the latest updates on protocol development, community events, and human rights initiatives delivered to your inbox.
        </p>
        <button
          data-tally-open="3xKMro"
          data-tally-layout="modal"
          data-tally-hide-title="1"
          data-tally-emoji-text="👋"
          data-tally-emoji-animation="wave"
          className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors"
        >
          Open Signup Form
        </button>
      </div>
    </div>
  )
}
