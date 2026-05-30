'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Camera, Cookie, Sun, User } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { ThemeToggler } from '@/components/common/ThemeToggle'
import { Switch } from '@/components/ui/switch'
import { useUser as useUserContext } from '@/context/userContext'
import { useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Router from 'next/router'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAuth, useClerk, useUser } from '@clerk/nextjs'
import Image from 'next/image'

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
  const { userData } = useUserContext()
  const { openUserProfile } = useClerk()
  const { getToken, signOut } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
  })

  const handleDeleteAccount = async () => {
    const token = await getToken()
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    })

    await signOut()
    toast.success('Account deleted successfully')
    router.push('/')
  }


  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
      })
    }
  }, [userData])

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
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-500">
                <User className="h-7 w-7" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Profile
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your personal information
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="bg-bg-secondary flex items-center gap-2 self-center"
              onClick={() => openUserProfile()}
            >
              Edit Profile
            </Button>
          </div>

          {/* <div className="mb-6 flex gap-4 sm:flex-row sm:items-center">
            <div className="border-secondary h-12 w-12 overflow-hidden rounded-full border-2">
              <Image
                src={user?.imageUrl || '/default-avatar.png'}
                alt="Profile"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>

            <Button
              variant="outline"
              className="bg-bg-secondary flex items-center gap-2 self-center"
              onClick={() => openUserProfile()}
            >
              <Camera className="h-4 w-4" />
              Change Avatar
            </Button>
          </div> */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Full Name</label>

              <Input
                value={formData.name}
               type='text'
               disabled
               className="bg-surface-elevated text-text-secondary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-900/60 dark:placeholder:text-slate-500"
               />
            </div>

            <div className="space-y-2">
              <label className="text-text-primary font-semibold">Email</label>

              <Input
                value={formData.email}
                type="email"
                disabled
                className="bg-surface-elevated text-text-secondary placeholder:text-text-tertiary focus:ring-brand-teal border-border-subtle mt-1 w-full rounded-md border outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-900/60 dark:placeholder:text-slate-500"
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

        {/* Apperance */}

        {/* <motion.div
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
        </motion.div> */}

        {/* <motion.div
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
        </motion.div> */}

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

            <div className="flex items-center justify-between rounded-md py-2">
              <div>
                <h2 className="text-text-primary font-medium">Delete Account</h2>
                <p className="text-text-secondary text-sm">
                  Permanently delete your account and all data
                </p>
              </div>

              {/* modal */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="font-medium">
                    Delete Account
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="pb-4">
                      Are you sure? Confirm account deletion
                    </AlertDialogTitle>

                    <AlertDialogDescription className="py-1">
                      This action cannot be undone. This will permanently delete your account from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction className="font-medium" onClick={handleDeleteAccount}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Settings
