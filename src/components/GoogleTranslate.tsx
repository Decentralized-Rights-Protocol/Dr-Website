'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (config: any, elementId: string): void
          InlineLayout: {
            SIMPLE: number
          }
        }
      }
    }
    googleTranslateElementInit: () => void
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,ar,zh,sw,pt,de,ru,hi,ko,ja,it',
            layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE || 0,
            autoDisplay: false,
          },
          'google_translate_element'
        )
      }
    }

    // Load Google Translate script if not already loaded
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit()
    }
  }, [])

  return (
    <div className="flex items-center">
      <div id="google_translate_element" className="translate-wrapper" />
      <style jsx global>{`
        .translate-wrapper {
          display: inline-block;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        .goog-te-menu-value {
          color: rgb(38 38 38 / var(--tw-text-opacity)) !important;
        }
        .dark .goog-te-menu-value {
          color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
        }
        .goog-te-menu-frame {
          max-width: 100% !important;
        }
        .goog-te-menu2 {
          max-width: 100% !important;
          overflow: auto !important;
        }
        .skiptranslate {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </div>
  )
}

