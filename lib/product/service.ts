import { prisma } from "@/lib/prisma";

export async function getAllProducts() {
  return await prisma.category.findMany({
    include: {
      products: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}