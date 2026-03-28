import { NextRequest, NextResponse } from "next/server"
import { getProducts, createProduct } from "@/lib/services/product-service"
import { createProductSchema } from "@/lib/validation/product"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const page = Number(searchParams.get("page")) || 1
  const pageSize = Number(searchParams.get("pageSize")) || 10
  const search = searchParams.get("search") || undefined
  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined
  const published = searchParams.get("published")
    ? searchParams.get("published") === "true"
    : undefined
  const productType = searchParams.get("productType") || undefined

  const result = await getProducts({ page, pageSize, search, categoryId, published, productType })
  return NextResponse.json(result)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = createProductSchema.safeParse(body)
    if (!parsed.success) {
      const details: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path.join(".")
        if (!details[field]) details[field] = []
        details[field].push(issue.message)
      }
      return NextResponse.json({ error: "Validation failed", details }, { status: 400 })
    }

    const product = await createProduct(parsed.data)
    return NextResponse.json(product)
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
