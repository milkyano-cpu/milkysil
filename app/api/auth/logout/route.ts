import { NextResponse } from "next/server"

const COOKIE_NAME = "auth-token"

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logout berhasil." })
  response.cookies.delete(COOKIE_NAME)
  return response
}
