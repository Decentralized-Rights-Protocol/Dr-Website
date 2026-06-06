import { DRPHomePage } from '@/components/home/DRPHomePage'
import { StructuredData } from '@/components/seo/StructuredData'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata = buildPageMetadata({
  title: 'Decentralized Rights Protocol | Infrastructure for Verified Rights',
  description: 'DRP is a blockchain protocol that verifies human activity, attests identity, and enables fair resource distribution — starting with Ghana, built for the world.',
  canonical: '/',
  ogImageUrl: 'https://decentralizedrights.com/08_IFOPE_20x30.jpg',
})

export default function Home() {
  return (
    <>
      <StructuredData type="homepage" />
      <DRPHomePage />
    </>
  )
}
