import { HumanParticleExperience } from '@/components/home/HumanParticleExperience'
import { StructuredData } from '@/components/seo/StructuredData'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata = buildPageMetadata({
  title: 'Decentralized Rights Protocol | Cinematic Web Experience',
  description:
    'Experience the story of DRP. A cinematic journey through broken systems into a future of verified rights and human-centered technology.',
  canonical: '/',
  ogImageUrl: 'https://decentralizedrights.com/og-cinematic.jpg',
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <StructuredData type="homepage" />
      <HumanParticleExperience />
    </main>
  )
}
