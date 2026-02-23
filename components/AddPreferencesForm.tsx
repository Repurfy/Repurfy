// 'use client'

// import { Button } from './ui/button'
// import { Linkedin, Instagram, Twitter, Facebook, Sparkles } from 'lucide-react'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '@clerk/nextjs'
// import { useState } from 'react'
// import GeneratingLoader from './GeneratingLoader'

// interface FormDataType {
//   title: string
//   blogUrl: string
//   photoUrl: string
//   platforms: string[]
//   tone: string
//   audience: string
//   keywords: string[]
// }

// interface Payload {
//   title: string
//   platforms: string[]
//   tone: string
//   audience: string
//   keywords: string[]
//   blogUrl?: string
// }

// interface Props {
//   formData: FormDataType
//   setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
//   onBack: () => void
// }

// const PLATFORMS = [
//   { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
//   { id: 'twitter', label: 'X (Twitter)', icon: Twitter },
//   { id: 'instagram', label: 'Instagram', icon: Instagram },
//   { id: 'facebook', label: 'Facebook', icon: Facebook },
// ]

// const BRAND_TONES = [
//   { value: 'professional', label: 'Professional', desc: 'Formal and business-focused' },
//   { value: 'casual', label: 'Casual', desc: 'Friendly and conversational' },
//   { value: 'bold', label: 'Bold', desc: 'Confident and impactful' },
//   { value: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
// ]

// const EMPTY_FORM: FormDataType = {
//   title: '',
//   blogUrl: '',
//   photoUrl: '',
//   platforms: [],
//   tone: '',
//   audience: '',
//   keywords: [],
// }

// const AddPreferencesForm = ({ onBack, formData, setFormData }: Props) => {
//   const [isGenerating, setIsGenerating] = useState(false)
//   const { getToken } = useAuth()

//   const { platforms: selectedPlatforms, tone, audience, keywords } = formData
//   const router = useRouter()

//   const togglePlatform = (id: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       platforms: prev.platforms.includes(id)
//         ? prev.platforms.filter((p) => p !== id)
//         : [...prev.platforms, id],
//     }))
//   }

//   const selectBrandTone = (toneValue: string) => {
//     setFormData((prev) => ({ ...prev, tone: toneValue }))
//   }

//   const handleTargetAudience = (value: string) => {
//     setFormData((prev) => ({ ...prev, audience: value }))
//   }

//   const handleKeywords = (value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       keywords: value
//         .split(',')
//         .map((k) => k.trim())
//         .filter(Boolean),
//     }))
//   }

//   const sendData = async () => {
//     try {
//       setIsGenerating(true)
//       const token = await getToken()
//       const payload: Payload = {
//         title: formData.title,
//         platforms: formData.platforms,
//         tone: formData.tone,
//         audience: formData.audience,
//         keywords: formData.keywords,
//       }

//       if (formData.blogUrl?.trim()) {
//         payload.blogUrl = formData.blogUrl
//       }

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/generate`,
//         payload,
//         { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
//       )

//       console.log(res)
//       console.log(res.data.contentId)
//       // Store result in sessionStorage and navigate to results page
//       sessionStorage.setItem('generatedContent', JSON.stringify(res.data))
//       setFormData(EMPTY_FORM)
//       router.push(`/results/${res.data?.contentId}`)
//     } catch (err: unknown) {
//       setIsGenerating(false)
//       if (axios.isAxiosError(err)) {
//         console.error('❌ ERROR:', err.response?.data || err.message)
//       } else {
//         console.error('❌ Unexpected error:', err)
//       }
//     }
//   }

//   if (isGenerating) {
//     return <GeneratingLoader />
//   }

//   const handleGenerate = () => {
//     if (selectedPlatforms.length === 0) return
//     sendData()
//   }

//   return (
//     <div className="border-border-subtle w-full rounded-2xl p-5 sm:p-6 dark:border-slate-700/60 dark:bg-slate-800/60">
//       {/* Header */}
//       <div className="mb-6 text-center sm:text-left">
//         <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
//           <Sparkles className="text-brand-teal h-7 w-7" />
//           <h2 className="text-text-primary text-xl font-semibold dark:text-white">
//             Customize & Generate
//           </h2>
//         </div>
//         <p className="text-text-secondary text-sm dark:text-slate-400">
//           Select platforms and add optional preferences
//         </p>
//       </div>

//       {/* Platforms */}
//       <div className="mb-6">
//         <p className="text-text-primary mb-3 font-semibold dark:text-white">Select Platforms</p>
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//           {PLATFORMS.map(({ id, label, icon: Icon }) => {
//             const active = selectedPlatforms.includes(id)
//             return (
//               <button
//                 key={id}
//                 onClick={() => togglePlatform(id)}
//                 className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
//                   active
//                     ? 'border-brand-teal bg-brand-gradient/10 text-brand-teal'
//                     : 'border-border-subtle bg-surface-elevated text-text-secondary hover:text-text-primary dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400'
//                 }`}
//               >
//                 <div className="flex items-center gap-2">
//                   <Icon className="h-4 w-4" />
//                   {label}
//                 </div>
//                 {active && <span className="text-xs font-semibold">✓</span>}
//               </button>
//             )
//           })}
//         </div>
//       </div>

