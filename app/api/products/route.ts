import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()


  const existing = await prisma.product.findFirst({
    where: {
      name: {
        equals: body.name,
        mode: "insensitive",
      },
    },
  })

  if (existing) {
    return NextResponse.json(
      { error: "Product already exists" },
      { status: 400 }
    )
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      categoryId: Number(body.categoryId),
    },
  })

  return NextResponse.json(product)
}