'use client'

import * as React from 'react'
import { SignedIn, ClerkLoaded } from '@clerk/nextjs'
import {
  CheckoutProvider,
  useCheckout,
  PaymentElementProvider,
  PaymentElement,
  usePaymentElement,
} from '@clerk/nextjs/experimental'
import { useRouter, useSearchParams } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanPeriod = 'month' | 'annual'

// ─── Root Page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const searchParams = useSearchParams()

  const planId = searchParams.get('planId') ?? ''
  const period = searchParams.get('period') ?? 'month'
  const planPeriod: PlanPeriod = period === 'annual' ? 'annual' : 'month'

  if (!planId) {
    return (
      <CheckoutLayout>
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="text-status-error font-medium">
            No plan selected. Please go back and choose a plan.
          </p>
          <a href="/pricing" className="btn-secondary text-sm">
            ← Back to Pricing
          </a>
        </div>
      </CheckoutLayout>
    )
  }

  return (
    <CheckoutProvider key={planId} for="user" planId={planId} planPeriod={planPeriod}>
      <ClerkLoaded>
        <SignedIn>
          <CustomCheckout />
        </SignedIn>
      </ClerkLoaded>
    </CheckoutProvider>
  )
}

// ─── Main Checkout Orchestrator ───────────────────────────────────────────────

function CustomCheckout() {
  const { checkout } = useCheckout()

  // 1. Fetching initial plan data
  if (checkout.fetchStatus === 'fetching') {
    return (
      <CheckoutLayout>
        <LoadingState message="Loading plan details..." />
      </CheckoutLayout>
    )
  }

  // 2. Fetch error
  if (checkout.fetchStatus === 'error') {
    return (
      <CheckoutLayout>
        <ErrorState message="Failed to load plan. Please try again." />
      </CheckoutLayout>
    )
  }

  // 3. Checkout not started — fetchStatus is now 'idle', status is 'needs_initialization'
  // At this point TypeScript knows fetchStatus ∈ { 'idle' | 'error' }
  // We check status separately to access plan safely
  if (checkout.status === 'needs_initialization') {
    return (
      <CheckoutLayout>
        {/* <InitializationState planName={checkout.plan?.name ?? 'Hello'} onStart={checkout.start} /> */}
        <InitializationState onStart={checkout.start} />
      </CheckoutLayout>
    )
  }

  // 4. Plan not loaded yet (edge case between state transitions)
  if (!checkout.plan) {
    return (
      <CheckoutLayout>
        <LoadingState message="Preparing checkout..." />
      </CheckoutLayout>
    )
  }

  // 5. Ready — checkout is initialized and plan is confirmed non-null
  const { plan, totals } = checkout

  return (
    <CheckoutLayout>
      <div className="mx-auto w-full max-w-md space-y-5 p-6">
        <DevTestBanner />

        <OrderSummary
          planName={plan.name}
          planDescription={plan.description ?? null}
          currencySymbol={totals?.totalDueNow?.currencySymbol ?? '$'}
          amountFormatted={totals?.totalDueNow?.amountFormatted ?? '—'}
        />

        <PaymentElementProvider checkout={checkout}>
          <PaymentSection />
        </PaymentElementProvider>
      </div>
    </CheckoutLayout>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="card-repurfy w-full max-w-md border-white/10 bg-white/4">{children}</div>
    </main>
  )
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <div className="border-brand-teal h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      <p className="text-sm text-white/60">{message}</p>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-10 text-center">
      <div className="badge-error text-sm">{message}</div>
      <a href="/pricing" className="btn-secondary text-sm">
        ← Back to Pricing
      </a>
    </div>
  )
}

interface InitializationStateProps {
  // planName: string | null
  onStart: () => void
}

function InitializationState({ onStart }: InitializationStateProps) {
  return (
    <div className="flex flex-col items-center gap-5 p-10 text-center">
      <h2 className="text-xl font-bold text-white">Complete Your Purchase</h2>
      {/* {planName && (
        <p className="text-sm text-white/60">
          Plan: <span className="font-medium text-white">{planName}</span>
        </p>
      )} */}
      <button onClick={onStart} className="btn-gradient w-full max-w-xs">
        Start Checkout
      </button>
    </div>
  )
}

interface OrderSummaryProps {
  planName: string
  planDescription: string | null
  currencySymbol: string
  amountFormatted: string
}

function OrderSummary({
  planName,
  planDescription,
  currencySymbol,
  amountFormatted,
}: OrderSummaryProps) {
  return (
    <div className="glass space-y-3 rounded-xl border border-white/10 p-5">
      <h2 className="text-lg font-bold text-white">Order Summary</h2>
      <div className="space-y-1">
        <p className="font-semibold text-white">{planName}</p>
        {planDescription && <p className="text-sm text-white/50">{planDescription}</p>}
      </div>
      <p className="text-brand-gradient text-3xl font-bold">
        {currencySymbol}
        {amountFormatted}
      </p>
    </div>
  )
}

// Dev-only test card banner — tree-shaken in production builds
function DevTestBanner() {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="space-y-1 rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm">
      <p className="font-semibold text-yellow-300">🧪 Development Mode</p>
      <p className="text-yellow-200/70">
        Test card: <strong className="text-yellow-200">4242 4242 4242 4242</strong>
      </p>
      <p className="text-yellow-200/70">
        Exp: <strong className="text-yellow-200">12/28</strong> · CVC:{' '}
        <strong className="text-yellow-200">123</strong>
      </p>
    </div>
  )
}

// ─── Payment Section ───────────────────────────────────────────────────────────

function PaymentSection() {
  const { checkout } = useCheckout()
  const { isFormReady, submit } = usePaymentElement()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [clientError, setClientError] = React.useState<string | null>(null)
  const router = useRouter()

  const isDisabled = !isFormReady || isProcessing || checkout.isConfirming

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isDisabled) return

    setClientError(null)
    setIsProcessing(true)

    try {
      const { data, error } = await submit()

      if (error) {
        setClientError(error.error.message ?? 'Payment submission failed.')
        return
      }

      await checkout.confirm(data)
      await checkout.finalize({
        navigate: () => router.push('/dashboard'),
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setClientError(message)
    } finally {
      setIsProcessing(false)
    }
  }

  const buttonLabel = (() => {
    if (isProcessing) return 'Processing...'
    if (checkout.isConfirming) return 'Confirming...'
    return 'Complete Purchase'
  })()

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement fallback={<LoadingState message="Loading payment form..." />} />

      {/* Clerk checkout error */}
      {checkout.error && <p className="badge-error text-xs">{checkout.error.message}</p>}

      {/* Client-side error */}
      {clientError && <p className="badge-error text-xs">{clientError}</p>}

      <button
        type="submit"
        disabled={isDisabled}
        className="btn-gradient w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none"
      >
        {buttonLabel}
      </button>
    </form>
  )
}
