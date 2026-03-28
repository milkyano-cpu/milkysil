import { prisma } from "@/lib/prisma"
import { ProductForm } from "@/components/admin/product-form"

export default async function CreateProductPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h1 className="text-xl font-bold">Create Product</h1>
        <p className="text-sm text-gray-500">Add a new product to your catalog</p>
      </div>

      <ProductForm mode="create" categories={categories} />
    </div>
  )
}
