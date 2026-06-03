'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { LucideIcon, RefreshCw } from 'lucide-react'
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Copy,
  Download,
  Pencil,
  Sparkles,
  ArrowLeft,
  Check,
  AlertTriangle,
  X,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { useUser } from '@/context/userContext'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ContentDocument {
  _id: string
  inputType: 'title' | 'content' | 'blog' | 'youtube'
  originalInput: string
  platforms: string[]
  tone: string
  audience: string[]
  keywords: string[]
  imageUrl?: string | null
  generatedContent: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    hooks?: string[]
    hashtags?: string[]
    [key: string]: unknown
  }
}

interface GeneratedContent {
  data: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    hooks?: string[]
    hashtags?: string[]
    [key: string]: unknown
  }
  contentId: string
  imageUrl?: string | null
  creditsRemaining: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const PLATFORM_CONFIG: Record<
  string,
  { label: string; icon: LucideIcon; maxChars: number; bg: string }
> = {
  linkedin: { label: 'LinkedIn', icon: Linkedin, maxChars: 3000, bg: 'bg-blue-600' },
  twitter: { label: 'X (Twitter)', icon: Twitter, maxChars: 280, bg: 'bg-black' },
  instagram: { label: 'Instagram', icon: Instagram, maxChars: 2200, bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400' },
  facebook: { label: 'Facebook', icon: Facebook, maxChars: 3000, bg: 'bg-blue-500' },
}

const REGEN_CREDIT_COST = 10

// ─────────────────────────────────────────────────────────────────────────────
// Regenerate Confirmation Modal
// ─────────────────────────────────────────────────────────────────────────────

interface RegenModalProps {
  creditsRemaining: number
  onConfirm: () => void
  onCancel: () => void
}

const RegenerateModal = ({ creditsRemaining, onConfirm, onCancel }: RegenModalProps) => {
  const hasCredits = creditsRemaining >= REGEN_CREDIT_COST

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="relative w-full max-w-md rounded-2xl border border-slate-700/60 bg-slate-900 p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onCancel}
            className=" cursor-pointer absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Icon */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
            <RefreshCw className="h-6 w-6 text-teal-400" />
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-white">Regenerate Content?</h2>
          <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
            This will generate a completely fresh set of posts using the same source content,
            platforms, tone, and audience — but with new creative angles and hooks.
          </p>

          {/* Credit cost info */}
          <div className="mt-4 rounded-xl border border-slate-700/50 bg-slate-800/60 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Zap className="h-4 w-4 text-amber-400" />
                Credit cost
              </div>
              <span className="font-semibold text-amber-400">{REGEN_CREDIT_COST} credits</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-slate-700/40 pt-2">
              <span className="text-xs text-slate-500">Your balance</span>
              <span className={`text-xs font-medium ${hasCredits ? 'text-teal-400' : 'text-red-400'}`}>
                {creditsRemaining} credits
              </span>
            </div>
            {!hasCredits && (
              <p className="mt-2 text-xs text-red-400">
                ⚠️ You don't have enough credits. Upgrade your plan to continue.
              </p>
            )}
          </div>

          {/* Warning */}
          {hasCredits && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2.5">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
              <p className="text-xs text-amber-300/90">
                The current content will be replaced with new generated content. This action cannot be undone.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={onCancel}
              className=" cursor-pointer flex-1 rounded-xl border border-slate-700 bg-transparent py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
            >
              Cancel
            </button>
            {hasCredits ? (
              <button
                onClick={onConfirm}
                className=" cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </button>
            ) : (
              <Button
                onClick={() => { onCancel(); window.location.href = '/pricing' }}
                className=" cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                <Zap className="h-4 w-4" />
                Upgrade Plan
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Regenerating Overlay
// ─────────────────────────────────────────────────────────────────────────────

const RegeneratingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-slate-950/80 backdrop-blur-md"
  >
    <div className="relative">
      {/* Outer spinning ring */}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-teal-400" />
      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-4 w-4 animate-pulse rounded-full bg-teal-400/60" />
      </div>
    </div>
    <div className="text-center">
      <p className="text-base font-semibold text-white">Regenerating content…</p>
      <p className="mt-1 text-sm text-slate-400">
        Crafting new angles and hooks for your platforms
      </p>
    </div>
    {/* Animated dots */}
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-teal-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  </motion.div>
)

// ─────────────────────────────────────────────────────────────────────────────
// Main Results Page
// ─────────────────────────────────────────────────────────────────────────────

const ResultsPage = () => {
  const { refreshUser, refreshHistory } = useUser()
  const { userData } = useUser()
  const { getToken } = useAuth()
  const router = useRouter()
  const { contentId } = useParams() as { contentId: string }

  const [content, setContent] = useState<GeneratedContent | null>(null)
  const [sourceDoc, setSourceDoc] = useState<ContentDocument | null>(null) // full document for regen
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null)
  const [editedTexts, setEditedTexts] = useState<Record<string, string>>({})

  // Regeneration state
  const [showRegenModal, setShowRegenModal] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regenCount, setRegenCount] = useState(0) // how many times regenerated this session
  const contentRef = useRef<HTMLDivElement>(null)

  // ── Fetch content ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Try sessionStorage first (fresh from generation)
        const stored = sessionStorage.getItem('generatedContent')
        if (stored) {
          const parsed = JSON.parse(stored) as GeneratedContent
          if (parsed.contentId === contentId) {
            setContent(parsed)
            sessionStorage.removeItem('generatedContent')
            setLoading(false)
            // Also fetch the full doc in background for regen metadata
            fetchSourceDoc()
            return
          }
        }

        // Fetch from API
        const token = await getToken()
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${contentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const item = res.data.data as ContentDocument
        setSourceDoc(item)
        setContent({
          contentId: item._id,
          creditsRemaining: userData?.creditsRemaining ?? 0,
          imageUrl: item.imageUrl ?? null,
          data: { ...item.generatedContent },
        })
        refreshUser()
        refreshHistory()
      } catch (err) {
        console.error('Failed to fetch content:', err)
        router.push('/history')
      } finally {
        setLoading(false)
      }
    }

    if (contentId) fetchContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId])

  // Fetch full source doc (needed for regeneration params)
  const fetchSourceDoc = async () => {
    try {
      const token = await getToken()
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${contentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSourceDoc(res.data.data as ContentDocument)
    } catch {
      // Non-fatal, we'll handle gracefully
    }
  }

  // ── Regenerate ────────────────────────────────────────────────────────────
  const handleRegenerate = async () => {
    if (!sourceDoc) {
      toast.error('Could not load source content. Please try again.')
      return
    }

    setShowRegenModal(false)
    setIsRegenerating(true)
    setEditedTexts({}) // clear any manual edits
    setEditingPlatform(null)

    try {
      const token = await getToken()

      // Build the same payload that was originally used, but with forceRefresh=true
      // We use originalInput as the content field (already extracted text)
      const payload: Record<string, unknown> = {
        content: sourceDoc.originalInput,
        platforms: sourceDoc.platforms,
        tone: sourceDoc.tone || 'professional',
        audience: sourceDoc.audience,
        keywords: sourceDoc.keywords ?? [],
        imageUrl: sourceDoc.imageUrl ?? null,
        forceRefresh: true, // 👈 bypass Redis cache
      }

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

      if (!res.data.success || !res.data.contentId) {
        throw new Error(res.data.message || 'Regeneration failed. Please try again.')
      }

      // Update content in-place with the new result
      setContent({
        contentId: res.data.contentId,
        creditsRemaining: res.data.creditsRemaining,
        imageUrl: sourceDoc.imageUrl ?? null,
        data: res.data.data,
      })

      // Fetch new source doc so next regen uses the correct contentId
      const newDoc = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${res.data.contentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSourceDoc(newDoc.data.data as ContentDocument)

      setRegenCount((c) => c + 1)
      await refreshUser()
      await refreshHistory()

      toast.success('✨ New content generated!')

      // Scroll to top of content
      setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        const msg = err.response?.data?.message || err.message
        if (status === 402) {
          toast.error('Not enough credits to regenerate. Please upgrade your plan.')
        } else if (status === 429) {
          toast.error('Too many requests. Please wait a moment.')
        } else if (err.code === 'ECONNABORTED') {
          toast.error('Request timed out. Please try again.')
        } else {
          toast.error(msg || 'Regeneration failed. Please try again.')
        }
      } else if (err instanceof Error) {
        toast.error(err.message)
      }
    } finally {
      setIsRegenerating(false)
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (text: string, platform: string) => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${platform}-post.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getDisplayText = (platform: string): string =>
    editedTexts[platform] ??
    (content?.data[platform] as string) ??
    ''

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Loading content…</p>
        </div>
      </div>
    )
  }

  if (!content) return null

  const platforms = Object.keys(content.data || {}).filter(
    (k) => k !== 'hooks' && k !== 'hashtags'
  )
  const currentCredits = userData?.creditsRemaining ?? content.creditsRemaining

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Modals / overlays */}
      <AnimatePresence>
        {isRegenerating && <RegeneratingOverlay key="regen-overlay" />}
      </AnimatePresence>

      {showRegenModal && (
        <RegenerateModal
          creditsRemaining={currentCredits}
          onConfirm={handleRegenerate}
          onCancel={() => setShowRegenModal(false)}
        />
      )}

      <div className="min-h-screen" ref={contentRef}>

        {/* Back button */}
        <button
          onClick={() => router.push('/history')}
          className=" cursor-pointer mb-5 flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </button>

        {/* Header row — title + Regenerate button on the same line */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold dark:text-white sm:text-2xl">
              Your content is ready! 🎉
            </h1>

            {/* Regenerate button — inline next to the heading */}
            <Button
              onClick={() => setShowRegenModal(true)}
              disabled={isRegenerating}
              className=" cursor-pointer rounded-xl bg-primary text-white hover:bg-primary/90 px-4 py-2 font-semibold shadow-md transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-medium">
                {REGEN_CREDIT_COST} credits
              </span>
            </Button>

            {regenCount > 0 && (
              <span className="rounded-full bg-teal-500/10 px-2.5 py-1 text-xs font-medium text-teal-500 ring-1 ring-teal-500/20">
                Regenerated ×{regenCount}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Platform-optimized posts generated from your content
          </p>
        </div>

        <div className="mx-auto max-w-5xl">

          {/* Banner */}
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 dark:border-teal-800 dark:bg-teal-900/20 sm:items-center sm:px-5 sm:py-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-teal-500 sm:mt-0" />
            <div>
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">
                Copy &amp; post directly to your platforms
              </p>
              <p className="text-xs text-teal-600 dark:text-teal-400">
                Direct publishing coming soon • Copy and paste to each platform for now
              </p>
            </div>
          </div>

          {/* Image Preview */}
          {content.imageUrl && (
            <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="relative h-48 w-full sm:h-64 md:h-80">
                <Image
                  src={content.imageUrl}
                  alt="Post image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
                  priority={false}
                />
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 dark:bg-slate-800">
                <p className="text-xs text-slate-400">✨ AI Generated Image</p>
                <button
                  onClick={() => {
                    const a = document.createElement('a')
                    a.href = content.imageUrl!
                    a.download = 'repurfy-image.jpg'
                    a.target = '_blank'
                    a.click()
                  }}
                  className=" cursor-pointer flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition hover:text-slate-700 dark:border-slate-600 dark:hover:text-slate-200"
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Platform Cards Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AnimatePresence mode="wait">
              {platforms.map((platform) => {
                const config = PLATFORM_CONFIG[platform]
                if (!config) return null
                const Icon = config.icon
                const text = getDisplayText(platform)
                const isEditing = editingPlatform === platform
                const isCopied = copied === platform
                const charPercent = Math.min((text.length / config.maxChars) * 100, 100)
                const isOverLimit = text.length > config.maxChars

                return (
                  <motion.div
                    key={`${platform}-${regenCount}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5 sm:pt-5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold dark:text-white">{config.label}</p>
                          <p className={`text-xs ${isOverLimit ? 'text-red-400' : 'text-slate-400'}`}>
                            {text.length.toLocaleString()} / {config.maxChars.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => handleCopy(text, platform)}
                          className=" cursor-pointer flex items-center gap-1.5 rounded-lg bg-teal-500 px-2.5 py-2 text-xs font-medium text-white transition hover:bg-teal-600 sm:px-3.5 sm:py-2 sm:text-sm"
                        >
                          {isCopied ? (
                            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}
                          <span className="hidden sm:inline">{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => handleDownload(text, platform)}
                          className=" cursor-pointer flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:text-slate-700 dark:border-slate-600 dark:hover:text-slate-200"
                          title="Download"
                        >
                          <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>

                        <button
                          onClick={() => setEditingPlatform(isEditing ? null : platform)}
                          className={` cursor-pointer flex items-center justify-center rounded-lg border p-2 transition ${isEditing
                            ? 'border-teal-400 text-teal-500 dark:border-teal-500'
                            : 'border-slate-200 text-slate-500 hover:text-slate-700 dark:border-slate-600 dark:hover:text-slate-200'
                            }`}
                          title={isEditing ? 'Done editing' : 'Edit'}
                        >
                          <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Char limit bar */}
                    <div className="h-0.5 w-full bg-slate-100 dark:bg-slate-700">
                      <div
                        className={`h-full transition-all duration-500 ${isOverLimit ? 'bg-red-400' : charPercent > 80 ? 'bg-amber-400' : 'bg-teal-400'
                          }`}
                        style={{ width: `${charPercent}%` }}
                      />
                    </div>

                    {/* Content area */}
                    <div className="flex-1 px-4 py-4 sm:px-5">
                      {isEditing ? (
                        <textarea
                          value={text}
                          onChange={(e) =>
                            setEditedTexts((prev) => ({ ...prev, [platform]: e.target.value }))
                          }
                          className="h-44 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 sm:h-48"
                        />
                      ) : (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {text}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Hooks & Hashtags */}
          {((content.data.hooks?.length ?? 0) > 0 || (content.data.hashtags?.length ?? 0) > 0) && (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 md:grid-cols-2">
              {(content.data.hooks?.length ?? 0) > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 sm:p-5">
                  <p className="mb-3 text-sm font-semibold dark:text-white sm:mb-4">💡 Viral Hooks</p>
                  <ul className="space-y-3">
                    {content.data.hooks!.map((hook, i) => (
                      <li key={i} className="flex items-start justify-between gap-3">
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{hook}</p>
                        <button
                          onClick={() => handleCopy(hook, `hook-${i}`)}
                          className="cursor-pointer shrink-0 rounded-md border border-slate-200 px-2 py-1 text-xs transition hover:text-slate-600 dark:border-slate-600 dark:hover:text-slate-200"
                        >
                          {copied === `hook-${i}` ? '✓' : 'Copy'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(content.data.hashtags?.length ?? 0) > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 sm:p-5">
                  <p className="mb-3 text-sm font-semibold dark:text-white sm:mb-4"># Hashtags</p>
                  <div className="flex flex-wrap gap-2">
                    {content.data.hashtags!.map((tag, i) => (
                      <span
                        key={i}
                        onClick={() => handleCopy(tag.startsWith('#') ? tag : `#${tag}`, `tag-${i}`)}
                        className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 transition hover:bg-teal-50 hover:text-teal-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                      >
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 pb-8 sm:flex-row sm:justify-center">
            <Button
              onClick={() => router.push('/create')}
              variant="outline"
              className="w-full sm:w-auto"
            >
              ← Generate New Content
            </Button>
            <Button
              onClick={() => setShowRegenModal(true)}
              disabled={isRegenerating}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary text-white hover:bg-primary/90 px-5 py-2.5 text-sm font-semibold shadow-md transition hover:shadow-lg disabled:opacity-50 sm:w-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Try Different Angles
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}

export default ResultsPage
