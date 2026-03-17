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