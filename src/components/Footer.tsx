"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight,
  Heart
} from "lucide-react"

const footerLinks = {
  Product: [
    { name: "Whitepaper", href: "/whitepaper" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Token Economy", href: "/governance" },
    { name: "Features", href: "/features" },
  ],
  Community: [
    { name: "Discord", href: "https://discord.gg/drp" },
    { name: "Twitter", href: "https://twitter.com/De_Rights" },
    { name: "GitHub", href: "https://github.com/Decentralized-Rights-Protocol" },
    { name: "LinkedIn", href: "https://linkedin.com/company/decentralized-rights-protocol" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "Press Kit", href: "/press" },
    { name: "Support", href: "/support" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
}

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/De_Rights", icon: Twitter },
  { name: "GitHub", href: "https://github.com/Decentralized-Rights-Protocol", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/company/decentralized-rights-protocol", icon: Linkedin },
  { name: "Email", href: "mailto:hello@decentralizedrights.com", icon: Mail },
]

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated on Human Rights Innovation
          </h3>
          <p className="text-muted-foreground mb-8">
            Join our newsletter to get the latest updates on DRP development, 
            human rights initiatives, and community events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DRP</span>
              </div>
              <span className="font-bold text-xl">Decentralized Rights Protocol</span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Building a decentralized platform that uses blockchain technology to protect, 
              verify, and advance human rights globally.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-purple-500/10 transition-colors duration-300"
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-purple-500 transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 Decentralized Rights Protocol. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for humanity</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}