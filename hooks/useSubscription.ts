'use client'

import { usePlans } from '@clerk/nextjs/experimental'
import { useUser } from '@clerk/nextjs'

export const useSubscription = () => {
  const { user } = useUser()
  const { data: plans } = usePlans({ forResource: 'user' })

  const subscribe = async (clerkPlanId: string, isYearly: boolean) => {
    const plan = plans?.find((p) => p.id === clerkPlanId)
    if (!plan) return

    // Pick monthly or yearly price based on toggle
    const price = plan.prices?.find((p) =>
      isYearly ? p.interval === 'year' : p.interval === 'month'
    )
    if (!price) return

    await user.billing?.startSubscription({ planId: plan.id, planPeriodId: price.id })
  }

  return { subscribe, plans }
}
