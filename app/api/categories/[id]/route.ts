import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const name = body.name?.trim()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    })

    return NextResponse.json(category)
  } catch {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = Number(id)

    const productCount = await prisma.product.count({
      where: { categoryId },
    })

    if (productCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${productCount} product(s) still use this category` },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id: categoryId },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
