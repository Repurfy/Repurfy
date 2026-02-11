'use client'

import { motion } from 'framer-motion'
import Card3dDemo from '../AnimatedComponents/Card'
import { Variants } from 'framer-motion'

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

const HowItWorksSection = () => {
  return (
    <section className="py-20 text-center">
      {/* Heading */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp(0)}
        className="text-brand-gradient font-sans text-xl leading-10 font-semibold uppercase"
      >
        How It Works
      </motion.h2>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp(0)}
        className="font-ai my-4 text-2xl font-semibold text-white sm:text-3xl lg:text-5xl lg:leading-14"
      >
        Three steps to{' '}
        <span className="text-brand-teal">
          content <br /> everywhere
        </span>
      </motion.h2>

      {/* Cards Container */}
      <motion.div
        className="my-12 flex flex-col justify-between gap-6 md:flex-row md:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeUp(0.1)}>
          <Card3dDemo
            Index={1}
            Title="Import or Paste Your Content"
            Desc="Upload or paste content from YouTube, Podcasts, Webinars, or any long-form content."
          />
        </motion.div>

        <motion.div variants={fadeUp(0.25)}>
          <Card3dDemo
            Index={2}
            Title="AI Auto-Repurposes"
            Desc="AI generates engaging posts, captions, based on platform-specific formatting."
          />
        </motion.div>

        <motion.div variants={fadeUp(0.4)}>
          <Card3dDemo
            Index={3}
            Title="One Click Publish"
            Desc="One click to publish optimized content to LinkedIn, X, Facebook & more."
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HowItWorksSection
