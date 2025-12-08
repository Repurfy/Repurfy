'use client'

import { CircleCheck } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

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

interface PricingSectionProps {
  heading?: string
  description?: string
  plans?: PricingPlan[]
}

const PricingSection = ({
  heading = 'Pricing',
  description = 'Check out our affordable pricing plans',
  plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'For personal use',
      monthlyPrice: '$0',
      yearlyPrice: '$0',
      features: [
        { text: 'Up to 5 team members' },
        { text: 'Basic components library' },
        { text: 'Community support' },
        { text: '1GB storage space' },
      ],
      button: {
        text: 'Purchase',
        url: 'https://shadcnblocks.com',
      },
    },
    {
      id: 'creator',
      name: 'Creator',
      description: 'For professionals',
      monthlyPrice: '$49',
      yearlyPrice: '$359',
      recommended: true,
      features: [
        { text: 'Unlimited team members' },
        { text: 'Advanced components' },
        { text: 'Priority support' },
        { text: 'Unlimited storage' },
      ],
      button: {
        text: 'Purchase',
        url: 'https://shadcnblocks.com',
      },
    },
    {
      id: 'agency',
      name: 'Agency',
      description: 'For professionals',
      monthlyPrice: '$99',
      yearlyPrice: '$899',
      features: [
        { text: 'Unlimited team members' },
        { text: 'Advanced components' },
        { text: 'Priority support' },
        { text: 'Unlimited storage' },
      ],
      button: {
        text: 'Purchase',
        url: 'https://shadcnblocks.com',
      },
    },
  ],
}: PricingSectionProps) => {
  const [isYearly, setIsYearly] = useState(false)
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">{heading}</h2>
          <p className="text-muted-foreground lg:text-xl">{description}</p>
          <div className="flex items-center gap-3 text-lg">
            Monthly
            <Switch
              className="bg-muted-foreground data-[state=checked]:bg-brand-teal"
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            Yearly
          </div>
          <div className="flex flex-col items-stretch gap-6 md:flex-row lg:gap-16">
            {plans.map((plan) => (
              <Card key={plan.id} className="relative flex w-80 flex-col justify-between text-left">
                {plan.recommended && (
                  <div className="bg-brand-blue absolute top-0 right-0 rounded-bl-md px-3 py-1 text-sm font-semibold text-white">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <CardTitle>
                    <p>{plan.name}</p>
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="flex items-end">
                    <span className="text-4xl font-semibold">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground text-2xl font-semibold">
                      {isYearly ? '/yr' : '/mo'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  {plan.id === 'pro' && (
                    <p className="mb-3 font-semibold">Everything in Plus, and:</p>
                  )}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CircleCheck className="size-4" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <a href={plan.button.url} target="_blank">
                      {plan.button.text}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { PricingSection }
