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
    mobileImage: "/product-mobile.png",
    features: [
      "Mengangkat Noda Membandel",
      "Aman untuk Permukaan Porselen",
      "Cocok untuk Penggunaan Industri & Komersial",
    ],
  },
  {
    name: "MilkyClean Glass Cleaner",
    desc: "Solusi pembersih kaca berkinerja tinggi yang diformulasikan untuk menghilangkan noda, debu, dan bekas sidik jari, sekaligus mengembalikan kilap jernih pada permukaan kaca.",
    image: "/product-featured1.png",
    mobileImage: "/product-mobile2.png",
    features: [
      "Menghilangkan Noda & Sidik Jari",
      "Memberikan Kilap Kaca Tanpa Bekas",
      "Cocok untuk Rumah, Kantor & komersial",
    ],
  },
  {
    name: "MilkyClean Floor Cleaner Apple",
    desc: "Solusi pembersih lantai dengan aroma apel segar yang diformulasikan untuk mengangkat noda, kotoran, dan debu, sekaligus memberikan kesegaran dan kilap pada lantai.",
    image: "/product-featured2.png",
    mobileImage: "/product-mobile3.png",
    features: [
      "Mengangkat Noda & Kotoran Membandel",
      "Aroma Apel Segar yang Tahan Lama",
      "Cocok untuk Rumah, Kantor & Area Komersial",
    ],
  },
  {
    name: "MilkyClean Sabun Cuci Piring Jeruk Nipis",
    desc: "Sabun cuci piring dengan ekstrak jeruk nipis yang efektif mengangkat lemak, sisa makanan, dan noda membandel, sekaligus memberikan aroma segar pada peralatan dapur.",
    image: "/product-featured3.png",
    mobileImage: "/product-mobile4.png",
    features: [
      "Menghilangkan Lemak & Noda Membandel",
      "Aroma Jeruk Nipis Segar",
      "Cocok untuk Rumah, Restoran & Usaha Kuliner",
    ],
  },
  {
    name: "MilkyClean Handwash Strawberry",
    desc: "Sabun cuci tangan dengan aroma strawberry segar untuk membersihkan tangan secara efektif dari kotoran dan kuman, sekaligus menjaga tangan tetap lembut dan harum.",
    image: "/product-featured4.png",
    mobileImage: "/product-mobile5.png",
    features: [
      "Membersihkan Tangan dari Kotoran & Kuman",
      "Aroma Strawberry Segar dan Menyegarkan",
      "Cocok untuk Rumah, Kantor & Area Publik",
    ],
  },
  {
    name: "MilkyClean Carbol Sereh",
    desc: "Pembersih lantai dengan aroma sereh segar yang membantu membunuh kuman, mengangkat kotoran, serta menjaga lantai tetap bersih, higenis, dan harum.",
    image: "/product-featured5.png",
    mobileImage: "/product-mobile6.png",
    features: [
      "Membantu Membunuh Kuman & Bakteri",
      "Aroma Sereh Segar Yang Menyegarkan",
      "Cocok untuk Rumah, Kantor, & Area Publik",
    ],
  },
  {
    name: "MilkyClean Shampoo Mobil",
    desc: "Shampoo mobil berkualitas tinggi untuk membersihkan kotoran, debu, dan noda pada kendaraan, sekaligus menjaga kilap cat mobil tetap bersih dan mengkilap.",
    image: "/product-featured6.png",
    mobileImage: "/product-mobile7.png",
    features: [
      "Mengangkat Kotoran & Debu Membandel",
      "Membantu Menjaga Kilap Cat Kendaraan",
      "Cocok untuk Mobil, Motor & Kendaraan Lainnya",
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
    align: "center",
    skipSnaps: false,
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
        <div className="relative">
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>

          <div className="flex">

            {products.map((item, index) => (

              <div key={index} className="flex-[0_0_100%]">

                <div className="relative overflow-hidden">

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
                    src={item.mobileImage}
                    alt={item.name}
                    width={420}
                    height={900}
                    className="md:hidden w-full h-auto object-contain"
                  />

                  {/* DESKTOP GRADIENT */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-[#0F3F8F]/60" />

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

                      <a
                        href="https://wa.me/628170297297"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white px-6 py-3 rounded-lg font-medium"
                      >
                        Minta Harga Grosir
                      </a>

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

                        <a
                          href="https://wa.me/628170297297"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-white px-6 py-3 rounded-lg font-medium"
                        >
                          Minta Harga Grosir
                        </a>

                      </div>

                    </div>

                  </div>


                </div>

              </div>

            ))}

          </div>

        </div>
        
        {/* MOBILE DOT */}
        <div className="md:hidden absolute bottom-[620px] left-1/2 -translate-x-1/2 flex gap-3">

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

          {/* DESKTOP DOT */}
          <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-3">

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