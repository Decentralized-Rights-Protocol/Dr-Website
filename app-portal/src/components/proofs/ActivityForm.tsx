'use client'

import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Camera, Loader2, MapPin } from 'lucide-react'
import { usePoAT } from '@/hooks/usePoAT'
import { cn } from '@/lib/utils'

const FileCtor = typeof globalThis !== 'undefined' ? (globalThis as { File?: typeof File }).File : undefined

const activityFileSchema = z.custom<File>((value) => {
  if (!value) return false
  if (FileCtor && !(value instanceof FileCtor)) return false
  const candidate = value as File
  if (typeof candidate.size !== 'number' || typeof candidate.type !== 'string') return false
  if (candidate.size > 25 * 1024 * 1024) return false
  return ['image/', 'video/'].some((type) => candidate.type.startsWith(type))
}, {
  message: 'Upload an image or video under 25MB'
})

const activitySchema = z.object({
  title: z.string().min(3, 'Provide a descriptive title'),
  description: z.string().min(20, 'Share at least 20 characters about the activity'),
  location: z.string().optional(),
  timestamp: z.string(),
  file: activityFileSchema,
  hash: z.string().min(32, 'Provide a cryptographic digest of your payload')
})

type ActivityFormValues = z.infer<typeof activitySchema>

export function ActivityForm() {
  const mutation = usePoAT()

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      timestamp: new Date().toISOString()
    }
  })

  const isSubmitting = mutation.isPending

  const submissionState = useMemo(() => {
    if (mutation.isSuccess) {
      return {
        type: 'success' as const,
        message: 'Your proof was submitted. Rewards will arrive shortly after verification.'
      }
    }
    if (mutation.isError) {
      return {
        type: 'error' as const,
        message: mutation.error instanceof Error ? mutation.error.message : 'Submission failed.'
      }
    }
    return null
  }, [mutation.isError, mutation.isSuccess, mutation.error])

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
    form.reset({ timestamp: new Date().toISOString() })
  })

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Activity title</label>
          <input
            {...form.register('title')}
            placeholder="Distribute solar lanterns in Lagos"
            className={cn(
              'w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950',
              form.formState.errors.title && 'border-red-400 focus:ring-red-200'
            )}
          />
          {form.formState.errors.title && (
            <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Timestamp (UTC)</label>
          <input
            type="datetime-local"
            {...form.register('timestamp')}
            className={cn(
              'w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950',
              form.formState.errors.timestamp && 'border-red-400 focus:ring-red-200'
            )}
          />
          {form.formState.errors.timestamp && (
            <p className="text-xs text-red-500">{form.formState.errors.timestamp.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Location</label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            {...form.register('location')}
            placeholder="Latitude, Longitude or descriptive location"
            className="w-full rounded-xl border border-neutral-200 bg-white px-10 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Activity details</label>
        <textarea
          {...form.register('description')}
          placeholder="Describe what took place, who benefited, and any partner organisations involved."
          rows={5}
          className={cn(
            'w-full resize-none rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950',
            form.formState.errors.description && 'border-red-400 focus:ring-red-200'
          )}
        />
        {form.formState.errors.description && (
          <p className="text-xs text-red-500">{form.formState.errors.description.message}</p>
        )}
      </div>

      <Controller
        control={form.control}
        name="file"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Proof media</label>
            <label
              className={cn(
                'flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-600 transition hover:border-primary-400 hover:bg-primary-50/40 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-300',
                form.formState.errors.file && 'border-red-400 bg-red-50/20'
              )}
            >
              <Camera className="h-8 w-8" />
              <div className="text-center text-sm">
                <p className="font-medium">Drop your evidence or browse files</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Images (JPG/PNG) or videos (MP4) up to 25MB.</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) {
                    field.onChange(file)
                  }
                }}
              />
            </label>
            {form.formState.errors.file && <p className="text-xs text-red-500">{form.formState.errors.file.message}</p>}
          </div>
        )}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Payload hash</label>
        <input
          {...form.register('hash')}
          placeholder="0x6f20..."
          className={cn(
            'w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 font-mono text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950',
            form.formState.errors.hash && 'border-red-400 focus:ring-red-200'
          )}
        />
        {form.formState.errors.hash && <p className="text-xs text-red-500">{form.formState.errors.hash.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit proof
      </button>

      {submissionState && (
        <p
          className={cn(
            'rounded-xl px-4 py-3 text-sm',
            submissionState.type === 'success'
              ? 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-200'
              : 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-200'
          )}
        >
          {submissionState.message}
        </p>
      )}
    </form>
  )
}
