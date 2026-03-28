import Header from "@/components/layouts/header"
import ProductSection from "@/components/sections/product/product"
import Footer from "@/components/layouts/footer"
import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "List Product",
  description: "Daftar produk bahan kimia industri dari CV. Milky Makmur Sejahtera",
}

export default async function ProductPage() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      products: {
        select: {
          id: true,
          name: true,
          slug: true,
          images: true,
          published: true,
        },
      },
    },
  })

  return (
    <main>
      <Header />
      <ProductSection categories={categories} />
      <Footer />
    </main>
  )
}
