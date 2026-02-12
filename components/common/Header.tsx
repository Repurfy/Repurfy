'use client'

import { motion } from 'framer-motion'
import NavLink from '@/components/common/nav-link'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ThemeToggler } from './ThemeToggle'
import Link from 'next/link'
import { Variants } from 'framer-motion'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

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
        <Image src="/logo.svg" alt="Repurfy Logo" width={40} height={40} />

        <Link
          href="/"
          className="font-heading font-sans text-xl font-semibold tracking-wide lg:text-3xl"
        >
          Repurfy
        </Link>
      </motion.div>

      {/* Navbar Links */}
      <motion.div
        className="flex items-center justify-center gap-4 tracking-wide lg:gap-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <NavLink href="/#features">Features</NavLink>
        <NavLink href="/#pricing">Pricing</NavLink>
        <NavLink href="/#about">About</NavLink>
      </motion.div>

      {/* Auth Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-2 lg:gap-4"
      >
        <ThemeToggler />

        <SignedOut>
          <SignInButton mode="modal">
            <Button
              variant="ghost"
              className="text-brand-teal hover:bg-brand-teal hover:text-white"
            >
              Log in
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="secondary" className="bg-brand-teal hover:bg-primary/90 text-white">
                Sign up
              </Button>
            </motion.div>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </motion.div>
    </motion.nav>
  )
}

export default Header
