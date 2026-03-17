import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import {
  getArticleById,
  updateArticle,
  deleteArticle,
} from "@/lib/services/article-service"
import { updateArticleSchema } from "@/lib/validation/article"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const article = await getArticleById(id)

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
    const existing = await getArticleById(id)
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    const body = await request.json()
    const parsed = updateArticleSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const article = await updateArticle(id, parsed.data)

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
    const existing = await getArticleById(id)
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    await deleteArticle(id)

    return NextResponse.json({ success: true, message: "Article deleted" })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    )
  }
}
