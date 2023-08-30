import { NextResponse } from 'next/server'
// import { Auth } from './constsnt/constant';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await request.cookies.get('token') || ''
  console.log("🚀 ~ file: middleware.js:9 ~ middleware ~ token:", token)
    const path = await request.nextUrl.pathname
    console.log("🚀 ~ file: middleware.js:7 ~ middleware ~ path:", path)
    if ((path === '/login' || path === '/signup') && token) {
                return NextResponse.redirect(new URL('/profile', request.url))       
    }
    if(!(path === '/login' || path === '/signup') && !token){
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
  }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/profile','/login','/signup']
}