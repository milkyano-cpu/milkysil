import type { UserRole, User as PrismaUser } from "@prisma/client"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface JWTPayload {
  sub: string
  email: string
  name: string
  role: string
  iat: number
  exp: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: Omit<User, "id">
}

export function toSafeUser(user: PrismaUser): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
