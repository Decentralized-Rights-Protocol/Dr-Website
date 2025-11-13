'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, FileSearch, Loader2, ShieldAlert, ShieldCheck, Users } from 'lucide-react'
import { usePoST } from '@/hooks/usePoST'
import { cn } from '@/lib/utils'

const FileCtor = typeof globalThis !== 'undefined' ? (globalThis as { File?: typeof File }).File : undefined

const credentialSchema = z.custom<File>((value) => {
  if (!value) return false
  if (FileCtor && !(value instanceof FileCtor)) return false
  const candidate = value as File
  if (typeof candidate.size !== 'number' || typeof candidate.type !== 'string') return false
  if (candidate.size > 10 * 1024 * 1024) return false
  return candidate.type.startsWith('image/') || candidate.type === 'application/pdf'
}, { message: 'Upload an image or PDF under 10MB' })

const statusSchema = z.object({
  category: z.string().min(2, 'Select a status category'),
  issuer: z.string().min(3, 'Provide the issuing organisation or partner'),
  referenceCode: z.string().optional(),
  credentialFile: credentialSchema
})

type StatusFormValues = z.infer<typeof statusSchema>

const steps = [
  {
    id: 1,
    title: 'Select verification path',
    description: 'Choose the status you wish to confirm, such as student, volunteer, or cooperative member.',
    icon: Users
  },
  {
    id: 2,
    title: 'Upload credential proof',
    description: 'Provide a secure scan of your ID, institutional letter, or partner-issued QR.',
    icon: FileSearch
  },
  {
    id: 3,
    title: 'AI-assisted review',
    description: 'Elder AI cross-checks authenticity with DRP partners and risk models.',
    icon: ShieldAlert
  },
  {
    id: 4,
    title: 'Eligible for $RIGHTS',
    description: 'Upon success, you receive governance weight and access to council proposals.',
    icon: ShieldCheck
  }
]

export function StatusVerificationWizard() {
  const mutation = usePoST()
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<StatusFormValues>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      category: 'citizen'
    }
  })

  const nextStep = () => setCurrentStep((step) => Math.min(step + 1, steps.length))
  const prevStep = () => setCurrentStep((step) => Math.max(step - 1, 1))

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
    setCurrentStep(steps.length)
  })

  return (
    <div className="space-y-6">
      <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step) => {
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id || mutation.isSuccess
          return (
            <li
              key={step.id}
              className={cn(
                'rounded-2xl border border-neutral-200/80 bg-white/90 p-5 transition dark:border-neutral-800/70 dark:bg-neutral-900/60',
                isActive && 'border-primary-500/60 bg-primary-500/5',
                isCompleted && 'border-green-500/60 bg-green-500/10'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-200">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{step.title}</p>
              </div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{step.description}</p>
              {isCompleted && <CheckCircle2 className="mt-3 h-5 w-5 text-green-500" />}
            </li>
          )
        })}
      </ol>

      <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        {currentStep === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Verification category</label>
              <select
                {...form.register('category')}
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950"
              >
                <option value="citizen">Citizen / Resident</option>
                <option value="student">Student</option>
                <option value="farmer">Farmer</option>
                <option value="ngo">NGO Partner</option>
                <option value="cooperative">Cooperative Member</option>
              </select>
              {form.formState.errors.category && (
                <p className="text-xs text-red-500">{form.formState.errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Issuing organisation</label>
              <input
                {...form.register('issuer')}
                placeholder="Global Rights Cooperative"
                className={cn(
                  'w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950',
                  form.formState.errors.issuer && 'border-red-400 focus:ring-red-200'
                )}
              />
              {form.formState.errors.issuer && <p className="text-xs text-red-500">{form.formState.errors.issuer.message}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <Controller
            control={form.control}
            name="credentialFile"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Credential file</label>
                <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-600 transition hover:border-primary-400 hover:bg-primary-50/40 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-300">
                  <FileSearch className="h-8 w-8" />
                  <div className="text-center text-sm">
                    <p className="font-medium">Upload documentation</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">PDF or image up to 10MB.</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (file) field.onChange(file)
                    }}
                  />
                </label>
                {form.formState.errors.credentialFile && (
                  <p className="text-xs text-red-500">{form.formState.errors.credentialFile.message}</p>
                )}
              </div>
            )}
          />
        )}

        {currentStep === 3 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Reference or partner code (optional)</label>
            <input
              {...form.register('referenceCode')}
              placeholder="DRP-POC-4582"
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Enter a code issued by your institution to speed up AI verification.
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div>
            {mutation.isError && (
              <p className="text-sm text-red-500">
                {mutation.error instanceof Error ? mutation.error.message : 'Verification failed. Please retry.'}
              </p>
            )}
            {mutation.isSuccess && (
              <p className="text-sm text-green-600 dark:text-green-300">
                Status verified! Governance access will unlock once on-chain confirmation finalises.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Back
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900"
              >
                Continue
              </button>
            )}
            {currentStep >= 3 && (
              <button
                type="submit"
                disabled={mutation.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit for review
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
