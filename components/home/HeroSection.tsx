'use client'

import { motion, Variants } from 'framer-motion'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ArrowRightIcon, Sparkles, Play, Hash, MessageSquareText } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { useId } from 'react'
import Link from 'next/link'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
}
const featureArray = [
  {
    title: 'Auto Captioning',
    icon: <MessageSquareText strokeWidth={3} className="text-brand-teal h-4! w-4!" />,
  },
  {
    title: 'AI Hooks',
    icon: <Sparkles strokeWidth={3} className="text-brand-teal h-4! w-4!" />,
  },
  {
    title: 'Hashtag Generation',
    icon: <Hash strokeWidth={3} className="text-brand-teal h-4! w-4!" />,
  },
]

export default function HeroSection() {
  const { userId } = useAuth()

  console.log('userId', userId)

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center justify-center gap-7 py-28 text-center sm:py-36"
    >
      {/* Badge */}
      <motion.div variants={fadeUp}>
        <Badge className="shimmer bg-brand-gradient-reverse/20 text-brand-teal border-brand-teal/30 rounded-full border px-6 py-2 backdrop-blur-md">
          <span className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="animate-pulse" size={16} />
            AI-Powered Content Repurposing
          </span>
        </Badge>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        className="font-ai mx-auto -mt-2 max-w-5xl text-center text-3xl leading-tight font-bold tracking-tight sm:-mt-4 sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl lg:leading-[1.1] xl:text-7xl 2xl:text-8xl"
      >
        Create Once.
        <br className="hidden sm:block" />
        <span className="text-brand-gradient block sm:inline">Publish Everywhere.</span>
      </motion.h1>

      {/* Features */}
      <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-6">
        {featureArray.map((feature, index) => (
          <motion.div
            variants={fadeUp}
            key={index}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.2 }}
          >
            <Badge className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-1 text-[0.85rem] tracking-wide text-white/70 backdrop-blur-lg">
              {feature.icon}
              {feature.title}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtext */}
      <motion.p variants={fadeUp} className="text-text-secondary max-w-xl text-base sm:max-w-2xl">
        Turn your long-form content into high-performing posts for LinkedIn, X, Instagram, TikTok,
        YouTube Shorts, and Facebook — all in seconds.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={fadeUp} className="mt-4 flex flex-col items-center gap-6 md:flex-row">
        {/* Primary */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}>
          <Link
            href={
              userId !== null || undefined ? '/dashboard' : 'https://forms.gle/53BNApyitQJJdnCQ9'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-brand-gradient inline-flex items-center gap-2 rounded-lg p-6 text-base font-medium text-white/90 shadow-lg shadow-teal-500/25 transition-all duration-300 hover:text-white">
              {userId !== null || undefined ? 'Go To Dashboard' : 'Get Early Access Free'}
              <ArrowRightIcon
                strokeWidth={2}
                className="h-5 w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
              />
            </Button>
          </Link>
        </motion.div>
        {/* Secondary */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}>
          <Link href={'/#how-it-works'}>
            <Button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-6 text-base font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white">
              See How It Works
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
