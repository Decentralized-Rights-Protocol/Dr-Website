import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Decentralized Rights - Empowering Humanity Through Blockchain',
  description: 'Decentralized Rights Platform - Using blockchain technology to protect and advance human rights globally',
  keywords: 'blockchain, human rights, decentralized, cryptocurrency, $RIGHTS, $DeRi, quantum safe, SDGs',
  authors: [{ name: 'Decentralized Rights Protocol' }],
  openGraph: {
    title: 'Decentralized Rights - Empowering Humanity Through Blockchain',
    description: 'Using blockchain technology to protect and advance human rights globally',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decentralized Rights - Empowering Humanity Through Blockchain',
    description: 'Using blockchain technology to protect and advance human rights globally',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
