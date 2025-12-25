import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Only block routes in production
  if (process.env.NODE_ENV === 'production') {
    // ✅ Allow homepage
    if (pathname === '/') return NextResponse.next()

    // ✅ Allow Next.js internals
    if (pathname.startsWith('/_next')) return NextResponse.next()

    // ✅ Allow public assets (logos, images, fonts, etc.)
    if (/\.(.*)$/.test(pathname)) {
      return NextResponse.next()
    }

    // ❌ Redirect everything else to /
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
