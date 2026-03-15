"use client"

import Image from "next/image"

type Blog = {
  id: number
  title: string
  date: string
  description: string
  image: string
  category: "BLOG" | "NEWS"
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Foam Booster",
    date: "24 Januari 2026",
    description:
      "Pengertian Foam Booster Foam booster adalah bahan kimia yang ditambahkan ke dalam formulasi pembersih (deterjen, sabun cair, sampo, dan sebagainya) dengan tujuan utama:",
    image: "/blog/foam-booster.jpg",
    category: "BLOG"
  },
  {
    id: 2,
    title: "Asam Sitrat",
    date: "24 Januari 2026",
    description:
      "Asam sitrat adalah senyawa asam organik lemah yang banyak dikenal karena rasa masamnya yang khas dan penggunaan yang sangat luas, mulai dari bahan tambahanan pangan, obat-obatan, kosmetik,...",
    image: "/blog/asam-sitrat.jpg",
    category: "BLOG"
  },
  {
    id: 3,
    title: "Caustic Soda: Mengungkap Kekuatan",
    date: "24 Januari 2026",
    description:
      "Caustic Soda: Mengungkap Kekuatan di Balik Pembersih Multifungsi Pernahkah kita bertanya-tanya, apa rahasia di balik produk pembersih lantai...",
    image: "/blog/caustic-soda.jpg",
    category: "BLOG"
  },
  {
    id: 4,
    title: "Mengungkap Rahasia Minyak Jarak (Castor Oil)",
    date: "24 Januari 2026",
    description:
      "Asam sitrat adalah senyawa asam organik lemah yang banyak dikenal karena rasa masamnya yang khas dan penggunaannya...",
    image: "/blog/castor-oil.jpg",
    category: "BLOG"
  },
  {
    id: 5,
    title: "Milkysil Tire Polish",
    date: "05 Januari 2026",
    description:
      "Milkysil Tire Polish Semi Ban Mobil dan Motor berbasis SiliconeMilkysil Polish adalah semir ban mobil dan motor berbasis silicone emulsion...",
    image: "/blog/tire-polish.jpg",
    category: "BLOG"
  },
  {
    id: 6,
    title: "Pentingnya Produk Kebersihan yang Aman",
    date: "02 Januari 2026",
    description:
      "Produk kebersihan yang aman sangat penting untuk menjaga kesehatan lingkungan...",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 7,
    title: "Selamat datang di Milkysil",
    date: "18 Agustus 2025",
    description:
      " ",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 8,
    title: "Milkysil Supplier Bahan Kimia Partai dan Eceran Terpercaya",
    date: "05 Mei 2015",
    description:
      " ",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
    {
    id: 9,
    title: "Kimia Anorganik",
    date: "04 Mei 2015",
    description:
      " ",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 10,
    title: "Kimia Organik",
    date: "04 Mei 2015",
    description:
      " ",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 11,
    title: "Kimia Industri",
    date: "04 Mei 2015",
    description:
      " ",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
]

const news: Blog[] = [
  {
    id: 1,
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "26 Desember 2025",
    description:
      "Komitmen Milkysil dalam menyediakan produk kebersihan yang aman dan berkualitasPendahuluan. Dalam Meningkatnya kebutuhan akan standar kebersihan.",
    image: "/news/news1.jpg",
    category: "NEWS"
  },
  {
    id: 2,
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "24 November 2025",
    description:
      "Sambut Musim Hujan & Libur Akhir Tahun, Milkyclean Solusi Lengkap Agar Rumah dan Mobil Tetap Kinclong! Bandung - Memasuki pertengahan November 2025,",
    image: "/news/news2.jpg",
    category: "NEWS"
  },
  {
    id: 3,
    title: "Peran Produk Kebersihan Milkyclean untuk Hari Toilet Sedunia 2025",
    date: "17 November 2025",
    description:
      "Hari Toilet Sedunia (19 November) dengan rangkaian produk MilkyClean, menyoroti bagaimana produk-produk kebersihan rumah tangga ini turut mendukung",
    image: "/news/news3.jpg",
    category: "NEWS"
  },
  {
    id: 4,
    title: "Peran Produk Kebersihan Milkyclean dalam Kesehatan Lingkungan",
    date: "13 November 2025",
    description:
      "Peran kebersihan dalam pencegahan Komplikasi Diabetes Bandung, 14 November 2023 Memperingati Hari Diabetes Sedunia, para ahli kesehatan menyoroti pentingnya kebersihan lingkungan",
    image: "/news/news4.jpg",
    category: "NEWS"
  },
  {
    id: 5,
    title: "Bersih itu Patriotik",
    date: "04 November 2025",
    description:
      "Kampanye Hari Pahlawan Nasional 'Bersih Itu Patriotik' bersama Milkyclean & MilkysilBandung, 10 November 2025 - Dalam rangka memperingati Hari Pahlawan Nasional.",
    image: "/news/news5.jpg",
    category: "NEWS"
  },
  {
    id: 6,
    title: "Peran Produk Kebersihan Milkyclean untuk Hari Toilet Sedunia 2025",
    date: "30 Oktober 2025",
    description:
      "Bandung, 31 Oktober 2025 Perayaan Halloween kini menjadi salah satu momen yang banyak dinantikan masyarakat Indonesia,",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 7,
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "05 Mei 2015",
    description:
      "Loncatan Risiko Kimia GlobalTantangan, Peluang, dan Jalan menuju Keamanan Lingkungan",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 8,
    title: "80 Tahun Indonesia Berinsipirasi Bersama Milkysil",
    date: "05 Mei 2015",
    description:
      " ",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 9,
    title: "Test tube food",
    date: "05 Mei 2015",
    description:
      "Types of Food Tests Food testing serves different purposes, leading to various types of tests: Nutrient Analysis: There test identify and quantify",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 10,
    title: "Food Chemistry and Food Development",
    date: "05 Mei 2015",
    description:
      "Material Chemistry: Polymers (Plastics):The most commong packaging material. Chemistry involves: Polymerization: How monomers (like ethylene, propylene, terephthalic...",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 11,
    title: "Chemistry concept",
    date: "05 Mei 2015",
    description:
      "Chemistry is the central science that bridges physics and biology, exploring the composition, structure, properties, and transformations of matter.",
    image: "/news/news6.jpg",
    category: "NEWS"
  }
]

export default function BlogsSection() {
  return (
    <section className="bg-[#F7F9FC] pb-28">

      {/* HERO */}
      <div className="bg-primary pt-24 pb-36 rounded-b-[70px] text-center text-white">

        <h1 className="text-4xl font-bold">
          News & Blog
        </h1>

        <p className="mt-3 text-sm">
          <span className="font-semibold">MILKYSIL®</span> trusted brands of the nation`s pride
        </p>

      </div>


      {/* BLOG TITLE */}
      <div className="max-w-[1200px] mx-auto px-6 mt-20">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-primary inline-block pb-1">
          Blogs
        </h2>
      </div>


      {/* BLOG GRID */}
      <div className="max-w-[1200px] mx-auto px-6 mt-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">

          {blogs.map((blog) => (

            <div key={blog.id} className="group">

              <div className="overflow-hidden rounded-xl">

                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={300}
                  className="w-full h-[220px] object-cover transition duration-300 group-hover:scale-105"
                />

              </div>

              <h3 className="mt-4 font-semibold text-gray-800 text-[17px]">
                {blog.title}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                {blog.date}
              </p>

              <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-5">
                {blog.description}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* NEWS TITLE */}
      <div className="max-w-[1200px] mx-auto px-6 mt-35">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-primary inline-block pb-1">
          News
        </h2>
      </div>


      {/* NEWS GRID */}
      <div className="max-w-[1200px] mx-auto px-6 mt-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">

          {news.map((item) => (

            <div key={item.id} className="group">

              <div className="relative rounded-2xl overflow-hidden shadow-md">

                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={600}
                  className="w-full h-[350px] object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="absolute bottom-0 p-5 text-white">

                  <h3 className="font-semibold text-lg leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs mt-1 opacity-80">
                    {item.date}
                  </p>

                </div>

              </div>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-5">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}