//       {/* Brand Tone */}
//       <div className="mb-6">
//         <p className="text-text-primary mb-3 font-semibold dark:text-white">Brand Tone</p>
//         <div className="mb-6 grid grid-cols-2 gap-3">
//           {BRAND_TONES.map((t) => {
//             const active = t.value === tone
//             return (
//               <button
//                 key={t.value}
//                 onClick={() => selectBrandTone(t.value)}
//                 className={`flex flex-col items-start rounded-lg border px-4 py-3 text-left transition-all ${
//                   active
//                     ? 'border-teal-400 bg-teal-50 dark:bg-teal-900/10'
//                     : 'border-border-subtle bg-surface-elevated hover:border-teal-300 dark:border-slate-700 dark:bg-slate-900/50'
//                 }`}
//               >
//                 <p
//                   className={`text-sm font-semibold ${active ? 'text-teal-500' : 'dark:text-white'}`}
//                 >
//                   {t.label}
//                 </p>
//                 <p className="text-text-secondary text-xs dark:text-slate-400">{t.desc}</p>
//               </button>
//             )
//           })}
//         </div>

//         {/* Target Audience */}
//         <div className="mb-6">
//           <p className="text-text-primary mb-2 text-sm font-semibold dark:text-white">
//             Target Audience
//           </p>
//           <input
//             value={audience}
//             onChange={(e) => handleTargetAudience(e.target.value)}
//             className="bg-surface-elevated border-border-subtle focus:ring-brand-teal w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white"
//             placeholder="e.g., Tech founders, Marketing professionals"
//           />
//         </div>

//         {/* Keywords / CTA */}
//         <div>
//           <p className="text-text-primary mb-2 text-sm font-semibold dark:text-white">
//             Keywords / CTA <span className="text-text-tertiary font-normal">(Optional)</span>
//           </p>
//           <input
//             value={keywords.join(', ')}
//             onChange={(e) => handleKeywords(e.target.value)}
//             className="bg-surface-elevated border-border-subtle focus:ring-brand-teal w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white"
//             placeholder="e.g., AI, productivity, sign up now"
//           />
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
//         <Button variant="outline" onClick={onBack}>
//           ← Back
//         </Button>
//         <Button onClick={handleGenerate} disabled={selectedPlatforms.length === 0}>
//           ✨ Generate for {selectedPlatforms.length} Platform
//           {selectedPlatforms.length !== 1 ? 's' : ''}
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default AddPreferencesForm

'use client'

import { Button } from './ui/button'
import { Linkedin, Instagram, Twitter, Facebook, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'
import GeneratingLoader from './GeneratingLoader'

interface FormDataType {
  title: string
  blogUrl: string
  photoUrl: string
  platforms: string[]
  tone: string
  audience: string
  keywords: string[]
}
interface Payload {
  title: string
  platforms: string[]
  tone: string
  audience: string
  keywords: string[]
  blogUrl?: string
}
interface Props {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  onBack: () => void
}

const PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-400' },
  { id: 'twitter', label: 'X (Twitter)', icon: Twitter, color: 'text-slate-300' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-400' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-500' },
]

