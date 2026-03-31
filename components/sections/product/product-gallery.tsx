"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollTo = useCallback(
    (index: number) => {
      setSelectedIndex(index)
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400 text-sm">No image available</span>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div
          className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <div ref={emblaRef} className="overflow-hidden h-full">
            <div className="flex h-full">
              {images.map((src, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
                  <Image
                    src={src}
                    alt={`${productName} - ${i + 1}`}
                    fill
                    className="object-contain p-4 rounded-t-xl"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); emblaApi?.scrollPrev() }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); emblaApi?.scrollNext() }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                  selectedIndex === i
                    ? "border-blue ring-1 ring-blue"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white cursor-pointer"
          >
            <X size={28} />
          </button>

          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedIndex]}
              alt={productName}
              width={1200}
              height={1200}
              className="w-full h-auto max-h-[90vh] object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => setSelectedIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Lightbox thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 flex gap-2 justify-center">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i) }}
                  className={`w-12 h-12 rounded overflow-hidden border-2 cursor-pointer ${
                    selectedIndex === i ? "border-white" : "border-white/30"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
