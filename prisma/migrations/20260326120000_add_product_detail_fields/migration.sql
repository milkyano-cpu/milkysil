-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'PRE_ORDER');

-- AlterTable: add columns as nullable first
ALTER TABLE "products" ADD COLUMN "slug" TEXT;
ALTER TABLE "products" ADD COLUMN "short_description" TEXT;
ALTER TABLE "products" ADD COLUMN "description" TEXT;
ALTER TABLE "products" ADD COLUMN "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "products" ADD COLUMN "specifications" JSONB DEFAULT '[]';
ALTER TABLE "products" ADD COLUMN "stock_status" "StockStatus" NOT NULL DEFAULT 'IN_STOCK';
ALTER TABLE "products" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "products" ADD COLUMN "meta_title" TEXT;
ALTER TABLE "products" ADD COLUMN "meta_description" TEXT;

-- Generate slugs for existing products
UPDATE "products" SET "slug" = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE("name", '[^\w\s-]', '', 'g'),
      '\s+', '-', 'g'
    ),
    '-+', '-', 'g'
  )
);

-- Handle duplicate slugs by appending the id
UPDATE "products" p1 SET "slug" = p1."slug" || '-' || p1."id"
WHERE EXISTS (
  SELECT 1 FROM "products" p2
  WHERE p2."slug" = p1."slug" AND p2."id" < p1."id"
);

-- Now make slug required and unique
ALTER TABLE "products" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE INDEX "products_slug_idx" ON "products"("slug");
CREATE INDEX "products_published_idx" ON "products"("published");
CREATE INDEX "products_category_id_idx" ON "products"("category_id");
