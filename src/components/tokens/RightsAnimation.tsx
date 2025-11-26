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

      // Phase 1: Words appear one by one (slower animation)
      rightsData.forEach((item, index) => {
        setTimeout(() => {
          setVisibleIndices(prev => [...prev, index])
        }, item.delay * 1.5) // Slower animation
      })

      // Phase 2: Show all words (after all are visible + 300ms)
      setTimeout(() => {
        setShowWords(true)
      }, rightsData[rightsData.length - 1].delay * 1.5 + 800)

      // Phase 3: Reset and restart (after 12 seconds - longer cycle)
      timeoutId = setTimeout(() => {
        animateCycle()
      }, 14000)
    }

    animateCycle()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="relative w-full min-h-80 flex flex-col items-center justify-center overflow-hidden mb-16 px-4">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20 blur-3xl" />
      
      {/* Big RIGHTS Title - Separate container */}
      <div className="relative z-10 mb-8">
        <div className="text-7xl md:text-9xl lg:text-[12rem] font-bold text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]">
          RIGHTS
        </div>
      </div>
      
      {/* Keywords Container - Below title with proper spacing */}
      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap max-w-5xl px-2">
        {rightsData.map((item, index) => {
          const isVisible = visibleIndices.includes(index)
          const showWord = showWords && isVisible

          return (
            <div
              key={item.letter}
              className={`
                relative transition-all duration-700 ease-out
                ${isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
              `}
            >
              {/* Word - Now displayed directly, no letter overlap */}
              {showWord && (
                <div
                  className={`
                    text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-cyan-400
                    whitespace-nowrap px-2 py-1
                    transition-all duration-500
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

