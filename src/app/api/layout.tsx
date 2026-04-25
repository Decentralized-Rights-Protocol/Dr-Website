import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DRP API Portal',
  description: 'Build on the Decentralized Rights Protocol with robust REST and verification endpoints.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
        {children}
      </body>
    </html>
  )
}

