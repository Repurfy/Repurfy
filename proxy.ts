import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV

  // Block only on staging & production
  if (appEnv === 'staging' || appEnv === 'production') {
    // ✅ Allow homepage
    if (pathname === '/') return NextResponse.next()

    // ✅ Allow Next.js internals
    if (pathname.startsWith('/_next')) return NextResponse.next()

    // ✅ Allow public assets
    if (/\.(.*)$/.test(pathname)) {
      return NextResponse.next()
    }

    // ❌ Redirect everything else
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ✅ dev mode → allow everything
  return NextResponse.next()
}
