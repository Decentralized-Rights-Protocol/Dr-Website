import { Metadata } from 'next'
import { Github, Twitter, MessageCircle, Mail, Users, MessageSquare, Calendar, BookOpen, Linkedin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'DRP Community - Join the Movement',
  description: 'Join the Decentralized Rights Protocol community. Connect with developers, human rights advocates, and contributors worldwide.',
  openGraph: {
    title: 'DRP Community - Join the Movement',
    description: 'Join the Decentralized Rights Protocol community. Connect with developers, human rights advocates, and contributors worldwide.',
  },
}

const socialLinks = [
  {
    name: 'Discord',
    description: 'Join our active Discord community for real-time discussions',
    href: 'https://discord.gg/k8auUAqF',
    icon: MessageCircle,
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
    name: 'Twitter',
    description: 'Follow us for the latest updates and announcements',
    href: 'https://twitter.com/De_Rights',
    icon: Twitter,
    color: 'bg-blue-500',
    members: '10K+',
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

const events = [
  {
    title: 'Human Rights & Blockchain Summit',
    date: 'April 20, 2024',
    type: 'Conference',
    description: 'Join us for a discussion on blockchain for social good',
  },
  {
    title: 'Community Governance Meeting',
    date: 'May 5, 2024',
    type: 'Meeting',
    description: 'Monthly community governance and decision-making session',
  },
]

export default function CommunityPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Join Our Community
          </h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            Connect with developers, human rights advocates, and contributors 
            building the future of decentralized human rights protection.
          </p>
        </div>

        {/* Community Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {communityStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
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

        {/* Newsletter Signup */}
        <div className="mb-16 p-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Get the latest updates on protocol development, community events, 
              and human rights initiatives delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-transparent px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {events.map((event, index) => (
              <div key={index} className="rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700">
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
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
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
              href="https://discord.gg/drp-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Join Discord
            </a>
            <a
              href="https://github.com/drp-protocol"
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
  )
}