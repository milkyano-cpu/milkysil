import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import { notFound } from "next/navigation"
import { getProductBySlug, getRelatedProducts } from "@/lib/services/product-service"
import { generateProductMetadata, generateProductJsonLd } from "@/lib/utils/seo"
import ProductDetailContent from "@/components/sections/product/product-detail-content"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return generateProductMetadata(product)
}

export default async function MilkyCleanProductDetail({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product || !product.published || product.productType !== "MILKYCLEAN") {
    return notFound()
  }

  const jsonLd = generateProductJsonLd(product)
  const relatedProducts = await getRelatedProducts(product.id, product.categoryId, 4, "MILKYCLEAN")

  return (
    <main className="bg-[#F7F9FC] min-h-screen">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductDetailContent
        product={product}
        relatedProducts={relatedProducts}
        breadcrumbBase={{ href: "/milkyclean/product", label: "MilkyClean" }}
        detailBasePath="/milkyclean/product"
      />

      <div className="mt-16 md:mt-24">
        <Footer />
      </div>
    </main>
  )
}
