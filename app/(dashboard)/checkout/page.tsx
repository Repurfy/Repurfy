'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { SignedIn, ClerkLoaded } from '@clerk/nextjs'
import {
  CheckoutProvider,
  useCheckout,
  PaymentElementProvider,
  PaymentElement,
  usePaymentElement,
} from '@clerk/nextjs/experimental'
import { useRouter, useSearchParams } from 'next/navigation'

/* ---------------------------
   Types
--------------------------- */

type PlanPeriod = 'month' | 'annual'

/* ---------------------------
   Root Page (Wrapped in Suspense)
--------------------------- */

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <CheckoutLayout>
          <LoadingState message="Loading checkout..." />
        </CheckoutLayout>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}

/* ---------------------------
   Search Params Logic Component
--------------------------- */

function CheckoutContent() {
  const searchParams = useSearchParams()

  const planId = searchParams.get('planId') ?? ''
  const period = searchParams.get('period') ?? 'month'

  const planPeriod: PlanPeriod = period === 'annual' ? 'annual' : 'month'

  if (!planId) {
    return (
      <CheckoutLayout>
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="font-medium text-red-500">
            No plan selected. Please go back and choose a plan.
          </p>
          <a href="/pricing" className="text-sm underline">
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

/* ---------------------------
   Main Checkout Logic
--------------------------- */

function CustomCheckout() {
  const { checkout } = useCheckout()

  if (checkout.fetchStatus === 'fetching') {
    return (
      <CheckoutLayout>
        <LoadingState message="Loading plan details..." />
      </CheckoutLayout>
    )
  }

  if (checkout.fetchStatus === 'error') {
    return (
      <CheckoutLayout>
        <ErrorState message="Failed to load checkout. Please try again." />
      </CheckoutLayout>
    )
  }

  if (checkout.status === 'needs_initialization') {
    return (
      <CheckoutLayout>
        <InitializationState onStart={checkout.start} />
      </CheckoutLayout>
    )
  }

  if (!checkout.plan) {
    return (
      <CheckoutLayout>
        <LoadingState message="Preparing checkout..." />
      </CheckoutLayout>
    )
  }

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

/* ---------------------------
   Shared Layout
--------------------------- */

function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-black/40">
        {children}
      </div>
    </main>
  )
}

/* ---------------------------
   UI States
--------------------------- */

function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      <p className="text-sm text-white/60">{message}</p>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <p className="text-red-500">{message}</p>
      <a href="/pricing">← Back to Pricing</a>
    </div>
  )
}

function InitializationState({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 p-10">
      <h2 className="text-xl font-bold text-white">Complete Your Purchase</h2>

      <button onClick={onStart} className="w-full rounded bg-teal-500 px-4 py-2 text-white">
        Start Checkout
      </button>
    </div>
  )
}

/* ---------------------------
   Order Summary
--------------------------- */

function OrderSummary({
  planName,
  planDescription,
  currencySymbol,
  amountFormatted,
}: {
  planName: string
  planDescription: string | null
  currencySymbol: string
  amountFormatted: string
}) {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 p-5">
      <h2 className="text-lg font-bold text-white">Order Summary</h2>

      <div>
        <p className="font-semibold text-white">{planName}</p>

        {planDescription && <p className="text-sm text-white/50">{planDescription}</p>}
      </div>

      <p className="text-3xl font-bold text-teal-400">
        {currencySymbol}
        {amountFormatted}
      </p>
    </div>
  )
}

/* ---------------------------
   Dev Banner
--------------------------- */

function DevTestBanner() {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="rounded border border-yellow-400 p-4 text-yellow-300">
      Test Card: 4242 4242 4242 4242
    </div>
  )
}

/* ---------------------------
   Payment Section
--------------------------- */

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

    try {
      setIsProcessing(true)
      setClientError(null)

      const { data, error } = await submit()

      if (error) {
        setClientError(error.error.message ?? 'Payment submission failed.')
        return
      }

      await checkout.confirm(data)

      checkout.finalize({
        navigate: () => router.push('/dashboard'),
      })
    } catch (err) {
      setClientError('Payment failed.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement fallback={<LoadingState message="Loading payment form..." />} />

      {checkout.error && <p className="text-sm text-red-500">{checkout.error.message}</p>}

      {clientError && <p className="text-sm text-red-500">{clientError}</p>}

      <button
        type="submit"
        disabled={isDisabled}
        className="rounded bg-teal-500 px-4 py-2 text-white"
      >
        {isProcessing
          ? 'Processing...'
          : checkout.isConfirming
            ? 'Confirming...'
            : 'Complete Purchase'}
      </button>
    </form>
  )
}
