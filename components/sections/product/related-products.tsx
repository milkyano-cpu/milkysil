import Image from "next/image"
import Link from "next/link"
import type { ProductWithCategory } from "@/lib/types/product"

interface RelatedProductsProps {
  products: ProductWithCategory[]
  basePath?: string
}

export default function RelatedProducts({ products, basePath = "/product" }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
        Produk Terkait
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`${basePath}/${product.slug}`}
            className="group bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="relative aspect-square bg-gray-50">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-300 text-xs">No image</span>
                </div>
              )}
            </div>

            <div className="p-3 space-y-1">
              <p className="text-sm font-semibold text-primary line-clamp-2 group-hover:text-blue transition">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">
                {product.category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
