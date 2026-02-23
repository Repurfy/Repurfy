'use client'

import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const STEPS = [
  'Analyzing your content...',
  'Crafting platform-specific posts...',
  'Adding hooks and hashtags...',
  'Polishing your content...',
  'Almost ready...',
]

const GeneratingLoader = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [dots, setDots] = useState('')

  // Cycle through steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length)
    }, 2000)
    return () => clearInterval(stepInterval)
  }, [])

  // Animate dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)
    return () => clearInterval(dotsInterval)
  }, [])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-slate-800/60 p-10 text-center">
      {/* Spinning ring */}
      <div className="relative mb-8 h-20 w-20">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-teal-400" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-teal-500/10" />
        <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-teal-400" />
      </div>

      {/* Title */}
      <h2 className="mb-2 text-2xl font-bold text-white">Creating your content{dots}</h2>

      {/* Animated step text */}
      <p className="mb-8 text-sm text-teal-400 transition-all duration-500">{STEPS[currentStep]}</p>

      {/* Progress bar */}
      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-700">
        <div className="h-full animate-[progress_10s_ease-in-out_forwards] rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
      </div>

      <p className="mt-4 text-xs text-slate-500">This usually takes 10–20 seconds</p>
    </div>
  )
}

export default GeneratingLoader
