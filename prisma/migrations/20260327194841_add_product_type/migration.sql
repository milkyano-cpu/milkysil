-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('MILKYSIL', 'MILKYCLEAN', 'TRADING', 'OTHER');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "product_type" "ProductType" NOT NULL DEFAULT 'OTHER';

-- CreateIndex
CREATE INDEX "products_product_type_idx" ON "products"("product_type");
