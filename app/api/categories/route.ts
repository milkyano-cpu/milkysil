import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
    orderBy: {
      id: "asc",
    },
  })

  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = body.name?.trim()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name },
    })

    return NextResponse.json(category, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}