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
    mobileImage: "/hero-image-mobile.png",
  },
  {
    title: "Supplier Bahan Kimia Industri & Terpercaya di Indonesia",
    desc: "Kami menyediakan berbagai bahan kimia industri dengan kualitas terbaik dan distribusi terpercaya di seluruh Indonesia.",
    image: "/hero-image.png",
    mobileImage: "/hero-image-mobile.png",
  },
  {
    title: "Supplier Bahan Kimia Industri & Terpercaya di Indonesia",
    desc: "Didukung pengalaman lebih dari 20 tahun dalam penyediaan bahan kimia industri.",
    image: "/hero-image.png",
    mobileImage: "/hero-image-mobile.png",
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
    <section className="relative w-full min-h-dvh md:min-h-0 md:h-[741px] bg-[#E8F0FC] overflow-hidden pb-42 md:pb-0">

      {/* Carousel */}
      <div className="overflow-hidden h-full" ref={emblaRef}>

        <div className="flex h-full">

          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] relative h-full">

              <div className="mx-auto flex flex-col md:flex-row items-center justify-between h-full">

                {/* MOBILE IMAGE */}
                <div className="md:hidden w-full relative">
                  <Image
                    src={slide.mobileImage}
                    alt="Produk bahan kimia industri"
                    width={412}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#E8F0FC]" />
                </div>

                {/* LEFT CONTENT */}
                <div className="flex flex-col items-center md:items-start justify-center max-w-[990px] gap-10 md:gap-[50px] z-10 px-8 md:px-0 md:pl-[204px] py-10 md:py-0">

                  <h1 className="text-primary text-[32px] leading-[40px] md:text-[64px] font-bold md:leading-[65px] tracking-[-0.03em] max-w-[990px] text-center md:text-left">
                    {slide.title}
                  </h1>

                  <p className="text-primary text-base md:text-2xl font-normal leading-relaxed max-w-[780px] text-center md:text-left">
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

              {/* RIGHT IMAGE (Desktop) */}
              <Image
                src={slide.image}
                alt="Produk bahan kimia industri"
                width={800}
                height={741}
                className="hidden md:block absolute right-0 top-0 h-full w-auto object-cover"
                priority
              />

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Hero