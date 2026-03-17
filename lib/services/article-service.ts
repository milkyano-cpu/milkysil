import { prisma } from "@/lib/prisma"
import type { ArticleCategory } from "@prisma/client"
import type { ArticleWithAuthor, ArticleListResponse } from "@/lib/types/article"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function generateUniqueSlug(
  title: string,
  excludeId?: string
): Promise<string> {
  const baseSlug = slugify(title)
  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await prisma.article.findUnique({
      where: { slug },
      select: { id: true },
    })

    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug
    }

    slug = `${baseSlug}-${counter}`
    counter++
  }
}

const authorSelect = {
  name: true,
  email: true,
}

export async function getArticles(options: {
  page?: number
  pageSize?: number
  category?: ArticleCategory
  published?: boolean
  search?: string
}): Promise<ArticleListResponse> {
  const {
    page = 1,
    pageSize = 10,
    category,
    published,
    search,
  } = options

  const where: Record<string, unknown> = {}

  if (category) where.category = category
  if (published !== undefined) where.published = published
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ]
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: { author: { select: authorSelect } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.article.count({ where }),
  ])

  return {
    articles: articles as ArticleWithAuthor[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getArticleById(
  id: string
): Promise<ArticleWithAuthor | null> {
  const article = await prisma.article.findUnique({
    where: { id },
    include: { author: { select: authorSelect } },
  })

  return article as ArticleWithAuthor | null
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithAuthor | null> {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: { select: authorSelect } },
  })

  return article as ArticleWithAuthor | null
}

export async function createArticle(
  data: {
    title: string
    excerpt: string
    content: string
    image: string
    category: ArticleCategory
    published: boolean
    metaTitle?: string
    metaDescription?: string
  },
  authorId: string
): Promise<ArticleWithAuthor> {
  const slug = await generateUniqueSlug(data.title)

  const article = await prisma.article.create({
    data: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      category: data.category,
      published: data.published,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      authorId,
    },
    include: { author: { select: authorSelect } },
  })

  return article as ArticleWithAuthor
}

export async function updateArticle(
  id: string,
  data: {
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    image?: string
    category?: ArticleCategory
    published?: boolean
    metaTitle?: string | null
    metaDescription?: string | null
  }
): Promise<ArticleWithAuthor> {
  const updateData: Record<string, unknown> = { ...data }

  // If title changed but no explicit slug provided, regenerate slug
  if (data.title && !data.slug) {
    updateData.slug = await generateUniqueSlug(data.title, id)
  }

  const article = await prisma.article.update({
    where: { id },
    data: updateData,
    include: { author: { select: authorSelect } },
  })

  return article as ArticleWithAuthor
}

export async function deleteArticle(id: string): Promise<void> {
  await prisma.article.delete({ where: { id } })
}

export async function getPublishedArticles(
  category?: ArticleCategory
): Promise<ArticleWithAuthor[]> {
  const where: Record<string, unknown> = { published: true }
  if (category) where.category = category

  const articles = await prisma.article.findMany({
    where,
    include: { author: { select: authorSelect } },
    orderBy: { createdAt: "desc" },
  })

  return articles as ArticleWithAuthor[]
}
