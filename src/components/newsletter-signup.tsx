'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export function NewsletterSignup() {
  React.useEffect(() => {
    // Load Tally.co script
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Our
            <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
              {' '}Waitlist
            </span>
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Be the first to know about protocol updates, governance proposals, and partnership announcements. 
            Join thousands of human rights advocates building the future together.
          </p>

          <motion.button
            data-tally-open="3xKMro"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">👋</span>
            Join the Waitlist
          </motion.button>

          <p className="text-sm text-neutral-400 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
