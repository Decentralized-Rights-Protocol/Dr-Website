import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { MissionSection } from '@/components/mission-section'
import { QuickLinks } from '@/components/quick-links'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Features */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Mission Section */}
      <MissionSection />
      
      {/* Get Started Section */}
      <QuickLinks />
    </div>
  )
}
