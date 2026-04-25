'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

const sampleSuggestions = [
  'Submit your latest community activity to earn +25 $DeRi.',
  'Complete the renewable energy module for a sustainability boost.',
  'Invite a verified partner to unlock collaborative governance slots.'
]

type ElderMessage = {
  role: 'assistant' | 'user'
  content: string
}

export function ElderAssistant() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<ElderMessage[]>([
    {
      role: 'assistant',
      content: 'Welcome back! I am Elder AI, here to help you manage your proofs and rewards.'
    }
  ])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!prompt.trim()) return

    const userMessage: ElderMessage = { role: 'user', content: prompt }
    setMessages((prev) => [...prev, userMessage])
    // Placeholder assistant response – replace with AI API integration.
    const syntheticResponse = sampleSuggestions[Math.floor(Math.random() * sampleSuggestions.length)]
    const assistantMessage: ElderMessage = { role: 'assistant', content: syntheticResponse }
    setMessages((prev) => [...prev, assistantMessage])
    setPrompt('')
  }

  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Elder AI assistant</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Ask for guidance on proofs, rewards, and impact planning.</p>
        </div>
      </header>

      <div className="mt-4 space-y-3 overflow-y-auto rounded-2xl bg-neutral-50/80 p-4 dark:bg-neutral-900/60" style={{ maxHeight: '18rem' }}>
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === 'assistant'
                ? 'text-sm text-neutral-700 dark:text-neutral-200'
                : 'text-sm font-medium text-primary-700 dark:text-primary-200'
            }
          >
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask Elder AI for advice…"
          className="flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950"
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
        >
          Share
        </button>
      </form>
    </section>
  )
}
