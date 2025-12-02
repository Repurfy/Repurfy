import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ArrowRightIcon, Check, Sparkles } from 'lucide-react'

const HeroSection = () => {
  const featureArray = ['Auto Captioning', 'AI Hooks', 'Hashtag Generation']

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      {/* <h1>Badge Content</h1> */}
      <div className="from-brand-blue via-brand-teal to-brand-purple relative mt-12 mb-3 rounded-full bg-linear-to-r p-0.5">
        <Badge className="shimmer bg-brand-gradient-reverse relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-white">
          <span className="pointer-events-none absolute inset-0"></span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-4! w-4!" />
            AI‑Powered Content Repurposing
          </span>
        </Badge>
      </div>

      <h1 className="font-ai text-2xl leading-10 font-semibold sm:text-5xl sm:leading-16 lg:text-7xl lg:leading-22">
        Create Once. <br />
        Publish Everywhere.
      </h1>

      <p className="text-text-secondary max-w-lg sm:max-w-3xl sm:text-xl">
        One post. Endless content. Instantly optimized for every platform. Stop creating more —
        repurpose smarter with AI
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:justify-between lg:gap-16">
        {featureArray.map((feature, index) => (
          <Badge
            key={index}
            className="dark:bg-card flex items-center gap-2 rounded-2xl bg-zinc-500 px-3 py-1 text-white transition-all dark:border dark:border-white/20"
          >
            <Check className="h-5! w-5!" />
            <p className="text-sm">{feature}</p>
          </Badge>
        ))}
      </div>

      <div className="mt-10 flex gap-4 lg:gap-8">
        <Button className="shimmer group bg-brand-gradient-reverse dark:text-text-primary focus:ring-brand-blue/30 flex w-[200px] items-center justify-center gap-2 rounded-full px-6 py-5 text-[16px] font-semibold transition-all hover:scale-[1.02] focus:ring-4 focus:outline-none active:scale-95">
          Try Repurfy
          <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
        </Button>

        {/* <Button variant="outline" className="bg-card rounded-xl px-6 py-3 font-semibold">
          Watch Demo
        </Button> */}
      </div>
    </div>
  )
}

export default HeroSection
