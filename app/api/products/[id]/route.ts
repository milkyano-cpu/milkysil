import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params

  console.log("PUT PARAM ID:", idParam)

  const id = parseInt(idParam)

  if (!idParam || isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    )
  }

  try {
    const body = await req.json()

    const existing = await prisma.product.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        categoryId: Number(body.categoryId),
      },
    })

    return NextResponse.json(product)

  } catch (error) {
    console.error("UPDATE ERROR:", error)

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params

  console.log("DELETE PARAM ID:", idParam)

  const id = parseInt(idParam)

  console.log("PARSED ID:", id)

  if (!idParam || isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    )
  }

  try {
    const existing = await prisma.product.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })

  } catch (error) {
    console.error("DELETE ERROR:", error)

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}