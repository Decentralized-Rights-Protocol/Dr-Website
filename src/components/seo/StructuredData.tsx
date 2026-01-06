'use client'

import { usePathname } from 'next/navigation'

interface StructuredDataProps {
  type?: 'homepage' | 'whitepaper' | 'philosophy' | 'governance' | 'default'
}

export function StructuredData({ type = 'default' }: StructuredDataProps) {
  const pathname = usePathname()
  const baseUrl = 'https://decentralizedrights.com'
  const currentUrl = `${baseUrl}${pathname}`

  const getStructuredData = () => {
    switch (type) {
      case 'homepage':
        return [
          getOrganizationSchema(),
          getSoftwareApplicationSchema(),
          getFAQSchema(),
          getWebSiteSchema(),
        ]
      case 'whitepaper':
        return [
          getArticleSchema(),
          getBreadcrumbSchema(['Home', 'Whitepaper']),
        ]
      case 'philosophy':
        return [
          getArticleSchema('philosophy'),
          getBreadcrumbSchema(['Home', 'Philosophy']),
        ]
      case 'governance':
        return [
          getArticleSchema('governance'),
          getBreadcrumbSchema(['Home', 'Economics', 'Governance']),
        ]
      default:
        return [getWebPageSchema()]
    }
  }

  const getOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Decentralized Rights Protocol',
    alternateName: 'DRP',
    url: baseUrl,
    logo: `${baseUrl}/site-icon.png`,
    description:
      'Decentralized Rights Protocol (DRP) is a quantum-safe blockchain platform that protects human rights through AI-verified consensus, Proof of Status, and Proof of Activity mechanisms.',
    foundingDate: '2024',
    sameAs: [
      'https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain',
      'https://twitter.com/De_Rights',
      'https://discord.gg/zbWg92AnQQ',
      'https://linkedin.com/company/Decentralized-Rights-Protocol',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@decentralizedrights.com',
      contactType: 'Customer Service',
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Blockchain Technology',
      'Human Rights',
      'Quantum-Safe Cryptography',
      'Decentralized Governance',
      'Sustainable Development',
      'AI Verification',
      'Proof of Status',
      'Proof of Activity',
    ],
  })

  const getSoftwareApplicationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Decentralized Rights Protocol',
    applicationCategory: 'Blockchain Protocol',
    operatingSystem: 'Blockchain Network',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Quantum-Safe Cryptography',
      'AI-Verified Consensus',
      'Proof of Status (PoST)',
      'Proof of Activity (PoAT)',
      'Dual-Token Economy',
      'Decentralized Governance',
      'Sustainable Rights Economy',
      'Activity-Based Economy',
    ],
    screenshot: `${baseUrl}/DRP.png`,
  })

  const getFAQSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Decentralized Rights Protocol (DRP)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Decentralized Rights Protocol (DRP) is a quantum-safe blockchain platform designed to protect human rights through AI-verified consensus mechanisms. DRP uses Proof of Status (PoST) for identity verification and Proof of Activity (PoAT) to reward real-world contributions, creating a sustainable, human-rights-centered blockchain ecosystem.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Proof of Activity (PoAT) work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Proof of Activity (PoAT) validates and rewards real-world activities that contribute value to the DRP ecosystem. Users submit cryptographic proofs of their activities (content creation, network participation, community building), which are verified by AI Elders and validators. Verified activities are rewarded with DeRi tokens.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Proof of Status (PoST)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Proof of Status (PoST) is DRP's identity verification mechanism that encodes verified credentials (education, professional status, institutional recognition) without exposing private data. PoST is used for governance weighting and access control, ensuring that status emerges from verifiable behavior rather than authority.",
        },
      },
      {
        '@type': 'Question',
        name: 'What are RIGHTS and DeRi tokens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "RIGHTS is DRP's governance token that provides voting power in protocol decisions. DeRi is DRP's utility token used for transactions, rewards, and network participation. This dual-token model separates governance from utility, ensuring fair participation and preventing centralization of power.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is DRP quantum-safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, DRP uses NIST-approved post-quantum cryptography including CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures. These algorithms are resistant to attacks from both classical and quantum computers, ensuring long-term security for the protocol.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does DRP support sustainability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DRP incentivizes sustainable practices by rewarding nodes that use renewable energy sources. The protocol tracks energy consumption and carbon footprint, giving preference to participants who demonstrate environmental responsibility. This aligns with UN Sustainable Development Goals and creates positive environmental impact.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I participate in DRP governance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To participate in DRP governance, you need RIGHTS tokens. You can acquire RIGHTS tokens through community rewards, staking, or purchasing. With RIGHTS tokens, you can vote on proposals, submit your own proposals, or delegate your voting power to trusted community members.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes DRP different from other blockchains?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "DRP is unique in its human-rights-centered design, quantum-safe security, AI-verified consensus, and sustainability-first approach. Unlike other blockchains that prioritize speed or scalability, DRP prioritizes human dignity, environmental responsibility, and transparent governance. DRP also implements Proof of Status and Proof of Activity, connecting blockchain rewards to real-world value creation.",
        },
      },
    ],
  })

  const getWebSiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Decentralized Rights Protocol',
    url: baseUrl,
    description:
      'DRP — The Decentralized Rights Protocol that verifies human activity, promotes sustainability, and builds a trust-based global economy.',
    publisher: {
      '@type': 'Organization',
      name: 'Decentralized Rights Protocol',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  })

  const getArticleSchema = (pageType?: string) => {
    const titles: Record<string, { headline: string; description: string }> = {
      whitepaper: {
        headline: 'DRP Whitepaper: A Quantum-Safe Blockchain for Human Rights Protection',
        description:
          'The complete technical specification and vision for the Decentralized Rights Protocol (DRP), a quantum-safe blockchain platform designed to protect human rights through AI-verified consensus.',
      },
      philosophy: {
        headline: 'The Philosophy of Decentralized Rights Protocol',
        description:
          'The ethical, social, and technological worldview of DRP, connecting human rights, sustainability, and governance principles.',
      },
      governance: {
        headline: 'DRP Governance: Decentralized Decision-Making for Human Rights',
        description:
          'How DRP implements decentralized governance through RIGHTS tokens, Proof of Status, and community participation.',
      },
    }

    const content = titles[pageType || 'default'] || {
      headline: 'Decentralized Rights Protocol',
      description: 'DRP blockchain platform',
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: content.headline,
      description: content.description,
      author: {
        '@type': 'Organization',
        name: 'Decentralized Rights Protocol',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Decentralized Rights Protocol',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/site-icon.png`,
        },
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentUrl,
      },
      about: {
        '@type': 'Thing',
        name: 'Blockchain Technology',
        description: 'Quantum-safe blockchain for human rights protection',
      },
    }
  }

  const getBreadcrumbSchema = (items: string[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
      item:
        index === 0
          ? baseUrl
          : `${baseUrl}/${item.toLowerCase().replace(/\s+/g, '-')}`,
    })),
  })

  const getWebPageSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Decentralized Rights Protocol',
    description:
      'DRP — The Decentralized Rights Protocol that verifies human activity, promotes sustainability, and builds a trust-based global economy.',
    url: currentUrl,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Decentralized Rights Protocol',
      url: baseUrl,
    },
  })

  const schemas = getStructuredData()

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

