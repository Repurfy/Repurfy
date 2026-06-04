'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { LucideIcon } from 'lucide-react'
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
  X,
  Zap,
  RefreshCw,
  Settings2,
  ChevronDown,
  ChevronUp,
  Hash,
  Anchor,
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
  emotion?: string
  contentLength?: 'short' | 'medium' | 'long'
  blogUrl?: string | null
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
  { label: string; icon: LucideIcon; maxChars: number; gradient: string; iconBg: string }
> = {
  linkedin: {
    label: 'LinkedIn',
    icon: Linkedin,
    maxChars: 3000,
    gradient: 'from-blue-600/10 to-blue-500/5',
    iconBg: 'bg-blue-600',
  },
  twitter: {
    label: 'X (Twitter)',
    icon: Twitter,
    maxChars: 280,
    gradient: 'from-slate-600/10 to-slate-500/5',
    iconBg: 'bg-black',
  },
  instagram: {
    label: 'Instagram',
    icon: Instagram,
    maxChars: 2200,
    gradient: 'from-pink-600/10 to-orange-400/5',
    iconBg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
  },
  facebook: {
    label: 'Facebook',
    icon: Facebook,
    maxChars: 3000,
    gradient: 'from-blue-500/10 to-blue-400/5',
    iconBg: 'bg-blue-500',
  },
}

const REGEN_CREDIT_COST = 5

// ─────────────────────────────────────────────────────────────────────────────
// Edit & Regenerate Panel (slide-in drawer style)
// ─────────────────────────────────────────────────────────────────────────────

interface EditPanelProps {
  sourceDoc: ContentDocument
  creditsRemaining: number
  onDirectRegen: () => void
  onEditForm: () => void
  onClose: () => void
  isRegenerating: boolean
}

