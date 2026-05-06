// 'use client'

// import { useState } from 'react'
// import AddContentForm from './AddContentForm'
// import AddImageForm from './AddImageForm'
// import AddPreferencesForm from './AddPreferencesForm'
// import { Check } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'

// // ✅ Defined inline — no external import needed
// export type FormDataType = {
//   title: string
//   blogUrl: string
//   photoUrl: string
//   platforms: string[]
//   tone: string
//   audience: string[]
//   keywords: string[]
// }

// type StepId = 1 | 2 | 3

// const STEPS: { id: StepId; label: string }[] = [
//   { id: 1, label: 'Content' },
//   { id: 2, label: 'Media' },
//   { id: 3, label: 'Preferences' },
// ]

// const INITIAL_FORM_DATA: FormDataType = {
//   title: '',
//   blogUrl: '',
//   photoUrl: '',
//   platforms: [],
//   tone: '',
//   audience: [],
//   keywords: [],
// }

// const CreatePostForm = () => {
//   const [currentStep, setCurrentStep] = useState<StepId>(1)
//   const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA)

//   const goNext = () => setCurrentStep((prev) => (prev < 3 ? ((prev + 1) as StepId) : prev))

//   const goBack = () => setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as StepId) : prev))

//   const stepComponents: Record<StepId, React.ReactNode> = {
//     1: <AddContentForm formData={formData} setFormData={setFormData} onNext={goNext} />,
//     2: (
//       <AddImageForm formData={formData} setFormData={setFormData} onNext={goNext} onBack={goBack} />
//     ),
//     3: <AddPreferencesForm formData={formData} setFormData={setFormData} onBack={goBack} />,
//   }

//   return (
//     <div className="mx-auto w-full max-w-5xl pb-6">
//       {/* Stepper */}
//       <div className="mb-6 flex items-center justify-center">
//         {STEPS.map((step, i) => {
//           const isCompleted = step.id < currentStep
//           const isActive = step.id === currentStep

//           return (
//             <div key={step.id} className="flex items-center">
//               <div className="flex flex-col items-center gap-1">
//                 <div
//                   className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
//                     isCompleted
//                       ? 'border-teal-500 bg-teal-500 text-white'
//                       : isActive
//                         ? 'border-teal-500 bg-teal-500/10 text-teal-400'
//                         : 'border-slate-600 bg-slate-800 text-slate-500'
//                   }`}
//                 >
//                   {isCompleted ? <Check className="h-4 w-4" /> : step.id}
//                 </div>
//                 <span
//                   className={`text-xs font-medium ${
//                     isActive ? 'text-teal-400' : isCompleted ? 'text-teal-500' : 'text-slate-500'
//                   }`}
//                 >
//                   {step.label}
//                 </span>
//               </div>

//               {i < STEPS.length - 1 && (
//                 <div
//                   className={`mx-3 mb-4 h-px w-16 transition-all duration-500 ${
//                     isCompleted ? 'bg-teal-500' : 'bg-slate-700'
//                   }`}
//                 />
//               )}
//             </div>
//           )
//         })}
//       </div>

//       {/* Step Content */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentStep}
//           layout
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -12 }}
//           transition={{ duration: 0.2 }}
//           className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6"
//         >
//           {stepComponents[currentStep]}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   )
// }

// export default CreatePostForm

'use client'

import { useState } from 'react'
import AddContentForm from './AddContentForm'
import AddImageForm from './AddImageForm'
import AddPreferencesForm from './AddPreferencesForm'
import { Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const STEPS: { id: StepId; label: string; description: string }[] = [
  { id: 1, label: 'Content',     description: 'Add your source' },
  { id: 2, label: 'Media',       description: 'Attach visuals'  },
  { id: 3, label: 'Preferences', description: 'Tune the output' },
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
    2: <AddImageForm formData={formData} setFormData={setFormData} onNext={goNext} onBack={goBack} />,
    3: <AddPreferencesForm formData={formData} setFormData={setFormData} onBack={goBack} />,
  }

  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="mx-auto w-full max-w-5xl pb-6">

      {/* ── Stepper ─────────────────────────────────────────────────── */}
      <div className="mb-10">

        {/* Step count + percentage — centered */}
        <div className="mb-5 flex items-center justify-center gap-2">
          <span className="text-sm font-semibold text-slate-300">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span className="text-sm font-medium text-teal-500">
            {Math.round(progressPercent)}% complete
          </span>
        </div>

        {/* Step nodes + connectors — centered as one unit */}
        <div className="flex items-start justify-center">
          {STEPS.map((step, i) => {
            const isCompleted = step.id < currentStep
            const isActive    = step.id === currentStep
            const isLast      = i === STEPS.length - 1

            return (
              <div key={step.id} className="flex items-start">

                {/* Node */}
                <div className="flex flex-col items-center gap-2.5">

                  {/* Circle */}
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
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                        isCompleted
                          ? 'border-teal-500 bg-teal-500 text-white'
                          : isActive
                            ? 'border-teal-400 bg-slate-900 text-teal-400 shadow-[0_0_16px_rgba(45,212,191,0.4)]'
                            : 'border-slate-600 bg-slate-800 text-slate-500'
                      }`}
                      animate={isCompleted ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                      transition={{ duration: 0.28 }}
                    >
                      {isCompleted
                        ? <Check className="h-4 w-4 stroke-[2.5]" />
                        : <span>{step.id}</span>
                      }
                    </motion.div>
                  </div>

                  {/* Label + description */}
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className={`text-sm font-semibold leading-none transition-colors duration-300 ${
                      isActive ? 'text-teal-400' : isCompleted ? 'text-teal-500' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </span>
                    <span className={`text-xs leading-none transition-colors duration-300 ${
                      isActive ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {step.description}
                    </span>
                  </div>
                </div>

                {/* Connector between nodes */}
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6"
        >
          {stepComponents[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CreatePostForm