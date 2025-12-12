'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="bg-bg-secondary dark:bg-main-gradient border-border-medium"
    >
      {/* Both icons exist in DOM → No mismatch */}
      <Sun className="hidden h-5 w-5 dark:block" suppressHydrationWarning />
      <Moon className="block h-5 w-5 dark:hidden" suppressHydrationWarning />
    </Button>
  )
}
