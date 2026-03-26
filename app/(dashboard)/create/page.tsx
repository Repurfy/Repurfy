'use client'

import CreatePostForm from '@/components/CreatePostForm'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserDetails {
  creditsRemaining: number
  name: string
  email: string
  plan: string
  totalUsage: number
}

export default function CreateContentPage() {
  const [userData, setUserData] = useState<UserDetails | null>(null)
  const { getToken } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await getToken()
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUserData(res.data.user || null)
      } catch (error) {
        console.error('User fetch error:', error)
      }
    }

    fetchUserDetails()
  }, [getToken])

  const hasNoCredits = userData !== null && userData.creditsRemaining === 0

  return (
    <div>
      {/* No Credits Modal */}
      {hasNoCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-xl)',
            }}
            className="mx-4 flex w-full max-w-md flex-col items-center gap-4 rounded-2xl p-8 text-center"
          >
            {/* Icon */}
            <div
              style={{ background: 'var(--status-warning-bg)' }}
              className="flex h-14 w-14 items-center justify-center rounded-full"
            >
              <svg
                className="h-6 w-6"
                style={{ stroke: 'var(--status-warning)' }}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1.5">
              <h2
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
                className="text-lg font-semibold"
              >
                You&apos;re out of credits
              </h2>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
                You&apos;ve used all your available credits. Upgrade your plan to continue
                repurposing content.
              </p>
            </div>

            {/* Plan badge */}
            {userData.plan && (
              <div
                style={{
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
                className="rounded-lg px-3.5 py-1.5 text-xs"
              >
                Current plan:{' '}
                <span style={{ color: 'var(--text-primary)' }} className="font-medium">
                  {userData.plan}
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-1 flex w-full flex-col gap-2.5">
              <button
                onClick={() => router.push('/pricing')}
                className="btn-gradient w-full cursor-pointer rounded-xl py-3 text-sm font-semibold"
              >
                Upgrade Plan →
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                style={{
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-secondary)',
                }}
                className="hover:bg-surface-elevated w-full cursor-pointer rounded-xl bg-transparent py-2.5 text-sm transition-all"
              >
                Maybe later
              </button>
            </div>

            {/* Footer note */}
            <p style={{ color: 'var(--text-tertiary)' }} className="text-xs">
              Credits reset monthly on your billing date
            </p>
          </div>
        </div>
      )}

      {/* Heading Section */}
      <h1 className="text-2xl font-bold tracking-tight">Repurpose Content Across All Platforms</h1>
      <p className="text-text-secondary mt-1 mb-10 leading-relaxed">
        Upload your content, and get AI-optimized posts for Facebook, LinkedIn, Instagram & more.
      </p>

      <CreatePostForm />
    </div>
  )
}
