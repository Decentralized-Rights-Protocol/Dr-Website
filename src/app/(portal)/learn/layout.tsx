import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn & Earn | DRP App Portal'
}

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
