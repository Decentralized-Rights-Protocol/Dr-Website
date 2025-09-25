import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Decentralized Rights Protocol - Protecting Human Rights with Blockchain',
  description: 'The Decentralized Rights Protocol (DRP) is building a quantum-safe, transparent platform to protect, verify, and advance human rights globally using blockchain technology.',
  keywords: ['blockchain', 'human rights', 'decentralized', 'quantum safe', 'cryptography', 'governance', 'transparency', 'DRP', 'RIGHTS token', 'DeRi token'],
  authors: [{ name: 'Decentralized Rights Protocol Team' }],
  creator: 'Decentralized Rights Protocol',
  publisher: 'Decentralized Rights Protocol',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://decentralizedrights.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Decentralized Rights Protocol - Protecting Human Rights with Blockchain',
    description: 'The Decentralized Rights Protocol (DRP) is building a quantum-safe, transparent platform to protect, verify, and advance human rights globally using blockchain technology.',
    url: 'https://decentralizedrights.com',
    siteName: 'Decentralized Rights Protocol',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Decentralized Rights Protocol - Protecting Human Rights with Blockchain',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decentralized Rights Protocol - Protecting Human Rights with Blockchain',
    description: 'The Decentralized Rights Protocol (DRP) is building a quantum-safe, transparent platform to protect, verify, and advance human rights globally using blockchain technology.',
    images: ['/og-image.png'],
    creator: '@De_Rights',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0D1B2A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
