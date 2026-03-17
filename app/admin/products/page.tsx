import { prisma } from "@/lib/prisma"
import ProductClient from "./product-page"

export default async function Page() {
    const products = await prisma.product.findMany({
    include: {
        category: true, 
    },
    orderBy: {
        createdAt: "desc",
    },
    })

    return <ProductClient initialData={products} />
}