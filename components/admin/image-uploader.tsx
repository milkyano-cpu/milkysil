"use client"

import { useState, useCallback, useEffect } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { uploadFileToMinio, deleteFileFromMinio } from "@/lib/api/minio"
import { Progress } from "@/components/ui/progress"
import { getImagePreviewWithEXIF, isImageFile } from "@/lib/utils/image-preview"
import { toast } from "sonner"

interface ImageUploaderProps {
  imageUrl: string | null
  onChange: (url: string | null) => void
}

function isValidImageUrl(url: string): boolean {
  return url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")
}

export function ImageUploader({ imageUrl, onChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = Array.from(files).find(f => isImageFile(f))
    if (!file) {
      toast.error("Please select an image file (JPEG, PNG, or WebP)")
      return
    }

    setIsUploading(true)
    setUploadProgress(20)

    try {
      const previewUrl = await getImagePreviewWithEXIF(file)
      setPreview(previewUrl)
      setUploadProgress(50)

      const result = await uploadFileToMinio(file)
      setUploadProgress(100)

      onChange(result.url)
      setPreview(null)
      toast.success("Image uploaded successfully")
    } catch (err) {
      console.error("Upload failed:", err)
      const message = err instanceof Error ? err.message : "Upload failed"
      toast.error(message)
      setPreview(null)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleRemove = async () => {
    if (!imageUrl) return

    setIsDeleting(true)
    try {
      // Only delete from MinIO if it's a remote URL (not a local /blog/ or /news/ path)
      if (imageUrl.startsWith("http")) {
        await deleteFileFromMinio(imageUrl)
      }
      onChange(null)
      toast.success("Image removed")
    } catch (err) {
      console.error("Delete failed:", err)
      toast.error(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setIsDeleting(false)
    }
  }

  // Clear invalid image URLs automatically (e.g. "undefined/filename.jpg" from missing env vars)
  useEffect(() => {
    if (imageUrl && !isValidImageUrl(imageUrl)) {
      onChange(null)
    }
  }, [imageUrl, onChange])

  // Show current image (only if URL is valid)
  if (imageUrl && !isUploading && isValidImageUrl(imageUrl)) {
    return (
      <div className="space-y-2">
        <div className="relative group rounded-lg overflow-hidden border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Featured image"
            className="w-full h-[200px] object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            disabled={isDeleting}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-black bg-gray-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="space-y-3">
            {preview && (
              <div className="mx-auto w-24 h-16 rounded overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="text-sm text-gray-600">Uploading...</p>
            <Progress value={uploadProgress} className="h-2 max-w-xs mx-auto" />
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="text-sm text-gray-600">
              <span className="font-medium">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-gray-500">
              JPEG, PNG, WebP up to 4MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
