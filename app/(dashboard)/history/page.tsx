'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Facebook, Instagram, Linkedin, Search, Twitter, ImageIcon, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

interface ContentItem {
  _id: string
  originalInput: string
  tone: string
  audience: string
  creditsUsed: number
  createdAt: string
  platforms: string[]
  imageUrl?: string | null
  generatedContent: Record<string, string | string[]>
}

const PLATFORM_BUTTONS = [
  { title: 'LinkedIn', icon: <Linkedin size={14} /> },
  { title: 'X (Twitter)', icon: <Twitter size={14} /> },
  { title: 'Instagram', icon: <Instagram size={14} /> },
  { title: 'Facebook', icon: <Facebook size={14} /> },
]

const PLATFORM_COLORS: Record<string, string> = {
  linkedin: 'bg-[#0077B5]/10 text-[#0077B5] dark:bg-[#0077B5]/20 dark:text-[#4db6e8]',
  twitter: 'bg-[#1DA1F2]/10 text-[#1DA1F2] dark:bg-[#1DA1F2]/20 dark:text-[#60c8ff]',
  'x (twitter)': 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200',
  instagram: 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-600 dark:text-pink-400',
  facebook: 'bg-[#1877F2]/10 text-[#1877F2] dark:bg-[#1877F2]/20 dark:text-[#6aaeff]',
}

const getPlatformColor = (platform: string) =>
  PLATFORM_COLORS[platform.toLowerCase()] || 'bg-teal-500/10 text-teal-600 dark:text-teal-400'

const History = () => {
  const [history, setHistory] = useState<ContentItem[]>([])
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const { getToken } = useAuth()

  const fetchHistory = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/content/history`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })
      setHistory(res.data.data || [])
    } catch (error) {
      console.error('History fetch error:', error)
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    const debounceInterval = setTimeout(() => {
      fetchHistory()
    }, 1000)

    return () => {
      clearTimeout(debounceInterval)
    }
  }, [fetchHistory])

  const filtered = history.filter((item) => {
    const matchesSearch =
      search === '' || item.originalInput?.toLowerCase().includes(search.toLowerCase())

    const matchesPlatform =
      activeFilter === null ||
      item.platforms?.includes(activeFilter.toLowerCase().replace('x (twitter)', 'twitter'))

    return matchesSearch && matchesPlatform
  })

  return (
    <div className="h-fit">
      {/* ── Page Header ── */}
      <div className="mb-10">
        <div className="mb-1 flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Content History</h1>
        </div>
        <p className="text-text-secondary mt-1 mb-10 leading-relaxed">
          View and manage your generated content
        </p>
      </div>

      {/* ── Search + Filter Bar ── */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-full md:w-1/2 lg:w-130">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or content..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 pl-9 text-sm text-gray-700 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700/50 dark:text-white dark:placeholder:text-slate-400"
            />
            <Search
              size={15}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* All filter */}
          <Button
            size="sm"
            variant={activeFilter === null ? 'default' : 'outline'}
            onClick={() => setActiveFilter(null)}
            className={`rounded-xl px-4 text-xs font-medium transition-all ${
              activeFilter === null
                ? 'bg-teal-500 text-white shadow-sm shadow-teal-200 hover:bg-teal-600 dark:shadow-teal-900'
                : 'border-slate-200 hover:border-teal-400 dark:border-slate-600'
            }`}
          >
            All
          </Button>

          {/* Platform filters */}
          <div className="ml-auto flex flex-wrap gap-2">
            {PLATFORM_BUTTONS.map((button) => (
              <Button
                key={button.title}
                size="sm"
                variant={activeFilter === button.title ? 'default' : 'outline'}
                onClick={() => setActiveFilter(activeFilter === button.title ? null : button.title)}
                className={`gap-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === button.title
                    ? 'bg-teal-500 text-white shadow-sm shadow-teal-200 hover:bg-teal-600 dark:shadow-teal-900'
                    : 'border-slate-200 hover:border-teal-400 dark:border-slate-600'
                }`}
              >
                {button.icon}
                <span>{button.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* ── History Cards ── */}
      <div className="mt-5 space-y-4">
        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-[3px] border-teal-500 border-t-transparent" />
            <p className="text-sm font-medium text-slate-400">Loading your content history...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-600 dark:bg-slate-800">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700">
              <Sparkles className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-lg font-semibold text-slate-700 dark:text-white">
              {search || activeFilter ? 'No results found 🔍' : 'No history yet 🚀'}
            </p>
            <p className="text-text-secondary mt-1">
              {search || activeFilter
                ? 'Try adjusting your search or filter'
                : 'Generate content to see history here'}
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading &&
          filtered.map((item) => (
            <Link href={`/results/${item._id}`} key={item._id}>
              <div className="group my-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:border-teal-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-teal-700">
                <div className="p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    {/* Image thumbnail */}
                    {item.imageUrl && (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl lg:h-16 lg:w-16">
                        <Image
                          src={item.imageUrl}
                          alt="content thumbnail"
                          width={100}
                          height={100}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                      </div>
                    )}

                    {/* Left content */}
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      {/* Placeholder icon when no image */}
                      {!item.imageUrl && (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-linear-to-br from-teal-50 to-slate-100 dark:border-slate-600 dark:from-teal-900/30 dark:to-slate-700">
                          <ImageIcon className="h-6 w-6 text-teal-400/60" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[15px] leading-snug font-semibold text-slate-800 transition-colors group-hover:text-teal-600 dark:text-white">
                          {item.originalInput?.slice(0, 90)}
                          {item.originalInput?.length > 90 ? '...' : ''}
                        </h3>

                        {/* Meta badges */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                            🎯 {item.tone}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                            👥 {item.audience}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-teal-600 dark:bg-teal-900/80 dark:text-teal-400">
                            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                            {item.creditsUsed} credits
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                            📅{' '}
                            {new Date(item.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: platform badges */}
                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      {item.platforms?.map((p) => (
                        <span
                          key={p}
                          className={`rounded-full border border-transparent px-3 py-1 text-xs font-semibold capitalize ${getPlatformColor(p)}`}
                        >
                          {p}
                        </span>
                      ))}

                      {/* Subtle arrow cue */}
                      <span className="ml-1 text-lg leading-none text-slate-300 transition-colors group-hover:text-teal-400 dark:text-slate-600">
                        →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line on hover */}
                <div className="linear-gradient-to-r h-0.5 w-0 from-teal-400 to-teal-600 transition-all duration-300 group-hover:w-full" />
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default History
