import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Check, Sparkles } from 'lucide-react'

const HeroSection = () => {
  const featureArray = ['Auto Captioning', 'AI Hooks', 'Hashtag Generation']

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      {/* <h1>Badge Content</h1> */}
      <div className="from-brand-blue via-brand-teal to-brand-purple relative rounded-full bg-linear-to-r p-0.5">
        <Badge className="bg-brand-gradient-reverse dark:bg-background relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-white">
          <span className="shimmer pointer-events-none absolute inset-0"></span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-4 w-4 animate-pulse text-yellow-500" />
            AI‑Powered Content Repurposing
          </span>
        </Badge>
      </div>

      <h1 className="font-ai text-2xl leading-8 font-semibold sm:text-5xl sm:leading-16 lg:text-7xl lg:leading-22">
        Create Once. <br />
        Publish Everywhere.
      </h1>

      <p className="text-text-secondary max-w-3xl sm:text-xl">
        One post. Endless content. Instantly optimized for every platform. Stop creating more —
        repurpose smarter with AI
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:justify-between lg:gap-16">
        {featureArray.map((feature, index) => (
          <Badge
            key={index}
            className="dark:bg-card flex items-center gap-2 rounded-2xl bg-zinc-500 px-3 py-1 text-white transition-all dark:border dark:border-white/50"
          >
            <Check className="h-5! w-5!" />
            <p className="text-sm">{feature}</p>
          </Badge>
        ))}
      </div>

      <div className="mt-10 flex gap-4 lg:gap-8">
        <Button className="bg-brand-gradient rounded-xl">Start for Free</Button>
        <Button variant="outline" className="text-gradient-teal-blue">
          Start for Free
        </Button>
      </div>

      <div className="mt-10 flex gap-4 lg:gap-8">
        <Button className="bg-brand-gradient rounded-xl">Start for Free</Button>
        <Button variant="outline" className="text-gradient-teal-blue">
          Start for Free
        </Button>
      </div>

      <div className="mt-10 flex gap-4 lg:gap-8">
        <Button className="bg-brand-gradient rounded-xl">Start for Free</Button>
        <Button variant="outline" className="text-gradient-teal-blue">
          Start for Free
        </Button>
      </div>

      <div className="mt-10 flex gap-4 lg:gap-8">
        <Button className="bg-brand-gradient rounded-xl">Start for Free</Button>
        <Button variant="outline" className="text-gradient-teal-blue">
          Start for Free
        </Button>
      </div>
    </div>
  )
}

export default HeroSection
