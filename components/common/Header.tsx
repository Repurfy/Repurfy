'use client'

import { motion } from 'framer-motion'
import NavLink from '@/components/common/nav-link'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ThemeToggler } from './ThemeToggle'
import Link from 'next/link'
import { Variants } from 'framer-motion'

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
} as const satisfies Variants

const Header = () => {
  const isLoggedIn = false

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeDown}
      className="repurfy-bg/80 sticky top-0 z-50 container mx-auto flex h-16 items-center justify-between shadow-md backdrop-blur-xl"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex items-center gap-1"
      >
        <Image src="/logo.svg" alt="Repurfy Logo" width={32} height={32} />

        <Link href="/" className="font-heading text-xl font-semibold tracking-tight lg:text-3xl">
          Repurfy
        </Link>
      </motion.div>

      {/* Navbar Links */}
      <motion.div
        className="text-text-secondary flex w-100 items-center justify-center gap-4 font-medium lg:gap-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <NavLink href="/home/#features">Features</NavLink>
        <NavLink href="/home/#pricing">Pricing</NavLink>
        <NavLink href="/home/#about">About</NavLink>
      </motion.div>

      {/* Auth Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-2 lg:gap-4"
      >
        <ThemeToggler />

        {isLoggedIn ? (
          <NavLink href="/dashboard">
            <Button variant="default">Go to Dashboard</Button>
          </NavLink>
        ) : (
          <>
            <Button
              variant="ghost"
              className="text-brand-teal hover:bg-brand-teal hover:dark:bg-brand-teal hover:text-white dark:text-white"
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                asChild
                variant="secondary"
                className="bg-brand-teal hover:bg-primary/90 text-white"
              >
                <Link href="/signup">Sign up</Link>
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.nav>
  )
}

export default Header
