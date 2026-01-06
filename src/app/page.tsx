import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { MissionSection } from '@/components/mission-section'
import { QuickLinks } from '@/components/quick-links'
import { StructuredData } from '@/components/seo/StructuredData'
import { FAQ } from '@/components/seo/FAQ'

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
      <div className="flex flex-col">
        {/* Hero Section with Features */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Mission Section */}
        <MissionSection />
        
        {/* FAQ Section for AI Search Optimization */}
        <FAQ className="bg-white dark:bg-neutral-900" />
        
        {/* Get Started Section */}
        <QuickLinks />
      </div>
    </>
  )
}
