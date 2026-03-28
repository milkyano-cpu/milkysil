"use client"

import { useState, useMemo, useEffect } from "react"
import { Pencil, Trash2, Plus, X, ChevronLeft, ChevronRight } from "lucide-react"

type Category = {
  id: number
  name: string
  createdAt: string
  _count: {
    products: number
  }
}

export default function CategoryClient({ initialData }: { initialData: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialData)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [nameInput, setNameInput] = useState("")
  const [saving, setSaving] = useState(false)

  const pageSize = 10

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  function openCreate() {
    setEditingId(null)
    setNameInput("")
    setDialogOpen(true)
  }

  function openEdit(cat: Category) {
    setEditingId(cat.id)
    setNameInput(cat.name)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
    setNameInput("")
  }

  async function handleSave() {
    const trimmed = nameInput.trim()
    if (!trimmed) return

    setSaving(true)
    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/categories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: trimmed }),
        })
        if (!res.ok) {
          const data = await res.json()
          setToast({ message: data.error || "Update failed", type: "error" })
          return
        }
        const updated = await res.json()
        setCategories((prev) =>
          prev.map((c) => (c.id === editingId ? { ...c, name: updated.name } : c))
        )
        setToast({ message: "Category updated!", type: "success" })
      } else {
        // Create
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: trimmed }),
        })
        if (!res.ok) {
          const data = await res.json()
          setToast({ message: data.error || "Create failed", type: "error" })
          return
        }
        const created = await res.json()
        setCategories((prev) => [
          { ...created, createdAt: created.createdAt ?? new Date().toISOString(), _count: { products: 0 } },
          ...prev,
        ])
        setToast({ message: "Category created!", type: "success" })
      }
      closeDialog()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(cat: Category) {
    if (cat._count.products > 0) {
      setToast({
        message: `Cannot delete: ${cat._count.products} product(s) still use this category`,
        type: "error",
      })
      return
    }

    if (!confirm(`Delete "${cat.name}"?`)) return

    const res = await fetch(`/api/categories/${cat.id}`, { method: "DELETE" })

    if (!res.ok) {
      const data = await res.json()
      setToast({ message: data.error || "Delete failed", type: "error" })
      return
    }

    setCategories((prev) => prev.filter((c) => c.id !== cat.id))
    setToast({ message: "Category deleted!", type: "success" })
  }

  const filtered = useMemo(() => {
    if (!search) return categories
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, categories])

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

      {/* DIALOG */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                {editingId ? "Edit Category" : "Add Category"}
              </h2>
              <button
                onClick={closeDialog}
                className="p-1 rounded hover:bg-gray-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  className="border w-full px-4 py-2 rounded"
                  placeholder="Category name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave()
                  }}
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={closeDialog}
                  className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !nameInput.trim()}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-40 cursor-pointer"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">List Categories</h1>
          <p className="text-sm text-gray-500">
            Manage your product categories
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* SEARCH */}
      <div>
        <input
          className="border w-full px-4 py-2 rounded"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
      </div>

      {/* TABLE (DESKTOP) */}
      <div className="hidden sm:block border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                    {item._count.products} product{item._count.products !== 1 ? "s" : ""}
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
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="cursor-pointer text-red-600 hover:bg-red-100 p-2 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* LIST (MOBILE) */}
      <div className="border rounded sm:hidden">
        {paginatedData.length === 0 && (
          <div className="p-6 text-center text-gray-400">No categories found</div>
        )}
        {paginatedData.map((item) => (
          <div key={item.id} className="p-4 border-b flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item._count.products} product{item._count.products !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-2 items-start">
              <button
                onClick={() => openEdit(item)}
                className="p-2 rounded hover:bg-gray-100 cursor-pointer"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="text-red-600 cursor-pointer p-2 rounded hover:bg-red-100"
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
