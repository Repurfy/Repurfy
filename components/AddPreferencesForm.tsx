import { useState } from 'react'
import { Button } from './ui/button'
import { Linkedin, Instagram, Twitter, Facebook, Youtube, Music2, Sparkles } from 'lucide-react'

interface Props {
  onBack: () => void
}

const PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'twitter', label: 'X (Twitter)', icon: Twitter },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  // { id: 'tiktok', label: 'TikTok', icon: Music2 },
  // { id: 'youtube', label: 'YouTube Shorts', icon: Youtube },
  { id: 'facebook', label: 'Facebook', icon: Facebook },
]

const AddPreferencesForm = ({ onBack }: Props) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'linkedin',
    'twitter',
    'instagram',
  ])

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="border-border-subtle w-full rounded-2xl p-5 sm:p-6 dark:border-slate-700/60 dark:bg-slate-800/60">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
          <Sparkles className="text-brand-teal h-5 w-5" />
          <h2 className="text-text-primary flex items-center justify-center gap-1 text-xl font-semibold sm:justify-start dark:text-white">
            Customize & Generate
          </h2>
        </div>
        <p className="text-text-secondary text-sm dark:text-slate-400">
          Select platforms and add optional preferences
        </p>
      </div>

      {/* Platform Selection */}
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
                } `}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </div>

                {active && <span className="text-brand-teal text-xs font-semibold">✓</span>}
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
          <input
            className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
            placeholder="Brand tone (Professional, Casual, Bold)"
          />

          <input
            className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
            placeholder="Target audience (Entrepreneurs, Marketers)"
          />
        </div>

        <input
          className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-4 w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
          placeholder="Keywords / CTA (AI, Productivity, Follow for more)"
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-border-subtle text-text-secondary hover:text-text-primary dark:border-slate-600 dark:text-slate-300"
        >
          ← Back
        </Button>

        <Button className="bg-brand-gradient rounded-lg font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg">
          ✨ Generate for {selectedPlatforms.length} Platforms
        </Button>
      </div>
    </div>
  )
}

export default AddPreferencesForm
