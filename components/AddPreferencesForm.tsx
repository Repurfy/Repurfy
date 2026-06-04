'use client'

import { Button } from './ui/button'
import { Linkedin, Instagram, Twitter, Facebook, Sparkles, X, Plus, Lock, Wand2 } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useState, useRef, KeyboardEvent, useEffect } from 'react'
import GeneratingLoader from './GeneratingLoader'
import { useUser } from '@/context/userContext'

import { FormDataType } from './CreatePostForm'

interface Payload {
  title?: string
  platforms: string[]
  tone: string
  emotion: string
  contentLength: 'short' | 'medium' | 'long'
  audience: string[]
  keywords: string[]
  cta?: string
  blogUrl?: string
  imageUrl?: string | null
}

interface Props {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  onBack: () => void
  isPaid?: boolean
}

// Badge shown when a field is pre-filled from saved brand defaults
const DefaultBadge = () => (
  <span className="inline-flex items-center gap-0.5 rounded-md border border-teal-500/25 bg-teal-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-teal-400">
    <Wand2 className="h-2 w-2" />
    Default
  </span>
)

const PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-400', activeColor: 'border-blue-500 bg-blue-500/10' },
  { id: 'twitter', label: 'X (Twitter)', icon: Twitter, color: 'text-slate-300', activeColor: 'border-slate-400 bg-slate-400/10' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-400', activeColor: 'border-pink-500 bg-pink-500/10' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-500', activeColor: 'border-blue-600 bg-blue-600/10' },
]

const TONES = [
  { value: 'professional', label: 'Professional', emoji: '💼' },
  { value: 'casual', label: 'Casual', emoji: '😊' },
  { value: 'bold', label: 'Bold', emoji: '🔥' },
  { value: 'friendly', label: 'Friendly', emoji: '👋' },
  { value: 'witty', label: 'Witty', emoji: '😄' },
  { value: 'authoritative', label: 'Authoritative', emoji: '📢' },
]

const EMOTIONS = [
  { value: 'curiosity', label: 'Curiosity', emoji: '🤔' },
  { value: 'inspiration', label: 'Inspiration', emoji: '✨' },
  { value: 'urgency', label: 'Urgency', emoji: '⚡' },
  { value: 'humor', label: 'Humor', emoji: '😂' },
  { value: 'fear', label: 'Fear / FOMO', emoji: '😨' },
  { value: 'surprise', label: 'Surprise', emoji: '🤯' },
  { value: 'anger', label: 'Provocation', emoji: '😤' },
  { value: 'empathy', label: 'Empathy', emoji: '🤝' },
]

const LENGTH_OPTIONS = [
  {
    value: 'short' as const,
    label: 'Short',
    emoji: '⚡',
    description: 'Punchy & concise',
    detail: 'Twitter-style brevity across all platforms',
  },
  {
    value: 'medium' as const,
    label: 'Medium',
    emoji: '📝',
    description: 'Balanced & complete',
    detail: 'Standard post length, best engagement',
  },
  {
    value: 'long' as const,
    label: 'Long',
    emoji: '📖',
    description: 'In-depth & detailed',
    detail: 'Maximum depth for thought leadership',
  },
]

