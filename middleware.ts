import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyRequestToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Dashboard routes — require authentication
  if (pathname.startsWith("/dashboard")) {
    const user = await verifyRequestToken(request)
    if (!user) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Login page — redirect to dashboard if already authenticated
  if (pathname === "/login") {
    const user = await verifyRequestToken(request)
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
