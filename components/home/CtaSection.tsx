'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

const users = [
  { name: 'Alex', src: '/avatars/1.png' },
  { name: 'Jordan', src: '/avatars/2.png' },
  { name: 'Casey', src: '/avatars/3.png' },
  { name: 'Taylor', src: '/avatars/4.png' },
  { name: 'Riley', src: '/avatars/5.png' },
]

export default function CTASection() {
  return (
    <section className="bg-surface-card mb-20 flex items-center justify-center px-4 py-24 lg:mb-40">
      <TooltipProvider>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex max-w-2xl flex-col items-center text-center"
        >
          {/* Avatars group */}
          <motion.div
            className="mb-8 flex -space-x-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {users.map((u, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  y: -12,
                  scale: 1.15,
                  zIndex: 10,
                  transition: { duration: 0.15 },
                }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="border-brand-cyan/30 cursor-pointer border-2 shadow-md transition-transform duration-200">
                      <AvatarImage src={u.src} alt={u.name} />
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    {u.name}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="mb-3 font-sans text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Join a community of <span className="text-brand-teal">500+</span> creators
          </motion.h2>

          {/* Sub-text */}
          <motion.p
            className="text-text-secondary mb-8 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            10× your content output, cut your workload in half, and publish everywhere in
            seconds—without ever feeling burnt out again.{' '}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href={'https://forms.gle/53BNApyitQJJdnCQ9'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-brand-gradient group hover:text-whitel inline-flex items-center gap-2 rounded-lg p-6 text-base font-medium text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:scale-105">
                Get Early Access
                <ArrowRightIcon
                  strokeWidth={2}
                  className="h-5 w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </TooltipProvider>
    </section>
  )
}
