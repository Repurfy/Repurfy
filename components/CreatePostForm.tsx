'use client'

import { useState } from 'react'
import AddContentForm from './AddContentForm'
import AddImageForm from './AddImageForm'
import AddPreferencesForm from './AddPreferencesForm'
import { Check } from 'lucide-react'

type StepId = 1 | 2 | 3

// 🔥 Proper form data type
interface FormDataType {
  title: string
  blogUrl: string
  photoUrl: string
  platforms: string[]
  tone: string
  audience: string
  keywords: string[]
}

const CreatePostForm = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(1)

  // ✅ Correct typing
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    blogUrl: '',
    photoUrl: '',
    platforms: [],
    tone: '',
    audience: '',
    keywords: [],
  })

  const goNext = () => {
    setCurrentStep((prev) => (prev < 3 ? ((prev + 1) as StepId) : prev))
  }

  const goBack = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as StepId) : prev))
  }

  const formSteps = [
    {
      id: 1,
      label: 'Add Content',
      component: <AddContentForm formData={formData} setFormData={setFormData} onNext={goNext} />,
    },
    {
      id: 2,
      label: 'Add Media',
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
      label: 'Add tone',
      component: (
        <AddPreferencesForm formData={formData} setFormData={setFormData} onBack={goBack} />
      ),
    },
  ]

  const activeStep = formSteps.find((step) => step.id === currentStep)

  return (
    <div className="w-full">
      {/* Stepper Header */}
      <div className="mb-8 flex w-full items-center justify-center gap-16">
        {formSteps.map((step) => {
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep

          return (
            <div key={step.id} className="relative flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg font-medium ${
                  isCompleted
                    ? 'bg-brand-teal border-brand-teal text-white'
                    : isActive
                      ? 'bg-brand-gradient border-brand-teal text-white'
                      : 'bg-bg-secondary border-border'
                }`}
              >
                {isCompleted ? <Check className="h-6 w-6" /> : step.id}
              </div>

              {/* Connector */}
              {step.id !== formSteps.length && (
                <div
                  className={`absolute top-1/2 left-14 h-0.5 w-14 -translate-y-1/2 ${
                    isCompleted ? 'bg-brand-teal' : 'bg-border'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        {activeStep?.component}
      </div>
    </div>
  )
}

export default CreatePostForm
