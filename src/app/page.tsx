import { DRPLandingExperience } from '@/components/home/DRPLandingExperience'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata = {
  title: 'Decentralized Rights Protocol | Quantum-Safe Blockchain for Human Rights',
  description: 'Decentralized Rights Protocol (DRP) is a quantum-safe blockchain platform that protects human rights through AI-verified consensus, Proof of Status (PoST), and Proof of Activity (PoAT). Built with NIST-approved post-quantum cryptography, DRP prioritizes human dignity, sustainability, and transparent governance.',
  keywords: [
    'decentralized rights protocol',
    'DRP blockchain',
    'quantum-safe blockchain',
    'human rights blockchain',
    'proof of activity',
    'proof of status',
    'AI-verified consensus',
    'sustainable blockchain',
    'blockchain governance',
    'RIGHTS token',
    'DeRi token',
  ],
  openGraph: {
    title: 'Decentralized Rights Protocol | Quantum-Safe Blockchain for Human Rights',
    description: 'DRP is a quantum-safe blockchain platform that protects human rights through AI-verified consensus, Proof of Status, and Proof of Activity mechanisms.',
    type: 'website',
    url: 'https://decentralizedrights.com',
  },
}

export default function Home() {
  return (
    <>
      <StructuredData type="homepage" />
      <DRPLandingExperience />
    </>
  )
}
