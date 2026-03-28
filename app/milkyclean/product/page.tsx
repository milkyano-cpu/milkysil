import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import BrandProductListing from "@/components/sections/product/brand-product-listing"
import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Produk MilkyClean",
  description: "Daftar produk MilkyClean dari CV. Milky Makmur Sejahtera",
}

export default async function MilkyCleanProductPage() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      products: {
        where: { published: true, productType: "MILKYCLEAN" },
        select: {
          id: true,
          name: true,
          slug: true,
          images: true,
          shortDescription: true,
        },
      },
    },
  })

  const filtered = categories.filter((c) => c.products.length > 0)

  return (
    <main>
      <Header />
      <BrandProductListing
        title="MilkyClean Products"
        subtitle="Produk kebersihan MilkyClean untuk kebutuhan rumah tangga dan industri"
        basePath="/milkyclean/product"
        categories={filtered}
      />
      <Footer />
    </main>
  )
}
