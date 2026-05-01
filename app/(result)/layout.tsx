'use client'

import AppSidebar from '@/components/AppSidebar'
import { ThemeToggler } from '@/components/common/ThemeToggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useUser } from '@/context/userContext'
import { Show, UserButton } from '@clerk/nextjs'
import { motion, type Variants } from 'framer-motion'
import { Sparkles, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

const layoutVariants: Variants = {
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

export default function ResultLayout({ children }: { children: React.ReactNode }) {

  const {userData} = useUser();
  const router = useRouter();

  return (
    <SidebarProvider>
      <motion.div
        variants={layoutVariants}
        initial="hidden"
        animate="visible"
        className="flex min-h-screen w-full"
      >
        <AppSidebar />

        <motion.div variants={layoutVariants} className="flex flex-1 flex-col">
        <header className="bg-card sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-6 border-b px-4 sm:px-6">
            <SidebarTrigger aria-label="sidebar-toogle" className="flex [&_svg]:size-5!" />
            <div className="flex flex-row items-center gap-4">
              {/* <ThemeToggler /> */}

              {/* Credits Badge */}
              {userData &&
                (userData.creditsRemaining === 0 ? (
                  <button
                    onClick={() => router.push('/pricing')}
                    className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 transition-all hover:border-red-500/60 hover:bg-red-500/20"
                  >
                    <Zap className="h-3.5 w-3.5 text-red-400" />
                    <span className="text-xs font-semibold text-red-400">No credits</span>
                    <span className="text-xs text-slate-400">· Upgrade</span>
                  </button>
                ) : userData.creditsRemaining <= 5 ? (
                  <button
                    onClick={() => router.push('/pricing')}
                    className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 transition-all hover:border-orange-500/60 hover:bg-orange-500/20"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-xs font-semibold text-orange-400">
                      {userData.creditsRemaining}
                    </span>
                    <span className="text-xs text-slate-400">credits left</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                    <span className="text-xs font-semibold text-teal-400">
                      {userData.creditsRemaining}
                    </span>
                    <span className="text-xs text-slate-400">credits</span>
                  </div>
                ))}

              <Show when={"signed-in"}>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8! h-8!',
                    },
                  }}
                />
              </Show>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
        </motion.div>
      </motion.div>
    </SidebarProvider>
  )
}
