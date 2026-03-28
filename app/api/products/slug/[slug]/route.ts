import { NextResponse } from "next/server"
import { getProductBySlug } from "@/lib/services/product-service"

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  try {
    const product = await getProductBySlug(slug)

    if (!product || !product.published) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("GET PRODUCT BY SLUG ERROR:", error)
    return NextResponse.json({ error: "Failed to get product" }, { status: 500 })
  }
}
