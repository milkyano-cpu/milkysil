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

// const smallProducts = [
//   {
//     name: "MilkyClean Handsoap Lemon",
//     desc: "Lorem ipsum dolor sit amet consectetur.",
//     image: "/product-small.png",
//   },
//   {
//     name: "MilkyClean Handsoap Lemon",
//     desc: "Lorem ipsum dolor sit amet consectetur.",
//     image: "/product-small.png",
//   },
//   {
//     name: "MilkyClean Handsoap Lemon",
//     desc: "Lorem ipsum dolor sit amet consectetur.",
//     image: "/product-small.png",
//   },
// ]

const FeaturedProducts = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false
  })
  // const [smallEmblaRef] = useEmblaCarousel({
  //   dragFree: true,
  //   containScroll: "trimSnaps"
  // })

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

    <section className="pt-10 pb-24 bg-[#F7F9FC]">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-16">

          <h2 className="text-3xl font-bold text-[#1E3E6D]">
            Produk Unggulan
          </h2>

          <p className="text-gray-500 mt-3">
            Produk andalan kami dengan performa terbaik.
          </p>

        </div>

        {/* MAIN CAROUSEL */}
        <div className="overflow-hidden" ref={emblaRef}>

          <div className="flex">

            {products.map((item, index) => (

              <div key={index} className="flex-[0_0_100%]">

                <div className="relative rounded-3xl overflow-hidden">

                  {/* DESKTOP IMAGE */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1200}
                    height={420}
                    className="hidden md:block w-full h-[420px] object-cover"
                  />

                  {/* MOBILE IMAGE */}
                  <Image
                    src="/product-mobile.png"
                    alt={item.name}
                    width={420}
                    height={900}
                    className="md:hidden w-full h-auto object-contain"
                  />

                  {/* MOBILE DOT */}
                  <div className="md:hidden absolute bottom-[600px] left-1/2 -translate-x-1/2 flex gap-3">

                    {products.map((_, index) => (

                      <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`w-2.5 h-2.5 rounded-full transition ${
                          selectedIndex === index
                            ? "bg-white scale-125"
                            : "bg-white/40"
                        }`}
                      />

                    ))}

                  </div>

                  {/* DESKTOP GRADIENT */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-[#0F3F8F]/90" />

                  {/* MOBILE CONTENT */}
                  <div className="md:hidden absolute bottom-[100px] left-0 w-full px-6 text-white text-center">
                    <h3 className="text-xl font-semibold mb-4">
                      {item.name}
                    </h3>

                    <p className="text-white/90 mb-6 leading-relaxed text-sm">
                      {item.desc}
                    </p>

                    <ul className="space-y-3 mb-8 max-w-[280px] mx-auto">

                      {item.features.map((feature, i) => (

                        <li key={i} className="flex items-start gap-3 text-left">

                          <span className="w-6 h-6 border border-white rounded-full flex items-center justify-center text-xs shrink-0 mt-[2px]">
                            ✓
                          </span>

                          <span className="text-sm text-white leading-relaxed">
                            {feature}
                          </span>

                        </li>

                      ))}

                    </ul>

                    <div className="flex flex-col gap-4">

                      <Link
                        href="/products"
                        className="bg-white text-[#1E3E6D] px-6 py-3 rounded-lg font-medium"
                      >
                        Lihat Detail Produk
                      </Link>

                      <Link
                        href="/contact"
                        className="border border-white px-6 py-3 rounded-lg font-medium"
                      >
                        Minta Harga Grosir
                      </Link>

                    </div>

                  </div>

                  {/* DESKTOP CONTENT */}
                  <div className="hidden md:flex absolute inset-y-0 right-0 w-[50%] items-center p-12 text-white">

                    <div>

                      <h3 className="text-2xl font-semibold mb-4">
                        {item.name}
                      </h3>

                      <p className="text-white/90 mb-6 leading-relaxed">
                        {item.desc}
                      </p>

                      <ul className="space-y-3 mb-8">

                        {item.features.map((feature, i) => (

                          <li key={i} className="flex items-center gap-3">

                            <span className="w-6 h-6 border border-white rounded-full flex items-center justify-center text-xs">
                              ✓
                            </span>

                            <span className="text-sm text-white/90">
                              {feature}
                            </span>

                          </li>

                        ))}

                      </ul>

                      <div className="flex gap-4">

                        <Link
                          href="/products"
                          className="bg-white text-[#1E3E6D] px-6 py-3 rounded-lg font-medium"
                        >
                          Lihat Detail Produk
                        </Link>

                        <Link
                          href="/contact"
                          className="border border-white px-6 py-3 rounded-lg font-medium"
                        >
                          Minta Harga Grosir
                        </Link>

                      </div>

                    </div>

                  </div>

                  {/* DESKTOP DOT */}
                  <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-3">

                    {products.map((_, index) => (

                      <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`w-2.5 h-2.5 rounded-full transition ${
                          selectedIndex === index
                            ? "bg-white scale-125"
                            : "bg-white/40"
                        }`}
                      />

                    ))}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* SMALL PRODUCTS */}
        {/* <div className="mt-12 overflow-hidden" ref={smallEmblaRef}>

          <div className="flex gap-6 md:grid md:grid-cols-3">

            {smallProducts.map((item, index) => (

              <div
                key={index}
                className="flex-[0_0_80%] md:flex-none bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-5 hover:shadow-lg transition"
              >

                <div className="bg-yellow-400 rounded-lg p-3">

                  <Image
                    src={item.image}
                    alt={item.name}
                    width={70}
                    height={70}
                  />

                </div>

                <div>

                  <h4 className="font-semibold text-[#1E3E6D]">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500 mt-2">
                    {item.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div> */}

      </div>

    </section>
  )
}

export default FeaturedProducts