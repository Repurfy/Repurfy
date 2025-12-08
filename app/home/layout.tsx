import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { ThemeProvider } from 'next-themes'

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="bg-bg-secondary dark:bg-main-gradient flex min-h-screen flex-col">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="bg-bg-secondary dark:bg-bg-primary fixed top-0 left-0 z-10 w-full shadow-md dark:border dark:shadow-md">
          <Header />
        </div>

        <main className="">{children}</main>

        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default HomeLayout
