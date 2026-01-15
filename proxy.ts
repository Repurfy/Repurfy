import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV

  console.log('APP ENV FROM MIDDLEWARE 👉', appEnv)

  if (appEnv === 'staging' || appEnv === 'production') {
    if (pathname === '/') return NextResponse.next()
    if (pathname.startsWith('/_next')) return NextResponse.next()
    if (/\.(.*)$/.test(pathname)) return NextResponse.next()

    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
