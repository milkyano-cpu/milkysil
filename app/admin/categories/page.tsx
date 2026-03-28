import { prisma } from "@/lib/prisma"
import CategoryClient from "./category-page"

export const dynamic = "force-dynamic"

export default async function Page() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return <CategoryClient initialData={JSON.parse(JSON.stringify(categories))} />
}
