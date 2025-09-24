import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Mission } from '@/components/mission'
import { TokenEconomy } from '@/components/token-economy'
import { Features } from '@/components/features'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Mission />
      <TokenEconomy />
      <Features />
      <Footer />
    </main>
  )
}
