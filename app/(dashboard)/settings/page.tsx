'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Camera, Cookie, Sun, User } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { ThemeToggler } from '@/components/common/ThemeToggle'
import { Switch } from '@/components/ui/switch'

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

const Settings = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="w-full overflow-hidden"
    >
      <motion.h1 variants={itemVariants} className="text-2xl font-bold tracking-tight">
        Settings
      </motion.h1>

      <motion.p variants={itemVariants} className="text-text-secondary mt-1 mb-10 leading-relaxed">
        Manage your account and preferences
      </motion.p>

      <div className="mx-auto max-w-5xl space-y-10">
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-500">
              <User className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Profile</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your personal information
              </p>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-xl font-semibold text-white">
              R
            </div>

            <Button
              variant="outline"
              className="bg-bg-secondary flex items-center gap-2 self-center"
            >
              <Camera className="h-4 w-4" />
              Change Avatar
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Full Name</label>
              <Input
                defaultValue="Alex Creator"
                className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Email</label>
              <Input
                defaultValue="johndoe@gmail.com"
                type="email"
                className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-500">
              <Cookie className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Brand Defaults
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Default settings for content generation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 grid-rows-2 gap-2">
            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Default Tone</label>
              <Input
                defaultValue=""
                className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g., Professional yet approachable"
              />
              <p className="text-text-secondary text-xs">
                This tone will be used as the default for all generated content
              </p>
            </div>

            <div className="mt-2 space-y-2">
              <label className="text-text-primary font-semibold">Default CTA</label>
              <Input
                defaultValue=""
                className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g., Follow for more insights"
              />
            </div>

            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Target Audience</label>
              <textarea
                className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 h-20 w-full resize-none rounded-md border p-4 text-[14px] outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
                placeholder="Entrepreneurs, marketers, and content creators…"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="h-40 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-500">
              <Sun className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Appearance
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Customize how Repurfy looks{' '}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-text-primary font-semibold">Appearance</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Customize how Repurfy looks{' '}
              </p>
            </div>
            <div>
              <ThemeToggler />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-500">
              <Cookie className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Brand Defaults
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Default settings for content generation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 grid-rows-2 gap-2">
            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Default Tone</label>
              <Input
                defaultValue=""
                className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g., Professional yet approachable"
              />
              <p className="text-text-secondary text-xs">
                This tone will be used as the default for all generated content
              </p>
            </div>

            <div className="mt-2 space-y-2">
              <label className="text-text-primary font-semibold">Default CTA</label>
              <Input
                defaultValue=""
                className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g., Follow for more insights"
              />
            </div>

            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Target Audience</label>
              <textarea
                className="bg-surface-elevated text-text-primary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 h-20 w-full resize-none rounded-md border p-4 text-[14px] outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
                placeholder="Entrepreneurs, marketers, and content creators…"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl border bg-red-50 p-6 shadow-sm dark:border-red-800 dark:bg-red-900/20"
        >
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-red-500 dark:text-red-300">Danger Zone</h2>
              <p className="text-text-secondary text-sm">
                Irreversible actions that affect your account
              </p>
            </div>

            <div className="flex items-center justify-between rounded-md px-4 py-2">
              <div>
                <h2 className="font-normal">Delete Account</h2>
                <p className="text-text-secondary text-sm">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" className="font-medium">
                Delete Account
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Settings