const TONES = [
  { value: 'professional', label: 'Professional', emoji: '💼' },
  { value: 'casual', label: 'Casual', emoji: '😊' },
  { value: 'bold', label: 'Bold', emoji: '🔥' },
  { value: 'friendly', label: 'Friendly', emoji: '👋' },
]

const EMPTY_FORM: FormDataType = {
  title: '',
  blogUrl: '',
  photoUrl: '',
  platforms: [],
  tone: '',
  audience: '',
  keywords: [],
}

const AddPreferencesForm = ({ onBack, formData, setFormData }: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const { getToken } = useAuth()
  const router = useRouter()

  const { platforms: selectedPlatforms, tone, audience, keywords } = formData

  const togglePlatform = (id: string) =>
    setFormData((p) => ({
      ...p,
      platforms: p.platforms.includes(id)
        ? p.platforms.filter((x) => x !== id)
        : [...p.platforms, id],
    }))

  const sendData = async () => {
    try {
      setIsGenerating(true)
      const token = await getToken()
      const payload: Payload = {
        title: formData.title,
        platforms: formData.platforms,
        tone: formData.tone,
        audience: formData.audience,
        keywords: formData.keywords,
      }
      if (formData.blogUrl?.trim()) payload.blogUrl = formData.blogUrl

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/generate`,
        payload,
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      )
      sessionStorage.setItem('generatedContent', JSON.stringify(res.data))
      setFormData(EMPTY_FORM)
      router.push(`/results/${res.data?.contentId}`)
    } catch (err: unknown) {
      setIsGenerating(false)
      if (axios.isAxiosError(err)) console.error('❌ ERROR:', err.response?.data || err.message)
      else console.error('❌ Unexpected error:', err)
    }
  }

  if (isGenerating) return <GeneratingLoader />

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
          <Sparkles className="h-5 w-5 text-teal-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Customize & Generate</h2>
          <p className="text-xs text-slate-400">Choose platforms and set your preferences</p>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* LEFT — Platforms */}
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Platforms</p>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map(({ id, label, icon: Icon, color }) => {
              const active = selectedPlatforms.includes(id)
              return (
                <button
                  key={id}
                  onClick={() => togglePlatform(id)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? 'border-teal-500 bg-teal-500/10 text-white'
                      : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? color : ''}`} />
                  <span className="text-xs">{label}</span>
                  {active && <span className="ml-auto text-xs text-teal-400">✓</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT — Tone */}
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Brand Tone
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => {
              const active = t.value === tone
              return (
                <button
                  key={t.value}
                  onClick={() => setFormData((p) => ({ ...p, tone: t.value }))}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                    active
                      ? 'border-teal-500 bg-teal-500/10 text-white'
                      : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <span>{t.emoji}</span>
                  <span className="text-xs font-medium">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Audience + Keywords — side by side */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Target Audience
          </label>
          <input
            value={audience}
            onChange={(e) => setFormData((p) => ({ ...p, audience: e.target.value }))}
            placeholder="e.g., Tech founders, Marketers"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Keywords / CTA{' '}
            <span className="font-normal text-slate-500 normal-case">(optional)</span>
          </label>
          <input
            value={keywords.join(', ')}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                keywords: e.target.value
                  .split(',')
                  .map((k) => k.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="e.g., AI, productivity, sign up now"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-1">
        <Button
          variant="outline"
          onClick={onBack}
          className="rounded-lg border-slate-700 text-slate-300 hover:bg-slate-700"
        >
          ← Back
        </Button>
        <Button
          onClick={sendData}
          disabled={selectedPlatforms.length === 0}
          className="bg-brand-gradient hover:shadow-l rounded-lg font-semibold text-white shadow-md transition-all hover:scale-[1.02]"
        >
          ✨ Generate for {selectedPlatforms.length} Platform
          {selectedPlatforms.length !== 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  )
}

export default AddPreferencesForm
