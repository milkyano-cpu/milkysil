import Link from "next/link"
import ProductGallery from "@/components/sections/product/product-gallery"
import WhatsAppCTA from "@/components/sections/product/whatsapp-cta"
import ProductViewTracker from "@/components/sections/product/product-view-tracker"
import RelatedProducts from "@/components/sections/product/related-products"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { ProductWithCategory, Specification } from "@/lib/types/product"

const stockStatusLabels: Record<string, { label: string; className: string }> = {
  IN_STOCK: { label: "In Stock", className: "bg-green-100 text-green-700" },
  OUT_OF_STOCK: { label: "Out of Stock", className: "bg-red-100 text-red-700" },
  PRE_ORDER: { label: "Pre Order", className: "bg-amber-100 text-amber-700" },
}

function cleanBrokenImages(html: string): string {
  return html.replace(/<img[^>]*src=["']undefined\/[^"']*["'][^>]*\/?>/gi, "")
}

interface ProductDetailContentProps {
  product: ProductWithCategory
  relatedProducts: ProductWithCategory[]
  breadcrumbBase: { href: string; label: string }
  detailBasePath: string
}

export default function ProductDetailContent({
  product,
  relatedProducts,
  breadcrumbBase,
  detailBasePath,
}: ProductDetailContentProps) {
  const specifications = (product.specifications as unknown as Specification[]) || []
  const stockInfo = stockStatusLabels[product.stockStatus] || stockStatusLabels.IN_STOCK

  return (
    <>
      <ProductViewTracker
        productId={product.id}
        productName={product.name}
        productCategory={product.category.name}
        productSlug={product.slug}
        stockStatus={product.stockStatus}
      />

      {/* BREADCRUMB */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 mt-10 md:mt-16 mb-6">
        <Breadcrumb>
          <BreadcrumbList className="text-xs md:text-sm text-gray-500">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={breadcrumbBase.href}>{breadcrumbBase.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={breadcrumbBase.href}>{product.category.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* PRODUCT HEADER - 2 col desktop */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              <span className="inline-block text-xs font-medium text-blue bg-blue/10 px-2.5 py-1 rounded-full mb-3">
                {product.category.name}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
                {product.name}
              </h1>
            </div>

            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${stockInfo.className}`}>
              {stockInfo.label}
            </span>

            {product.shortDescription && (
              <p className="text-gray-600 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* WhatsApp CTA - desktop inline */}
            <div className="hidden md:block pt-2">
              <WhatsAppCTA productName={product.name} />
            </div>
          </div>
        </div>
      </div>

      {/* SPECIFICATIONS */}
      {specifications.length > 0 && (
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
            Spesifikasi Produk
          </h2>
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {specifications.map((spec, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <td className="px-5 py-3 font-medium text-primary w-1/3 border-r">
                      {spec.key}
                    </td>
                    <td className="px-5 py-3 text-gray-700">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DESCRIPTION */}
      {product.description && (
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
            Deskripsi Produk
          </h2>
          <div className="bg-white rounded-xl border p-5 md:p-8">
            <div
              className="
                prose prose-sm md:prose-base max-w-none
                prose-p:leading-relaxed md:prose-p:leading-loose
                prose-p:text-[#1E3E6D]
                prose-headings:text-primary prose-headings:font-bold
                prose-h2:text-xl md:prose-h2:text-2xl
                prose-h3:text-lg md:prose-h3:text-xl
                prose-a:text-blue-600 prose-a:underline
                prose-li:marker:text-primary
                prose-img:rounded-xl prose-img:my-6
                break-words overflow-hidden
              "
              dangerouslySetInnerHTML={{
                __html: cleanBrokenImages(product.description),
              }}
            />
          </div>
        </div>
      )}

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 mt-12 md:mt-16">
          <RelatedProducts products={relatedProducts} basePath={detailBasePath} />
        </div>
      )}

      {/* Sticky WhatsApp CTA - mobile only */}
      <WhatsAppCTA productName={product.name} sticky />
    </>
  )
}
