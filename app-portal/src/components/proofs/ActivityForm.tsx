'use client'

import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Camera, Loader2, MapPin } from 'lucide-react'
import { usePoAT } from '@/hooks/usePoAT'
import { FormConsent } from '@/components/legal/FormConsent'
import { cn } from '@/lib/utils'

const FileCtor = typeof globalThis !== 'undefined' ? (globalThis as { File?: typeof File }).File : undefined
const activityFileSchema = z.custom<File>((value) => {
  if (!value) return false
  if (FileCtor && !(value instanceof FileCtor)) return false
  const candidate = value as File
  return typeof candidate.size === 'number' && candidate.size <= 25 * 1024 * 1024 && typeof candidate.type === 'string' && ['image/', 'video/'].some((type) => candidate.type.startsWith(type))
}, { message: 'Upload an image or video under 25MB' })

const activitySchema = z.object({
  title: z.string().min(3, 'Provide a descriptive title'),
  description: z.string().min(20, 'Share at least 20 characters about the activity'),
  location: z.string().optional(),
  timestamp: z.string().min(1, 'Choose when the activity occurred'),
  file: activityFileSchema,
})
type ActivityFormValues = z.infer<typeof activitySchema>

function localDateTimeValue() {
  const date = new Date()
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16)
}

export function ActivityForm() {
  const mutation = usePoAT()
  const [consent, setConsent] = useState(false)
  const form = useForm<ActivityFormValues>({ resolver: zodResolver(activitySchema), defaultValues: { timestamp: localDateTimeValue() } })
  const isSubmitting = mutation.isPending
  const submissionState = useMemo(() => {
    if (mutation.isSuccess) return { type: 'success' as const, message: 'Claim submitted. It is now pending verification; approval is required before any reward is issued.' }
    if (mutation.isError) return { type: 'error' as const, message: mutation.error instanceof Error ? mutation.error.message : 'Submission failed.' }
    return null
  }, [mutation.isError, mutation.isSuccess, mutation.error])

  const onSubmit = form.handleSubmit(async (values) => {
    if (!consent) return
    await mutation.mutateAsync(values)
    form.reset({ timestamp: localDateTimeValue() })
    setConsent(false)
  })

  const inputClass = 'w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950'
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><label htmlFor="activity-title" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Activity title</label><input id="activity-title" {...form.register('title')} placeholder="Community solar installation" className={cn(inputClass, form.formState.errors.title && 'border-red-400')} />{form.formState.errors.title && <p role="alert" className="text-xs text-red-500">{form.formState.errors.title.message}</p>}</div>
        <div className="space-y-2"><label htmlFor="activity-time" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">When did it happen?</label><input id="activity-time" type="datetime-local" {...form.register('timestamp')} className={cn(inputClass, form.formState.errors.timestamp && 'border-red-400')} />{form.formState.errors.timestamp && <p role="alert" className="text-xs text-red-500">{form.formState.errors.timestamp.message}</p>}</div>
      </div>
      <div className="space-y-2"><label htmlFor="activity-location" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Location <span className="text-neutral-400">(optional)</span></label><div className="relative"><MapPin aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" /><input id="activity-location" {...form.register('location')} placeholder="City or community (avoid precise location unless needed)" className={cn(inputClass, 'px-10')} /></div></div>
      <div className="space-y-2"><label htmlFor="activity-description" className="text-sm font-medium text-neutral-700 dark:text-neutral-200">What happened?</label><textarea id="activity-description" {...form.register('description')} placeholder="Describe the activity and the evidence supporting the claim. Avoid unnecessary personal information." rows={5} className={cn(inputClass, 'resize-none', form.formState.errors.description && 'border-red-400')} />{form.formState.errors.description && <p role="alert" className="text-xs text-red-500">{form.formState.errors.description.message}</p>}</div>
      <Controller control={form.control} name="file" render={({ field }) => <div className="space-y-2"><label className="text-sm font-medium text-neutral-700 dark:text-neutral-200" htmlFor="activity-evidence">Evidence file</label><label htmlFor="activity-evidence" className={cn('flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-600 transition hover:border-primary-400 hover:bg-primary-50/40 focus-within:ring-2 focus-within:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-300', form.formState.errors.file && 'border-red-400')}><Camera aria-hidden="true" className="h-8 w-8" /><div className="text-center text-sm"><p className="font-medium">Choose an image or video</p><p className="text-xs text-neutral-500 dark:text-neutral-400">Up to 25MB. Avoid faces, addresses, documents, or other personal data unless necessary.</p></div><input id="activity-evidence" type="file" className="sr-only" accept="image/*,video/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) field.onChange(file) }} /> </label>{form.formState.errors.file && <p role="alert" className="text-xs text-red-500">{form.formState.errors.file.message}</p>}</div>} />
      <FormConsent checked={consent} onChange={setConsent} />
      {!consent && <p className="text-xs text-amber-600 dark:text-amber-300">Please confirm the submission consent before sending a claim.</p>}
      <button type="submit" disabled={isSubmitting || !consent} aria-disabled={isSubmitting || !consent} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}{isSubmitting ? 'Submitting claim…' : 'Submit claim for verification'}</button>
      {submissionState && <p role="status" aria-live="polite" className={cn('rounded-xl px-4 py-3 text-sm', submissionState.type === 'success' ? 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-200' : 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-200')}>{submissionState.message}</p>}
    </form>
  )
}
