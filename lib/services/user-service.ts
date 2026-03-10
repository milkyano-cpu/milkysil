import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { toSafeUser } from "@/lib/types/auth"
import type { User } from "@/lib/types/auth"

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  })

  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return null

  return toSafeUser(user)
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } })
}
