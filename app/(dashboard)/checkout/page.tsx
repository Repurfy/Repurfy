// 'use client' // 👈 must be client component

// import * as React from 'react'
// import { SignedIn, ClerkLoaded } from '@clerk/nextjs'
// import {
//   CheckoutProvider,
//   useCheckout,
//   PaymentElementProvider,
//   PaymentElement,
//   usePaymentElement,
// } from '@clerk/nextjs/experimental'
// import { useRouter, useSearchParams } from 'next/navigation'

// export default function CheckoutPage() {
//   const searchParams = useSearchParams() // 👈 use this instead of async searchParams
//   const planId = searchParams.get('planId') ?? ''
//   const period = searchParams.get('period') ?? 'month'
//   const planPeriod = period === 'month' ? 'month' : 'annual'

//   console.log('planId from URL:', planId)
//   console.log('planPeriod:', planPeriod)

//   return (
//     <CheckoutProvider for="user" planId={planId} planPeriod={planPeriod}>
//       <ClerkLoaded>
//         <SignedIn>
//           <CustomCheckout />
//         </SignedIn>
//       </ClerkLoaded>
//     </CheckoutProvider>
//   )
// }

// function CustomCheckout() {
//   const { checkout } = useCheckout()
//   console.log(checkout)

//   if (checkout.status === 'needs_initialization') {
//     return (
//       <div className="flex flex-col items-center gap-4 p-10">
//         <h2 className="text-xl font-bold">Subscribe to {checkout.plan?.name}</h2>
//         <button
//           onClick={checkout.start}
//           disabled={checkout.fetchStatus === 'fetching'}
//           className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white"
//         >
//           {checkout.fetchStatus === 'fetching' ? 'Initializing...' : 'Start Checkout'}
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="mx-auto max-w-md p-6">
//       {/* Order Summary */}
//       {checkout.plan && (
//         <div className="mb-6">
//           <h2 className="text-xl font-bold">Order Summary</h2>
//           <p>{checkout.plan.name}</p>
//           <p>
//             {checkout.totals?.totalDueNow?.currencySymbol}
//             {checkout.totals?.totalDueNow?.amountFormatted}
//           </p>
//         </div>
//       )}

//       <PaymentElementProvider checkout={checkout}>
//         <PaymentSection />
//       </PaymentElementProvider>
//     </div>
//   )
// }

// function PaymentSection() {
//   const { checkout } = useCheckout()
//   const { isFormReady, submit } = usePaymentElement()
//   const [isProcessing, setIsProcessing] = React.useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!isFormReady || isProcessing) return
//     setIsProcessing(true)

//     try {
//       const { data, error } = await submit()
//       if (error) return

//       await checkout.confirm(data)
//       await checkout.finalize({
//         navigate: () => router.push('/dashboard'),
//       })
//     } catch (err) {
//       console.error('Payment failed:', err)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <PaymentElement fallback={<div>Loading payment form...</div>} />
//       {checkout.error && <p className="text-red-500">{checkout.error.message}</p>}
//       <button
//         type="submit"
//         disabled={!isFormReady || isProcessing || checkout.isConfirming}
//         className="w-full rounded-lg bg-teal-500 py-3 font-semibold text-white disabled:opacity-50"
//       >
//         {isProcessing || checkout.isConfirming ? 'Processing...' : 'Complete Purchase'}
//       </button>
//     </form>
//   )
// }

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

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('planId') ?? ''
  const period = searchParams.get('period') ?? 'month'
  const planPeriod = period === 'month' ? 'month' : 'annual'

  if (!planId) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500">No plan selected. Please go back and choose a plan.</p>
      </div>
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

function CustomCheckout() {
  const { checkout } = useCheckout()

  if (checkout.fetchStatus === 'fetching') {
    return (
      <div className="flex flex-col items-center gap-4 p-10">
        <h2 className="text-xl font-bold">Loading plan details...</h2>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      </div>
    )
  }

  if (checkout.status === 'needs_initialization') {
    return (
      <div className="flex flex-col items-center gap-4 p-10">
        <h2 className="text-xl font-bold">Complete Your Purchase</h2>
        {checkout.plan && <p className="text-gray-600">Plan: {checkout.plan.name}</p>}
        <button
          onClick={checkout.start}
          disabled={checkout.fetchStatus === 'fetching'}
          className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600 disabled:opacity-50"
        >
          {checkout.fetchStatus === 'fetching' ? 'Initializing...' : 'Start Checkout'}
        </button>
      </div>
    )
  }

  if (!checkout.plan) {
    return (
      <div className="flex flex-col items-center gap-4 p-10">
        <p>Loading checkout...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md p-6">
      {/* Test Card Info Banner - Only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm">
          <p className="font-semibold text-yellow-800">🧪 Development Mode</p>
          <p className="mt-1 text-yellow-700">
            Use test card: <strong>4242 4242 4242 4242</strong>
          </p>
          <p className="text-yellow-700">
            Exp: <strong>12/28</strong> | CVC: <strong>123</strong>
          </p>
        </div>
      )}

      {/* Order Summary */}
      <div className="mb-6 rounded-lg border p-4">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="mt-2">
          <p className="font-semibold">{checkout.plan.name}</p>
          <p className="text-gray-600">{checkout.plan.description}</p>
          {checkout.totals?.totalDueNow && (
            <p className="mt-2 text-2xl font-bold">
              {checkout.totals.totalDueNow.currencySymbol}
              {checkout.totals.totalDueNow.amountFormatted}
            </p>
          )}
        </div>
      </div>

      <PaymentElementProvider checkout={checkout}>
        <PaymentSection />
      </PaymentElementProvider>
    </div>
  )
}

function PaymentSection() {
  const { checkout } = useCheckout()
  const { isFormReady, submit } = usePaymentElement()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormReady || isProcessing) return
    setIsProcessing(true)

    try {
      const { data, error } = await submit()
      if (error) {
        console.error('Submit error:', error)
        return
      }

      await checkout.confirm(data)
      await checkout.finalize({
        navigate: () => router.push('/dashboard'),
      })
    } catch (err) {
      console.error('Payment failed:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement fallback={<div>Loading payment form...</div>} />
      {checkout.error && <p className="text-red-500">{checkout.error.message}</p>}
      <button
        type="submit"
        disabled={!isFormReady || isProcessing || checkout.isConfirming}
        className="w-full rounded-lg bg-teal-500 py-3 font-semibold text-white hover:bg-teal-600 disabled:opacity-50"
      >
        {isProcessing || checkout.isConfirming ? 'Processing...' : 'Complete Purchase'}
      </button>
    </form>
  )
}
