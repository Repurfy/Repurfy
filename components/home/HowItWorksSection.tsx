'use client'

import { motion } from 'framer-motion'
import { Variants } from 'framer-motion'
import { Card } from '../ui/card'
import { Send, Sparkles, Upload } from 'lucide-react'

const fadeUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      delay,
    },
  },
})

const features = [
  {
    img: <Upload />,
    title: 'Add Your Content',
    desc: 'Upload or paste content from Blogs, podcasts, webinars, or any long-form source.',
  },
  {
    img: <Sparkles />,
    title: 'AI Repurposes It',
    desc: 'Our AI transforms your content into platform-optimized posts tailored for each channel.',
  },
  {
    img: <Send />,
    title: 'Publish Everywhere',
    desc: 'Review, edit, and publish across LinkedIn, X, Instagram, TikTok, and more — in one click.',
  },
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="my-20 text-center lg:my-40">
      {/* Heading */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp(0)}
        className="text-brand-gradient font-sans leading-10 font-bold tracking-wide uppercase"
      >
        How It Works
      </motion.h2>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp(0)}
        className="font-ai my-4 text-center text-2xl font-bold text-white sm:text-3xl lg:text-6xl lg:leading-14"
      >
        Repurpose your{' '}
        <span className="text-brand-teal">
          content <br />
          in 3 steps.
        </span>
      </motion.h2>

      {/* Cards Container */}
      <motion.div
        className="my-12 flex flex-col justify-between gap-6 md:flex-row md:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeUp(0.1)} className="flex flex-col gap-6 md:flex-row">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-surface-card border-border-subtle hover:border-brand-teal flex border-2 p-5 shadow-none transition-all duration-300 sm:p-6 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-teal-500/50 dark:hover:shadow-[0_15px_45px_rgba(99,102,241,0.25)]"
            >
              <div className="p-6 text-left">
                <div className="text-brand-teal/20 font-ai mb-4 flex h-12 w-12 items-center justify-center text-2xl font-bold tracking-wide lg:text-5xl">
                  <span>0</span>
                  {index + 1}
                </div>

                <div className="bg-brand-gradient my-1 inline-block rounded-lg p-3">
                  {feature.img}
                </div>
                <h3 className="font-ai mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </div>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HowItWorksSection