const EditPanel = ({
  sourceDoc,
  creditsRemaining,
  onDirectRegen,
  onEditForm,
  onClose,
  isRegenerating,
}: EditPanelProps) => {
  const hasCredits = creditsRemaining >= REGEN_CREDIT_COST

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-lg rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10">
                <RefreshCw className="h-4 w-4 text-teal-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Regenerate Content</h2>
                <p className="text-xs text-slate-500">Choose how you want to regenerate</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Current settings summary */}
          <div className="px-5 py-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
              Current Settings
            </p>
            <div className="flex flex-wrap gap-2">
              {sourceDoc.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium capitalize text-slate-300 ring-1 ring-slate-700"
                >
                  {p}
                </span>
              ))}
              <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium capitalize text-slate-300 ring-1 ring-slate-700">
                {sourceDoc.tone || 'professional'}
              </span>
              {sourceDoc.emotion && (
                <span className="rounded-md bg-violet-500/15 px-2.5 py-1 text-xs font-medium capitalize text-violet-300 ring-1 ring-violet-500/30">
                  {sourceDoc.emotion}
                </span>
              )}
              {sourceDoc.contentLength && (
                <span className="rounded-md bg-teal-500/15 px-2.5 py-1 text-xs font-medium capitalize text-teal-300 ring-1 ring-teal-500/30">
                  {sourceDoc.contentLength} length
                </span>
              )}
            </div>
          </div>

          {/* Credit info */}
          <div className="mx-5 mb-4 flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/60 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Zap className="h-4 w-4 text-amber-400" />
              Credit cost per regeneration
            </div>
            <div className="text-right">
              <span className="font-semibold text-amber-400">{REGEN_CREDIT_COST} credits</span>
              <p className={`text-xs ${hasCredits ? 'text-teal-400' : 'text-red-400'}`}>
                {creditsRemaining} available
              </p>
            </div>
          </div>

          {!hasCredits && (
            <div className="mx-5 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
              ⚠️ You don't have enough credits. Upgrade your plan to regenerate.
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-1 gap-3 px-5 pb-5 sm:grid-cols-2">
            {/* Option 1: Quick regen with same settings */}
            <button
              onClick={onDirectRegen}
              disabled={!hasCredits || isRegenerating}
              className="flex cursor-pointer flex-col items-start gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 p-4 text-left transition hover:border-teal-500/60 hover:bg-slate-800/80 hover:scale-[1.01] hover:shadow-lg hover:shadow-teal-500/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/15 ring-1 ring-teal-500/20">
                <RefreshCw className="h-4 w-4 text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Quick Regenerate</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                  Same settings, fresh creative angles & hooks
                </p>
              </div>
            </button>

            {/* Option 2: Edit settings then regen */}
            <button
              onClick={onEditForm}
              disabled={!hasCredits}
              className="flex cursor-pointer flex-col items-start gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 p-4 text-left transition hover:border-violet-500/60 hover:bg-slate-800/80 hover:scale-[1.01] hover:shadow-lg hover:shadow-violet-500/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 ring-1 ring-violet-500/20">
                <Settings2 className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Edit & Regenerate</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                  Change platforms, tone, length, or content first
                </p>
              </div>
            </button>
          </div>

          {!hasCredits && (
            <div className="px-5 pb-5">
              <button
                onClick={() => { onClose(); window.location.href = '/pricing' }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                <Zap className="h-4 w-4" />
                Upgrade Plan
              </button>
            </div>
          )}
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
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-teal-400" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-4 w-4 animate-pulse rounded-full bg-teal-400/60" />
      </div>
    </div>
    <div className="text-center">
      <p className="text-base font-semibold text-white">Regenerating content…</p>
      <p className="mt-1 text-sm text-slate-400">Crafting new angles and hooks for your platforms</p>
    </div>
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
// Platform Card
// ─────────────────────────────────────────────────────────────────────────────

interface PlatformCardProps {
  platform: string
  text: string
  regenCount: number
  onCopy: (text: string, key: string) => void
  onDownload: (text: string, platform: string) => void
  copied: string | null
  editingPlatform: string | null
  setEditingPlatform: (p: string | null) => void
  setEditedTexts: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const PlatformCard = ({
  platform,
  text,
  regenCount,
  onCopy,
  onDownload,
  copied,
  editingPlatform,
  setEditingPlatform,
  setEditedTexts,
}: PlatformCardProps) => {
  const config = PLATFORM_CONFIG[platform]
  if (!config) return null

  const Icon = config.icon
  const isEditing = editingPlatform === platform
  const isCopied = copied === platform
  const [collapsed, setCollapsed] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isEditing) return

    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setEditingPlatform(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, setEditingPlatform])

  return (
    <motion.div
      ref={cardRef}
      key={`${platform}-${regenCount}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/60 backdrop-blur-sm"
    >
      {/* Card Header */}
      <div className={`bg-gradient-to-br ${config.gradient} px-4 py-4 sm:px-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.iconBg}`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{config.label}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onCopy(text, platform)}
              className="cursor-pointer flex items-center gap-1.5 rounded-lg bg-teal-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-600"
            >
              {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={() => onDownload(text, platform)}
              className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg border border-slate-600/60 text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
              title="Download as .txt"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setEditingPlatform(isEditing ? null : platform)}
              className={`cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                isEditing
                  ? 'border-teal-500/60 bg-teal-500/10 text-teal-400'
                  : 'border-slate-600/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
              title={isEditing ? 'Done editing' : 'Edit post'}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg border border-slate-600/60 text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
              title={collapsed ? 'Expand' : 'Collapse'}
            >
              {collapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 sm:px-5">
              {isEditing ? (
                <textarea
                  value={text}
                  onChange={(e) =>
                    setEditedTexts((prev) => ({ ...prev, [platform]: e.target.value }))
                  }
                  className="h-48 w-full resize-none rounded-xl border border-slate-600/60 bg-slate-900/60 p-3 text-sm text-slate-200 outline-none focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/10"
                />
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{text}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

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
  const [sourceDoc, setSourceDoc] = useState<ContentDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null)
  const [editedTexts, setEditedTexts] = useState<Record<string, string>>({})
  const [showEditPanel, setShowEditPanel] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regenCount, setRegenCount] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // ── Fetch content ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const stored = sessionStorage.getItem('generatedContent')
        if (stored) {
          const parsed = JSON.parse(stored) as GeneratedContent
          if (parsed.contentId === contentId) {
            setContent(parsed)
            sessionStorage.removeItem('generatedContent')
            setLoading(false)
            fetchSourceDoc()
            return
          }
        }

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

  const fetchSourceDoc = async () => {
    try {
      const token = await getToken()
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${contentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSourceDoc(res.data.data as ContentDocument)
    } catch {
      // Non-fatal
    }
  }

  // ── Quick Regenerate (same settings) ──────────────────────────────────────
  const handleDirectRegen = async () => {
    if (!sourceDoc) {
      toast.error('Could not load source content. Please try again.')
      return
    }

    setShowEditPanel(false)
    setIsRegenerating(true)
    setEditedTexts({})
    setEditingPlatform(null)

    try {
      const token = await getToken()

      const payload: Record<string, unknown> = {
        content: sourceDoc.originalInput,
        platforms: sourceDoc.platforms,
        tone: sourceDoc.tone || 'professional',
        emotion: sourceDoc.emotion || 'curiosity',
        contentLength: sourceDoc.contentLength || 'medium',
        audience: sourceDoc.audience,
        keywords: sourceDoc.keywords ?? [],
        imageUrl: sourceDoc.imageUrl ?? null,
        forceRefresh: true,
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/generate`,
        payload,
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          timeout: 120000,
        }
      )

      if (!res.data.success || !res.data.contentId) {
        throw new Error(res.data.message || 'Regeneration failed. Please try again.')
      }

      setContent({
        contentId: res.data.contentId,
        creditsRemaining: res.data.creditsRemaining,
        imageUrl: sourceDoc.imageUrl ?? null,
        data: res.data.data,
      })

      const newDoc = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${res.data.contentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSourceDoc(newDoc.data.data as ContentDocument)

      setRegenCount((c) => c + 1)
      await refreshUser()
      await refreshHistory()

      toast.success('✨ New content generated!')
      setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        const msg = err.response?.data?.message || err.message
        if (status === 402) toast.error('Not enough credits. Please upgrade your plan.')
        else if (status === 429) toast.error('Too many requests. Please wait a moment.')
        else if (err.code === 'ECONNABORTED') toast.error('Request timed out. Please try again.')
        else toast.error(msg || 'Regeneration failed. Please try again.')
      } else if (err instanceof Error) {
        toast.error(err.message)
      }
    } finally {
      setIsRegenerating(false)
    }
  }

  // ── Edit & Regenerate — navigate to /create with pre-filled data ───────────
  const handleEditAndRegen = () => {
    if (!sourceDoc) return

    // Determine what the original content source was
    const isUrlBased = sourceDoc.inputType === 'blog' || sourceDoc.inputType === 'youtube'

    const prefillData = {
      title: isUrlBased ? '' : sourceDoc.originalInput,
      blogUrl: isUrlBased ? (sourceDoc.blogUrl || '') : '',
      photoUrl: sourceDoc.imageUrl || '',
      platforms: sourceDoc.platforms,
      tone: sourceDoc.tone || 'professional',
      emotion: sourceDoc.emotion || 'curiosity',
      contentLength: (sourceDoc.contentLength || 'medium') as 'short' | 'medium' | 'long',
      audience: sourceDoc.audience || [],
      keywords: sourceDoc.keywords || [],
      // Meta for the create page to know this is an edit session
      _isEditSession: true,
      _contentMode: isUrlBased ? 'url' : 'text',
    }

    sessionStorage.setItem('editFormPrefill', JSON.stringify(prefillData))
    setShowEditPanel(false)
    router.push('/create')
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
    editedTexts[platform] ?? (content?.data[platform] as string) ?? ''

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
      {/* Overlays */}
      <AnimatePresence>
        {isRegenerating && <RegeneratingOverlay key="regen-overlay" />}
      </AnimatePresence>

      {showEditPanel && sourceDoc && (
        <EditPanel
          sourceDoc={sourceDoc}
          creditsRemaining={currentCredits}
          onDirectRegen={handleDirectRegen}
          onEditForm={handleEditAndRegen}
          onClose={() => setShowEditPanel(false)}
          isRegenerating={isRegenerating}
        />
      )}

      <div className="min-h-screen" ref={contentRef}>

        {/* Back button */}
        <button
          onClick={() => router.push('/history')}
          className="cursor-pointer mb-6 flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </button>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                Your content is ready! 🎉
              </h1>
              {regenCount > 0 && (
                <span className="rounded-full bg-teal-500/10 px-2.5 py-1 text-xs font-medium text-teal-400 ring-1 ring-teal-500/20">
                  Regenerated ×{regenCount}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-slate-400">
              Platform-optimized posts generated from your content
            </p>
          </div>

          {/* Single unified Regenerate button */}
          <Button
            onClick={() => setShowEditPanel(true)}
            disabled={isRegenerating}
            className="cursor-pointer flex items-center gap-2 rounded-xl bg-brand-gradient hover:shadow-lg hover:shadow-teal-500/25 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4 text-teal-300" />
            <span>Regenerate</span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-teal-300 ring-1 ring-white/10">
              {REGEN_CREDIT_COST} cr
            </span>
          </Button>
        </div>

        <div className="mx-auto max-w-5xl">

          {/* Info banner */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-teal-500/20 bg-teal-500/8 px-4 py-3 sm:items-center sm:px-5 sm:py-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-teal-400 sm:mt-0" />
            <div>
              <p className="text-sm font-semibold text-teal-300">
                Copy & post directly to your platforms
              </p>
              <p className="text-xs text-teal-400/70">
                Direct publishing coming soon · Copy and paste to each platform for now
              </p>
            </div>
          </div>

          {/* Image Preview */}
          {content.imageUrl && (
            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-700/60">
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
              <div className="flex items-center justify-between bg-slate-800/80 px-4 py-2.5">
                <p className="text-xs text-slate-400">✨ AI Generated Image</p>
                <button
                  onClick={() => {
                    const a = document.createElement('a')
                    a.href = content.imageUrl!
                    a.download = 'repurfy-image.jpg'
                    a.target = '_blank'
                    a.click()
                  }}
                  className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-400 transition hover:text-slate-200"
                >
                  <Download className="h-3 w-3" />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Platform Cards Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {platforms.map((platform) => (
              <PlatformCard
                key={`${platform}-${regenCount}`}
                platform={platform}
                text={getDisplayText(platform)}
                regenCount={regenCount}
                onCopy={handleCopy}
                onDownload={handleDownload}
                copied={copied}
                editingPlatform={editingPlatform}
                setEditingPlatform={setEditingPlatform}
                setEditedTexts={setEditedTexts}
              />
            ))}
          </div>

          {/* Hooks & Hashtags */}
          {((content.data.hooks?.length ?? 0) > 0 || (content.data.hashtags?.length ?? 0) > 0) && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {(content.data.hooks?.length ?? 0) > 0 && (
                <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Anchor className="h-4 w-4 text-teal-400" />
                    <p className="text-sm font-semibold text-white">Viral Hooks</p>
                  </div>
                  <ul className="space-y-3">
                    {content.data.hooks!.map((hook, i) => (
                      <li key={i} className="flex items-start justify-between gap-3 rounded-xl bg-slate-900/60 p-3">
                        <p className="text-xs leading-relaxed text-slate-300">{hook}</p>
                        <button
                          onClick={() => handleCopy(hook, `hook-${i}`)}
                          className="cursor-pointer shrink-0 rounded-md bg-slate-700/60 px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
                        >
                          {copied === `hook-${i}` ? '✓' : 'Copy'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(content.data.hashtags?.length ?? 0) > 0 && (
                <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-violet-400" />
                    <p className="text-sm font-semibold text-white">Hashtags</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {content.data.hashtags!.map((tag, i) => (
                      <span
                        key={i}
                        onClick={() => handleCopy(tag.startsWith('#') ? tag : `#${tag}`, `tag-${i}`)}
                        className="cursor-pointer rounded-full bg-slate-700/60 px-3 py-1 text-xs text-slate-300 transition hover:bg-violet-500/20 hover:text-violet-300"
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
          <div className="mt-10 flex justify-center pb-10">
            <Button
              onClick={() => router.push('/create')}
              variant="outline"
              className="cursor-pointer border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              ← Generate New Content
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}

export default ResultsPage
