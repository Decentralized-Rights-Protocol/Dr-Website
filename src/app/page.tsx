import { DRPLandingExperience } from '@/components/home/DRPLandingExperience'
import { StructuredData } from '@/components/seo/StructuredData'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata = buildPageMetadata({
  title: 'Decentralized Rights Protocol | Quantum-Safe Blockchain for Human Rights',
  description:
    'Decentralized Rights Protocol (DRP) is a quantum-safe blockchain platform that protects human rights through AI-verified consensus, Proof of Status (PoST), and Proof of Activity (PoAT). Built with NIST-approved post-quantum cryptography, DRP prioritizes human dignity, sustainability, and transparent governance.',
  canonical: '/',
  ogImageUrl: 'https://decentralizedrights.com/08_IFOPE_20x30.jpg',
})

export default function Home() {
  return (
    <>
      <StructuredData type="homepage" />
      <DRPLandingExperience />
    </>
  )
}
