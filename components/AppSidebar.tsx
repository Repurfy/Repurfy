'use client'

import {
  User,
  LogOut,
  Settings,
  HelpCircle,
  ChevronsUpDown,
  LayoutDashboard,
  Sparkles,
  CreditCard,
  History,
} from 'lucide-react'

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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
// Note: Separator component should likely be imported from '@/components/ui/separator' if available,
// but for now, we'll assume the Radix import works or update to a standard div.
import { Separator } from '@radix-ui/react-separator'
import { usePathname } from 'next/navigation'

// --- Menu Item Data Structure for cleaner mapping and path checking ---
const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard', // Use specific paths
    icon: LayoutDashboard,
    color: 'text-teal-500',
  },
  {
    title: 'Create Content',
    href: '/create-content',
    icon: Sparkles,
    color: 'text-yellow-500',
  },
  {
    title: 'History',
    href: '/history',
    icon: History,
    color: 'text-orange-500',
  },
  {
    title: 'Pricing',
    href: '/pricing',
    icon: CreditCard,
    color: 'text-blue-500',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    color: 'text-purple-500',
  },
]

const AppSidebar = () => {
  const pathname = usePathname()

  // Helper function to check if a link is active
  const isLinkActive = (href: string) => {
    if (href !== '/dashboard') {
      return pathname === href
    }
    return pathname === href
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card">
        {/* Logo/Header Group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="h-14 py-1">
                <SidebarMenuButton asChild tooltip="Repurfy">
                  <Link href={'/'}>
                    <Image src="/logo.svg" alt="logo" width={30} height={30} />
                    <h1 className="text-text-primary text-2xl font-medium">Repurfy</h1>
                  </Link>
                </SidebarMenuButton>
                <Separator className="bg-border my-3 h-px" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation Group */}
        <SidebarGroup>
          <SidebarGroupContent className="my-3">
            <SidebarMenu className="gap-6">
              {navItems.map((item) => {
                const isActive = isLinkActive(item.href)
                const activeClass = isActive
                  ? 'dark:bg-slate-700! bg-zinc-200 h-10! transition-all duration-50 '
                  : 'text-text-primary dark:hover:bg-slate-600 hover:bg-zinc-100 h-10! transition-all duration-100'

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={activeClass}
                      data-active={isActive}
                    >
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className={`-ml-0.5 h-5! w-5! ${item.color}`} />
                        <span className={`font-sans text-[16px]`}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Content */}
      <SidebarFooter className="bg-card border-t shadow-inner">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback className="rounded-lg">JD</AvatarFallback>
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
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">John Doe</span>
                      <span className="truncate text-xs">john@example.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
