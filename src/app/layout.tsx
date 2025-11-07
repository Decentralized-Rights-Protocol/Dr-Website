import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Decentralized Rights Protocol',
  description: 'Empowering human rights, sustainability, and AI transparency through blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="font-bold text-xl">
                  DRP
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link href="/learn" className="hover:text-blue-600">Learn</Link>
                <Link href="/why-drp" className="hover:text-blue-600">Why DRP</Link>
                <Link href="/docs" className="hover:text-blue-600">Docs</Link>
                <Link href="/roadmap" className="hover:text-blue-600">Roadmap</Link>
                <Link href="/whitepaper" className="hover:text-blue-600">Whitepaper</Link>
                <Link href="/community" className="hover:text-blue-600">Community</Link>
                <a href="https://explorer.decentralizedrights.com" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                  Explorer
                </a>
                <a href="https://app.decentralizedrights.com" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Launch App
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
