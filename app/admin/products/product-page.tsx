"use client"

import { useState, useMemo, useEffect } from "react"
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

type Category = {
  id: number
  name: string
}

type Product = {
  id: number
  name: string
  categoryId: number
  category?: Category
  createdAt: string
}

export default function ProductClient({ initialData }: any) {
  const [products, setProducts] = useState<Product[]>(initialData)

  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)

  const [toast, setToast] = useState<any>(null)

  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<any>(null)

  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<any[]>([])

  const pageSize = 10

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories)
  }, [])

  async function handleSubmit() {
    if (!name || !categoryId) {
      setToast({ message: "Please fill all fields", type: "warning" })
      return
    }

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name: name.trim(), categoryId }),
    })

    const data = await res.json()

    if (!res.ok) {
      setToast({ message: data.error, type: "error" })
      return
    }

    setProducts(prev => [
      {
        ...data,
        category: categories.find(c => c.id === Number(categoryId)),
      },
      ...prev,
    ])

    setToast({ message: "Product added!", type: "success" })
    setOpen(false)
    setName("")
    setCategoryId("")
  }

  function handleEdit(item: any) {
    setSelected(item)
    setName(item.name)
    setCategoryId(item.categoryId)
    setEditOpen(true)
  }

  async function handleUpdate() {
    const res = await fetch(`/api/products/${selected.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, categoryId }),
    })

    if (!res.ok) {
      setToast({ message: "Update failed", type: "error" })
      return
    }

  setProducts(prev =>
    prev.map(item =>
      item.id === selected.id
        ? {
            ...item,
            name,
            categoryId: Number(categoryId),
            category: categories.find(c => c.id === Number(categoryId)),
          }
        : item
    )
  )

    setToast({ message: "Product updated!", type: "success" })
    setEditOpen(false)
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      setToast({ message: "Delete failed", type: "error" })
      return
    }

    setProducts(prev => prev.filter(p => p.id !== id))
    setToast({ message: "Product deleted!", type: "error" })
  }

  const filtered = useMemo(() => {
    let data = [...products]

    if (search) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    return data
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
            className={`px-6 py-3 rounded-lg text-white shadow-lg
                ${toast.type === "success" && "bg-green-500"}
                ${toast.type === "error" && "bg-red-500"}
                ${toast.type === "warning" && "bg-yellow-500"}
            `}
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

        <button
          onClick={() => {
            setName("")
            setCategoryId("")
            setOpen(true)
          }}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          + Add New Product
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex gap-3">
        <input
          className="border w-full px-4 py-2 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>

      {/* ✅ TABLE (DESKTOP) */}
      <div className="hidden sm:block border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item: any) => (
              <tr key={item.id} className="border-t ">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category?.name}</td>
                <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(item)} className="cursor-pointer p-2 rounded hover:bg-gray-100">
                      <Pencil size={20} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="cursor-pointer text-red-600 hover:bg-red-100 p-2 rounded">
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
        {paginatedData.map((item: any) => (
          <div key={item.id} className="p-4 border-b">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">{item.category?.name}</p>

            <div className="flex gap-2 justify-end mt-2">
              <button onClick={() => handleEdit(item)}>
                <Pencil size={20} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600">
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
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
                className="flex items-center justify-center gap-1 flex-1 sm:flex-none px-4 py-2 border rounded text-black font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-40"
                >
                <ChevronLeft size={16} />
                Previous
            </button>

            <button
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages || totalPages === 0}
                className="flex items-center justify-center gap-1 flex-1 sm:flex-none px-4 py-2 border rounded text-black font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-40"
                >
                Next
                <ChevronRight size={16} />
            </button>
        </div>

      </div>

      {/* MODALS (tetap sama seperti punyamu) */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={() => setOpen(false)}>
          <div className="bg-white p-6 rounded w-80 space-y-3" onClick={e => e.stopPropagation()}>
            <h2>Add Product</h2>

            <input value={name} onChange={e => setName(e.target.value)} className="border w-full p-2" />

            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border w-full p-2">
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <button onClick={handleSubmit} className="bg-black text-white w-full py-2">
              Save
            </button>
          </div>
        </div>
      )}

      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={() => setEditOpen(false)}>
          <div className="bg-white p-6 rounded w-80 space-y-3" onClick={e => e.stopPropagation()}>
            <h2>Edit Product</h2>

            <input value={name} onChange={e => setName(e.target.value)} className="border w-full p-2" />

            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border w-full p-2">
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <button onClick={handleUpdate} className="bg-black text-white w-full py-2">
              Update
            </button>
          </div>
        </div>
      )}

    </div>
  )
}