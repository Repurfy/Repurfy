'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import AddContentForm from './AddContentForm'
import AddImageForm from './AddImageForm'
import AddPreferencesForm from './AddPreferencesForm'
import { Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/context/userContext'

export type FormDataType = {
  title: string
  blogUrl: string
  photoUrl: string
  platforms: string[]
  tone: string
  emotion: string
  contentLength: 'short' | 'medium' | 'long'
  audience: string[]
  keywords: string[]
  cta: string
}

type StepId = 1 | 2 | 3

const STEPS: { id: StepId; label: string; description: string }[] = [
  { id: 1, label: 'Content', description: 'Add your source' },
  { id: 2, label: 'Media', description: 'Attach visuals' },
  { id: 3, label: 'Preferences', description: 'Tune the output' },
]

const INITIAL_FORM_DATA: FormDataType = {
  title: '',
  blogUrl: '',
  photoUrl: '',
  platforms: [],
  tone: '',
  emotion: '',
  contentLength: 'medium',
  audience: [],
  keywords: [],
  cta: '',
}

const CreatePostForm = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(1)
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA)
  const [contentMode, setContentMode] = useState<'text' | 'url'>('text')

  const { userData } = useUser()
  const isPaid = userData?.plan === 'creator' || userData?.plan === 'pro'

  // ── Step navigation — useCallback prevents stale closure issues ──────────
  // The step is set explicitly to avoid off-by-one when called rapidly
  const goToStep = useCallback((step: StepId) => {
    setCurrentStep(step)
  }, [])

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === 1) return 2
      if (prev === 2) return 3
      return prev
    })
  }, [])

  const goBack = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === 3) return 2
      if (prev === 2) return 1
      return prev
    })
  }, [])

  // ── Seed brand defaults (once, after userData loads from API) ─────────────
  // Using a ref prevents re-seeding if the component re-renders after userData updates
  const defaultsSeeded = useRef(false)
  useEffect(() => {
    if (defaultsSeeded.current) return          // already seeded — don't overwrite user changes
    if (!userData?.brandDefaults) return        // userData not loaded yet
    const bd = userData.brandDefaults
    const hasAnyDefault = bd.tone || bd.audience?.length || bd.keywords?.length
    if (!hasAnyDefault) return                  // user hasn't saved any defaults yet
    defaultsSeeded.current = true
    setFormData((prev) => ({
      ...prev,
      tone: bd.tone || prev.tone,
      audience: bd.audience?.length ? bd.audience : prev.audience,
      keywords: bd.keywords?.length ? bd.keywords : prev.keywords,
      cta: bd.defaultCta?.trim() || prev.cta,
    }))
  }, [userData]) // runs whenever userData changes until it has brandDefaults

  // ── Restore pre-fill data from Edit & Regenerate flow ──────────────────
  useEffect(() => {
    const raw = sessionStorage.getItem('editFormPrefill')
    if (!raw) return
    try {
      const prefill = JSON.parse(raw) as FormDataType & {
        _isEditSession?: boolean
        _contentMode?: 'text' | 'url'
      }
      sessionStorage.removeItem('editFormPrefill')
      const { _isEditSession: _session, _contentMode, ...formFields } = prefill
      defaultsSeeded.current = true // treat edit-prefill as the seed so defaults don't override it
      setFormData((prev) => ({ ...prev, ...formFields }))
      if (_contentMode) setContentMode(_contentMode)
    } catch {
      // Ignore invalid data
    }
  }, [])

  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="mx-auto w-full max-w-5xl pb-6">

      {/* ── Stepper ─────────────────────────────────────────────────── */}
      <div className="mb-10">

        {/* Step count + percentage */}
        <div className="mb-5 flex items-center justify-center gap-2">
          <span className="text-sm font-semibold text-slate-300">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span className="text-sm font-medium text-teal-500">
            {Math.round(progressPercent)}% complete
          </span>
        </div>

        {/* Step nodes + connectors */}
        <div className="flex items-start justify-center">
          {STEPS.map((step, i) => {
            const isCompleted = step.id < currentStep
            const isActive = step.id === currentStep
            const isLast = i === STEPS.length - 1

            return (
              <div key={step.id} className="flex items-start">

                {/* Node */}
                <div className="flex flex-col items-center gap-2.5">

                  {/* Circle — clickable for completed steps */}
                  <div className="relative flex items-center justify-center">
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-teal-500/20"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: 2, opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}

                    <motion.div
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${isCompleted
                          ? 'cursor-pointer border-teal-500 bg-teal-500 text-white hover:bg-teal-600'
                          : isActive
                            ? 'border-teal-400 bg-slate-900 text-teal-400 shadow-[0_0_16px_rgba(45,212,191,0.4)]'
                            : 'border-slate-600 bg-slate-800 text-slate-500'
                        }`}
                      animate={isCompleted ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                      transition={{ duration: 0.28 }}
                      onClick={() => isCompleted && goToStep(step.id)}
                    >
                      {isCompleted
                        ? <Check className="h-4 w-4 stroke-[2.5]" />
                        : <span>{step.id}</span>
                      }
                    </motion.div>
                  </div>

                  {/* Label + description */}
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className={`text-sm font-semibold leading-none transition-colors duration-300 ${isActive ? 'text-teal-400' : isCompleted ? 'text-teal-500' : 'text-slate-500'
                      }`}>
                      {step.label}
                    </span>
                    <span className={`text-xs leading-none transition-colors duration-300 ${isActive ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                      {step.description}
                    </span>
                  </div>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div className="relative mx-3 mt-[18px] h-0.5 w-20 shrink-0 sm:w-28 md:w-36">
                    <div className="h-full w-full rounded-full bg-slate-700" />
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                      initial={false}
                      animate={{ width: isCompleted ? '100%' : '0%' }}
                      transition={{ duration: 0.45, ease: 'easeInOut' }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Step Content ─────────────────────────────────────────────── */}
      {/*
        IMPORTANT: Each step is rendered conditionally (NOT via a Record/object map)
        to prevent React from instantiating all steps simultaneously.
        This is what caused the "jump to step 3" bug — when the Record object
        was built, all child components were mounted, and state changes in step 1
        could trigger effects in step 2 components that called onNext().
      */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 backdrop-blur-sm"
        >
          {currentStep === 1 && (
            <AddContentForm
              formData={formData}
              setFormData={setFormData}
              onNext={goNext}
              mode={contentMode}
              setMode={setContentMode}
              isPaid={isPaid}
            />
          )}
          {currentStep === 2 && (
            <AddImageForm
              formData={formData}
              setFormData={setFormData}
              onNext={goNext}
              onBack={goBack}
              isPaid={isPaid}
            />
          )}
          {currentStep === 3 && (
            <AddPreferencesForm
              formData={formData}
              setFormData={setFormData}
              onBack={goBack}
              isPaid={isPaid}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CreatePostForm