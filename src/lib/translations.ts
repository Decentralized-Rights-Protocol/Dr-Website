import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// Type for translation keys
type TranslationKey = string
type TranslationValue = string | { [key: string]: any }

// Cache for translations
const translationCache = new Map<string, any>()

export function useTranslations() {
  const router = useRouter()
  const [translations, setTranslations] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      const locale = router.locale || 'en'
      
      // Check cache first
      if (translationCache.has(locale)) {
        setTranslations(translationCache.get(locale))
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/locales/${locale}/common.json`)
        if (response.ok) {
          const data = await response.json()
          translationCache.set(locale, data)
          setTranslations(data)
        } else {
          // Fallback to English
          const fallbackResponse = await fetch('/locales/en/common.json')
          const fallbackData = await fallbackResponse.json()
          setTranslations(fallbackData)
        }
      } catch (error) {
        console.error('Error loading translations:', error)
        // Fallback to English
        const fallbackResponse = await fetch('/locales/en/common.json')
        const fallbackData = await fallbackResponse.json()
        setTranslations(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    loadTranslations()
  }, [router.locale])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key
  }

  return { t, loading, locale: router.locale }
}

// Helper function to get nested translation values
export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path
  }, obj)
}