const EMPTY_FORM: FormDataType = {
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

const TagInput = ({
  tags,
  onAdd,
  onRemove,
  placeholder,
  color = 'teal',
}: {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
  placeholder: string
  color?: 'teal' | 'violet'
}) => {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const colorMap = {
    teal: {
      tag: 'bg-teal-500/15 text-teal-300 ring-1 ring-teal-500/30',
      remove: 'hover:text-teal-100',
      border: 'focus-within:border-teal-500/60 focus-within:ring-teal-500/10',
    },
    violet: {
      tag: 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30',
      remove: 'hover:text-violet-100',
      border: 'focus-within:border-violet-500/60 focus-within:ring-violet-500/10',
    },
  }

  const c = colorMap[color]

  const addTag = (raw: string) => {
    const parts = raw.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
    parts.forEach((part) => {
      if (!tags.includes(part)) onAdd(part)
    })
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (input.trim()) addTag(input)
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onRemove(tags[tags.length - 1])
    }
  }

  return (
    <div
      className={`flex min-h-[46px] w-full cursor-text flex-wrap items-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2.5 transition-all focus-within:ring-2 ${c.border}`}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${c.tag}`}
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(tag) }}
            className={`ml-0.5 text-current opacity-60 transition-opacity ${c.remove} hover:opacity-100`}
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (input.trim()) addTag(input) }}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="min-w-[120px] flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
      />
    </div>
  )
}

const AddPreferencesForm = ({ onBack, formData, setFormData, isPaid = false }: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { getToken } = useAuth()
  const router = useRouter()
  const { userData } = useUser()
  const bd = userData?.brandDefaults

  // Track which fields are still matching the saved defaults (i.e. not yet overridden)
  const toneIsDefault     = !!bd?.tone         && formData.tone     === bd.tone
  const audienceIsDefault = !!bd?.audience?.length && JSON.stringify(formData.audience) === JSON.stringify(bd.audience)
  const keywordsIsDefault = !!bd?.keywords?.length && JSON.stringify(formData.keywords) === JSON.stringify(bd.keywords)
  const ctaIsDefault      = !!bd?.defaultCta   && formData.cta      === bd.defaultCta

  useEffect(() => {
    if (!isPaid) {
      if (formData.contentLength !== 'medium' || (formData.emotion && formData.emotion !== 'curiosity')) {
        setFormData((prev) => ({
          ...prev,
          contentLength: 'medium',
          emotion: 'curiosity',
        }))
      }
    }
  }, [isPaid, formData.contentLength, formData.emotion, setFormData])

  const { platforms: selectedPlatforms, tone, emotion, contentLength } = formData

  const togglePlatform = (id: string) =>
    setFormData((p) => ({
      ...p,
      platforms: p.platforms.includes(id)
        ? p.platforms.filter((x) => x !== id)
        : [...p.platforms, id],
    }))

  const addAudience = (tag: string) => setFormData((p) => ({ ...p, audience: [...p.audience, tag] }))
  const removeAudience = (tag: string) => setFormData((p) => ({ ...p, audience: p.audience.filter((a) => a !== tag) }))
  const addKeyword = (tag: string) => setFormData((p) => ({ ...p, keywords: [...p.keywords, tag] }))
  const removeKeyword = (tag: string) => setFormData((p) => ({ ...p, keywords: p.keywords.filter((k) => k !== tag) }))

  const sendData = async () => {
    try {
      setIsGenerating(true)
      setError(null)

      const token = await getToken()

      const payload: Payload = {
        platforms: formData.platforms,
        tone: formData.tone || 'professional',
        emotion: formData.emotion || 'curiosity',
        contentLength: formData.contentLength || 'medium',
        audience: Array.isArray(formData.audience) ? formData.audience : [],
        keywords: Array.isArray(formData.keywords) ? formData.keywords : [],
        cta: formData.cta?.trim() || undefined,
        imageUrl: formData.photoUrl ?? null,
      }

      if (formData.blogUrl?.trim()) {
        payload.blogUrl = formData.blogUrl.trim()
      } else {
        payload.title = formData.title
      }

      console.log('[Debug] Sending payload:', payload)

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/generate`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          timeout: 120000,
        }
      )

      console.log('[Debug] Full API response:', res.data)

      if (!res.data.success) {
        throw new Error(res.data.message || 'Generation failed on server')
      }

      if (!res.data.contentId) {
        console.error('❌ No contentId in response:', res.data)
        throw new Error('Server did not return a content ID. Please try again.')
      }

      sessionStorage.setItem(
        'generatedContent',
        JSON.stringify({
          contentId: res.data.contentId,
          creditsRemaining: res.data.creditsRemaining,
          imageUrl: res.data.imageUrl ?? null,
          data: res.data.data,
        })
      )

      setFormData(EMPTY_FORM)
      router.push(`/results/${res.data.contentId}`)
    } catch (err: unknown) {
      setIsGenerating(false)

      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        const serverMessage = err.response?.data?.message || err.message

        console.error('❌ Status:', status, '| Message:', serverMessage)

        if (status === 402) {
          setError('Not enough credits. Please upgrade your plan.')
        } else if (status === 401) {
          setError('Session expired. Please refresh the page and try again.')
        } else if (status === 422) {
          setError(serverMessage || 'Could not extract content from the URL. Try a different URL or paste the content manually.')
        } else if (status === 429) {
          setError('Too many requests. Please wait a moment and try again.')
        } else if (err.code === 'ECONNABORTED') {
          setError('The request timed out. AI generation took too long — please try again.')
        } else {
          setError(serverMessage || 'Something went wrong. Please try again.')
        }
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
  }

  const hasContent = formData.title.trim().length > 0 || formData.blogUrl.trim().length > 0
  const isValid = selectedPlatforms.length > 0 && formData.audience.length > 0 && hasContent

  if (isGenerating) return <GeneratingLoader />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 ring-1 ring-teal-500/20">
          <Sparkles className="h-5 w-5 text-teal-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Customize & Generate</h2>
          <p className="text-xs text-slate-400">Choose platforms and tune the output to your style</p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <span className="mt-px shrink-0">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Section: Platforms */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Platforms <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PLATFORMS.map(({ id, label, icon: Icon, color, activeColor }) => {
            const active = selectedPlatforms.includes(id)
            return (
              <button
                key={id}
                onClick={() => togglePlatform(id)}
                className={`cursor-pointer group relative flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 transition-all duration-200 ${active
                  ? `${activeColor} shadow-sm`
                  : 'border-slate-700/60 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
              >
                <Icon className={`h-5 w-5 ${active ? color : ''} transition-colors`} />
                <span className={`text-xs font-medium ${active ? 'text-white' : ''}`}>{label}</span>
                {active && (
                  <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal-500 text-[8px] font-bold text-white">
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Section: Content Length */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Content Length
        </label>
        <div className="grid grid-cols-3 gap-2">
          {LENGTH_OPTIONS.map((opt) => {
            const active = contentLength === opt.value
            const locked = !isPaid && opt.value !== 'medium'
            return (
              <button
                key={opt.value}
                type="button"
                disabled={locked}
                onClick={() => {
                  if (locked) return
                  setFormData((p) => ({ ...p, contentLength: opt.value }))
                }}
                className={`cursor-pointer flex flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center transition-all duration-200 relative ${active
                  ? 'border-teal-500 bg-teal-500/10 shadow-sm shadow-teal-500/10 text-white font-medium'
                  : locked
                    ? 'border-slate-800/40 bg-slate-900/10 text-slate-600 cursor-not-allowed opacity-50'
                    : 'border-slate-700/60 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60'
                  }`}
              >
                {locked && (
                  <div className="absolute right-1.5 top-1.5 text-slate-600">
                    <Lock className="h-3 w-3" />
                  </div>
                )}
                <span className="text-lg">{opt.emoji}</span>
                <span className="text-sm font-semibold">{opt.label}</span>
                <span className={`text-[10px] leading-tight ${active ? 'text-teal-300' : 'text-slate-500'}`}>
                  {locked ? 'Premium' : opt.description}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Section: Tone + Emotion */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Brand Tone
            {toneIsDefault && <DefaultBadge />}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => {
              const active = t.value === tone
              return (
                <button
                  key={t.value}
                  onClick={() => setFormData((p) => ({ ...p, tone: t.value }))}
                  className={`cursor-pointer flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 ${active
                    ? 'border-teal-500 bg-teal-500/10 text-white'
                    : 'border-slate-700/60 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                >
                  <span>{t.emoji}</span>
                  <span className="text-xs font-medium">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Emotion to Trigger
          </label>
          <div className="grid grid-cols-2 gap-2">
            {EMOTIONS.map((e) => {
              const active = e.value === emotion
              const locked = !isPaid && e.value !== 'curiosity'
              return (
                <button
                  key={e.value}
                  type="button"
                  disabled={locked}
                  onClick={() => {
                    if (locked) return
                    setFormData((p) => ({ ...p, emotion: e.value }))
                  }}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 relative 
                    ${active
                      ? 'border-violet-500 bg-violet-500/10 text-white font-medium cursor-pointer'
                      : locked
                        ? 'border-slate-800/40 bg-slate-900/10 text-slate-600 cursor-not-allowed opacity-50'
                        : 'border-slate-700/60 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60'
                    }`}
                >
                  {locked && (
                    <div className="absolute right-1.5 top-1.5 text-slate-600">
                      <Lock className="h-2.5 w-2.5" />
                    </div>
                  )}
                  <span>{e.emoji}</span>
                  <span className="text-xs font-medium">{e.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Section: Target Audience */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-2">
            Target Audience <span className="text-red-400">*</span>
            {audienceIsDefault && <DefaultBadge />}
          </span>
          <span className="text-[10px] normal-case tracking-normal text-slate-600">Press Enter or comma to add</span>
        </label>
        <TagInput
          tags={formData.audience}
          onAdd={addAudience}
          onRemove={removeAudience}
          placeholder="e.g., Tech founders, Marketers, Developers…"
          color="teal"
        />
        {formData.audience.length === 0 && (
          <p className="text-[11px] text-slate-600">Tip: Be specific — "SaaS founders" works better than "entrepreneurs"</p>
        )}
      </div>

      {/* Section: Keywords */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-2">
            Keywords
            {keywordsIsDefault && <DefaultBadge />}
          </span>
          <span className="text-[10px] normal-case tracking-normal text-slate-600">Optional · Press Enter or comma to add</span>
        </label>
        <TagInput
          tags={formData.keywords}
          onAdd={addKeyword}
          onRemove={removeKeyword}
          placeholder="e.g., AI, productivity, growth hacking…"
          color="violet"
        />
      </div>

      {/* Section: CTA */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-2">
            Call to Action
            {ctaIsDefault && <DefaultBadge />}
          </span>
          <span className="ml-auto text-[10px] normal-case tracking-normal text-slate-600">Optional</span>
        </label>
        <input
          type="text"
          value={formData.cta}
          onChange={(e) => setFormData((p) => ({ ...p, cta: e.target.value }))}
          placeholder="e.g., Follow for more insights · DM me to collaborate · Link in bio"
          className="w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/10"
        />
        <p className="text-[11px] text-slate-600">This exact phrase will be woven into the end of each post</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          ← Back
        </Button>
        <Button
          onClick={sendData}
          disabled={!isValid}
          className="bg-brand-gradient px-6 font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Sparkles className="mr-1.5 h-4 w-4" />
          Generate for {selectedPlatforms.length} Platform
          {selectedPlatforms.length !== 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  )
}

export default AddPreferencesForm