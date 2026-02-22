'use client'

import AppSidebar from '@/components/AppSidebar'
import { ThemeToggler } from '@/components/common/ThemeToggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { motion, type Variants } from 'framer-motion'

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
          <header className="bg-card sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-6 border-b px-4 sm:px-6">
            <SidebarTrigger className="[&_svg]:size-5!" />
            <ThemeToggler />
          </header>

          <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
        </motion.div>
      </motion.div>
    </SidebarProvider>
  )
}
