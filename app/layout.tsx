import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Decentralized Rights Protocol',
  description: 'Empowering human rights through blockchain technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
