'use client'

import * as React from 'react'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// Extend Window interface for Google Translate
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: any
      }
    }
    googleTranslateElementInit: () => void
  }
}

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

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const [currentLanguage, setCurrentLanguage] = React.useState('en')
  const [isOpen, setIsOpen] = React.useState(false)
  const [isGoogleTranslateLoaded, setIsGoogleTranslateLoaded] = React.useState(false)

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  // Load Google Translate
  React.useEffect(() => {
    const loadGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        setIsGoogleTranslateLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.head.appendChild(script)

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,zh,ja,ko,pt,ru,ar,hi,it',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        )
        setIsGoogleTranslateLoaded(true)
      }
    }

    loadGoogleTranslate()
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    setIsOpen(false)
    
    // Use Google Translate to translate the page
    if (isGoogleTranslateLoaded && window.google && window.google.translate) {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (selectElement) {
        const event = new Event('change', { bubbles: true })
        selectElement.value = langCode
        selectElement.dispatchEvent(event)
      }
    }
    
    // Store language preference
    localStorage.setItem('preferred-language', langCode)
  }

  // Load saved language preference
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "group flex items-center gap-x-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-all",
          compact
            ? "px-2 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300/60 dark:border-neutral-700"
            : "px-4 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-800/30 dark:hover:to-purple-800/30 hover:scale-105 hover:shadow-lg border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className={cn("h-4 w-4", compact ? "" : "transition-transform duration-300 group-hover:rotate-12")} />
        {!compact && (
          <>
            <span className="hidden sm:inline text-lg transition-transform duration-300 group-hover:scale-110">{currentLang.flag}</span>
            <span className="hidden md:inline font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {currentLang.name}
            </span>
          </>
        )}
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
