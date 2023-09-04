import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const nextHeaders = request?.headers
  const token = await request.cookies.get('token') || await nextHeaders?.get('token') || ''
  // console.log("🚀 ~ file: middleware.js:9 ~ middleware ~ token:", token)


  const path = await request.nextUrl.pathname
  console.log("🚀 ~ file: middleware.js:7 ~ middleware ~ path:", path)

  const publicPath = (path === '/login' || path === '/signup' || path === '/api/users/login' || path === '/api/users/signup' || path === '/api/users/captcha')
  console.log("🚀 ~ file: middleware.js:13 ~ middleware ~ publicPath:", publicPath)

  if (publicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }
  if (!publicPath && !token) {
    console.log("not publicpath")
    return NextResponse.redirect(new URL('/login', request.url))
  }

}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/login', '/signup', '/api/:path*', '/superadmin']
}