'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Variants } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '@/context/userContext'

/* ---------------------------
   Types
   --------------------------- */
interface PricingFeature {
  text: string
}

interface PricingPlan {
  id: string
  clerkPlanId: string
  name: string
  description: string
  monthlyPrice: string
  yearlyPrice: string
  recommended?: boolean
  features: PricingFeature[]
  button: {
    text: string
    url: string
  }
}

/* ---------------------------
   Local plans data (self-contained)
   --------------------------- */
const defaultPlans: PricingPlan[] = [
  {
    id: 'starter',
    clerkPlanId: 'YOUR_CLERK_STARTER_PLAN_ID',
    name: 'Starter',
    description: 'For creators just starting their repurposing journey',
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    features: [
      { text: '5 repurposed posts/month' },
      { text: '1 content input per week' },
      { text: 'AI Hooks and Captions Generator' },
      { text: 'Auto-Resize for 2 Platforms' },
      { text: 'Basic Brand Voice Setting' },
      // { text: 'Watermarked Exports' },
    ],
    button: { text: 'Get Started Free', url: '#' },
  },
  {
    id: 'creator',
    clerkPlanId: 'cplan_3C142ZHPXSrbzW3a9Hva337SoZt',
    name: 'Creator',
    description: 'For full-time creators scaling their personal brand.',
    monthlyPrice: '$39',
    yearlyPrice: '$300',
    recommended: true,
    features: [
      { text: 'Up to 120 repurposed posts/month' },
      { text: '10 content inputs per week' },
      { text: 'Supports Shorts, Reels, LinkedIn and X' },
      { text: 'Smart Content Calendar Export' },
      { text: 'AI Brand Voice Memory (stay consistent everywhere)' },
      // { text: 'Remove Watermark' },
      { text: 'Priority Support' },
    ],
    button: { text: 'Upgrade to Creator', url: '#' },
  },
  // {
  //   id: 'agency',
  // clerkPlanId: 'YOUR_CLERK_STARTER_PLAN_ID',
  //   name: 'Agency',
  //   description: 'For teams managing multiple clients at scale.',
  //   monthlyPrice: '$129',
  //   yearlyPrice: '$999',
  //   features: [
  //     { text: 'Unlimited repurposed posts/month' },
  //     { text: 'Unlimited content inputs' },
  //     { text: 'Manage up to 10 clients' },
  //     { text: 'Team Collaboration: Assign & Review' },
  //     { text: 'Bulk Upload & Bulk Export' },
  //     { text: 'Advanced Content Calendar Automation' },
  //     { text: 'Dedicated Success Manager' },
  //     { text: 'Priority AI Processing Queue' },
  //   ],
  //   button: { text: 'Book a Demo', url: '#' },
  // },
]

/* ---------------------------
   Framer variants
   --------------------------- */
const cardVariants = {
  hidden: { opacity: 0, y: 70, scale: 0.985 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.58, ease: 'easeOut' },
  }),
} as const satisfies Variants

const fadeUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})

const badgePop: Variants = {
  animate: {
    scale: [1, 1.06, 1],
    y: [0, -2, 0],
    boxShadow: [
      '0 0 0px rgba(110,207,174,0.0)',
      '0 0 14px rgba(110,207,174,0.45)',
      '0 0 0px rgba(110,207,174,0.0)',
    ],
    transition: {
      duration: 3.2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

export const PricingSection = ({
  plans = defaultPlans,
}: {
  heading?: string
  description?: string
  plans?: PricingPlan[]
}) => {
  const [isYearly, setIsYearly] = useState(false)
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const handleSubscribe = async (plan: PricingPlan) => {
    if (plan.monthlyPrice === '$0') {
      router.push('/dashboard') // or wherever you want to send free users
      return
    }
    const period = isYearly ? 'annual' : 'month'
    router.push(`/checkout?planId=${plan.clerkPlanId}&period=${period}`)
  }

  const { userData } = useUser()

  return (
    <section id="pricing" className="my-20">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp(0)}
            className={`${pathname === '/pricing' ? 'hidden' : 'text-brand-gradient -mb-2 font-sans leading-10 font-bold tracking-wide uppercase'}`}
          >
            Pricing
          </motion.h2>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp(0)}
            className={`${pathname === '/pricing' ? 'hidden' : 'font-ai text-center text-2xl font-bold text-white sm:text-3xl lg:text-6xl lg:leading-14'}`}
          >
            Simple, transparent <span className="text-brand-teal">pricing</span>
          </motion.h2>

          <motion.div
            className="flex items-center gap-3 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
          >
            <span className="font-medium">Monthly</span>

            {/* Switch: ensure thumb is white in both states */}
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
              className="bg-muted-foreground data-[state=checked]:bg-brand-teal cursor-pointer rounded-full p-0.5 [&_span]:bg-white! data-[state=checked]:[&_span]:bg-white!"
            />
            <div className="flex gap-2">
              <span
                className={`font-medium transition-colors ${isYearly ? 'text-white' : 'text-muted-foreground'}`}
              >
                Yearly
              </span>
              <span className="text-brand-gradient font-sans font-bold">Save 20%</span>
            </div>
          </motion.div>

          <div className="my-6 flex flex-col items-stretch gap-6 md:flex-row lg:my-24 lg:gap-16">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }} // allows retrigger when scrolling
                whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
              >
                <Card
                  className={`relative flex w-80 flex-col justify-between overflow-hidden text-left shadow-sm transition-shadow hover:shadow-xl ${plan.recommended ? 'border-brand-teal glow-hover shadow-[0_0_30px_rgba(110,207,174,0.5)] lg:-my-12' : 'glow-hover border border-transparent'} `}
                >
                  {plan.recommended && (
                    <motion.div
                      className="bg-brand-teal absolute top-0 right-0 rounded-bl-md px-3 py-1 text-sm font-semibold text-white"
                      variants={badgePop}
                      animate="animate"
                    >
                      Recommended
                    </motion.div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>

                    <motion.div
                      key={isYearly ? `year-${plan.id}` : `month-${plan.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.36 }}
                      className="mt-4 flex items-end"
                    >
                      <span className="text-brand-teal text-4xl font-semibold">
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground text-xl">
                        {isYearly ? '/yr' : '/mo'}
                      </span>
                    </motion.div>
                  </CardHeader>

                  <CardContent>
                    <Separator className="mb-6" />
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
                          <Check size={18} className="text-brand-teal shrink-0" />
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <Button
                      onClick={() => handleSubscribe(plan)}
                      disabled={
                        loadingPlanId === plan.id ||
                        (userData?.plan === 'free' && plan.id === 'starter')
                      }
                      className="w-full font-semibold text-white"
                    >
                      {loadingPlanId === plan.id
                        ? 'Processing...'
                        : userData?.plan === 'free' && plan.id === 'starter'
                          ? 'Subscribed'
                          : plan.button.text}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default PricingSection
