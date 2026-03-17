import { z } from "zod"

export const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title max 200 characters"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt max 500 characters"),
  content: z.string().min(1, "Content is required"),
  image: z.string().min(1, "Image is required"),
  category: z.enum(["ARTICLE", "NEWS"]),
  published: z.boolean().default(false),
  metaTitle: z.string().max(60, "Meta title max 60 characters").optional().or(z.literal("")),
  metaDescription: z.string().max(160, "Meta description max 160 characters").optional().or(z.literal("")),
})

export const updateArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title max 200 characters").optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt max 500 characters").optional(),
  content: z.string().min(1, "Content is required").optional(),
  image: z.string().min(1, "Image is required").optional(),
  category: z.enum(["ARTICLE", "NEWS"]).optional(),
  published: z.boolean().optional(),
  metaTitle: z.string().max(60).optional().nullable().or(z.literal("")),
  metaDescription: z.string().max(160).optional().nullable().or(z.literal("")),
})
