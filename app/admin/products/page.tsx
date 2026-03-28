import { prisma } from "@/lib/prisma"
import ProductClient from "./product-page"

export const dynamic = "force-dynamic"

export default async function Page() {
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return <ProductClient initialData={JSON.parse(JSON.stringify(products))} />
}
