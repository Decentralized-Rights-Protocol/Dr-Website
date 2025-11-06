'use client'

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿', nativeName: 'Kiswahili' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文 (简体)' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼', nativeName: '中文 (繁體)' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
]

interface LanguageSwitcherProps {
  compact?: boolean
  showFlags?: boolean
  className?: string
}

export function LanguageSwitcher({ 
  compact = false, 
  showFlags = true, 
  className 
}: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentLocale, setCurrentLocale] = React.useState('en')

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  // RTL languages
  const rtlLanguages = ['ar', 'he']
  const isRTL = rtlLanguages.includes(currentLocale)

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false)
    
    // Update current locale
    setCurrentLocale(langCode)

    // Store language preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', langCode)
    }

    // Apply RTL if needed
    if (rtlLanguages.includes(langCode)) {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = langCode
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = langCode
    }

    // Navigate to the new locale
    if (!pathname) return
    const segments = pathname.split('/')
    segments[1] = langCode
    const newPath = segments.join('/')
    router.push(newPath)
  }

  // Load saved language preference and detect browser language on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const savedLanguage = localStorage.getItem('preferred-language')
    const browserLanguage = navigator.language.split('-')[0] // e.g., "en-US" -> "en"

    let initialLang = 'en'
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      initialLang = savedLanguage
    } else if (languages.some(lang => lang.code === browserLanguage)) {
      initialLang = browserLanguage
    }

    setCurrentLocale(initialLang)
    if (rtlLanguages.includes(initialLang)) {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = initialLang
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = initialLang
    }
  }, [])

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        className={cn(
          "group flex items-center gap-x-2 rounded-full text-sm font-medium transition-all duration-300",
          compact
            ? "px-3 py-2 bg-white/10 dark:bg-neutral-800/50 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-neutral-700/50 border border-white/20 dark:border-neutral-700/50"
            : "px-4 py-2.5 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100/80 hover:to-purple-100/80 dark:hover:from-blue-800/30 dark:hover:to-purple-800/30 hover:scale-105 hover:shadow-lg border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600 backdrop-blur-sm"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className={cn(
          "h-4 w-4 transition-transform duration-300", 
          compact ? "" : "group-hover:rotate-12"
        )} />
        
        {!compact && (
          <>
            {showFlags && (
              <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                {currentLanguage.flag}
              </span>
            )}
            <span className="hidden sm:inline font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {currentLanguage.nativeName}
            </span>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-300",
              isOpen && "rotate-180"
            )} />
          </>
        )}
      </button>

      {isOpen && (
        <div className={cn(
          "absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none animate-fade-in-up",
          isRTL && "right-auto left-0"
        )}>
          <div className="p-2">
            {/* Language List */}
            <div className="max-h-64 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={cn(
                    'flex w-full items-center gap-x-3 px-3 py-2.5 text-sm transition-all duration-200 rounded-lg',
                    currentLanguage.code === language.code
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 hover:scale-[1.02]'
                  )}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {showFlags && (
                    <span className="text-lg flex-shrink-0">{language.flag}</span>
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {language.name}
                    </div>
                  </div>
                  {currentLanguage.code === language.code && (
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}