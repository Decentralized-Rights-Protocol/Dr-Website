'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
})

type NewsletterForm = z.infer<typeof newsletterSchema>

const interests = [
  { id: 'updates', label: 'Protocol Updates' },
  { id: 'governance', label: 'Governance Proposals' },
  { id: 'partnerships', label: 'Partnership Announcements' },
  { id: 'events', label: 'Events & Webinars' },
  { id: 'research', label: 'Research & Development' },
]

export function NewsletterSignup() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [error, setError] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      interests: [],
    },
  })

  const watchedInterests = watch('interests')

  const onSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true)
    setError('')

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log('Newsletter signup:', data)
      
      setIsSubmitted(true)
      reset()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestChange = (interestId: string, checked: boolean) => {
    const currentInterests = watchedInterests || []
    const newInterests = checked
      ? [...currentInterests, interestId]
      : currentInterests.filter(id => id !== interestId)
    
    // Update the form value
    register('interests').onChange({ target: { value: newInterests } })
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
          Welcome to the DRP Community!
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Thank you for joining our newsletter. You'll receive updates about the Decentralized Rights Protocol.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
        >
          Subscribe Another Email
        </button>
      </motion.div>
    )
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Updated with
            <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
              {' '}DRP
            </span>
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Join our community and be the first to know about protocol updates, governance proposals, and partnership announcements.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email address"
                className="w-full px-6 py-4 text-lg rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                What are you interested in? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <label
                    key={interest.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={watchedInterests?.includes(interest.id) || false}
                      onChange={(e) => handleInterestChange(interest.id, e.target.checked)}
                      className="w-4 h-4 text-secondary-600 bg-white/10 border-white/20 rounded focus:ring-secondary-500 focus:ring-2"
                    />
                    <span className="text-white text-sm">{interest.label}</span>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.interests.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                'Subscribe to Newsletter'
              )}
            </button>

            {error && (
              <p className="text-sm text-red-400 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </form>

          <p className="text-sm text-neutral-400 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
