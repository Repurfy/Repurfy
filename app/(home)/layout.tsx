import FooterSection from '@/components/common/FooterSection'
import Header from '@/components/common/Header'
import { ThemeProvider } from 'next-themes'

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="bg-bg-secondary dark:bg-main-gradient flex min-h-screen flex-col">
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
        <div className="fixed top-0 left-0 z-10 w-full dark:border dark:shadow-md">
          <Header />
        </div>

        <main className="">{children}</main>

        <div className="bg-surface-card w-full shadow-md dark:border dark:shadow-md">
          <FooterSection />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default HomeLayout
