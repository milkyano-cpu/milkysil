"use client"

import { useState, useCallback } from "react"
import { Upload, X, Loader2, GripVertical } from "lucide-react"
import { uploadFileToMinio, deleteFileFromMinio } from "@/lib/api/minio"
import { isImageFile } from "@/lib/utils/image-preview"
import { toast } from "sonner"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const MAX_IMAGES = 10

interface MultiImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
}

function SortableImage({
  url,
  index,
  onRemove,
  isDeleting,
}: {
  url: string
  index: number
  onRemove: () => void
  isDeleting: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group rounded-lg overflow-hidden border aspect-square"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={`Product image ${index + 1}`}
        className="w-full h-full object-cover"
      />

      {index === 0 && (
        <span className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
          Primary
        </span>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1/2 -translate-x-1/2 bg-white/80 hover:bg-white rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
      >
        <GripVertical size={14} className="text-gray-600" />
      </button>

      <button
        type="button"
        onClick={onRemove}
        disabled={isDeleting}
        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {isDeleting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <X className="h-3 w-3" />
        )}
      </button>
    </div>
  )
}

export function MultiImageUploader({ images, onChange }: MultiImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const imageFiles = Array.from(files).filter(f => isImageFile(f))
    if (imageFiles.length === 0) {
      toast.error("Please select image files (JPEG, PNG, or WebP)")
      return
    }

    const remaining = MAX_IMAGES - images.length
    if (remaining <= 0) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`)
      return
    }

    const toUpload = imageFiles.slice(0, remaining)
    if (toUpload.length < imageFiles.length) {
      toast.warning(`Only uploading ${toUpload.length} of ${imageFiles.length} images (max ${MAX_IMAGES})`)
    }

    setIsUploading(true)
    try {
      const urls: string[] = []
      for (const file of toUpload) {
        const result = await uploadFileToMinio(file)
        urls.push(result.url)
      }
      onChange([...images, ...urls])
      toast.success(`${urls.length} image${urls.length > 1 ? "s" : ""} uploaded`)
    } catch (err) {
      console.error("Upload failed:", err)
      toast.error(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }, [images, onChange])

  const handleRemove = async (url: string) => {
    setDeletingUrl(url)
    try {
      if (url.startsWith("http")) {
        await deleteFileFromMinio(url)
      }
      onChange(images.filter(img => img !== url))
      toast.success("Image removed")
    } catch (err) {
      console.error("Delete failed:", err)
      toast.error(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setDeletingUrl(null)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = images.indexOf(active.id as string)
      const newIndex = images.indexOf(over.id as string)
      onChange(arrayMove(images, oldIndex, newIndex))
    }
  }

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {images.map((url, index) => (
                <SortableImage
                  key={url}
                  url={url}
                  index={index}
                  onRemove={() => handleRemove(url)}
                  isDeleting={deletingUrl === url}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {images.length < MAX_IMAGES && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDraggingOver
              ? "border-black bg-gray-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={(e) => {
            e.preventDefault()
            setIsDraggingOver(false)
            handleFileSelect(e.dataTransfer.files)
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDraggingOver(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setIsDraggingOver(false)
          }}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              <span className="text-sm text-gray-600">Uploading...</span>
            </div>
          ) : (
            <div className="space-y-1">
              <Upload className="mx-auto h-6 w-6 text-gray-400" />
              <div className="text-sm text-gray-600">
                <span className="font-medium">Click to upload</span> or drag and drop
              </div>
              <p className="text-xs text-gray-500">
                JPEG, PNG, WebP up to 4MB ({images.length}/{MAX_IMAGES})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
