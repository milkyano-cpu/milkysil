"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

type Category = {
  id: number
  name: string
}

type Product = {
  id: number
  name: string
  slug: string
  images: string[]
  published: boolean
  categoryId: number
  category?: Category
  createdAt: string
}

export default function ProductClient({ initialData }: { initialData: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialData)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null)

  const pageSize = 10

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" })

    if (!res.ok) {
      setToast({ message: "Delete failed", type: "error" })
      return
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))
    setToast({ message: "Product deleted!", type: "success" })
  }

  const filtered = useMemo(() => {
    if (!search) return products
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, products])

  const totalPages = Math.ceil(filtered.length / pageSize)

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  const startItem = filtered.length === 0 ? 0 : (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, filtered.length)

  return (
    <div className="space-y-6 mt-6">
      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`px-6 py-3 rounded-lg text-white shadow-lg ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">List Products</h1>
          <p className="text-sm text-gray-500">
            Manage your product inventory and content
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-center"
        >
          + Add New Product
        </Link>
      </div>

      {/* SEARCH */}
      <div>
        <input
          className="border w-full px-4 py-2 rounded"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE (DESKTOP) */}
      <div className="hidden sm:block border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left w-12"></th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  {item.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-gray-100" />
                  )}
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">{item.category?.name}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      item.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${item.id}/edit`}
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <Pencil size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="cursor-pointer text-red-600 hover:bg-red-100 p-2 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LIST (MOBILE) */}
      <div className="border rounded sm:hidden">
        {paginatedData.map((item) => (
          <div key={item.id} className="p-4 border-b flex gap-3">
            {item.images?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.images[0]}
                alt=""
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{item.name}</p>
              <p className="text-sm text-gray-500">{item.category?.name}</p>
              <span
                className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                  item.published
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {item.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <Link href={`/admin/products/${item.id}/edit`}>
                <Pencil size={20} />
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-sm text-gray-600">
          Showing {startItem}-{endItem} of {filtered.length}
        </p>
        <div className="flex w-full sm:w-auto gap-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="flex items-center justify-center gap-1 flex-1 sm:flex-none px-4 py-2 border rounded text-black font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages || totalPages === 0}
            className="flex items-center justify-center gap-1 flex-1 sm:flex-none px-4 py-2 border rounded text-black font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-40"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
