import type { Product, StockStatus, ProductType } from "@prisma/client"

export interface Specification {
  key: string
  value: string
}

export interface ProductWithCategory extends Product {
  category: {
    id: number
    name: string
  }
}

export interface CreateProductInput {
  name: string
  shortDescription?: string
  description?: string
  images: string[]
  specifications: Specification[]
  stockStatus: StockStatus
  productType: ProductType
  categoryId: number
  published: boolean
  metaTitle?: string
  metaDescription?: string
}

export interface UpdateProductInput {
  name?: string
  slug?: string
  shortDescription?: string | null
  description?: string | null
  images?: string[]
  specifications?: Specification[]
  stockStatus?: StockStatus
  productType?: ProductType
  categoryId?: number
  published?: boolean
  metaTitle?: string | null
  metaDescription?: string | null
}

export interface ProductListResponse {
  products: ProductWithCategory[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
