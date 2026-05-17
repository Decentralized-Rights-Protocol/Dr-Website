import { HumanParticleExperience } from '@/components/home/HumanParticleExperience'
import { StructuredData } from '@/components/seo/StructuredData'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata = buildPageMetadata({
  title: 'Decentralized Rights Protocol | Infrastructure for Verified Rights',
  description:
    'DRP is a cinematic journey through broken systems into a future of verified rights, human-centered AI governance, and blockchain-backed dignity.',
  canonical: '/',
  ogImageUrl: 'https://decentralizedrights.com/og-cinematic.jpg',
})

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030308]">
      <StructuredData type="homepage" />
      <HumanParticleExperience />
    </main>
  )
}
