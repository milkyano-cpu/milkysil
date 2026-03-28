"use client"

import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Specification {
  key: string
  value: string
}

interface SpecificationEditorProps {
  specifications: Specification[]
  onChange: (specs: Specification[]) => void
}

export function SpecificationEditor({ specifications, onChange }: SpecificationEditorProps) {
  function addRow() {
    onChange([...specifications, { key: "", value: "" }])
  }

  function removeRow(index: number) {
    onChange(specifications.filter((_, i) => i !== index))
  }

  function updateRow(index: number, field: "key" | "value", val: string) {
    const updated = specifications.map((spec, i) =>
      i === index ? { ...spec, [field]: val } : spec
    )
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      {specifications.length === 0 && (
        <p className="text-sm text-gray-500 py-4 text-center">
          Belum ada spesifikasi. Klik tombol di bawah untuk menambahkan.
        </p>
      )}

      {specifications.map((spec, index) => (
        <div key={index} className="flex gap-2 items-start">
          <Input
            placeholder="Spesifikasi"
            value={spec.key}
            onChange={(e) => updateRow(index, "key", e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Nilai"
            value={spec.value}
            onChange={(e) => updateRow(index, "value", e.target.value)}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded transition cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition cursor-pointer"
      >
        <Plus size={16} />
        Tambah Spesifikasi
      </button>
    </div>
  )
}
