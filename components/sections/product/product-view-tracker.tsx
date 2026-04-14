"use client"

import { useEffect } from "react"
import { dataLayer } from "@/lib/gtm/data-layer"

interface ProductViewTrackerProps {
  productId: string | number
  productName: string
  productCategory: string
  productSlug: string
  stockStatus: string
}

export default function ProductViewTracker({
  productId,
  productName,
  productCategory,
  productSlug,
  stockStatus,
}: ProductViewTrackerProps) {
  useEffect(() => {
    dataLayer.viewProduct({
      product_id: productId,
      product_name: productName,
      product_category: productCategory,
      product_slug: productSlug,
      stock_status: stockStatus,
    })
  }, [productId])

  return null
}
