import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Users, MessageCircle, Github, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Community - DRP Documentation',
  description: 'Join the DRP community and connect with developers, researchers, and contributors.',
}

export default function CommunityPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Documentation
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl mb-4">
            Community
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Join the DRP community and connect with developers, researchers, and contributors worldwide.
          </p>
        </div>

        {/* Community Channels */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Users className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Join Our Community</h2>
            </div>
            <p className="text-primary-100 text-lg">
              Connect with the DRP community through various channels and platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-6 w-6 text-purple-500" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Discord</h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                Join our Discord server for real-time discussions, support, and announcements.
              </p>
              <a
                href="https://discord.gg/k8auUAqF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                Join Discord
              </a>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3 mb-4">
                <Github className="h-6 w-6 text-neutral-900 dark:text-white" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">GitHub</h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                Contribute to the codebase, report issues, and track development progress.
              </p>
              <a
                href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors text-sm"
              >
                View Repository
              </a>
            </div>
          </div>
        </section>

        {/* Ways to Contribute */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Ways to Contribute</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Code Contributions</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                Submit pull requests, fix bugs, or add new features to the DRP codebase.
              </p>
              <Link
                href="/docs/contributing"
                className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
              >
                Learn more →
              </Link>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Documentation</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                Help improve documentation, write tutorials, or translate content.
              </p>
              <Link
                href="/docs/contributing"
                className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
              >
                Learn more →
              </Link>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Testing</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                Run nodes, test features, and report bugs or issues you encounter.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Research</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                Contribute research, propose improvements, or analyze protocol performance.
              </p>
            </div>
          </div>
        </section>

        {/* Getting Help */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Getting Help</h2>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Need Help?</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                  If you're stuck or have questions, check out our FAQ or reach out to the community:
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/docs/faq"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                  >
                    View FAQ
                  </Link>
                  <a
                    href="https://discord.gg/k8auUAqF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm"
                  >
                    Ask on Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

