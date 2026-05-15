'use client'

import { motion } from 'framer-motion'
import NavLink from '@/components/common/nav-link'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Variants } from 'framer-motion'
import { SignInButton, SignUpButton, useAuth, UserButton, Show } from '@clerk/nextjs'
import { LayoutDashboard } from 'lucide-react'

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
  const { userId } = useAuth()

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeDown}
      className="repurfy-bg/80 sticky top-0 z-50 container mx-auto flex h-20 w-full items-center justify-between shadow-md backdrop-blur-xl"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex items-center gap-1 lg:w-1/3"
      >
        <Image src="/logo.svg" alt="Repurfy Logo" width={40} height={40} />

        <Link
          href="/"
          className="font-heading font-ai text-xl font-semibold tracking-tighter lg:text-3xl text-slate-200"
        >
          Repurfy
        </Link>
      </motion.div>

      {/* Navbar Links */}
      <motion.div
        className="hidden items-center justify-center gap-4 tracking-wide md:flex lg:w-1/3 lg:gap-14"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <NavLink href="/#features">Features</NavLink>
        <NavLink href="/#how-it-works">How it Works</NavLink>
        <NavLink href="/#pricing">Pricing</NavLink>
      </motion.div>

      {/* Auth Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center justify-end gap-2 lg:w-1/3 lg:gap-4"
      >
        {/* <ThemeToggler /> */}

        {(userId && userId !== null) || undefined ? (
          <>
            <Show when="signed-in">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8! h-8!',
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Dashboard"
                    labelIcon={<LayoutDashboard size={16} />}
                    href="/dashboard"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </Show>
          </>
        ) : (
          <>
            <Show when="signed-out">
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
                  <Button
                    variant="secondary"
                    className="bg-brand-teal hover:bg-primary/90 text-white"
                  >
                    Sign up
                  </Button>
                </motion.div>
              </SignUpButton>
            </Show>
            {/* <Link
              href={'https://forms.gle/53BNApyitQJJdnCQ9'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl text-white shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl">
                Get Early Access
              </Button>
            </Link> */}
          </>
        )}
      </motion.div>
    </motion.nav>
  )
}

export default Header
