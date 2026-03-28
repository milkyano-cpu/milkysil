import { NextResponse } from "next/server"
import { getProductById, updateProduct, deleteProduct } from "@/lib/services/product-service"
import { updateProductSchema } from "@/lib/validation/product"
import { deleteFileFromMinio } from "@/lib/api/minio"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params
  const id = parseInt(idParam)

  if (!idParam || isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    const product = await getProductById(id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error)
    return NextResponse.json({ error: "Failed to get product" }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params
  const id = parseInt(idParam)

  if (!idParam || isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    const existing = await getProductById(id)
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const body = await req.json()
    const parsed = updateProductSchema.safeParse(body)

    if (!parsed.success) {
      const details: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path.join(".")
        if (!details[field]) details[field] = []
        details[field].push(issue.message)
      }
      return NextResponse.json({ error: "Validation failed", details }, { status: 400 })
    }

    const product = await updateProduct(id, parsed.data)
    return NextResponse.json(product)
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params
  const id = parseInt(idParam)

  if (!idParam || isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    const existing = await getProductById(id)
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Clean up images from MinIO
    for (const imageUrl of existing.images) {
      if (imageUrl.startsWith("http")) {
        try {
          await deleteFileFromMinio(imageUrl)
        } catch {
          // Continue even if image deletion fails
        }
      }
    }

    await deleteProduct(id)

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
