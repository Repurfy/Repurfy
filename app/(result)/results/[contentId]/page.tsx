'use client'

import { useEffect, useState } from 'react'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'

interface GeneratedContent {
  data: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    hooks: string[]
    hashtags: string[]
  }
  contentId: string
  imageUrl?: string | null // 👈 added
  creditsRemaining: number
}

const PLATFORM_CONFIG: Record<
  string,
  {
    label: string
    icon: LucideIcon
    maxChars: number
    bg: string
  }
> = {
  linkedin: { label: 'LinkedIn', icon: Linkedin, maxChars: 3000, bg: 'bg-blue-600' },
  twitter: { label: 'X (Twitter)', icon: Twitter, maxChars: 280, bg: 'bg-black' },
  instagram: {
    label: 'Instagram',
    icon: Instagram,
    maxChars: 2200,
    bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
  },
  facebook: { label: 'Facebook', icon: Facebook, maxChars: 3000, bg: 'bg-blue-500' },
}

export default function ResultsPage() {
  const { getToken } = useAuth()
  const router = useRouter()
  const { contentId } = useParams() as { contentId: string }

  const [content, setContent] = useState<GeneratedContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null)
  const [editedTexts, setEditedTexts] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // First try sessionStorage (fresh generation — faster)
        const stored = sessionStorage.getItem('generatedContent')
        if (stored) {
          const parsed = JSON.parse(stored) as GeneratedContent
          if (parsed.contentId === contentId) {
            setContent(parsed)
            sessionStorage.removeItem('generatedContent')
            setLoading(false)
            return
          }
        }

        // Otherwise fetch from backend (history view or page refresh)
        const token = await getToken()
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${contentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const item = res.data.data
        setContent({
          contentId: item._id,
          creditsRemaining: 0,
          imageUrl: item.imageUrl ?? null, // 👈 added
          data: { ...item.generatedContent },
        })
      } catch (err) {
        console.error('Failed to fetch content:', err)
        router.push('/history')
      } finally {
        setLoading(false)
      }
    }

    if (contentId) fetchContent()
  }, [contentId])

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

  const getDisplayText = (platform: string) => {
    return (
      editedTexts[platform] ??
      (content?.data[platform as keyof typeof content.data] as string) ??
      ''
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Loading content...</p>
        </div>
      </div>
    )
  }

  if (!content) return null

  const platforms = Object.keys(content.data).filter((k) => k !== 'hooks' && k !== 'hashtags')

  return (
    <div className="min-h-screen">
      <div>
        {/* Back button */}
        <button
          onClick={() => router.push('/history')}
          className="mb-6 flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold dark:text-white">Your content is ready! 🎉</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Platform-optimized posts generated from your content
          </p>
        </div>

        {/* Banner */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-teal-200 bg-teal-50 px-5 py-4 dark:border-teal-800 dark:bg-teal-900/20">
          <Sparkles className="h-5 w-5 shrink-0 text-teal-500" />
          <div>
            <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">
              Copy &amp; post directly to your platforms
            </p>
            <p className="text-xs text-teal-600 dark:text-teal-400">
              Direct publishing coming soon • For now, copy and paste to each platform
            </p>
          </div>
        </div>

        {/* Image Preview — shown if imageUrl exists */}
        {content.imageUrl && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center p-4">
              <div className="relative h-48 w-full sm:h-60 md:h-72 lg:h-80">
                <Image
                  src={content.imageUrl}
                  alt="Post image"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 640px) 100vw, 
           (max-width: 768px) 50vw, 
           (max-width: 1024px) 33vw, 
           25vw"
                  priority={false}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2 dark:bg-slate-800">
              <p className="text-xs text-slate-400">✨ AI Generated Image</p>
              <button
                onClick={() => {
                  const a = document.createElement('a')
                  a.href = content.imageUrl!
                  a.download = 'repurfy-image.jpg'
                  a.target = '_blank'
                  a.click()
                }}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 transition hover:text-slate-700 dark:border-slate-600 dark:hover:text-slate-200"
              >
                <Download className="h-3 w-3" /> Download
              </button>
            </div>
          </div>
        )}

        {/* Platform Cards Grid */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          {platforms.map((platform) => {
            const config = PLATFORM_CONFIG[platform]
            if (!config) return null
            const Icon = config.icon
            const text = getDisplayText(platform)
            const isEditing = editingPlatform === platform
            const isCopied = copied === platform

            return (
              <div
                key={platform}
                className="flex min-h-auto flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${config.bg}`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold dark:text-white">{config.label}</p>
                        <p className="text-xs text-slate-400">
                          {text.length} / {config.maxChars} chars
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-5 pt-2 pb-5">
                      <button
                        onClick={() => handleCopy(text, platform)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-600"
                      >
                        <Copy className="h-4 w-4" />
                        {isCopied ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleDownload(text, platform)}
                        className="flex items-center justify-center rounded-lg border border-slate-200 p-2.5 text-slate-500 transition hover:text-slate-700 dark:border-slate-600 dark:hover:text-slate-200"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingPlatform(isEditing ? null : platform)}
                        className="flex items-center justify-center rounded-lg border border-slate-200 p-2.5 text-slate-500 transition hover:text-slate-700 dark:border-slate-600 dark:hover:text-slate-200"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mx-5 border-t border-slate-100 dark:border-slate-700" />

                <div className="flex-1 px-5 py-4">
                  {isEditing ? (
                    <textarea
                      value={text}
                      onChange={(e) =>
                        setEditedTexts((prev) => ({ ...prev, [platform]: e.target.value }))
                      }
                      className="h-48 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300"
                    />
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                      {text}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Hooks & Hashtags */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {content.data.hooks?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-4 text-sm font-semibold dark:text-white">💡 Viral Hooks</p>
              <ul className="space-y-3">
                {content.data.hooks.map((hook, i) => (
                  <li key={i} className="flex items-start justify-between gap-3">
                    <p className="text-sm text-slate-600 dark:text-slate-300">{hook}</p>
                    <button
                      onClick={() => handleCopy(hook, `hook-${i}`)}
                      className="shrink-0 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-400 transition hover:text-slate-600 dark:border-slate-600"
                    >
                      {copied === `hook-${i}` ? '✓' : 'Copy'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content.data.hashtags?.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-4 text-sm font-semibold dark:text-white"># Hashtags</p>
              <div className="flex flex-wrap gap-2">
                {content.data.hashtags.map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => handleCopy(`#${tag}`, `tag-${i}`)}
                    className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 transition hover:bg-teal-50 hover:text-teal-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <Button onClick={() => router.push('/create')} variant="outline">
            ← Generate More Content
          </Button>
        </div>
      </div>
    </div>
  )
}
