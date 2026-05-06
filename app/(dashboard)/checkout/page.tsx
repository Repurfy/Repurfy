'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { Show, ClerkLoaded } from '@clerk/nextjs'
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

function getCheckoutErrorMessage(errors: { global: Array<{ message?: string }> | null } | null | undefined) {
  return errors?.global?.[0]?.message ?? 'Failed to load checkout. Please try again.'
}

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
          <a href="/pricing" className="text-sm text-white/70 underline transition-colors hover:text-white">
            &larr; Back to Pricing
          </a>
        </div>
      </CheckoutLayout>
    )
  }

  return (
    <CheckoutProvider key={planId} for="user" planId={planId} planPeriod={planPeriod}>
      <ClerkLoaded>
        <Show 
          when="signed-in"
          fallback={
            <CheckoutLayout>
               <div className="flex flex-col items-center gap-5 p-10 text-center">
                 <p className="text-white/80">You must be signed in to complete checkout.</p>
                 <a 
                   href="/sign-in" 
                   className="w-full rounded-md bg-teal-500 px-5 py-2.5 font-medium text-white transition-colors hover:bg-teal-600 active:scale-[0.98]"
                 >
                   Sign In to Continue
                 </a>
               </div>
            </CheckoutLayout>
          }
        >
          <CustomCheckout />
        </Show>
      </ClerkLoaded>
    </CheckoutProvider>
  )
}

/* ---------------------------
   Main Checkout Logic
--------------------------- */

function CustomCheckout() {
  // ✅ Destructure fetchStatus and errors directly from the hook
  const { checkout, fetchStatus, errors } = useCheckout()

  if (fetchStatus === 'fetching') {
    return (
      <CheckoutLayout>
        <LoadingState message="Loading plan details..." />
      </CheckoutLayout>
    )
  }

  if (errors) {
    return (
      <CheckoutLayout>
        <ErrorState message={getCheckoutErrorMessage(errors)} />
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
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md">
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
    <div className="flex flex-col items-center gap-4 p-10 text-center">
      <p className="font-medium text-red-500">{message}</p>
      <a href="/pricing" className="text-sm text-white/70 underline transition-colors hover:text-white">
        &larr; Back to Pricing
      </a>
    </div>
  )
}

function InitializationState({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 p-10 text-center">
      <h2 className="text-xl font-bold text-white">Complete Your Purchase</h2>
      <button 
        onClick={onStart} 
        className="w-full rounded-md bg-teal-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-teal-600 active:scale-[0.98]"
      >
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
    <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-bold text-white">Order Summary</h2>

      <div>
        <p className="font-semibold text-white">{planName}</p>
        {planDescription && <p className="text-sm text-white/60">{planDescription}</p>}
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
    <div className="rounded-md border border-yellow-400/50 bg-yellow-400/10 p-4 text-center text-sm font-medium text-yellow-300">
      Test Card: <span className="font-mono tracking-wider">4242 4242 4242 4242</span>
    </div>
  )
}

/* ---------------------------
   Payment Section
--------------------------- */

function PaymentSection() {
  // ✅ Destructure errors directly here as well
  const { checkout, errors } = useCheckout()
  const { isFormReady, submit } = usePaymentElement()

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [clientError, setClientError] = React.useState<string | null>(null)

  const router = useRouter()

  // ✅ Removed non-existent checkout.isConfirming
  const isDisabled = !isFormReady || isProcessing

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

      // ✅ Capture confirmation errors
      const confirmResult = await checkout.confirm(data)
      if (confirmResult.error) {
        setClientError(confirmResult.error.message ?? 'Payment confirmation failed.')
        return
      }

      await checkout.finalize({
        navigate: () => router.push('/dashboard'),
      })
    } catch (err) {
      setClientError('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="min-h-[200px]">
        <PaymentElement fallback={<LoadingState message="Loading payment form..." />} />
      </div>

      {/* ✅ Use the top-level errors object */}
      {errors && <p className="text-sm font-medium text-red-500">{getCheckoutErrorMessage(errors)}</p>}
      {clientError && <p className="text-sm font-medium text-red-500">{clientError}</p>}

      <button
        type="submit"
        disabled={isDisabled}
        className="mt-2 w-full rounded-md bg-teal-500 px-4 py-2.5 font-medium text-white transition-all hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-teal-500/50 disabled:text-white/70 active:scale-[0.98]"
      >
        {isProcessing ? 'Processing...' : 'Complete Purchase'}
      </button>
    </form>
  )
}
