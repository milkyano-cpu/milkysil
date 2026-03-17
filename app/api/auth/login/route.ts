import { NextResponse } from "next/server"
import { authenticateUser } from "@/lib/services/user-service"
import { signToken } from "@/lib/auth"
import type { AuthResponse } from "@/lib/types/auth"

const COOKIE_NAME = "auth-token"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: "Email dan password harus diisi." },
        { status: 400 }
      )
    }

    const user = await authenticateUser(email, password)

    if (!user) {
      return NextResponse.json<AuthResponse>(
        { success: false, message: "Email atau password salah." },
        { status: 401 }
      )
    }

    const token = await signToken(user)

    const response = NextResponse.json<AuthResponse>({
      success: true,
      message: "Login berhasil.",
      user: { email: user.email, name: user.name, role: user.role },
    })

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json<AuthResponse>(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    )
  }
}
