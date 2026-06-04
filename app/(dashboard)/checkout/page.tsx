'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { Show, ClerkLoaded, useAuth } from '@clerk/nextjs'
import {
  CheckoutProvider,
  useCheckout,
  PaymentElementProvider,
  PaymentElement,
  usePaymentElement,
} from '@clerk/nextjs/experimental'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

/* ---------------------------
   Types
--------------------------- */

type PlanPeriod = 'month' | 'annual'

function getCheckoutErrorMessage(
  errors: { global: Array<{ message?: string }> | null } | null | undefined
) {
  return errors?.global?.[0]?.message ?? 'Failed to load checkout. Please try again.'
}

/* ---------------------------
   Root Page
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
   Search Params & State Lifecycle
--------------------------- */

function CheckoutContent() {
  const searchParams = useSearchParams()

  const initialPlanId = searchParams.get('planId') ?? ''
  const period = searchParams.get('period') ?? 'month'
  const planPeriod: PlanPeriod = period === 'annual' ? 'annual' : 'month'

  // Promo code states hosted outside CheckoutProvider so they are not lost when provider re-keys
  const [currentPlanId, setCurrentPlanId] = React.useState(initialPlanId)
  const [promoCode, setPromoCode] = React.useState('')
  const [isValidating, setIsValidating] = React.useState(false)
  const [promoError, setPromoError] = React.useState<string | null>(null)
  const [promoSuccess, setPromoSuccess] = React.useState<string | null>(null)
  const [appliedPromo, setAppliedPromo] = React.useState<any>(null)
  const [originalPrice, setOriginalPrice] = React.useState<number | null>(null)

  // Allowed public base plan IDs
  const PUBLIC_PLANS = [
    'cplan_3C12qrzMoJBkPHicFrODWaLqX2a', // Starter
    'cplan_3C142ZHPXSrbzW3a9Hva337SoZt'  // Creator
  ]

  const isDirectlyAccessingDiscount = !PUBLIC_PLANS.includes(initialPlanId)
  const hasValidatedPromo = appliedPromo !== null
  const isAuthorized = !isDirectlyAccessingDiscount || hasValidatedPromo

  // Sync current plan if query plan changes
  React.useEffect(() => {
    setCurrentPlanId(initialPlanId)
    setAppliedPromo(null)
    setPromoSuccess(null)
    setPromoError(null)
  }, [initialPlanId])

  if (!initialPlanId) {
    return (
      <CheckoutLayout>
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="font-medium text-red-500">
            No plan selected. Please go back and choose a plan.
          </p>
          <a
            href="/pricing"
            className="text-sm text-white/70 underline transition-colors hover:text-white"
          >
            &larr; Back to Pricing
          </a>
        </div>
      </CheckoutLayout>
    )
  }

  if (!isAuthorized) {
    return (
      <CheckoutLayout>
        <div className="flex flex-col items-center gap-4 p-10 text-center">
          <p className="font-medium text-red-500">
            Invalid checkout plan. Discounted plans cannot be accessed directly.
          </p>
          <a
            href="/pricing"
            className="text-sm text-white/70 underline transition-colors hover:text-white"
          >
            &larr; Back to Pricing
          </a>
        </div>
      </CheckoutLayout>
    )
  }

  return (
    <CheckoutProvider key={currentPlanId} for="user" planId={currentPlanId} planPeriod={planPeriod}>
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
          <CustomCheckout
            initialPlanId={initialPlanId}
            currentPlanId={currentPlanId}
            setCurrentPlanId={setCurrentPlanId}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            isValidating={isValidating}
            setIsValidating={setIsValidating}
            promoError={promoError}
            setPromoError={setPromoError}
            promoSuccess={promoSuccess}
            setPromoSuccess={setPromoSuccess}
            appliedPromo={appliedPromo}
            setAppliedPromo={setAppliedPromo}
            originalPrice={originalPrice}
            setOriginalPrice={setOriginalPrice}
          />
        </Show>
      </ClerkLoaded>
    </CheckoutProvider>
  )
}

/* ---------------------------
   Main Checkout Controller Component
--------------------------- */

