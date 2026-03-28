import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import type { ProductWithCategory, ProductListResponse, CreateProductInput, UpdateProductInput } from "@/lib/types/product"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function generateUniqueSlug(
  name: string,
  excludeId?: number
): Promise<string> {
  const baseSlug = slugify(name)
  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await prisma.product.findUnique({
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

const categorySelect = {
  id: true,
  name: true,
}

export async function getProducts(options: {
  page?: number
  pageSize?: number
  categoryId?: number
  published?: boolean
  search?: string
  productType?: string
}): Promise<ProductListResponse> {
  const {
    page = 1,
    pageSize = 10,
    categoryId,
    published,
    search,
    productType,
  } = options

  const where: Record<string, unknown> = {}

  if (categoryId) where.categoryId = categoryId
  if (published !== undefined) where.published = published
  if (productType) where.productType = productType
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
    ]
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: { select: categorySelect } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ])

  return {
    products: products as ProductWithCategory[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getProductById(
  id: number
): Promise<ProductWithCategory | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: { select: categorySelect } },
  })

  return product as ProductWithCategory | null
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithCategory | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: { select: categorySelect } },
  })

  return product as ProductWithCategory | null
}

export async function createProduct(
  data: CreateProductInput
): Promise<ProductWithCategory> {
  const slug = await generateUniqueSlug(data.name)

  const product = await prisma.product.create({
    data: {
      slug,
      name: data.name,
      shortDescription: data.shortDescription || null,
      description: data.description || null,
      images: data.images,
      specifications: data.specifications as unknown as Prisma.InputJsonValue,
      stockStatus: data.stockStatus,
      productType: data.productType || "OTHER",
      categoryId: data.categoryId,
      published: data.published,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
    },
    include: { category: { select: categorySelect } },
  })

  return product as ProductWithCategory
}

export async function updateProduct(
  id: number,
  data: UpdateProductInput
): Promise<ProductWithCategory> {
  const updateData: Record<string, unknown> = { ...data }

  // Cast specifications for Prisma Json type
  if (data.specifications) {
    updateData.specifications = data.specifications as unknown as Prisma.InputJsonValue
  }

  if (data.name && !data.slug) {
    updateData.slug = await generateUniqueSlug(data.name, id)
  }

  // Convert empty strings to null for optional fields
  if (data.shortDescription === "") updateData.shortDescription = null
  if (data.description === "") updateData.description = null
  if (data.metaTitle === "") updateData.metaTitle = null
  if (data.metaDescription === "") updateData.metaDescription = null

  const product = await prisma.product.update({
    where: { id },
    data: updateData,
    include: { category: { select: categorySelect } },
  })

  return product as ProductWithCategory
}

export async function deleteProduct(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } })
}

export async function getRelatedProducts(
  productId: number,
  categoryId: number,
  limit: number = 4,
  productType?: string
): Promise<ProductWithCategory[]> {
  const where: Record<string, unknown> = {
    categoryId,
    id: { not: productId },
    published: true,
  }
  if (productType) where.productType = productType

  const products = await prisma.product.findMany({
    where,
    include: { category: { select: categorySelect } },
    orderBy: { createdAt: "desc" },
    take: limit,
  })

  return products as ProductWithCategory[]
}

export async function getPublishedProducts(
  categoryId?: number
): Promise<ProductWithCategory[]> {
  const where: Record<string, unknown> = { published: true }
  if (categoryId) where.categoryId = categoryId

  const products = await prisma.product.findMany({
    where,
    include: { category: { select: categorySelect } },
    orderBy: { createdAt: "desc" },
  })

  return products as ProductWithCategory[]
}
