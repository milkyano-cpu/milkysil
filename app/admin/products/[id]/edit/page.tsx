import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/services/product-service"
import { ProductForm } from "@/components/admin/product-form"
import type { Specification } from "@/lib/types/product"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id: idParam } = await params
  const id = parseInt(idParam)

  if (isNaN(id)) return notFound()

  const product = await getProductById(id)
  if (!product) return notFound()

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h1 className="text-xl font-bold">Edit Product</h1>
        <p className="text-sm text-gray-500">Update product details</p>
      </div>

      <ProductForm
        mode="edit"
        categories={categories}
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          shortDescription: product.shortDescription,
          description: product.description,
          images: product.images,
          specifications: (product.specifications as unknown as Specification[]) || [],
          stockStatus: product.stockStatus,
          productType: product.productType,
          categoryId: product.categoryId,
          published: product.published,
          metaTitle: product.metaTitle,
          metaDescription: product.metaDescription,
        }}
      />
    </div>
  )
}
