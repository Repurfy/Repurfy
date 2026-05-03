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
  audience: string[]
  keywords: string[]
}

interface Payload {
  title: string
  platforms: string[]
  tone: string
  audience: string[]
  keywords: string[]
  blogUrl?: string
  imageUrl?: string | null
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
  audience: [],
  keywords: [],
}

const AddPreferencesForm = ({ onBack, formData, setFormData }: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const { getToken } = useAuth()
  const router = useRouter()

  const { platforms: selectedPlatforms, tone, audience, keywords } = formData

  // ✅ LOCAL INPUT STATE (FIX)
  const [audienceInput, setAudienceInput] = useState(
    Array.isArray(audience) ? audience.join(', ') : ''
  )

  const [keywordsInput, setKeywordsInput] = useState(
    Array.isArray(keywords) ? keywords.join(', ') : ''
  )

  const togglePlatform = (id: string) =>
    setFormData((p) => ({
      ...p,
      platforms: p.platforms.includes(id)
        ? p.platforms.filter((x) => x !== id)
        : [...p.platforms, id],
    }))

  // ✅ PARSE HELPER
  const parseInput = (value: string) =>
    value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0)

  const updateAudience = () => {
    setFormData((p) => ({
      ...p,
      audience: parseInput(audienceInput),
    }))
  }

  const updateKeywords = () => {
    setFormData((p) => ({
      ...p,
      keywords: parseInput(keywordsInput),
    }))
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'audience' | 'keywords'
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (type === 'audience') {
        updateAudience()
      } else {
        updateKeywords()
      }
    }
  }

  

  const sendData = async () => {
    try {
      setIsGenerating(true)
      const token = await getToken()
  
      const payload: Payload = {
        title: formData.title,
        platforms: formData.platforms,
        tone: formData.tone,
        audience: Array.isArray(formData.audience) ? formData.audience : [],
        keywords: Array.isArray(formData.keywords) ? formData.keywords : [],
        imageUrl: formData.photoUrl ?? null,
      }
  
      if (formData.blogUrl?.trim()) payload.blogUrl = formData.blogUrl
  
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/generate`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
  
      // ✅ Shape now matches exactly what the result page expects
      sessionStorage.setItem(
        'generatedContent',
        JSON.stringify({
          contentId: res.data.contentId,         // 👈 explicit, not spread
          creditsRemaining: res.data.creditsRemaining,
          imageUrl: res.data.imageUrl ?? null,
          data: res.data.data,                   // 👈 the actual generated posts object
        })
      )
  
      setFormData(EMPTY_FORM)
  
      // ✅ Guard: don't navigate if contentId is missing
      if (!res.data.contentId) {
        console.error('❌ No contentId in response:', res.data)
        throw new Error('Generation succeeded but contentId is missing')
      }
  
      router.push(`/results/${res.data.contentId}`)
  
    } catch (err: unknown) {
      setIsGenerating(false)
      if (axios.isAxiosError(err)) {
        console.error('❌ Status:', err.response?.status)
        console.error('❌ Data:', JSON.stringify(err.response?.data))
        console.error('❌ Message:', err.message)
      } else {
        console.error('❌ Unexpected error:', err)
      }
    }
  }

  const isValid = selectedPlatforms.length > 0 && formData.audience.length > 0

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

      {/* Platforms + Tone */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase">Platforms</p>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map(({ id, label, icon: Icon, color }) => {
              const active = selectedPlatforms.includes(id)
              return (
                <button
                  key={id}
                  onClick={() => togglePlatform(id)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all ${
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

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase">Brand Tone</p>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => {
              const active = t.value === tone
              return (
                <button
                  key={t.value}
                  onClick={() => setFormData((p) => ({ ...p, tone: t.value }))}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm ${
                    active
                      ? 'border-teal-500 bg-teal-500/10 text-white'
                      : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <span>{t.emoji}</span>
                  <span className="text-xs">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Audience + Keywords */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Audience */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase">Target Audience</label>
          <input
            value={audienceInput}
            onChange={(e) => setAudienceInput(e.target.value)}
            onBlur={updateAudience}
            onKeyDown={(e) => handleKeyDown(e, 'audience')}
            placeholder="e.g., Tech founders, Marketers"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none"
          />
        </div>

        {/* Keywords */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase">Keywords / CTA</label>
          <input
            value={keywordsInput}
            onChange={(e) => setKeywordsInput(e.target.value)}
            onBlur={updateKeywords}
            onKeyDown={(e) => handleKeyDown(e, 'keywords')}
            placeholder="e.g., AI, productivity, sign up now"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={sendData} disabled={!isValid} className="bg-brand-gradient text-white">
          ✨ Generate for {selectedPlatforms.length} Platform
          {selectedPlatforms.length !== 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  )
}

export default AddPreferencesForm
