"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

type Product = {
  id: number
  name: string
  slug: string
  images: string[]
  published: boolean
}

type Category = {
  id: number
  name: string
  products: Product[]
}

type ProductCategory = {
  name: string
  icon: string
  iconWhite: string
  products: Record<string, { name: string; slug: string }[]>
}

const categoryIcons: Record<
  string,
  { icon: string; iconWhite: string }
> = {
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

function buildCategories(data: Category[]): ProductCategory[] {
  return data.map((cat) => {
    const grouped: Record<string, { name: string; slug: string }[]> = {}

    cat.products.forEach((p) => {
      const letter = p.name.charAt(0).toUpperCase()
      if (!grouped[letter]) grouped[letter] = []
      grouped[letter].push({ name: p.name, slug: p.slug })
    })

    return {
      name: cat.name,
      icon: categoryIcons[cat.name]?.icon || "",
      iconWhite: categoryIcons[cat.name]?.iconWhite || "",
      products: grouped,
    }
  })
}

export default function ProductSection({
  categories: serverData,
}: {
  categories: Category[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const tabKeys = [
    "fiberglass",
    "general",
    "water",
    "silicone",
    "household",
    "flavour",
    "others",
  ]

  const initialTab = tabKeys.indexOf(searchParams.get("tab") || "")
  const [activeTab, setActiveTab] = useState(initialTab >= 0 ? initialTab : 0)

  const categories = useMemo(
    () => buildCategories(serverData),
    [serverData]
  )

  const activeProducts = categories[activeTab]?.products || {}

  return (
    <section className="bg-[#F7F9FC] pb-24">
      {/* HERO */}
      <div className="bg-primary pt-24 pb-36 rounded-b-[60px] text-center text-white">
        <h1 className="text-4xl font-bold">List Product</h1>
        <p className="mt-3 text-white text-sm">
          <span className="font-semibold">MILKYSIL&reg;</span> trusted brands of the
          nation`s pride
        </p>
      </div>

      {/* CATEGORY TAB */}
      <div className="relative z-20 w-full -mt-12">
        <div className="flex gap-3 overflow-x-auto px-6 md:px-0 md:overflow-visible md:justify-center md:max-w-[1100px] md:mx-auto no-scrollbar pb-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index)
                router.push(`/product?tab=${tabKeys[index]}`)
              }}
              className={`flex items-center justify-center gap-2 flex-shrink-0
                w-[160px] md:w-[180px]
                h-[60px] md:h-[70px]
                px-3
                text-xs md:text-sm
                rounded-lg font-medium shadow-md transition cursor-pointer
                ${
                  activeTab === index
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Image
                src={activeTab === index ? cat.iconWhite : cat.icon}
                alt={cat.name}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="max-w-[1100px] mx-auto px-6 mt-14 space-y-10">
        {Object.entries(activeProducts).map(([letter, items]) => (
          <div key={letter} className="flex gap-8 items-start">
            <div className="text-gray-300 text-xl font-semibold min-w-[60px]">
              #{letter}
            </div>

            <div className="flex flex-wrap gap-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={`/product/${item.slug}`}
                  className="px-6 py-3 rounded-full bg-white shadow text-primary text-sm font-semibold hover:bg-blue hover:text-white transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
