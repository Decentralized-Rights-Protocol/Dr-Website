import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Globe, Shield, Heart, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Flag of Earth | DRP — One Planet, Universal Rights',
  description: 'The International Flag of Planet Earth, designed by Oskar Pernefeldt (2015). DRP uses this flag as a symbol of universal human rights for all inhabitants of Earth.',
}

export default function EarthFlagPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-20">

      {/* Hero */}
      <section className="border-b border-gray-100 dark:border-foreground/5">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#006DB6]/40 bg-[#006DB6]/8 mb-8">
                <Globe className="w-3.5 h-3.5 text-[#006DB6]" />
                <span className="text-[#006DB6] text-xs font-bold tracking-widest uppercase">One Planet · Universal Rights</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-foreground leading-tight mb-6">
                The Flag<br /><span className="text-[#006DB6]">of Earth.</span>
              </h1>
              <p className="text-gray-600 dark:text-foreground/50 text-xl leading-relaxed mb-6 max-w-lg">
                Designed by Oskar Pernefeldt in 2015, the International Flag of Planet Earth represents all humanity — every person, every nation, one shared home.
              </p>
              <p className="text-gray-500 dark:text-foreground/40 text-sm leading-relaxed mb-10 max-w-lg">
                DRP uses this flag as a symbol of our mission: universal human rights, verified on-chain, for every inhabitant of Earth — without borders, without exclusion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://www.flagofearth.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#006DB6] text-white font-bold text-sm hover:bg-[#005a9e] transition-all">
                  <Globe className="w-4 h-4" /> flagofearth.com <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-foreground/15 text-gray-600 dark:text-foreground/60 text-sm hover:border-[#00e5cc]/40 hover:text-gray-900 dark:hover:text-foreground transition-all">
                  Our Mission <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden shadow-2xl">
                <Image src="/ifope/08_IFOPE_20x30.jpg"
                  alt="The International Flag of Planet Earth — designed by Oskar Pernefeldt, 2015"
                  width={800} height={533} className="w-full h-auto" priority />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <p className="text-xs text-gray-400 dark:text-foreground/25">© Oskar Pernefeldt, 2015</p>
                <a href="/ifope/01_FEB2021_IFOPE_LICENSE.pdf" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-400 dark:text-foreground/25 hover:text-[#00e5cc] transition-colors flex items-center gap-1">
                  License (CC BY 4.0) <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seven Rings */}
      <section className="border-b border-gray-100 dark:border-foreground/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00e5cc]/30 bg-[#00e5cc]/5 mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#00e5cc]">Design Meaning</span>
              </div>
              <h2 className="text-3xl font-black text-foreground mb-4">Seven Rings. One World.</h2>
              <p className="text-gray-500 dark:text-foreground/40 text-sm leading-relaxed mb-8">
                The seven interlocking rings represent the continents and regions of Earth, woven together inseparably — reflecting that we share one planet and one destiny. The rings overlap to show our interdependence. The deep blue field represents the water covering most of our home.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: 1, desc: 'Africa' }, { num: 2, desc: 'Americas' }, { num: 3, desc: 'Asia' },
                  { num: 4, desc: 'Europe' }, { num: 5, desc: 'Oceania' }, { num: 6, desc: 'Antarctica' },
                  { num: 7, desc: 'The Cosmos' },
                ].map((r) => (
                  <div key={r.num} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14]">
                    <div className="w-7 h-7 rounded-full bg-[#006DB6] text-white text-xs font-black flex items-center justify-center shrink-0">{r.num}</div>
                    <span className="text-sm text-gray-700 dark:text-foreground/60 font-medium">{r.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="relative overflow-hidden border border-gray-200 dark:border-foreground/10 bg-white">
                <Image src="/ifope/09_IFOPE_Construction.png"
                  alt="Geometric construction of the International Flag of Planet Earth — Design by Oskar Pernefeldt, 2015"
                  width={1280} height={905} className="w-full h-auto" />
              </div>
              <p className="text-xs text-gray-400 dark:text-foreground/25 mt-2 text-center">Geometric construction — Design by Oskar Pernefeldt, 2015</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="border-b border-gray-100 dark:border-foreground/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-10">
            <Heart className="w-4 h-4 text-[#00e5cc]" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-foreground/30">The Flag in the World</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {[
              { src: '/ifope/01_Astronaut_Portrait.jpg', alt: 'Astronaut with Flag of Earth patch', caption: 'In Space — representing all of humanity beyond Earth' },
              { src: '/ifope/02_Space_Walk.jpg', alt: 'Flag of Earth during a space walk', caption: 'Space Walk — one flag for all who leave our planet' },
              { src: '/ifope/03_Porch_Flag.jpg', alt: 'Flag of Earth displayed at home', caption: 'At Home — displayed by citizens of Earth everywhere' },
              { src: '/ifope/04_Sport.jpg', alt: 'Flag of Earth at a sporting event', caption: 'In Sport — beyond national competition' },
            ].map((photo) => (
              <div key={photo.src} className="group overflow-hidden border border-gray-100 dark:border-white/8">
                <div className="relative overflow-hidden">
                  <Image src={photo.src} alt={photo.alt} width={800} height={533}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#0a0a14]">
                  <p className="text-xs text-gray-500 dark:text-foreground/35 leading-relaxed">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-400 dark:text-foreground/20 text-center">
            All photography © Oskar Pernefeldt / IFOPE, 2015–2021. Used under CC BY 4.0.{' '}
            <a href="/ifope/01_FEB2021_IFOPE_LICENSE.pdf" target="_blank" rel="noopener noreferrer"
              className="underline hover:text-[#00e5cc] transition-colors">View license</a>
          </p>
        </div>
      </section>

      {/* DRP + Oskar cards */}
      <section className="border-b border-gray-100 dark:border-foreground/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="border border-[#006DB6]/20 bg-[#006DB6]/5 p-8">
              <Globe className="w-8 h-8 text-[#006DB6] mb-6" />
              <h3 className="text-xl font-black text-foreground mb-3">Why DRP Carries This Flag</h3>
              <p className="text-gray-500 dark:text-foreground/40 text-sm leading-relaxed">
                The Flag of Earth embodies everything DRP stands for: no borders, no exclusion, rights for every human being on this planet. We carry it because our mission is planetary — to build rights infrastructure that serves all 8 billion people, starting with those most underserved. Whether you&apos;re in Ghana, Germany, or the International Space Station — DRP is for you.
              </p>
            </div>
            <div className="border border-[#00e5cc]/20 bg-[#00e5cc]/5 p-8">
              <Shield className="w-8 h-8 text-[#00e5cc] mb-6" />
              <h3 className="text-xl font-black text-foreground mb-3">About Oskar Pernefeldt</h3>
              <p className="text-gray-500 dark:text-foreground/40 text-sm leading-relaxed mb-4">
                Oskar Pernefeldt is a Swedish graphic designer who created the International Flag of Planet Earth in 2015 as his graduation project from Beckmans College of Design in Stockholm. The flag has since been adopted globally as a symbol of Earth citizenship.
              </p>
              <a href="https://www.flagofearth.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00e5cc] hover:text-[#00bfff] transition-colors">
                flagofearth.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Attribution */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14] p-6">
          <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-foreground/25 mb-3">Full Attribution</h4>
          <p className="text-sm text-gray-600 dark:text-foreground/50 leading-relaxed">
            <strong className="text-foreground">International Flag of Planet Earth</strong> — designed by Oskar Pernefeldt, 2015.
            Originally created as a graduation project at Beckmans College of Design, Stockholm, Sweden.
            Published through{' '}
            <a href="https://www.flagofearth.com" target="_blank" rel="noopener noreferrer" className="text-[#00e5cc] hover:underline">flagofearth.com</a>.
            Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).{' '}
            <a href="/ifope/01_FEB2021_IFOPE_LICENSE.pdf" target="_blank" rel="noopener noreferrer" className="text-[#00e5cc] hover:underline">View full license</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
