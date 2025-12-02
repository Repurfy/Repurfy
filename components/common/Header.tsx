import NavLink from '@/components/common/nav-link'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ThemeToggler } from './ThemeToggle'
import Link from 'next/link'

const Header = () => {
  const isLoggedIn = false // Replace with actual authentication logic

  return (
    <nav className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-1 transition-transform hover:scale-105">
        <Image src="/logo.svg" alt="Repurfy Logo" width={32} height={32} />
        <Link href="/" className="font-heading text-xl font-semibold tracking-tight lg:text-3xl">
          Repurfy
        </Link>
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        <NavLink href="/home/#features" className="NavLink">
          Features
        </NavLink>
        <NavLink href="/home/#pricing" className="NavLink">
          Pricing
        </NavLink>
      </div>

      {isLoggedIn ? (
        <NavLink href="/dashboard">
          <Button variant="default">Go to Dashboard</Button>
        </NavLink>
      ) : (
        <div className="flex items-center gap-2 lg:gap-4">
          <ThemeToggler />
          <Button
            variant="ghost"
            className="text-primary hover:bg-primary hover:dark:bg-primary hover:text-white dark:text-white"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild variant="secondary" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}

export default Header
