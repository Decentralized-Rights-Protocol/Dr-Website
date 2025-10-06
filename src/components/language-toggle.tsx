'use client'

import * as React from 'react'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
]

export function LanguageToggle() {
  const [currentLanguage, setCurrentLanguage] = React.useState('en')
  const [isOpen, setIsOpen] = React.useState(false)

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    setIsOpen(false)
    // Here you would typically implement actual language switching logic
    // For now, we'll just update the state
    console.log(`Language changed to: ${langCode}`)
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="hidden md:inline">{currentLang.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                className={cn(
                  'flex w-full items-center gap-x-3 px-4 py-2 text-sm transition-colors',
                  currentLanguage === language.code
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                )}
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="flex-1 text-left">{language.name}</span>
                {currentLanguage === language.code && (
                  <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
