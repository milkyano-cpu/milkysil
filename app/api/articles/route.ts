import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getArticles, createArticle } from "@/lib/services/article-service"
import { createArticleSchema } from "@/lib/validation/article"
import type { ArticleCategory } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "10")
    const category = searchParams.get("category") as ArticleCategory | null
    const search = searchParams.get("search") || undefined
    const publishedParam = searchParams.get("published")

    const user = await getCurrentUser()
    const isAdmin = user?.role === "ADMIN"

    // Public users only see published articles
    const published = isAdmin
      ? publishedParam !== null
        ? publishedParam === "true"
        : undefined
      : true

    const result = await getArticles({
      page,
      pageSize,
      category: category || undefined,
      published,
      search,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const parsed = createArticleSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const article = await createArticle(parsed.data, user.sub)

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    )
  }
}
