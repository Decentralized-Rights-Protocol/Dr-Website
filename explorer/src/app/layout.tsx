import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DRP Explorer | Blockchain Transparency & Trust',
  description: 'Track Proof of Status, Proof of Activities, AI verification, blocks, and transactions in real time. Transparency you can verify.',
  keywords: 'blockchain explorer, DRP, proof of status, proof of activities, AI verification, human rights',
  openGraph: {
    title: 'DRP Explorer',
    description: 'Transparency. Trust. Rights Verified.',
    type: 'website',
    siteName: 'DRP Explorer'
  },
  themeColor: '#0a0a0f'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
