'use client'

import { motion, Variants } from 'framer-motion'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ArrowRightIcon, Sparkles, Play, Hash, MessageSquareText } from 'lucide-react'

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
    icon: <MessageSquareText strokeWidth={3} className="h-4! w-4!" />,
  },
  {
    title: 'AI Hooks',
    icon: <Sparkles strokeWidth={3} className="h-4! w-4!" />,
  },
  {
    title: 'Hashtag Generation',
    icon: <Hash strokeWidth={3} className="h-4! w-4!" />,
  },
]

export default function HeroSection() {
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
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="animate-pulse" size={16} />
            AI-Powered Content Repurposing
          </span>
        </Badge>
      </motion.div>

      {/* Features */}
      <motion.div
        variants={staggerContainer}
        className="flex flex-wrap justify-center gap-6 md:my-2"
      >
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

      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        className="font-ai -mt-4 max-w-4xl text-4xl leading-20 font-bold sm:text-6xl lg:text-8xl lg:leading-24"
      >
        Create Once. <br />
        <span className="text-brand-gradient">Publish Everywhere.</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        variants={fadeUp}
        className="text-text-secondary max-w-xl text-base sm:max-w-2xl sm:text-lg"
      >
        Turn your long-form content into high-performing posts for LinkedIn, X, Instagram, TikTok,
        YouTube Shorts, and Facebook — all in seconds.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={fadeUp} className="mt-4 flex flex-col items-center gap-6 md:flex-row">
        {/* Primary */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}>
          <Button className="group bg-brand-teal flex w-56 items-center justify-center rounded-xl py-6 font-sans text-lg font-semibold text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30">
            Try Repurfy Free
            <ArrowRightIcon
              strokeWidth={3}
              className="ml-2 h-6! w-6! transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
            />
          </Button>
        </motion.div>
        {/* Secondary */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}>
          <Button className="group flex w-56 flex-row-reverse items-center justify-center rounded-xl bg-black py-6 font-sans text-lg font-medium text-white transition-all duration-300 hover:bg-black/80 hover:shadow-lg hover:shadow-white/10">
            Watch Demo
            <Play
              strokeWidth={3}
              className="ml-2 h-6! w-6! transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110"
            />
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
