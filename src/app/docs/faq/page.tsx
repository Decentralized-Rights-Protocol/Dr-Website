import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - DRP Documentation',
  description: 'Frequently asked questions about the Decentralized Rights Protocol.',
}

const faqs = [
  {
    question: 'What is DRP?',
    answer: 'DRP (Decentralized Rights Protocol) is a human-rights-centered blockchain that uses AI-verified consensus mechanisms (Proof of Status and Proof of Activity) to create a trust-based, sustainable, and secure decentralized network.',
  },
  {
    question: 'How does DRP differ from other blockchains?',
    answer: 'DRP is unique in its focus on human rights and sustainability, use of AI at the core layer, post-quantum cryptography, and dual consensus mechanism. It\'s designed to align with UN Sustainable Development Goals and prioritize environmental responsibility.',
  },
  {
    question: 'What is Proof of Status and Proof of Activity?',
    answer: 'Proof of Status verifies user identity and reputation, while Proof of Activity validates contributions to the network. Both are verified by AI Elders to ensure authenticity and prevent fraud.',
  },
  {
    question: 'Is DRP quantum-resistant?',
    answer: 'Yes, DRP uses NIST-approved post-quantum cryptographic algorithms (CRYSTALS-Kyber for key exchange and CRYSTALS-Dilithium for digital signatures) to protect against both classical and quantum computer attacks.',
  },
  {
    question: 'How do I run a DRP node?',
    answer: 'Clone the repository, install dependencies with pip, and run `python src/node.py`. See the Getting Started guide for detailed instructions.',
  },
  {
    question: 'What are AI Elders?',
    answer: 'AI Elders are autonomous AI agents integrated into DRP\'s core layer. They verify activities, detect fraud, optimize network performance, and facilitate features like automated asset recovery (Project Lazarus).',
  },
  {
    question: 'How energy-efficient is DRP?',
    answer: 'DRP achieves 99% less energy consumption compared to traditional proof-of-work systems through AI-optimized consensus and incentives for renewable energy usage.',
  },
  {
    question: 'Can I contribute to DRP?',
    answer: 'Yes! DRP is open source and welcomes contributions. You can contribute code, documentation, testing, or research. See the Contributing guide for more information.',
  },
  {
    question: 'What tokens does DRP use?',
    answer: 'DRP uses a dual-token model: $RIGHTS for governance and voting, and $DeRi for utility, transactions, and rewards.',
  },
  {
    question: 'Is DRP interoperable with other blockchains?',
    answer: 'Yes, DRP features AI-automated cross-chain interoperability using Web3.js libraries and Multi-Party Computation (MPC) protocols, enabling seamless communication with other blockchains.',
  },
]

export default function FAQPage() {
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
          <div className="flex items-center gap-4 mb-4">
            <HelpCircle className="h-12 w-12 text-primary-600 dark:text-primary-400" />
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Find answers to common questions about the Decentralized Rights Protocol.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Still Have Questions?</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Can&rsquo;t find the answer you&rsquo;re looking for? Reach out to our community:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/community"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Join Community
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              Browse Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

