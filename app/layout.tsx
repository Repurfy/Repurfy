import type { Metadata } from 'next'
import { Lexend, Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Repurfy',
  description:
    'Create once. Publish everywhere. AI that repurposes your long-form content into platform-ready posts.',
}

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lexend.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
