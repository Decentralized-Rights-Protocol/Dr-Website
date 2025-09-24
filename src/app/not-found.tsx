import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-drp-blue via-neutral-900 to-drp-blue relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-400/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 border border-teal-400/20"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          animate={{
            rotate: [360, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-purple-400/30 rounded-lg"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            The page you're looking for seems to have vanished into the blockchain void. 
            Don't worry, even the best protocols have missing blocks sometimes.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white border-0">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Go Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </Link>
            </Button>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          >
            <div className="flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-purple-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Looking for something specific?</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Try these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['About', 'Whitepaper', 'Roadmap', 'Community'].map((page) => (
                <Link
                  key={page}
                  href={`/${page.toLowerCase()}`}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors duration-300"
                >
                  {page}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
