import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// 🔐 protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-content(.*)', // fixed spelling
  '/history(.*)',
  '/settings(.*)',
])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId, redirectToSignIn } = await auth()
  const pathname = request.nextUrl.pathname
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV

  // Allow everything in development
  if (appEnv === 'development') {
    return NextResponse.next()
  }

  // Public landing always allowed
  if (pathname === '/' || pathname === '/pricing') {
    return NextResponse.next()
  }

  // Static files
  if (pathname.startsWith('/_next') || /\.(.*)$/.test(pathname)) {
    return NextResponse.next()
  }

  // If protected route & not logged in → go sign-in
  if (!userId && isProtectedRoute(request)) {
    return redirectToSignIn()
  }

  // If logged in and visiting landing → send dashboard
  if (userId && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
