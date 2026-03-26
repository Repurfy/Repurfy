'use client'

import { useState } from 'react'
import AddContentForm from './AddContentForm'
import AddImageForm from './AddImageForm'
import AddPreferencesForm from './AddPreferencesForm'
import { Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FormDataType } from '../types/formTypes'

type StepId = 1 | 2 | 3

const STEPS = [
  { id: 1, label: 'Content' },
  { id: 2, label: 'Media' },
  { id: 3, label: 'Preferences' },
]

const CreatePostForm = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(1)
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    blogUrl: '',
    photoUrl: '',
    platforms: [],
    tone: '',
    audience: [],
    keywords: [],
  })

  const goNext = () => setCurrentStep((p) => (p < 3 ? ((p + 1) as StepId) : p))
  const goBack = () => setCurrentStep((p) => (p > 1 ? ((p - 1) as StepId) : p))

  const steps = [
    {
      id: 1,
      component: <AddContentForm formData={formData} setFormData={setFormData} onNext={goNext} />,
    },
    {
      id: 2,
      component: (
        <AddImageForm
          formData={formData}
          setFormData={setFormData}
          onNext={goNext}
          onBack={goBack}
        />
      ),
    },
    {
      id: 3,
      component: (
        <AddPreferencesForm formData={formData} setFormData={setFormData} onBack={goBack} />
      ),
    },
  ]

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
                  className={`text-xs font-medium ${isActive ? 'text-teal-400' : isCompleted ? 'text-teal-500' : 'text-slate-500'}`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-3 mb-4 h-px w-16 transition-all duration-500 ${isCompleted ? 'bg-teal-500' : 'bg-slate-700'}`}
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
          {steps.find((s) => s.id === currentStep)?.component}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CreatePostForm
