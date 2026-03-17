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
import { ImageUploader } from "@/components/admin/image-uploader"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface ArticleFormProps {
  mode: "create" | "edit"
  initialData?: {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    image: string
    category: "ARTICLE" | "NEWS"
    published: boolean
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

export function ArticleForm({ mode, initialData }: ArticleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [image, setImage] = useState<string | null>(initialData?.image || null)
  const [category, setCategory] = useState<"ARTICLE" | "NEWS">(
    initialData?.category || "ARTICLE"
  )
  const [published, setPublished] = useState(initialData?.published || false)
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "")
  const [metaDescription, setMetaDescription] = useState(
    initialData?.metaDescription || ""
  )

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (mode === "create" && title) {
      setSlug(slugify(title))
    }
  }, [title, mode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Title is required")
      return
    }
    if (!excerpt.trim()) {
      toast.error("Excerpt is required")
      return
    }
    if (!content.trim() || content === "<p></p>") {
      toast.error("Content is required")
      return
    }
    if (!image) {
      toast.error("Featured image is required")
      return
    }

    setIsSubmitting(true)

    try {
      const body = {
        title: title.trim(),
        ...(mode === "edit" && { slug: slug.trim() }),
        excerpt: excerpt.trim(),
        content,
        image,
        category,
        published,
        metaTitle: metaTitle.trim() || undefined,
        metaDescription: metaDescription.trim() || undefined,
      }

      const url =
        mode === "create"
          ? "/api/articles"
          : `/api/articles/${initialData?.id}`

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
          toast.error(data.error || "Failed to save article")
        }
        return
      }

      toast.success(
        mode === "create" ? "Article created!" : "Article updated!"
      )
      router.push("/admin/articles")
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
          <TabsTrigger value="media" className="text-base px-6 py-2">Media</TabsTrigger>
          <TabsTrigger value="seo" className="text-base px-6 py-2">SEO</TabsTrigger>
        </TabsList>

        {/* CONTENT TAB */}
        <TabsContent value="content" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="article-slug"
              disabled={mode === "create"}
            />
            {mode === "create" && (
              <p className="text-xs text-gray-500">
                Auto-generated from title
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">
              Excerpt{" "}
              <span className="text-gray-400">({excerpt.length}/500)</span>
            </Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the article"
              maxLength={500}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <TipTapEditor content={content} onChange={setContent} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as "ARTICLE" | "NEWS")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ARTICLE">Article</SelectItem>
                  <SelectItem value="NEWS">News</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="published"
                  checked={published}
                  onCheckedChange={(checked) => setPublished(checked === true)}
                />
                <Label htmlFor="published" className="cursor-pointer">
                  Published
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* MEDIA TAB */}
        <TabsContent value="media" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <ImageUploader imageUrl={image} onChange={setImage} />
          </div>
        </TabsContent>

        {/* SEO TAB */}
        <TabsContent value="seo" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">
              Meta Title{" "}
              <span className="text-gray-400">
                ({metaTitle.length}/60)
              </span>
            </Label>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO title (defaults to article title)"
              maxLength={60}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">
              Meta Description{" "}
              <span className="text-gray-400">
                ({metaDescription.length}/160)
              </span>
            </Label>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="SEO description (defaults to excerpt)"
              maxLength={160}
              rows={3}
            />
          </div>

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-gray-50 space-y-1">
            <p className="text-xs text-gray-500">Search Engine Preview</p>
            <p className="text-blue-700 text-lg font-medium truncate">
              {metaTitle || title || "Article Title"}
            </p>
            <p className="text-green-700 text-sm">
              milkysil.com/blogs/{slug || "article-slug"}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {metaDescription || excerpt || "Article description will appear here..."}
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
          {mode === "create" ? "Create Article" : "Update Article"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className="border px-6 py-2 rounded hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
