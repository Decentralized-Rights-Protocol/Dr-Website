import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { Mission } from '@/components/Mission'
import { TokenEconomy } from '@/components/TokenEconomy'
import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'

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
