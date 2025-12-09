'use client'

import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { AlarmClockCheck, AudioLines, GalleryThumbnails, Hash, Repeat, Share2 } from 'lucide-react'
import { Variants } from 'framer-motion'

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

const ImpFeatures = () => {
  const features = [
    {
      icon: <Repeat />,
      title: 'One-Click Repurpose',
      description: 'Turn a single piece of content into dozens of formats instantly',
    },
    {
      icon: <GalleryThumbnails />,
      title: 'Platform Perfect Posts',
      description: 'Auto-optimized outputs tailored to each social platform’s rules',
    },
    {
      icon: <AudioLines />,
      title: 'Consistent Brand Voice',
      description: 'AI learns your tone and keeps every post uniquely “you”',
    },
    {
      icon: <Hash />,
      title: 'Instant Hooks & Captions',
      description: 'Scroll-stopping headlines and engaging captions — auto-generated',
    },
    {
      icon: <AlarmClockCheck />,
      title: 'Bulk Content in Minutes',
      description: 'Create a full content calendar faster than ever before',
    },
    {
      icon: <Share2 />,
      title: 'Publish Everywhere',
      description: 'Export in any format — ready for every platform',
    },
  ]

  return (
    <section id="features" className="py-20 text-center">
      {/* Heading */}
      <motion.h2
        className="font-ai text-3xl leading-10 font-semibold sm:text-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp(0)}
      >
        Important Features
      </motion.h2>

      <motion.p
        className="text-text-secondary mx-auto mt-3 max-w-lg sm:max-w-3xl sm:text-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp(0.1)}
      >
        Repurfy offers a suite of powerful features designed to help content creators maximize reach
        and engagement across all platforms.
      </motion.p>

      {/* Card Grid */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp(index * 0.1)}
          >
            <Card className="bg-surface-card border-border-subtle hover:border-brand-teal flex border-2 p-5 shadow-none transition-all duration-300 sm:p-6 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-teal-500/50 dark:hover:shadow-[0_15px_45px_rgba(99,102,241,0.25)]">
              <div className="p-6 text-left">
                <div className="bg-brand-teal/10 text-brand-teal mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  {item.icon}
                </div>

                <h3 className="font-ai mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ImpFeatures
