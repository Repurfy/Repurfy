'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) => {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        'text-text-secondary hover:text-primary transition-colors',
        className,
        isActive && 'text-brand-gradient! font-semibold'
      )}
    >
      {children}
    </Link>
  )
}

export default NavLink
