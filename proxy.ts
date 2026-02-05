import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV

  // ✅ Allow everything in development
  if (appEnv === 'development') {
    return NextResponse.next()
  }

  // ✅ Always allow landing page
  if (pathname === '/') {
    return NextResponse.next()
  }

  // ✅ Allow next internal files & static assets
  if (pathname.startsWith('/_next') || /\.(.*)$/.test(pathname)) {
    return NextResponse.next()
  }

  // ❌ Block all other pages (dashboard, create etc)
  return NextResponse.redirect(new URL('/', request.url))
}