interface CustomCheckoutProps {
  initialPlanId: string
  currentPlanId: string
  setCurrentPlanId: React.Dispatch<React.SetStateAction<string>>
  promoCode: string
  setPromoCode: React.Dispatch<React.SetStateAction<string>>
  isValidating: boolean
  setIsValidating: React.Dispatch<React.SetStateAction<boolean>>
  promoError: string | null
  setPromoError: React.Dispatch<React.SetStateAction<string | null>>
  promoSuccess: string | null
  setPromoSuccess: React.Dispatch<React.SetStateAction<string | null>>
  appliedPromo: any
  setAppliedPromo: React.Dispatch<React.SetStateAction<any>>
  originalPrice: number | null
  setOriginalPrice: React.Dispatch<React.SetStateAction<number | null>>
}

function CustomCheckout({
  initialPlanId,
  currentPlanId,
  setCurrentPlanId,
  promoCode,
  setPromoCode,
  isValidating,
  setIsValidating,
  promoError,
  setPromoError,
  promoSuccess,
  setPromoSuccess,
  appliedPromo,
  setAppliedPromo,
  originalPrice,
  setOriginalPrice,
}: CustomCheckoutProps) {
  const { checkout, fetchStatus, errors } = useCheckout()
  const { getToken } = useAuth()

  const handleRemovePromo = React.useCallback(() => {
    setAppliedPromo(null)
    setPromoCode('')
    setPromoSuccess(null)
    setPromoError(null)
    setCurrentPlanId(initialPlanId)
  }, [initialPlanId, setAppliedPromo, setPromoCode, setPromoSuccess, setPromoError, setCurrentPlanId])

  // ✅ Auto-initialize — no "Start Checkout" button needed
  React.useEffect(() => {
    if (checkout.status === 'needs_initialization') {
      checkout.start()
    }
  }, [checkout.status])

  // Capture original price only once when initial plan loaded
  React.useEffect(() => {
    if (
      currentPlanId === initialPlanId &&
      checkout?.totals?.totalDueNow?.amountFormatted &&
      originalPrice === null
    ) {
      const parsed = parseFloat(
        checkout.totals.totalDueNow.amountFormatted.replace(/[^0-9.]/g, '')
      )
      if (!isNaN(parsed) && parsed > 0) {
        setOriginalPrice(parsed)
      }
    }
  }, [checkout?.totals, currentPlanId, initialPlanId, originalPrice, setOriginalPrice])

  // 🔍 Temporary lifecycle and Clerk checkout debug logs
  React.useEffect(() => {
    console.log('[Checkout Debug] CustomCheckout Lifecycle:', {
      initialPlanId,
      currentPlanId,
      originalPrice,
      appliedPromoCode: appliedPromo?.code,
      fetchStatus,
      checkoutStatus: checkout.status,
      globalErrors: errors?.global,
    })
  }, [initialPlanId, currentPlanId, originalPrice, appliedPromo, fetchStatus, checkout.status, errors])

  // 1. Real errors checked first to prevent loading spinner hang on bad planIds
  if (errors?.global && errors.global.length > 0) {
    return (
      <CheckoutLayout>
        <ErrorState message={getCheckoutErrorMessage(errors)} onReset={handleRemovePromo} />
      </CheckoutLayout>
    )
  }

  // 2. Loading
  if (fetchStatus === 'fetching' || checkout.status === 'needs_initialization') {
    return (
      <CheckoutLayout>
        <LoadingState message="Loading checkout..." />
      </CheckoutLayout>
    )
  }

  // 3. Plan not ready yet
  if (!checkout.plan) {
    return (
      <CheckoutLayout>
        <LoadingState message="Preparing checkout..." />
      </CheckoutLayout>
    )
  }

  const { plan, totals } = checkout

  const currentPrice = totals?.totalDueNow?.amountFormatted
    ? parseFloat(totals.totalDueNow.amountFormatted.replace(/[^0-9.]/g, ''))
    : null

  const currencySymbol = totals?.totalDueNow?.currencySymbol ?? '$'
  const discountAmount =
    originalPrice !== null && currentPrice !== null
      ? Number((originalPrice - currentPrice).toFixed(2))
      : 0

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoCode.trim()) return

    try {
      setIsValidating(true)
      setPromoError(null)
      setPromoSuccess(null)

      const token = await getToken()
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/billing/promo/validate`,
        { code: promoCode.trim(), planId: initialPlanId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = res.data
      if (data.success && data.isValid) {
        setAppliedPromo(data)
        setPromoSuccess(data.message || 'Promo code applied successfully!')
        if (data.discountedClerkPlanId) {
          setCurrentPlanId(data.discountedClerkPlanId)
        }
      } else {
        setPromoError(data.message || 'Invalid promo code.')
      }
    } catch (err) {
      console.error('Promo validation error:', err)
      setPromoError('Failed to validate promo code. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }


  return (
    <CheckoutLayout>
      <div className="mx-auto w-full max-w-md space-y-5 p-6">
        <DevTestBanner />

        <OrderSummary
          planName={plan.name}
          currencySymbol={currencySymbol}
          originalPrice={originalPrice}
          currentPrice={currentPrice}
          discountAmount={discountAmount}
          appliedPromo={appliedPromo}
        />

        {/* Promo Code Card */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Have a Promo Code?
          </label>
          {appliedPromo ? (
            <div className="flex items-center justify-between rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-sm text-teal-400">
              <span className="font-semibold">{appliedPromo.code} Applied</span>
              <button
                type="button"
                onClick={handleRemovePromo}
                className="text-xs text-white/50 underline hover:text-white"
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code (e.g. SAVE20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
              />
              <button
                type="submit"
                disabled={isValidating || !promoCode.trim()}
                className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-teal-600 disabled:opacity-50"
              >
                {isValidating ? 'Applying...' : 'Apply'}
              </button>
            </form>
          )}

          {promoError && (
            <p className="text-xs font-medium text-red-400">{promoError}</p>
          )}
          {promoSuccess && !promoError && (
            <p className="text-xs font-medium text-teal-400">{promoSuccess}</p>
          )}
        </div>

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

function ErrorState({ message, onReset }: { message: string; onReset?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 p-10 text-center">
      <p className="font-medium text-red-500">{message}</p>
      
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-2 rounded-md bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm px-5 py-2.5 shadow-lg active:scale-95 transition-all"
        >
          Reset to Original Plan
        </button>
      )}

      <a
        href="/pricing"
        className="text-sm text-white/70 underline transition-colors hover:text-white"
      >
        &larr; Back to Pricing
      </a>
    </div>
  )
}

/* ---------------------------
   Order Summary Component
--------------------------- */

function OrderSummary({
  planName,
  currencySymbol,
  originalPrice,
  currentPrice,
  discountAmount,
  appliedPromo,
}: {
  planName: string
  currencySymbol: string
  originalPrice: number | null
  currentPrice: number | null
  discountAmount: number
  appliedPromo: any
}) {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-bold text-white">Order Summary</h2>

      <div className="flex justify-between items-center text-sm">
        <span className="text-white/80">Plan Name</span>
        <span className="font-semibold text-white">{planName}</span>
      </div>

      {originalPrice !== null && (
        <div className="space-y-2 border-t border-white/5 pt-3 text-sm">
          {discountAmount > 0 ? (
            <>
              <div className="flex justify-between text-white/70">
                <span>Original Price</span>
                <span>
                  {currencySymbol}
                  {originalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-teal-400 font-medium">
                <span>Discount {appliedPromo ? `(${appliedPromo.code})` : ''}</span>
                <span>
                  -{currencySymbol}
                  {discountAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white border-t border-white/5 pt-2">
                <span>Total Due Now</span>
                <span className="text-teal-400">
                  {currencySymbol}
                  {(currentPrice ?? originalPrice).toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-base font-bold text-white pt-1">
              <span>Total Due Now</span>
              <span className="text-teal-400">
                {currencySymbol}
                {originalPrice.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}
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
      Test Card:{' '}
      <span className="font-mono tracking-wider">4242 4242 4242 4242</span>
    </div>
  )
}

/* ---------------------------
   Payment Section
--------------------------- */

function PaymentSection() {
  const { checkout, errors } = useCheckout()
  const { isFormReady, submit } = usePaymentElement()

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [clientError, setClientError] = React.useState<string | null>(null)

  const router = useRouter()

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

      const confirmResult = await checkout.confirm(data)
      if (confirmResult.error) {
        setClientError(confirmResult.error.message ?? 'Payment confirmation failed.')
        return
      }

      // ✅ upgraded=true triggers polling on dashboard
      await checkout.finalize({
        navigate: () => router.push('/dashboard?upgraded=true'),
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
        <PaymentElement
          fallback={<LoadingState message="Loading payment form..." />}
        />
      </div>

      {/* ✅ Fixed: only show when real global error exists */}
      {errors?.global && errors.global.length > 0 && (
        <p className="text-sm font-medium text-red-500">
          {getCheckoutErrorMessage(errors)}
        </p>
      )}

      {/* Client-side errors */}
      {clientError && (
        <p className="text-sm font-medium text-red-500">{clientError}</p>
      )}

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
