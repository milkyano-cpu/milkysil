"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

const slides = [
  {
    title: "Supplier Bahan Kimia Industri & Terpercaya di Indonesia",
    desc: "Menyediakan solusi bahan kimia berkualitas tinggi untuk kebutuhan manufaktur, pengolahan air, dan berbagai aplikasi industri.",
    image: "/hero-image.png",
  },
  {
    title: "Solusi Bahan Kimia Berkualitas untuk Industri",
    desc: "Kami menyediakan berbagai bahan kimia industri dengan kualitas terbaik dan distribusi terpercaya di seluruh Indonesia.",
    image: "/hero-image.png",
  },
  {
    title: "Partner Terpercaya untuk Kebutuhan Kimia Industri",
    desc: "Didukung pengalaman lebih dari 20 tahun dalam penyediaan bahan kimia industri.",
    image: "/hero-image.png",
  },
]

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi])

  return (
    <section className="relative w-full h-[741px] bg-[#E8F0FC] overflow-hidden">

      {/* Carousel */}
      <div className="overflow-hidden h-full" ref={emblaRef}>

        <div className="flex h-full">

          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] relative h-full">

              <div className="mx-auto flex items-center justify-between h-full">

                {/* LEFT CONTENT */}
                <div className="flex flex-col items-start justify-center max-w-[990px] gap-[50px] z-10 pl-[204px]">

                  <h1 className="text-primary text-[64px] font-bold leading-[65px] tracking-[-0.03em] max-w-[990px]">
                    {slide.title}
                  </h1>

                  <p className="text-primary text-2xl font-normal leading-normal max-w-[780px]">
                    {slide.desc}
                  </p>

                  <Link
                    href="/products"
                    className={`${cn(buttonVariants({ variant: "blue", size: "cta" }))}`}
                  >
                    Lihat Produk
                  </Link>

                </div>

              </div>

              {/* RIGHT IMAGE */}
              <Image
                src={slide.image}
                alt="Produk bahan kimia industri"
                width={800}
                height={741}
                className="absolute right-0 top-0 h-full w-auto object-cover"
                priority
              />

            </div>
          ))}

        </div>

      </div>

      {/* DOT INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition ${
              selectedIndex === index
                ? "bg-[#1E3E6D] scale-125"
                : "bg-gray-300"
            }`}
          />
        ))}

      </div>

    </section>
  )
}

export default Hero