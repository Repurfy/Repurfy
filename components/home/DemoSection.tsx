'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Image from 'next/image'

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

const DemoSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-3 rounded-3xl px-4 pb-20 text-center sm:px-10">
      {/* Heading */}
      {/* <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp(0)}
        className="font-ai text-3xl leading-10 font-semibold sm:text-4xl sm:leading-16 lg:leading-22"
      >
        See Repurfy in Action
      </motion.h2> */}
      {/* Subtitle */}
      {/* <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp(0.15)}
        className="text-text-secondary -my-3 max-w-lg sm:max-w-3xl sm:text-lg"
      >
        Watch how Repurfy transforms a single piece of content into a multitude of optimized posts
        for various platforms, saving you time and effort.
      </motion.p> */}
      {/* Video */}
      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp(0.3)}
        className="border-border-secondary mt-10 w-full max-w-4xl overflow-hidden rounded-lg border shadow-lg"
      >
        <iframe
          className="aspect-video w-full"
          src="https://www.youtube.com/embed/R-TPLCmtGKA?si=MeuFN7uvEvDk-Yxt"
          title="Repurfy Demo Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div> */}
      <div className="relative h-auto w-full lg:h-180">
        <Image
          src="/hero-mockup.png"
          alt="hero-img"
          fill
          className="rounded-lg object-cover lg:-mt-24"
          priority
        />
      </div>
    </section>
  )
}

export default DemoSection
