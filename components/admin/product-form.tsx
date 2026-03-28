"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TipTapEditor } from "@/components/admin/tiptap-editor"
import { MultiImageUploader } from "@/components/admin/multi-image-uploader"
import { SpecificationEditor } from "@/components/admin/specification-editor"
import { COMMON_SPECIFICATION_KEYS } from "@/lib/constants/product-specifications"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import type { StockStatus, ProductType } from "@prisma/client"

interface Specification {
  key: string
  value: string
}

interface Category {
  id: number
  name: string
}

interface ProductFormProps {
  mode: "create" | "edit"
  categories: Category[]
  initialData?: {
    id: number
    name: string
    slug: string
    shortDescription?: string | null
    description?: string | null
    images: string[]
    specifications: Specification[]
    stockStatus: StockStatus
    categoryId: number
    published: boolean
    productType?: ProductType
    metaTitle?: string | null
    metaDescription?: string | null
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function ProductForm({ mode, categories, initialData }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [name, setName] = useState(initialData?.name || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [specifications, setSpecifications] = useState<Specification[]>(
    initialData?.specifications ||
    (mode === "create" ? COMMON_SPECIFICATION_KEYS.map(key => ({ key, value: "" })) : [])
  )
  const [stockStatus, setStockStatus] = useState<StockStatus>(
    initialData?.stockStatus || "IN_STOCK"
  )
  const [productType, setProductType] = useState<ProductType>(
    initialData?.productType || "OTHER"
  )
  const [categoryId, setCategoryId] = useState<string>(
    initialData?.categoryId?.toString() || ""
  )
  const [published, setPublished] = useState(initialData?.published || false)
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "")
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "")

  useEffect(() => {
    if (mode === "create" && name) {
      setSlug(slugify(name))
    }
  }, [name, mode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Product name is required")
      return
    }
    if (!categoryId) {
      toast.error("Category is required")
      return
    }

    setIsSubmitting(true)

    try {
      const body = {
        name: name.trim(),
        ...(mode === "edit" && { slug: slug.trim() }),
        shortDescription: shortDescription.trim() || undefined,
        description: description || undefined,
        images,
        specifications: specifications.filter(s => s.value.trim()),
        stockStatus,
        productType,
        categoryId: Number(categoryId),
        published,
        metaTitle: metaTitle.trim() || undefined,
        metaDescription: metaDescription.trim() || undefined,
      }

      const url =
        mode === "create"
          ? "/api/products"
          : `/api/products/${initialData?.id}`

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.details) {
          const firstError = Object.values(data.details).flat()[0]
          toast.error(firstError as string)
        } else {
          toast.error(data.error || "Failed to save product")
        }
        return
      }

      toast.success(mode === "create" ? "Product created!" : "Product updated!")
      router.push("/admin/products")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="content">
        <TabsList className="h-11">
          <TabsTrigger value="content" className="text-base px-6 py-2">Content</TabsTrigger>
          <TabsTrigger value="specifications" className="text-base px-6 py-2">Specifications</TabsTrigger>
          <TabsTrigger value="media" className="text-base px-6 py-2">Media</TabsTrigger>
          <TabsTrigger value="description" className="text-base px-6 py-2">Description</TabsTrigger>
          <TabsTrigger value="seo" className="text-base px-6 py-2">SEO</TabsTrigger>
        </TabsList>

        {/* CONTENT TAB */}
        <TabsContent value="content" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="product-slug"
              disabled={mode === "create"}
            />
            {mode === "create" && (
              <p className="text-xs text-gray-500">Auto-generated from name</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">
              Short Description{" "}
              <span className="text-gray-400">({shortDescription.length}/300)</span>
            </Label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief description of the product"
              maxLength={300}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Product Type</Label>
              <Select value={productType} onValueChange={(v) => setProductType(v as ProductType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MILKYSIL">MilkySil</SelectItem>
                  <SelectItem value="MILKYCLEAN">MilkyClean</SelectItem>
                  <SelectItem value="TRADING">Trading & Distribution</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Stock Status</Label>
              <Select value={stockStatus} onValueChange={(v) => setStockStatus(v as StockStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN_STOCK">In Stock</SelectItem>
                  <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                  <SelectItem value="PRE_ORDER">Pre Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="published"
              checked={published}
              onCheckedChange={(checked) => setPublished(checked === true)}
            />
            <Label htmlFor="published" className="cursor-pointer">
              Published
            </Label>
          </div>
        </TabsContent>

        {/* SPECIFICATIONS TAB */}
        <TabsContent value="specifications" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Product Specifications</Label>
            <p className="text-sm text-gray-500">
              Add key-value pairs for product specifications (e.g. Kemurnian: 99%)
            </p>
            <SpecificationEditor
              specifications={specifications}
              onChange={setSpecifications}
            />
          </div>
        </TabsContent>

        {/* MEDIA TAB */}
        <TabsContent value="media" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Product Images</Label>
            <p className="text-sm text-gray-500">
              Upload up to 10 images. The first image will be used as the primary image. Drag to reorder.
            </p>
            <MultiImageUploader images={images} onChange={setImages} />
          </div>
        </TabsContent>

        {/* DESCRIPTION TAB */}
        <TabsContent value="description" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Full Description</Label>
            <TipTapEditor content={description} onChange={setDescription} />
          </div>
        </TabsContent>

        {/* SEO TAB */}
        <TabsContent value="seo" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">
              Meta Title{" "}
              <span className="text-gray-400">({metaTitle.length}/60)</span>
            </Label>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO title (defaults to product name)"
              maxLength={60}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">
              Meta Description{" "}
              <span className="text-gray-400">({metaDescription.length}/160)</span>
            </Label>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="SEO description (defaults to short description)"
              maxLength={160}
              rows={3}
            />
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-gray-50 space-y-1">
            <p className="text-xs text-gray-500">Search Engine Preview</p>
            <p className="text-blue-700 text-lg font-medium truncate">
              {metaTitle || name || "Product Name"}
            </p>
            <p className="text-green-700 text-sm">
              milkysil.com/product/{slug || "product-slug"}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {metaDescription || shortDescription || "Product description will appear here..."}
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Product" : "Update Product"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="border px-6 py-2 rounded hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
