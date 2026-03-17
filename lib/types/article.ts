import type { Article, ArticleCategory } from "@prisma/client"

export interface ArticleWithAuthor extends Article {
  author: {
    name: string
    email: string
  }
}

export interface CreateArticleInput {
  title: string
  excerpt: string
  content: string
  image: string
  category: ArticleCategory
  published: boolean
  metaTitle?: string
  metaDescription?: string
}

export interface UpdateArticleInput {
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

export interface ArticleListResponse {
  articles: ArticleWithAuthor[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
