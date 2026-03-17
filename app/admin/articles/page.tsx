"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface Article {
  id: string
  title: string
  slug: string
  category: "ARTICLE" | "NEWS"
  published: boolean
  createdAt: string
  author: {
    name: string
    email: string
  }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const pageSize = 10

  const fetchArticles = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      })
      if (search) params.set("search", search)
      if (categoryFilter) params.set("category", categoryFilter)

      const res = await fetch(`/api/articles?${params}`)
      const data = await res.json()

      setArticles(data.articles || [])
      setTotal(data.total || 0)
    } catch {
      toast.error("Failed to fetch articles")
    } finally {
      setIsLoading(false)
    }
  }, [page, search, categoryFilter])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [search, categoryFilter])

  const totalPages = Math.ceil(total / pageSize)
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, total)

  async function handleDelete() {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/articles/${deleteId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        toast.error("Failed to delete article")
        return
      }

      toast.success("Article deleted")
      setDeleteId(null)
      fetchArticles()
    } catch {
      toast.error("Failed to delete article")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6 mt-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Articles</h1>
          <p className="text-sm text-gray-500">
            Manage blogs and news articles
          </p>
        </div>

        <Link
          href="/admin/articles/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2 w-fit"
        >
          <Plus size={16} />
          Create Article
        </Link>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            className="border w-full pl-9 pr-4 py-2 rounded"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
        >
          <option value="">All Categories</option>
          <option value="ARTICLE">Article</option>
          <option value="NEWS">News</option>
        </select>
      </div>

      {/* TABLE (DESKTOP) */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">No articles found</p>
          <p className="text-sm mt-1">
            {search || categoryFilter
              ? "Try adjusting your filters"
              : "Create your first article to get started"}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Author</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-t">
                    <td className="p-3 max-w-[250px]">
                      <p className="font-medium truncate">{article.title}</p>
                      <p className="text-xs text-gray-400 truncate">
                        /{article.slug}
                      </p>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          article.category === "NEWS"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {article.category === "ARTICLE"
                          ? "Article"
                          : "News"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          article.published ? "default" : "destructive"
                        }
                      >
                        {article.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="p-3 text-gray-600">
                      {article.author.name}
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(article.createdAt).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="p-2 rounded hover:bg-gray-100"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(article.id)}
                          className="p-2 rounded text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="border rounded sm:hidden divide-y">
            {articles.map((article) => (
              <div key={article.id} className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{article.title}</p>
                    <p className="text-xs text-gray-400">/{article.slug}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="p-1.5"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => setDeleteId(article.id)}
                      className="p-1.5 text-red-600 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant={
                      article.category === "NEWS" ? "secondary" : "outline"
                    }
                  >
                    {article.category === "ARTICLE" ? "Article" : "News"}
                  </Badge>
                  <Badge
                    variant={article.published ? "default" : "destructive"}
                  >
                    {article.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-600">
              Showing {startItem}-{endItem} of {total}
            </p>

            <div className="flex w-full sm:w-auto gap-2">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="flex items-center justify-center gap-1 flex-1 sm:flex-none px-4 py-2 border rounded font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages || totalPages === 0}
                className="flex items-center justify-center gap-1 flex-1 sm:flex-none px-4 py-2 border rounded font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* DELETE DIALOG */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this article? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
