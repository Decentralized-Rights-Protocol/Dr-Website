'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const footerLinks = [
    { href: '#privacy', label: 'Privacy Policy' },
    { href: '#terms', label: 'Terms of Service' },
    { href: '/whitepaper_v0.5.pdf', label: 'Whitepaper', download: true },
    { href: 'https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain', label: 'GitHub', external: true }
  ]

  const socialLinks = [
    { href: 'https://x.com/De_Rights', icon: 'fab fa-twitter', label: 'Twitter' },
    { href: 'https://discord.gg/zbWg92AnQQ', icon: 'fab fa-discord', label: 'Discord' },
    { href: 'https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://www.linkedin.com/company/decentralized-rights-protocol', icon: 'fab fa-linkedin', label: 'LinkedIn' }
  ]

  return (
    <footer className="bg-darker-bg border-t border-border-color py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/DRP.png"
                alt="DRP Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold text-text-primary">Decentralized Rights</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Empowering humanity through blockchain technology. Building a decentralized platform 
              that protects and advances human rights globally.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
            <div className="space-y-2">
              {footerLinks.map((link, index) => (
                <div key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : link.download ? (
                    <a
                      href={link.href}
                      download="Decentralized_Rights_Whitepaper_v0.5.pdf"
                      className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-card-bg border border-border-color rounded-full flex items-center justify-center text-text-secondary hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <i className={`${social.icon} group-hover:scale-110 transition-transform duration-300`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-color pt-8 text-center">
          <p className="text-text-muted">
            &copy; 2024 Decentralized Rights. All rights reserved. Built with ❤️ for humanity.
          </p>
        </div>
      </div>
    </footer>
  )
}
