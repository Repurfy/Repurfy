import PricingSection from '@/components/home/PricingSection'
import { Button } from '@/components/ui/button'
import { PricingTable } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react'

const Billing = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
      <p className="text-text-secondary mt-1 mb-10 leading-relaxed">
        Manage your plan and subscription details
      </p>
      {/* Current Plan Card */}
      <div className="mx-auto mb-10 flex w-full flex-col items-center justify-between rounded-xl bg-white p-6 shadow-sm md:w-2/3 md:flex-row dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-brand-teal/30 text-brand-teal rounded-full p-3">
            <Sparkles />
          </div>
          <div>
            <h2 className="text-lg">You&apos;re on the free plan</h2>
            <p className="text-sm">12 of 25 posts used this month</p>
          </div>
        </div>
        <Button>Upgrade Plan </Button>
      </div>
      {/* Upgrade Plans Section */}
      <div className="-mt-16">
        <PricingSection heading="Upgrade Your Plan" description="" />
      </div>
      {/* Manage Subscription */}
      {/* <div>
        <div className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
          <h2 className="text-2xl font-bold">Manage Subscription</h2>
          <Button variant="outline">View Billing Details</Button>
          <Button variant="destructive">Cancel Subscription</Button>
        </div>
      </div> */}
    </div>
  )
}

export default Billing
