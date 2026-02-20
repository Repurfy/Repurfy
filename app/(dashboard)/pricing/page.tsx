'use client'

import { PricingSection } from '@/components/home/PricingSection'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, Sparkles } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 26,
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 28,
    },
  },
}

const Pricing = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="w-full overflow-hidden"
    >
      <motion.h1 variants={itemVariants} className="text-2xl font-bold tracking-tight">
        Pricing & Subscription
      </motion.h1>

      <motion.p variants={itemVariants} className="text-text-secondary mt-1 mb-10 leading-relaxed">
        Choose the plan that fits your content creation needs
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mx-auto flex w-full flex-col items-center justify-between rounded-xl bg-white p-6 shadow-sm md:w-2/3 md:flex-row dark:bg-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="bg-brand-teal/30 text-brand-teal rounded-full p-3">
            <Sparkles />
          </div>
          <div>
            <h2 className="text-lg">You&apos;re on the free plan</h2>
            <p className="text-sm">12 of 25 posts used this month</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}>
          <Button className="group bg-brand-gradient font-medoum flex items-center justify-center rounded-lg py-5 font-sans text-[14px] text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30">
            Upgrade Plan
            <ArrowRightIcon className="ml-2 h-5! w-5! transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="my-10">
        <PricingSection />
      </motion.div>
    </motion.div>
  )
}

export default Pricing
