import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from "next/font/google";
import { Lexend, Inter } from 'next/font/google'
import './globals.css'

const lexend = Lexend({
  variable: '--font-lexned',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Repurfy',
  description:
    'Create once. Publish everywhere. AI that repurposes your long-form content into platform-ready posts.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
