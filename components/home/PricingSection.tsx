'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Variants } from 'framer-motion'

/* ---------------------------
   Types
   --------------------------- */
interface PricingFeature {
  text: string
}

interface PricingPlan {
  id: string
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
    name: 'Starter',
    description: 'For new creators repurposing content occasionally.',
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    features: [
      { text: '5 repurposed posts / month' },
      { text: '1 content input per week' },
      { text: 'AI Hooks & Captions Generator' },
      { text: 'Auto-Resize for 2 Platforms' },
      { text: 'Basic Brand Voice Setting' },
      { text: 'Watermarked Exports' },
    ],
    button: { text: 'Get Started Free', url: '#' },
  },
  {
    id: 'creator',
    name: 'Creator',
    description: 'For full-time creators who want to scale faster with automation.',
    monthlyPrice: '$39',
    yearlyPrice: '$299',
    recommended: true,
    features: [
      { text: 'Up to 120 repurposed posts / month' },
      { text: '10 content inputs per week' },
      { text: 'Supports Shorts, Reels, TikTok, LinkedIn & X' },
      { text: 'Smart Content Calendar Export' },
      { text: 'AI Brand Voice Memory (stay consistent everywhere)' },
      { text: 'Remove Watermark' },
      { text: 'Priority Support' },
    ],
    button: { text: 'Upgrade to Creator', url: '#' },
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'For agencies managing multiple clients and content workflows at scale.',
    monthlyPrice: '$129',
    yearlyPrice: '$999',
    features: [
      { text: 'Unlimited repurposed posts / month' },
      { text: 'Unlimited content inputs' },
      { text: 'Manage up to 10 clients' },
      { text: 'Team Collaboration: Assign & Review' },
      { text: 'Bulk Upload & Bulk Export' },
      { text: 'Advanced Content Calendar Automation' },
      { text: 'Dedicated Success Manager' },
      { text: 'Priority AI Processing Queue' },
    ],
    button: { text: 'Book a Demo', url: '#' },
  },
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

const badgeFloat = {
  animate: {
    y: [-2, 2, -2],
    transition: { duration: 2.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
  },
} as const satisfies Variants

export const PricingSection = ({
  heading = 'Pricing',
  description = 'Check out our affordable pricing plans',
  plans = defaultPlans,
}: {
  heading?: string
  description?: string
  plans?: PricingPlan[]
}) => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-20">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <motion.h2
            className="font-ai text-3xl font-semibold sm:text-4xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {heading}
          </motion.h2>

          <motion.p
            className={`text-muted-foreground lg:text-xl ${description.length > 0 ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.5 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex items-center gap-3 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
          >
            <span>Monthly</span>

            {/* Switch: ensure thumb is white in both states */}
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
              className="bg-muted-foreground data-[state=checked]:bg-brand-teal cursor-pointer rounded-full p-0.5 [&_span]:bg-white! data-[state=checked]:[&_span]:bg-white!"
            />

            <span>Yearly</span>
          </motion.div>

          <div className="flex flex-col items-stretch gap-6 md:flex-row lg:gap-16">
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
                <Card className="relative flex w-80 flex-col justify-between text-left shadow-sm transition-shadow hover:shadow-xl">
                  {plan.recommended && (
                    <motion.div
                      className="bg-brand-teal absolute top-0 right-0 rounded-bl-md px-3 py-1 text-sm font-semibold text-white"
                      variants={badgeFloat}
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
                      <span className="text-muted-foreground ml-2 text-2xl font-semibold">
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
                    <Button asChild className="w-full font-semibold text-white">
                      <a href={plan.button.url} target="_blank" rel="noreferrer">
                        {plan.button.text}
                      </a>
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
