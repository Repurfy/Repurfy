'use client'

import { ClipboardList, Link, FileText, Youtube, Globe, AlertCircle, Lock } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { FormDataType } from './CreatePostForm'

interface Props {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  onNext: () => void
  mode: 'text' | 'url'
  setMode: (m: 'text' | 'url') => void
  isPaid?: boolean
}

// Detects all common YouTube URL patterns
const isYouTubeUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') return true
    if (
      parsed.hostname.includes('youtube.com') &&
      (parsed.searchParams.has('v') ||
        parsed.pathname.startsWith('/shorts/') ||
        parsed.pathname.startsWith('/embed/'))
    )
      return true
    return false
  } catch {
    return false
  }
}

const isBlogUrl = (url: string): boolean => {
  if (!url.trim()) return false
  try {
    const parsed = new URL(url)
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      !isYouTubeUrl(url)
    )
  } catch {
    return false
  }
}

const AddContentForm = ({ onNext, formData, setFormData, mode, setMode, isPaid = false }: Props) => {
  const router = useRouter()

  const urlError = (() => {
    const val = formData.blogUrl.trim()
    if (!val) return null
    if ((val.startsWith('http://') || val.startsWith('https://')) && !isYouTubeUrl(val) && !isBlogUrl(val)) {
      return 'This URL is not recognized. Please enter a valid YouTube or blog URL.'
    }
    return null
  })()

  const urlValue = formData.blogUrl.trim()
  const detectedUrlType: 'youtube' | 'blog' | 'invalid' | 'empty' = !urlValue
    ? 'empty'
    : isYouTubeUrl(urlValue)
      ? 'youtube'
      : isBlogUrl(urlValue)
        ? 'blog'
        : 'invalid'

  const hasValue =
    mode === 'text'
      ? formData.title.trim().length > 0
      : isPaid && (detectedUrlType === 'youtube' || detectedUrlType === 'blog')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el || mode !== 'text') return
    el.style.height = 'auto'
    const maxHeight = 300
    const newHeight = Math.min(el.scrollHeight, maxHeight)
    el.style.height = newHeight + 'px'
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }, [formData.title, mode])

  const switchMode = (newMode: 'text' | 'url') => {
    setMode(newMode)
    if (newMode === 'text') {
      setFormData((p) => ({ ...p, blogUrl: '' }))
    } else {
      setFormData((p) => ({ ...p, title: '' }))
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, blogUrl: e.target.value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 ring-1 ring-teal-500/20">
          <FileText className="h-5 w-5 text-teal-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Add Your Content</h2>
          <p className="text-xs text-slate-400">Paste text or link a YouTube video / blog article</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 rounded-xl bg-slate-900/80 p-1 ring-1 ring-slate-700/50">
        <button
          onClick={() => switchMode('text')}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${mode === 'text'
              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-slate-200'
            }`}
        >
          <ClipboardList className="h-4 w-4" />
          Paste Text
        </button>
        <button
          onClick={() => switchMode('url')}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${mode === 'url'
              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-slate-200'
            }`}
        >
          <Link className="h-4 w-4" />
          From URL
          {!isPaid && <Lock className="ml-1 h-3.5 w-3.5 text-slate-500 shrink-0" />}
        </button>
      </div>

      {/* Input Area */}
      {mode === 'text' ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            name="title"
            rows={5}
            value={formData.title}
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
            placeholder="Paste your content here…"
            className="min-h-[160px] w-full resize-none rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/10"
          />
          {formData.title.length > 0 && (
            <div className="absolute bottom-3 right-3 rounded-md bg-slate-800/80 px-2 py-1 text-xs text-slate-500">
              {formData.title.length} chars
            </div>
          )}
        </div>
      ) : !isPaid ? (
        /* Upgrade CTA for URL mode */
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-700/60 bg-slate-900/60 p-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="mb-2 text-base font-semibold text-white">Unlock URL Repurposing</h3>
          <p className="mb-6 max-w-sm text-xs leading-relaxed text-slate-400">
            Directly repurpose YouTube videos and blog articles into social media posts.
            Upgrade to Creator or Pro to unlock this feature.
          </p>
          <Button
            onClick={() => router.push('/pricing')}
            className="bg-brand-gradient hover:shadow-lg rounded-xl px-6 py-2 text-xs font-semibold text-white transition-all hover:scale-[1.02]"
          >
            Upgrade Plan
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              {detectedUrlType === 'youtube' ? (
                <Youtube className="h-4 w-4 text-red-400" />
              ) : detectedUrlType === 'blog' ? (
                <Globe className="h-4 w-4 text-teal-400" />
              ) : (
                <Link className="h-4 w-4 text-slate-500" />
              )}
            </div>
            <input
              name="blogUrl"
              value={formData.blogUrl}
              onChange={handleUrlChange}
              placeholder="https://youtube.com/watch?v=… or https://yourblog.com/post"
              className={`w-full rounded-xl border bg-slate-900/60 py-3.5 pl-10 pr-28 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:ring-2 ${urlError
                  ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/10'
                  : detectedUrlType === 'youtube'
                    ? 'border-red-500/40 focus:border-red-400 focus:ring-red-500/10'
                    : detectedUrlType === 'blog'
                      ? 'border-teal-500/40 focus:border-teal-500 focus:ring-teal-500/10'
                      : 'border-slate-700/60 focus:border-teal-500/60 focus:ring-teal-500/10'
                }`}
            />
            {detectedUrlType === 'youtube' && (
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-md bg-red-500/15 px-2.5 py-1 text-xs font-semibold text-red-400">
                <Youtube className="h-3 w-3" />
                YouTube
              </div>
            )}
            {detectedUrlType === 'blog' && (
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-md bg-teal-500/15 px-2.5 py-1 text-xs font-semibold text-teal-400">
                <Globe className="h-3 w-3" />
                Blog URL
              </div>
            )}
          </div>

          {urlError && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400 ring-1 ring-red-500/20">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {urlError}
            </div>
          )}

          {!urlError && detectedUrlType === 'empty' && (
            <p className="text-xs text-slate-500">
              ✦ Supports YouTube videos, Shorts, blog posts, Medium, Dev.to, and more
            </p>
          )}
          {detectedUrlType === 'youtube' && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/8 px-3 py-2 text-xs text-slate-400 ring-1 ring-red-500/15">
              ✅ We'll extract the video transcript and repurpose it for your chosen platforms.
            </div>
          )}
          {detectedUrlType === 'blog' && (
            <div className="flex items-center gap-2 rounded-lg bg-teal-500/8 px-3 py-2 text-xs text-slate-400 ring-1 ring-teal-500/15">
              ✅ We'll scrape the article content and generate platform-ready posts.
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">💡 More detail = better output quality</p>
        <Button
          onClick={onNext}
          disabled={!hasValue}
          className="bg-brand-gradient hover:shadow-lg rounded-lg px-5 font-semibold text-white shadow-md transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}

export default AddContentForm