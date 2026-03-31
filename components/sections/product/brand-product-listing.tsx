"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS_PER_PAGE = 12

const categoryIcons: Record<string, { icon: string; iconWhite: string }> = {
  Fiberglass: {
    icon: "/fence-icon.png",
    iconWhite: "/fence-white-icon.png",
  },
  "General Chemicals": {
    icon: "/chemical-icon.png",
    iconWhite: "/chemical-white-icon.png",
  },
  "Water Treatment": {
    icon: "/water-icon.png",
    iconWhite: "/water-white-icon.png",
  },
  "Silicone Emulsion": {
    icon: "/glue-icon.png",
    iconWhite: "/glue-white-icon.png",
  },
  Household: {
    icon: "/clean-icon.png",
    iconWhite: "/clean-white-icon.png",
  },
  "Flavouring for Food & Tobacco": {
    icon: "/food-icon.png",
    iconWhite: "/food-white-icon.png",
  },
  Others: {
    icon: "/other-icon.png",
    iconWhite: "/other-white-icon.png",
  },
}

type ProductItem = {
  id: number
  name: string
  slug: string
  images: string[]
  shortDescription: string | null
}

type CategoryWithProducts = {
  id: number
  name: string
  products: ProductItem[]
}

interface BrandProductListingProps {
  title: string
  subtitle: string
  basePath: string
  categories: CategoryWithProducts[]
}

export default function BrandProductListing({
  title,
  subtitle,
  basePath,
  categories,
}: BrandProductListingProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filteredProducts = useMemo(() => {
    let products: (ProductItem & { categoryName: string })[] = []

    for (const cat of categories) {
      for (const p of cat.products) {
        products.push({ ...p, categoryName: cat.name })
      }
    }

    if (activeCategory !== null) {
      products = products.filter((p) => {
        const cat = categories.find((c) => c.id === activeCategory)
        return cat?.products.some((cp) => cp.id === p.id)
      })
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      products = products.filter((p) => p.name.toLowerCase().includes(q))
    }

    return products
  }, [categories, activeCategory, search])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  function handleCategoryChange(id: number | null) {
    setActiveCategory(id)
    setPage(1)
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  return (
    <section className="bg-[#F7F9FC] pb-24">
      {/* HERO */}
      <div className="bg-primary pt-24 pb-36 rounded-b-[60px] text-center text-white">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-3 text-white/80 text-sm max-w-lg mx-auto">{subtitle}</p>
      </div>

      {/* CATEGORY TABS */}
      <div className="relative z-20 w-full -mt-8">
        <div className="flex gap-3 overflow-x-auto px-6 md:px-0 md:overflow-visible md:justify-center md:max-w-[1100px] md:mx-auto no-scrollbar pb-4">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`flex items-center justify-center gap-2 flex-shrink-0
              px-6 h-[50px] rounded-lg font-medium shadow-md transition cursor-pointer text-sm
              ${activeCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            Semua
          </button>
          {categories.map((cat) => {
            const icons = categoryIcons[cat.name]
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center justify-center gap-2 flex-shrink-0
                  px-6 h-[50px] rounded-lg font-medium shadow-md transition cursor-pointer text-sm
                  ${activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                {icons && (
                  <Image
                    src={activeCategory === cat.id ? icons.iconWhite : icons.icon}
                    alt={cat.name}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                )}
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-[1100px] mx-auto px-6 mt-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition"
          />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-[1100px] mx-auto px-6 mt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Tidak ada produk ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`${basePath}/${product.slug}`}
                className="group bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                
              <div className="relative aspect-square bg-gray-50">
                <div className="absolute inset-0 p-4">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-300 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

                <div className="p-4 space-y-2">
                  <span className="inline-block text-[11px] font-medium text-blue bg-blue/10 px-2 py-0.5 rounded-full">
                    {product.categoryName}
                  </span>
                  <h3 className="text-sm font-semibold text-primary line-clamp-2 group-hover:text-blue transition">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition ${
                  p === page
                    ? "bg-blue-600 text-white shadow"
                    : "border bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
