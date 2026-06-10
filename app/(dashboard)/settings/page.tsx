'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Cookie, Loader2, User, X } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { useUser as useUserContext } from '@/context/userContext'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAuth, useClerk } from '@clerk/nextjs'

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 26,
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 28,
    },
  },
}

const TONES = [
  { value: 'professional', label: 'Professional', emoji: '💼' },
  { value: 'casual', label: 'Casual', emoji: '😊' },
  { value: 'bold', label: 'Bold', emoji: '🔥' },
  { value: 'friendly', label: 'Friendly', emoji: '👋' },
  { value: 'witty', label: 'Witty', emoji: '😄' },
  { value: 'authoritative', label: 'Authoritative', emoji: '📢' },
]

// ─── Reusable tag-input ───────────────────────────────────────────────────────
const TagInput = ({
  tags,
  onAdd,
  onRemove,
  placeholder,
}: {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
  placeholder: string
}) => {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const addTag = (raw: string) => {
    const parts = raw.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
    parts.forEach((part) => { if (!tags.includes(part)) onAdd(part) })
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
      className="flex min-h-[46px] w-full cursor-text flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition-all focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20 dark:border-slate-700 dark:bg-slate-900/60"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-md bg-indigo-500/15 px-2 py-0.5 text-xs font-medium text-indigo-600 ring-1 ring-indigo-500/30 dark:text-indigo-300"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(tag) }}
            className="ml-0.5 opacity-60 transition-opacity hover:opacity-100"
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
        className="min-w-[140px] flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Settings = () => {
  const { userData, refreshUser } = useUserContext()
  const { openUserProfile } = useClerk()
  const { getToken, signOut } = useAuth()
  const router = useRouter()

  const isPaid = userData?.plan === 'creator' || userData?.plan === 'pro'

  // Profile (display only)
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
  })

  // Brand Defaults state
  const [tone, setTone] = useState('')
  const [defaultCta, setDefaultCta] = useState('')
  const [audience, setAudience] = useState<string[]>([])
  const [keywords, setKeywords] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Seed fields once userData loads
  useEffect(() => {
    if (userData) {
      setFormData({ name: userData.name || '', email: userData.email || '' })
      if (userData.brandDefaults) {
        setTone(userData.brandDefaults.tone || '')
        setDefaultCta(userData.brandDefaults.defaultCta || '')
        setAudience(userData.brandDefaults.audience || [])
        setKeywords(userData.brandDefaults.keywords || [])
      }
    }
  }, [userData])

  const handleSaveBrandDefaults = async () => {
    try {
      setIsSaving(true)
      setSaved(false)
      const token = await getToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/brand-defaults`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tone,
          defaultCta,
          audience,
          keywords,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to save')
      await refreshUser()
      setSaved(true)
      toast.success('Brand defaults saved!')
      setTimeout(() => setSaved(false), 3000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    const token = await getToken()
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/delete`, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'DELETE',
    })
    localStorage.clear()
    await signOut()
    toast.success('Account deleted successfully')
    router.push('/')
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="w-full overflow-hidden"
    >
      <motion.h1 variants={itemVariants} className="text-2xl font-bold tracking-tight">
        Settings
      </motion.h1>

      <motion.p variants={itemVariants} className="text-text-secondary mt-1 mb-10 leading-relaxed">
        Manage your account and preferences
      </motion.p>

      <div className="mx-auto max-w-5xl space-y-10">
        {/* ── Profile ── */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/20 text-teal-500">
                <User className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Profile</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your personal information</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="bg-bg-secondary flex items-center gap-2 self-center"
              onClick={() => openUserProfile()}
            >
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Full Name</label>
              <Input
                value={formData.name}
                type="text"
                disabled
                className="bg-surface-elevated text-text-secondary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-900/60 dark:placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Email</label>
              <Input
                value={formData.email}
                type="email"
                disabled
                className="bg-surface-elevated text-text-secondary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-900/60 dark:placeholder:text-slate-500"
              />
            </div>
          </div>
        </motion.div>

        {/* ── Brand Defaults ── */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          {/* Header row */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/20 text-teal-500">
                <Cookie className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Brand Defaults
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pre-fill the content creation form with your brand settings
                </p>
              </div>
            </div>

            {isPaid && (
              <Button
                id="save-brand-defaults-btn"
                onClick={handleSaveBrandDefaults}
                disabled={isSaving}
                className="self-center gap-2 bg-indigo-600 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {isSaving ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                ) : saved ? (
                  <><Check className="h-4 w-4" /> Saved!</>
                ) : (
                  'Save Defaults'
                )}
              </Button>
            )}
          </div>

          {!isPaid ? (
            /* ─── Locked state — minimal, on-theme ─── */
            <div className="flex flex-col items-center gap-5 rounded-xl border border-border-subtle bg-surface-elevated py-12 text-center dark:border-slate-700/60 dark:bg-slate-900/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 ring-1 ring-teal-500/20">
                <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="max-w-xs space-y-1.5">
                <p className="font-semibold text-text-primary dark:text-white">Brand Defaults — Pro Feature</p>
                <p className="text-sm leading-relaxed text-text-secondary dark:text-slate-400">
                  Save your default tone, audience, keywords &amp; CTA. They&apos;ll auto-fill every time you create content.
                </p>
              </div>
              <a
                href="/pricing"
                className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                Upgrade to unlock
              </a>
            </div>
          ) : (
            <>
              {/* Info banner */}
              <div className="mb-6 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:border-indigo-700/40 dark:bg-indigo-900/20 dark:text-indigo-300">
                💡 These values will be automatically pre-filled when you create new content. You can always override them per-generation.
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Tone — same button grid as create page */}
                <div className="space-y-2">
                  <label className="text-text-primary font-semibold">Default Brand Tone</label>
                  <p className="text-text-secondary text-xs">
                    This tone will be used as the default for all generated content
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {TONES.map((t) => {
                      const active = t.value === tone
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setTone(t.value === tone ? '' : t.value)}
                          className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-sm transition-all duration-200 ${active
                            ? 'border-teal-500 bg-teal-500/10 text-white shadow-sm shadow-teal-500/10'
                            : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white hover:text-slate-700 dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200'
                            }`}
                        >
                          <span className="text-lg">{t.emoji}</span>
                          <span className="text-[11px] font-medium leading-tight">{t.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Default CTA */}
                <div className="space-y-2">
                  <label className="text-text-primary font-semibold">Default CTA / Keywords Phrase</label>
                  <Input
                    id="brand-cta-input"
                    value={defaultCta}
                    onChange={(e) => setDefaultCta(e.target.value)}
                    className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="e.g., Follow for more insights"
                  />
                </div>

                {/* Target Audience */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-text-primary font-semibold">Target Audience</label>
                    <span className="text-xs text-slate-400">Press Enter or comma to add</span>
                  </div>
                  <TagInput
                    tags={audience}
                    onAdd={(tag) => setAudience((p) => [...p, tag])}
                    onRemove={(tag) => setAudience((p) => p.filter((a) => a !== tag))}
                    placeholder="Entrepreneurs, marketers, content creators…"
                  />
                  <p className="text-text-secondary text-xs">
                    Add multiple audience segments as tags
                  </p>
                </div>

                {/* Keywords */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-text-primary font-semibold">Default Keywords</label>
                    <span className="text-xs text-slate-400">Press Enter or comma to add</span>
                  </div>
                  <TagInput
                    tags={keywords}
                    onAdd={(tag) => setKeywords((p) => [...p, tag])}
                    onRemove={(tag) => setKeywords((p) => p.filter((k) => k !== tag))}
                    placeholder="e.g., AI, productivity, SaaS…"
                  />
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* ── Danger Zone ── */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border bg-red-50 p-6 shadow-sm dark:border-red-800 dark:bg-red-900/20"
        >
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-red-500 dark:text-red-300">Danger Zone</h2>
              <p className="text-text-secondary text-sm">
                Irreversible actions that affect your account
              </p>
            </div>

            <div className="flex items-center justify-between rounded-md py-2">
              <div>
                <h2 className="text-text-primary font-medium">Delete Account</h2>
                <p className="text-text-secondary text-sm">
                  Permanently delete your account and all data
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="font-medium">
                    Delete Account
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="pb-4">
                      Are you sure? Confirm account deletion
                    </AlertDialogTitle>
                    <AlertDialogDescription className="py-1">
                      This action cannot be undone. This will permanently delete your account from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="font-medium" onClick={handleDeleteAccount}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Settings
