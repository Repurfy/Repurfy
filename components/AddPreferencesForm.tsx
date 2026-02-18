import { useState } from 'react'
import { Button } from './ui/button'
import { Linkedin, Instagram, Twitter, Facebook, Sparkles, ChevronDown, Check } from 'lucide-react'
import axios from 'axios'

interface FormDataType {
  title: string
  blogUrl: string
  photoUrl: string
  platforms: string[]
  tone: string
  audience: string
  keywords: string[]
}

interface Props {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  onBack: () => void
}

const PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'twitter', label: 'X (Twitter)', icon: Twitter },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'facebook', label: 'Facebook', icon: Facebook },
]

const BRAND_TONES = [
  { value: 'professional', label: 'Professional', desc: 'Formal and business-focused' },
  { value: 'casual', label: 'Casual', desc: 'Friendly and conversational' },
  { value: 'bold', label: 'Bold', desc: 'Confident and impactful' },
  { value: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
]

const AddPreferencesForm = ({ onBack, formData, setFormData }: Props) => {
  const [brandToneOpen, setBrandToneOpen] = useState(false)

  const selectedPlatforms = formData.platforms

  // correct tone logic
  const brandTone = BRAND_TONES.find((t) => t.value === formData.tone) || BRAND_TONES[0]

  const audience = formData.audience
  const keywords = formData.keywords

  // toggle platform
  const togglePlatform = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(id)
        ? prev.platforms.filter((p) => p !== id)
        : [...prev.platforms, id],
    }))
  }

  // select tone
  const selectBrandTone = (toneValue: string) => {
    setFormData((prev) => ({
      ...prev,
      tone: toneValue,
    }))
    setBrandToneOpen(false)
  }

  const handleTargetAudience = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      audience: value,
    }))
  }

  const handleKeywords = (value: string) => {
    const arr = value
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0)

    setFormData((prev) => ({
      ...prev,
      keywords: arr,
    }))
  }

  const sendData = async () => {
    try {
      const payload: any = {
        title: formData.title,
        platforms: formData.platforms,
        tone: formData.tone,
        audience: formData.audience,
        keywords: formData.keywords,
      }

      // only send blogUrl if exists
      if (formData.blogUrl && formData.blogUrl.trim() !== '') {
        payload.blogUrl = formData.blogUrl
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/generate`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('✅ Response:', res.data)

      // 🔥 CLEAR FORM AFTER SUCCESS
      setFormData({
        title: '',
        blogUrl: '',
        photoUrl: '',
        platforms: [],
        tone: '',
        audience: '',
        keywords: [],
      })
    } catch (err: any) {
      console.log('❌ ERROR:', err?.response?.data || err.message)
    }
  }

  const handleGenerate = () => {
    console.log('🔥 FINAL FORM DATA →', formData)
    console.log('data send to server')
    sendData()
  }

  return (
    <div className="border-border-subtle w-full rounded-2xl p-5 sm:p-6 dark:border-slate-700/60 dark:bg-slate-800/60">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
          <Sparkles className="text-brand-teal h-7 w-7" />
          <h2 className="text-text-primary text-xl font-semibold dark:text-white">
            Customize & Generate
          </h2>
        </div>
        <p className="text-text-secondary text-sm dark:text-slate-400">
          Select platforms and add optional preferences
        </p>
      </div>

      {/* Platforms */}
      <div className="mb-6">
        <p className="text-text-primary mb-3 font-semibold dark:text-white">Select Platforms</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map(({ id, label, icon: Icon }) => {
            const active = selectedPlatforms.includes(id)

            return (
              <button
                key={id}
                onClick={() => togglePlatform(id)}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? 'border-brand-teal bg-brand-gradient/10 text-brand-teal'
                    : 'border-border-subtle bg-surface-elevated text-text-secondary hover:text-text-primary dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
                {active && <span className="text-xs font-semibold">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-6">
        <p className="text-text-primary mb-3 font-semibold dark:text-white">
          Preferences <span className="text-text-tertiary">(Optional)</span>
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Tone */}
          <div className="relative">
            <button
              onClick={() => setBrandToneOpen(!brandToneOpen)}
              className="border-border-subtle bg-surface-elevated hover:border-brand-teal flex w-full items-center justify-between rounded-lg border p-3 text-left dark:bg-slate-900/60"
            >
              <div>
                <p className="text-text-primary text-sm font-semibold dark:text-white">
                  {brandTone.label}
                </p>
                <p className="text-text-secondary text-xs dark:text-slate-400">{brandTone.desc}</p>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${brandToneOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {brandToneOpen && (
              <div className="border-border-subtle bg-surface-card absolute z-50 mt-2 w-full overflow-hidden rounded-lg border shadow-xl backdrop-blur dark:bg-slate-800/90">
                {BRAND_TONES.map((tone) => {
                  const active = tone.value === brandTone.value

                  return (
                    <button
                      key={tone.value}
                      onClick={() => selectBrandTone(tone.value)}
                      className={`flex w-full items-start justify-between px-4 py-3 text-left transition ${
                        active
                          ? 'bg-brand-gradient/10'
                          : 'hover:bg-surface-elevated dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold dark:text-white">{tone.label}</p>
                        <p className="text-text-secondary text-xs dark:text-slate-400">
                          {tone.desc}
                        </p>
                      </div>
                      {active && <Check className="text-brand-teal mt-1 h-4 w-4" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Target audience */}
          <input
            value={audience}
            onChange={(e) => handleTargetAudience(e.target.value)}
            className="bg-surface-elevated border-border-subtle focus:ring-brand-teal w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white"
            placeholder="Target audience (Entrepreneurs, Marketers)"
          />
        </div>

        {/* Keywords */}
        <input
          value={keywords.join(', ')}
          onChange={(e) => handleKeywords(e.target.value)}
          className="bg-surface-elevated border-border-subtle focus:ring-brand-teal mt-4 w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white"
          placeholder="Keywords / CTA (AI, Productivity, Follow for more)"
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>

        <Button onClick={handleGenerate}>
          ✨ Generate for {selectedPlatforms.length} Platforms
        </Button>
      </div>
    </div>
  )
}

export default AddPreferencesForm
