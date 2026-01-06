'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items?: FAQItem[]
  title?: string
  className?: string
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'What is Decentralized Rights Protocol (DRP)?',
    answer:
      'Decentralized Rights Protocol (DRP) is a quantum-safe blockchain platform designed to protect human rights through AI-verified consensus mechanisms. DRP uses Proof of Status (PoST) for identity verification and Proof of Activity (PoAT) to reward real-world contributions, creating a sustainable, human-rights-centered blockchain ecosystem.',
  },
  {
    question: 'How does Proof of Activity (PoAT) work?',
    answer:
      'Proof of Activity (PoAT) validates and rewards real-world activities that contribute value to the DRP ecosystem. Users submit cryptographic proofs of their activities (content creation, network participation, community building), which are verified by AI Elders and validators. Verified activities are rewarded with DeRi tokens.',
  },
  {
    question: 'What is Proof of Status (PoST)?',
    answer:
      "Proof of Status (PoST) is DRP's identity verification mechanism that encodes verified credentials (education, professional status, institutional recognition) without exposing private data. PoST is used for governance weighting and access control, ensuring that status emerges from verifiable behavior rather than authority.",
  },
  {
    question: 'What are RIGHTS and DeRi tokens?',
    answer:
      "RIGHTS is DRP's governance token that provides voting power in protocol decisions. DeRi is DRP's utility token used for transactions, rewards, and network participation. This dual-token model separates governance from utility, ensuring fair participation and preventing centralization of power.",
  },
  {
    question: 'Is DRP quantum-safe?',
    answer:
      'Yes, DRP uses NIST-approved post-quantum cryptography including CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures. These algorithms are resistant to attacks from both classical and quantum computers, ensuring long-term security for the protocol.',
  },
  {
    question: 'How does DRP support sustainability?',
    answer:
      'DRP incentivizes sustainable practices by rewarding nodes that use renewable energy sources. The protocol tracks energy consumption and carbon footprint, giving preference to participants who demonstrate environmental responsibility. This aligns with UN Sustainable Development Goals and creates positive environmental impact.',
  },
  {
    question: 'How can I participate in DRP governance?',
    answer:
      'To participate in DRP governance, you need RIGHTS tokens. You can acquire RIGHTS tokens through community rewards, staking, or purchasing. With RIGHTS tokens, you can vote on proposals, submit your own proposals, or delegate your voting power to trusted community members.',
  },
  {
    question: 'What makes DRP different from other blockchains?',
    answer:
      "DRP is unique in its human-rights-centered design, quantum-safe security, AI-verified consensus, and sustainability-first approach. Unlike other blockchains that prioritize speed or scalability, DRP prioritizes human dignity, environmental responsibility, and transparent governance. DRP also implements Proof of Status and Proof of Activity, connecting blockchain rewards to real-world value creation.",
  },
]

export function FAQ({ items = defaultFAQs, title = 'Frequently Asked Questions', className = '' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate FAQPage schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className={`py-16 ${className}`}>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            {title}
          </h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-neutral-900 dark:text-white pr-4">
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 py-4 bg-neutral-50 dark:bg-neutral-700/50 border-t border-neutral-200 dark:border-neutral-600"
                  >
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

