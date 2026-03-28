'use client'

import { useState } from 'react'
import AddContentForm from './AddContentForm'
import AddImageForm from './AddImageForm'
import AddPreferencesForm from './AddPreferencesForm'
import { Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ✅ Defined inline — no external import needed
export type FormDataType = {
  title: string
  blogUrl: string
  photoUrl: string
  platforms: string[]
  tone: string
  audience: string[]
  keywords: string[]
}

type StepId = 1 | 2 | 3

const STEPS: { id: StepId; label: string }[] = [
  { id: 1, label: 'Content' },
  { id: 2, label: 'Media' },
  { id: 3, label: 'Preferences' },
]

const INITIAL_FORM_DATA: FormDataType = {
  title: '',
  blogUrl: '',
  photoUrl: '',
  platforms: [],
  tone: '',
  audience: [],
  keywords: [],
}

const CreatePostForm = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(1)
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA)

  const goNext = () => setCurrentStep((prev) => (prev < 3 ? ((prev + 1) as StepId) : prev))

  const goBack = () => setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as StepId) : prev))

  const stepComponents: Record<StepId, React.ReactNode> = {
    1: <AddContentForm formData={formData} setFormData={setFormData} onNext={goNext} />,
    2: (
      <AddImageForm formData={formData} setFormData={setFormData} onNext={goNext} onBack={goBack} />
    ),
    3: <AddPreferencesForm formData={formData} setFormData={setFormData} onBack={goBack} />,
  }

  return (
    <div className="mx-auto w-full max-w-5xl pb-6">
      {/* Stepper */}
      <div className="mb-6 flex items-center justify-center">
        {STEPS.map((step, i) => {
          const isCompleted = step.id < currentStep
          const isActive = step.id === currentStep

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'border-teal-500 bg-teal-500 text-white'
                      : isActive
                        ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                        : 'border-slate-600 bg-slate-800 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive ? 'text-teal-400' : isCompleted ? 'text-teal-500' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  className={`mx-3 mb-4 h-px w-16 transition-all duration-500 ${
                    isCompleted ? 'bg-teal-500' : 'bg-slate-700'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6"
        >
          {stepComponents[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CreatePostForm
