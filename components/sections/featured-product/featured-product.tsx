"use client"

import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

const products = [
  {
    name: "MilkyClean Porcelain Cleaner",
    desc: "Solusi pembersih berkinerja tinggi yang diformulasikan untuk mengembalikan kilap dan menghilangkan noda membandel pada permukaan keramik dan porselen.",
    image: "/product.png",
    features: [
      "Mengangkat Noda Membandel",
      "Aman untuk Permukaan Porselen",
      "Cocok untuk Penggunaan Industri & Komersial",
    ],
  },
  {
    name: "MilkyClean Floor Cleaner",
    desc: "Membersihkan noda dan menjaga kilap lantai.",
    image: "/product.png",
    features: [
      "Membersihkan Noda Membandel",
      "Aman untuk Semua Jenis Lantai",
      "Wangi Segar Tahan Lama",
    ],
  },
  {
    name: "MilkyClean Glass Cleaner",
    desc: "Membersihkan kaca tanpa meninggalkan noda.",
    image: "/product.png",
    features: [
      "Tidak Meninggalkan Bekas",
      "Cepat Kering",
      "Cocok untuk Kaca & Cermin",
    ],
  },
]

const FeaturedProducts = () => {
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
    <section className="py-24 bg-[#F7F9FC]">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1E3E6D]">
            Produk Unggulan
          </h2>

          <p className="text-gray-500 mt-3">
            Produk andalan kami dengan performa terbaik.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>

          <div className="flex">

            {products.map((item, index) => (
              <div key={index} className="flex-[0_0_100%]">

                <div className="relative rounded-3xl overflow-hidden">

                  {/* Background Banner */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1200}
                    height={500}
                    className="w-full h-[420px] object-cover"
                  />

                  {/* Content */}
                  <div className="absolute inset-y-0 right-0 w-[45%] flex items-center p-12 text-white">

                    <div>

                      {/* Title */}
                      <h3 className="text-2xl font-semibold mb-4">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-white/90 mb-6 leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">

                        {item.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">

                            <span className="w-7 h-7 bg-white/20 border border-white/40 rounded-full flex items-center justify-center text-xs">
                              ✓
                            </span>

                            <span className="text-sm text-white/90">
                              {feature}
                            </span>

                          </li>
                        ))}

                      </ul>

                      {/* Buttons */}
                      <div className="flex gap-4">

                        <Link
                          href="/products"
                          className="bg-white text-[#1E3E6D] px-6 py-3 rounded-lg font-medium transition duration-300 hover:bg-[#1E3E6D] hover:text-white"
                        >
                          Lihat Detail Produk
                        </Link>

                        <Link
                          href="/contact"
                          className="border border-white px-6 py-3 rounded-lg font-medium transition duration-300 hover:bg-white hover:text-[#1E3E6D]"
                        >
                          Minta Harga Grosir
                        </Link>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* DOT INDICATOR */}
        <div className="flex justify-center gap-3 mt-6">

          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "bg-[#1E3E6D] scale-125"
                  : "bg-gray-300"
              }`}
            />
          ))}

        </div>

      </div>

    </section>
  )
}

export default FeaturedProducts