'use client'

import {
  LogOut,
  Settings,
  ChevronsUpDown,
  LayoutDashboard,
  CirclePlus,
  CreditCard,
  History,
} from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '@radix-ui/react-separator'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Create', href: '/create-content', icon: CirclePlus },
  { title: 'History', href: '/history', icon: History },
  { title: 'Pricing', href: '/pricing', icon: CreditCard },
  { title: 'Settings', href: '/settings', icon: Settings },
]

const sidebarVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 30,
      when: 'beforeChildren',
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: { x: -12, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
}

const AppSidebar = () => {
  const pathname = usePathname()

  const isLinkActive = (href: string) => pathname === href

  return (
    <Sidebar collapsible="icon">
      <motion.div
        variants={sidebarVariants}
        // initial="hidden"
        // animate="visible"
        className="bg-card flex h-full flex-col"
      >
        <SidebarContent className="bg-card flex-1">
          {/* Logo */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="h-14 py-1">
                  <SidebarMenuButton asChild tooltip="Repurfy" className="hover:bg-transparent">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="/"
                        className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
                      >
                        <Image
                          src="/logo.svg"
                          alt="logo"
                          width={40}
                          height={40}
                          className="transition-all group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:scale-125"
                        />
                        <h1 className="text-2xl font-medium group-data-[collapsible=icon]:hidden">
                          Repurfy
                        </h1>
                      </Link>
                    </motion.div>
                  </SidebarMenuButton>
                  <Separator className="bg-border my-3 h-px" />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Navigation */}
          <SidebarGroup>
            <SidebarGroupContent className="my-3">
              <SidebarMenu className="gap-6">
                {navItems.map((item) => {
                  const isActive = isLinkActive(item.href)

                  return (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          data-active={isActive}
                          className={
                            isActive
                              ? 'text-brand-teal! h-10 bg-slate-200 dark:bg-slate-700'
                              : 'h-10 text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-600'
                          }
                        >
                          <Link href={item.href} className="flex items-center gap-2">
                            <motion.div
                              animate={{ scale: isActive ? 1.1 : 1 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <item.icon className="-ml-0.5 h-5 w-5" />
                            </motion.div>
                            <span className="text-[16px]">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* =============================== FOOTER =============================== */}
        <SidebarFooter className="bg-card border-t shadow-inner">
          <motion.div variants={itemVariants}>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">John Doe</span>
                        <span className="truncate text-xs">john@example.com</span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </motion.div>
        </SidebarFooter>
      </motion.div>
    </Sidebar>
  )
}

export default AppSidebar
