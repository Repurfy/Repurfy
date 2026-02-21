import type { Metadata } from 'next'
import { Lexend, Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  metadataBase: new URL('https://repurfy.com'),

  title: {
    default: 'Repurfy',
    template: '%s | Repurfy',
  },

  description:
    'Create once. Publish everywhere. AI that repurposes your long-form content into platform-ready posts.',

  openGraph: {
    title: 'Repurfy – Create once. Publish everywhere.',
    description: 'AI that repurposes your long-form content into platform-ready posts in seconds.',
    url: 'https://repurfy.com',
    siteName: 'Repurfy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Repurfy Dashboard Preview',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Repurfy – Create once. Publish everywhere.',
    description: 'AI that repurposes your long-form content into platform-ready posts in seconds.',
    images: ['/og-image.png'],
  },
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

//Customizing Clerk Signup/Signin

// appearance={{
//   baseTheme: undefined, // remove default clerk theme
//   variables: {
//     colorPrimary: '#14b8a6', // your brand teal
//     colorBackground: '#0b1120',
//     colorText: '#e5e7eb',
//     borderRadius: '12px',
//   },
//   elements: {
//     card: "bg-[#0b1120] border border-white/10 shadow-2xl",
//     headerTitle: "text-white text-xl font-semibold",
//     headerSubtitle: "text-gray-400",
//     socialButtonsBlockButton:
//       "bg-white/5 border border-white/10 hover:bg-white/10 text-white",
//     formButtonPrimary:
//       "bg-brand-teal hover:bg-brand-teal/90 text-white",
//     footerActionLink: "text-brand-teal hover:text-brand-teal/80",
//     formFieldInput:
//       "bg-white/5 border border-white/10 text-white focus:ring-brand-teal",
//   },
// }}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider signInForceRedirectUrl={'/dashboard'} signUpForceRedirectUrl={'/dashboard'}>
      <html lang="en" suppressHydrationWarning className={`${lexend.variable} ${inter.variable}`}>
        <body className="antialiased">
          <Providers>{children}</Providers>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
