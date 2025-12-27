'use client'

import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ArrowRightIcon, Check, Sparkles } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

export default function HeroSection() {
  const featureArray = ['Auto Captioning', 'AI Hooks', 'Hashtag Generation']

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center justify-center gap-6 py-32 text-center sm:py-40"
    >
      {/* Badge Animation*/}
      <motion.div variants={fadeUp}>
        <Badge className="shimmer bg-brand-gradient-reverse/20 dark:bg-brand-gradient-reverse/80 text-brand-teal border-brand-teal/30 rounded-full border px-6 py-2">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="animate-pulse" size={16} />
            AI-Powered Content Repurposing
          </span>
        </Badge>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        className="font-ai max-w-4xl text-3xl leading-[1.2] font-semibold sm:text-5xl lg:text-7xl"
      >
        Create Once. <br />
        Publish <span className="text-brand-teal">Everywhere.</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        variants={fadeUp}
        className="text-text-secondary max-w-xl text-base sm:max-w-3xl sm:text-lg"
      >
        Turn your long-form content into high-performing posts for LinkedIn, X, Instagram, TikTok,
        YouTube Shorts, and Facebook — all in seconds.
      </motion.p>

      {/* Feature badges */}
      <motion.div
        variants={staggerContainer}
        className="flex flex-wrap justify-center gap-4 md:mt-3 md:mb-6"
      >
        {featureArray.map((feature, index) => (
          <motion.div
            variants={fadeUp}
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Badge className="dark:bg-card flex items-center gap-2 rounded-xl border-white/20 bg-zinc-500 px-4 py-2 text-white dark:border">
              <Check size={18} />
              {feature}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div variants={fadeUp}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}>
          <Button className="shimmer group bg-brand-gradient-reverse dark:text-text-primary w-[210px] rounded-full py-5 text-base font-semibold">
            Try Repurfy
            <ArrowRightIcon className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
