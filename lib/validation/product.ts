import { z } from "zod"

const specificationSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
})

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name max 200 characters"),
  shortDescription: z.string().max(300, "Short description max 300 characters").optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  images: z.array(z.string()).default([]),
  specifications: z.array(specificationSchema).default([]),
  stockStatus: z.enum(["IN_STOCK", "OUT_OF_STOCK", "PRE_ORDER"]).default("IN_STOCK"),
  productType: z.enum(["MILKYSIL", "MILKYCLEAN", "TRADING", "OTHER"]).default("OTHER"),
  categoryId: z.number({ error: "Category is required" }).int().positive(),
  published: z.boolean().default(false),
  metaTitle: z.string().max(60, "Meta title max 60 characters").optional().or(z.literal("")),
  metaDescription: z.string().max(160, "Meta description max 160 characters").optional().or(z.literal("")),
})

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name max 200 characters").optional(),
  slug: z.string().min(1).optional(),
  shortDescription: z.string().max(300).optional().nullable().or(z.literal("")),
  description: z.string().optional().nullable().or(z.literal("")),
  images: z.array(z.string()).optional(),
  specifications: z.array(specificationSchema).optional(),
  stockStatus: z.enum(["IN_STOCK", "OUT_OF_STOCK", "PRE_ORDER"]).optional(),
  productType: z.enum(["MILKYSIL", "MILKYCLEAN", "TRADING", "OTHER"]).optional(),
  categoryId: z.number().int().positive().optional(),
  published: z.boolean().optional(),
  metaTitle: z.string().max(60).optional().nullable().or(z.literal("")),
  metaDescription: z.string().max(160).optional().nullable().or(z.literal("")),
})
