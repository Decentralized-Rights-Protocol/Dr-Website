import Link from 'next/link'
import Image from 'next/image'
import { Github, Mail, Linkedin, Instagram } from 'lucide-react'
import { XIcon, DiscordIcon } from '@/components/custom-icons'
import NewsletterTally from '@/components/NewsletterTally'

const navigation = {
  main: [
    { name: 'Whitepaper', href: '/whitepaper' },
    { name: 'Economics', href: '/economics' },
    { name: 'Docs', href: '/docs' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Community', href: '/community' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain',
      icon: Github,
    },
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com/De_Rights',
      icon: XIcon,
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/zbWg92AnQQ',
      icon: DiscordIcon,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/decentralized_rights',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/Decentralized-Rights-Protocol',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:contact@decentralizedrights.com',
      icon: Mail,
    },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/60 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-16 rounded-[2rem] border border-white/5 bg-black/40 p-10 backdrop-blur-md">
          <p className="text-[10px] font-cinematic text-drp-cyan tracking-[0.4em]">Protocol Launch</p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="max-w-xl text-3xl md:text-4xl font-bold leading-tight">
              Ready to verify the next generation of rights?
            </h2>
            <div className="flex items-center gap-4">
              <Link href="/docs" className="px-8 py-4 rounded-full bg-white text-black font-cinematic text-[10px] hover:bg-drp-cyan transition-colors">
                Explore Docs
              </Link>
              <Link href="/whitepaper" className="px-8 py-4 rounded-full border border-white/10 text-white font-cinematic text-[10px] hover:bg-white/5 transition-colors">
                Whitepaper
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/5 border border-white/10">
                <Image src="/site-icon.png" alt="DRP Logo" fill className="object-contain p-2" />
              </div>
              <span className="text-lg font-bold tracking-tight">Decentralized Rights</span>
            </div>
            <p className="text-sm text-drp-gray leading-relaxed">
              Building a human-rights-centered blockchain with transparent governance and zero-trust security.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors hover:text-drp-cyan">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-cinematic text-white mb-8 tracking-[0.3em]">Protocol</h4>
            <ul className="grid grid-cols-2 gap-4">
              <li><Link href="/philosophy" className="text-sm text-drp-gray hover:text-white transition-colors">Philosophy</Link></li>
              <li><Link href="/about" className="text-sm text-drp-gray hover:text-white transition-colors">About</Link></li>
              <li><Link href="/ecosystem" className="text-sm text-drp-gray hover:text-white transition-colors">Ecosystem</Link></li>
              <li><Link href="/tokens" className="text-sm text-drp-gray hover:text-white transition-colors">Tokens</Link></li>
              <li><Link href="/roadmap" className="text-sm text-drp-gray hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link href="/community" className="text-sm text-drp-gray hover:text-white transition-colors">Community</Link></li>
              <li><Link href="/learn" className="text-sm text-drp-gray hover:text-white transition-colors">Learn</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-cinematic text-white mb-8 tracking-[0.3em]">Services</h4>
            <ul className="space-y-4">
              <li><a href="https://api.decentralizedrights.com" target="_blank" rel="noopener noreferrer" className="text-sm text-drp-gray hover:text-white transition-colors">API Endpoint</a></li>
              <li><a href="https://app.decentralizedrights.com" target="_blank" rel="noopener noreferrer" className="text-sm text-drp-gray hover:text-white transition-colors">App Portal</a></li>
              <li><a href="https://explorer.decentralizedrights.com" target="_blank" rel="noopener noreferrer" className="text-sm text-drp-gray hover:text-white transition-colors">Reality Explorer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-cinematic text-white mb-8 tracking-[0.3em]">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/legal/terms-of-service" className="text-sm text-drp-gray hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/privacy-policy" className="text-sm text-drp-gray hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/eldercore-terms" className="text-sm text-drp-gray hover:text-white transition-colors">ElderCore Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/40 font-cinematic">
            © {new Date().getFullYear()} Decentralized Rights Protocol
          </p>
          <div className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            <Image src="/08_IFOPE_20x30.jpg" alt="Planet Earth" width={40} height={25} className="rounded-sm" />
            <p className="text-[10px] text-white/40">Powered by Human Activity</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
