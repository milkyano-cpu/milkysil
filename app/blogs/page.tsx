import Header from "@/components/layouts/header"
import BlogsSection from "@/components/sections/blogs/blogs"
import Footer from "@/components/layouts/footer"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog & Berita - Milkysil",
  description:
    "Baca artikel terbaru dan berita seputar bahan kimia, produk kebersihan, dan industri kimia dari CV. Milky Makmur Sejahtera.",
  openGraph: {
    title: "Blog & Berita - Milkysil",
    description:
      "Baca artikel terbaru dan berita seputar bahan kimia, produk kebersihan, dan industri kimia dari CV. Milky Makmur Sejahtera.",
    url: "https://milkysil.com/blogs",
    type: "website",
  },
}

export default function BlogsPage() {
  return (
    <main>
      <Header />
      <BlogsSection />
      <Footer />
    </main>
  )
}
