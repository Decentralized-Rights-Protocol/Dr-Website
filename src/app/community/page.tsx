'use client'

import { useEffect } from 'react'
import { Github, Users, MessageSquare, Calendar, BookOpen, Linkedin, Instagram, ArrowRight, Building2 } from 'lucide-react'
import { XIcon, DiscordIcon } from '@/components/custom-icons'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'

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
    <PremiumPage>
      <PremiumHero
        badge="Community Network"
        title="Join the Global DRP Builder and Advocate Community"
        description="Collaborate with developers, institutions, human-rights practitioners, and ecosystem partners shaping the next generation of trust infrastructure."
      />

      <PremiumSection eyebrow="Global Participation" title="Community by the Numbers">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {communityStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
              <p className="text-3xl font-semibold text-cyan-200">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection
        eyebrow="Channels"
        title="Connect Where You Work Best"
        description="Real-time discussions, open source coordination, policy conversations, and ecosystem updates."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-white/10 bg-black/30 p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-400/10"
            >
              <div className="mb-4 flex items-center gap-x-4">
                <div className={`${link.color} rounded-lg p-3`}>
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{link.name}</h3>
                  <p className="text-xs text-cyan-200">{link.members} members</p>
                </div>
              </div>
              <p className="text-sm text-slate-300">{link.description}</p>
            </a>
          ))}
        </div>
      </PremiumSection>

      <section className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <NewsletterSignupTally />
        </div>
      </section>

      <PremiumSection eyebrow="Events" title="Upcoming Ecosystem and Governance Events">
        {events.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/25 p-6 text-center text-sm text-slate-300">
            No upcoming events are currently scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.title} className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <div className="mb-4 flex items-center gap-x-3">
                  <Calendar className="h-5 w-5 text-cyan-200" />
                  <span className="text-sm font-medium text-cyan-100">{event.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{event.description}</p>
                {event.url ? (
                  <a href={event.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-200 hover:text-cyan-100">
                    Event details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </PremiumSection>

      <PremiumSection
        eyebrow="Contribute"
        title="Choose How You Want to Participate"
        description="Whether technical or non-technical, there is a high-impact role for every contributor."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Github, title: 'Code', body: 'Contribute protocol and app code in open repositories.' },
            { icon: BookOpen, title: 'Documentation', body: 'Improve clarity and onboarding for global contributors.' },
            { icon: MessageSquare, title: 'Community', body: 'Guide discussions and support new ecosystem members.' },
            { icon: Users, title: 'Advocacy', body: 'Bridge rights policy, institutions, and technology adoption.' },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <item.icon className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </PremiumSection>

      <section className="pb-20 pt-8">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-amber-300/10 p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">Partnerships and Institutional Collaboration</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Organizations interested in grants, pilots, or policy collaboration can directly connect with the DRP team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="mailto:contact@decentralizedrights.com" className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                <Building2 className="mr-2 h-4 w-4" />
                Contact Partnerships
              </a>
              <a href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </PremiumPage>
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
