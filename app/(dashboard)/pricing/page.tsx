'use client'

import { PricingSection } from '@/components/home/PricingSection'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

const Pricing = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Pricing & Subscription</h1>

      {/* Current Plan Card */}
      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Current Plan</h2>
          <Button size="sm" className="text-xs font-medium text-white">
            Upgrade Plan
          </Button>
        </div>

        {/* Plan Name */}
        <p className="mt-4 text-sm">
          Plan
          <span className="float-right font-semibold">Free (3/month)</span>
        </p>

        {/* Generated Posts */}
        <p className="mt-3 text-sm">
          Total Posts Generated
          <span className="text-brand-blue float-right font-semibold">22/24</span>
        </p>

        <Slider value={[22]} max={24} step={1} className="mt-4" />
      </div>

      {/* Upgrade Plans Section */}
      <div className="-mx-6">
        <PricingSection heading="" description="" />
      </div>
    </div>
  )
}

export default Pricing
