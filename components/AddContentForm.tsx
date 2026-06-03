import { ClipboardList, Link, FileText, Youtube, Globe, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useRef, useState } from 'react'

interface FormDataType {
  title: string
  blogUrl: string
  photoUrl: string
  platforms: string[]
  tone: string
  audience: string[]
  keywords: string[]
}

interface Props {
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  onNext: () => void
}

// Detects all common YouTube URL patterns
const isYouTubeUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    // youtu.be short links
    if (parsed.hostname === 'youtu.be') return true
    // youtube.com/watch?v=, /shorts/, /embed/
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

const AddContentForm = ({ onNext, formData, setFormData }: Props) => {
  const [mode, setMode] = useState<'text' | 'url'>('text')
  const [urlError, setUrlError] = useState<string | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const urlValue = formData.blogUrl.trim()
  const detectedUrlType: 'youtube' | 'blog' | 'invalid' | 'empty' = !urlValue
    ? 'empty'
    : isYouTubeUrl(urlValue)
      ? 'youtube'
      : isBlogUrl(urlValue)
        ? 'blog'
        : 'invalid'

  // Compute whether the current step is valid to proceed
  const hasValue =
    mode === 'text'
      ? formData.title.trim().length > 0
      : detectedUrlType === 'youtube' || detectedUrlType === 'blog'

  useEffect(() => {
    const el = textareaRef.current
    if (!el || mode !== 'text') return
    el.style.height = 'auto'
    const maxHeight = 300
    const newHeight = Math.min(el.scrollHeight, maxHeight)
    el.style.height = newHeight + 'px'
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }, [formData.title, mode])

  // Validate URL on change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setFormData((p) => ({ ...p, blogUrl: val }))

    if (!val.trim()) {
      setUrlError(null)
      return
    }
    // Check if it looks like a URL (has a protocol or is clearly a domain)
    const looksLikeUrl = val.includes('.') && !val.includes(' ')
    if (!looksLikeUrl) {
      setUrlError(null)
      return
    }
    // Has protocol but invalid format
    if ((val.startsWith('http://') || val.startsWith('https://')) && detectedUrlType === 'invalid') {
      setUrlError('This URL is not recognized. Please enter a valid YouTube or blog URL.')
    } else {
      setUrlError(null)
    }
  }

  // Clear the other input when switching modes
  const switchMode = (newMode: 'text' | 'url') => {
    setMode(newMode)
    setUrlError(null)
    if (newMode === 'text') {
      setFormData((p) => ({ ...p, blogUrl: '' }))
    } else {
      setFormData((p) => ({ ...p, title: '' }))
    }
  }

  return (
    <div className="min-h-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
          <FileText className="h-5 w-5 text-teal-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Add Your Content</h2>
          <p className="text-xs text-slate-400">Paste text or add a YouTube / blog URL</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 rounded-xl p-1">
        <button
          onClick={() => switchMode('text')}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
            mode === 'text'
              ? 'border-teal-500 bg-teal-500 text-white shadow'
              : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          <ClipboardList className="h-4 w-4" /> Paste Text
        </button>
        <button
          onClick={() => switchMode('url')}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
            mode === 'url'
              ? 'border-teal-500 bg-teal-500 text-white shadow'
              : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Link className="h-4 w-4" /> From URL
        </button>
      </div>

      {/* Input */}
      {mode === 'text' ? (
        <textarea
          ref={textareaRef}
          name="title"
          rows={1}
          value={formData.title}
          onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
          placeholder="Paste your blog post, article, video script, or any long-form content here…"
          className="min-h-40 w-full rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30"
        />
      ) : (
        <div className="space-y-2">
          {/* URL input with detected type badge */}
          <div className="relative">
            <input
              name="blogUrl"
              value={formData.blogUrl}
              onChange={handleUrlChange}
              placeholder="https://youtube.com/watch?v=… or https://yourblog.com/post"
              className={`w-full rounded-xl border bg-slate-900/60 p-4 pr-28 text-sm text-white transition-all outline-none placeholder:text-slate-500 focus:ring-1 ${
                urlError
                  ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                  : detectedUrlType === 'youtube'
                    ? 'border-red-500/40 focus:border-red-400 focus:ring-red-500/20'
                    : detectedUrlType === 'blog'
                      ? 'border-teal-500/40 focus:border-teal-500 focus:ring-teal-500/30'
                      : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/30'
              }`}
            />

            {/* Detected type badge inside input */}
            {detectedUrlType === 'youtube' && (
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-md bg-red-500/15 px-2 py-1 text-xs font-medium text-red-400">
                <Youtube className="h-3 w-3" />
                YouTube
              </div>
            )}
            {detectedUrlType === 'blog' && (
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-md bg-teal-500/15 px-2 py-1 text-xs font-medium text-teal-400">
                <Globe className="h-3 w-3" />
                Blog URL
              </div>
            )}
          </div>

          {/* URL error */}
          {urlError && (
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {urlError}
            </div>
          )}

          {/* Supported formats hint */}
          {!urlError && detectedUrlType === 'empty' && (
            <p className="text-xs text-slate-500">
              Supported: YouTube videos (including Shorts), blog posts, articles, Medium, Dev.to, etc.
            </p>
          )}

          {/* YouTube-specific note */}
          {detectedUrlType === 'youtube' && (
            <p className="text-xs text-slate-400">
              ✅ We'll extract the video transcript and repurpose it for your chosen platforms.
            </p>
          )}

          {/* Blog-specific note */}
          {detectedUrlType === 'blog' && (
            <p className="text-xs text-slate-400">
              ✅ We'll scrape the article content and generate platform-ready posts.
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">💡 More detail = better output quality</p>
        <Button
          onClick={onNext}
          disabled={!hasValue}
          className="bg-brand-gradient hover:shadow-l rounded-lg font-semibold text-white shadow-md transition-all hover:scale-[1.02]"
        >
          Continue →
        </Button>
      </div>
    </div>
  )
}

export default AddContentForm