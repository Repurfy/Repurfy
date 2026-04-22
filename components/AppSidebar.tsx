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
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader, // ✅ added
} from '@/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Show, UserButton } from '@clerk/nextjs'
import { useUser } from '@/context/userContext'

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Create', href: '/create', icon: CirclePlus },
  { title: 'History', href: '/history', icon: History },
  { title: 'Pricing', href: '/pricing', icon: CreditCard },
  { title: 'Settings', href: '/settings', icon: Settings },
]

const AppSidebar = () => {
  const pathname = usePathname()
  const { userData } = useUser()

  const isLinkActive = (href: string) => {
    if (href === '/history' && pathname.startsWith('/results/')) return true
    return pathname === href
  }

  return (
    <Sidebar collapsible="icon">
      {/* ✅ FIXED LOGO (only change) */}
      <SidebarHeader className="bg-card px-3 py-4 group-data-[collapsible=icon]:px-2">
        <Link
          href="/"
          className="flex items-center justify-start gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <Image src="/logo.svg" alt="Repurfy logo" width={30} height={30} className="shrink-0" />

          <h1 className="font-ai text-lg font-semibold group-data-[collapsible=icon]:hidden lg:text-2xl">
            Repurfy
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-card flex flex-col">
        <Separator className="bg-border h-px" />

        {/* ── Navigation (UNCHANGED UI) ── */}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent className="mt-3">
            <SidebarMenu className="gap-6">
              {navItems.map((item) => {
                const isActive = isLinkActive(item.href)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      data-active={isActive}
                      className={
                        isActive
                          ? 'text-brand-teal! h-10 bg-slate-200 dark:bg-slate-700'
                          : 'h-10 text-slate-800 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-600'
                      }
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center"
                      >
                        {/* ✅ SAME ICON STYLE */}
                        <item.icon className="-ml-0.5 h-6! w-6! shrink-0" />

                        {/* ✅ ONLY hide text in collapse */}
                        <span className="text-[16px] group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer (small fix for collapse) ── */}
      <SidebarFooter className="bg-card border-t shadow-inner">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <Show when={"signed-in"}>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-8! h-8!',
                        },
                      }}
                    />
                  </Show>

                  {/* ✅ hide text when collapsed */}
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{userData?.name}</span>
                    <span className="truncate text-xs">{userData?.email}</span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
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
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
