'use client'
import { UserProvider } from '@/context/userContext'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </UserProvider>
  )
}
