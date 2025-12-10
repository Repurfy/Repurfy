import AppSidebar from '@/components/AppSidebar'
import { ThemeToggler } from '@/components/common/ThemeToggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Page Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="bg-card sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-6 border-b px-4 sm:px-6">
            <SidebarTrigger className="[&_svg]:size-5!" />
            <ThemeToggler />
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
