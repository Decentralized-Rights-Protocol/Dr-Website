'use client'

import { useEffect, useState } from 'react'

interface LetterData {
  letter: string
  word: string
  delay: number
}

const rightsData: LetterData[] = [
  { letter: 'R', word: 'Rights', delay: 0 },
  { letter: 'I', word: 'Integrity', delay: 200 },
  { letter: 'G', word: 'Governance', delay: 400 },
  { letter: 'H', word: 'Humanity', delay: 600 },
  { letter: 'T', word: 'Trust', delay: 800 },
  { letter: 'S', word: 'Sustainability', delay: 1000 },
]

export function RightsAnimation() {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([])
  const [showWords, setShowWords] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const animateCycle = () => {
      // Reset state
      setVisibleIndices([])
      setShowWords(false)

      // Phase 1: Letters float in one by one
      rightsData.forEach((item, index) => {
        setTimeout(() => {
          setVisibleIndices(prev => [...prev, index])
        }, item.delay)
      })

      // Phase 2: Expand to words (after all letters are visible + 500ms)
      setTimeout(() => {
        setShowWords(true)
      }, rightsData[rightsData.length - 1].delay + 500)

      // Phase 3: Reset and restart (after 8 seconds)
      timeoutId = setTimeout(() => {
        animateCycle()
      }, 10000)
    }

    animateCycle()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20 blur-3xl" />
      
      {/* Letters/Words Container */}
      <div className="relative z-10 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
        {rightsData.map((item, index) => {
          const isVisible = visibleIndices.includes(index)
          const showWord = showWords && isVisible

          return (
            <div
              key={item.letter}
              className="relative"
            >
              {/* Letter */}
              <div
                className={`
                  text-6xl md:text-8xl font-bold transition-all duration-700 ease-out
                  ${isVisible 
                    ? 'opacity-100 translate-y-0 text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]' 
                    : 'opacity-0 translate-y-10'
                  }
                `}
                style={{
                  filter: isVisible ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))' : 'none',
                }}
              >
                {item.letter}
              </div>

              {/* Word expansion */}
              {showWord && (
                <div
                  className={`
                    absolute top-full mt-2 left-1/2 transform -translate-x-1/2
                    text-sm md:text-base font-medium text-cyan-400
                    whitespace-nowrap transition-all duration-500
                    animate-fade-in-up
                  `}
                  style={{
                    textShadow: '0 0 10px rgba(6, 182, 212, 0.6)',
                  }}
                >
                  {item.word}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

