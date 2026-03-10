import { NextResponse } from "next/server"
import { authenticateUser } from "@/lib/services/user-service"
import { signToken, setAuthCookie } from "@/lib/auth"
import type { AuthResponse } from "@/lib/types/auth"

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
    await setAuthCookie(token)

    return NextResponse.json<AuthResponse>({
      success: true,
      message: "Login berhasil.",
      user: { email: user.email, name: user.name, role: user.role },
    })
  } catch {
    return NextResponse.json<AuthResponse>(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    )
  }
}
