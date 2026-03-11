import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    title: "General Chemicals",
    desc: "Bahan baku esensial untuk berbagai proses manufaktur dan produksi.",
    icon: "/chemical-icon.png",
  },
  {
    title: "Water Treatment Chemicals",
    desc: "Solusi kimia untuk sistem pengolahan dan pemurnian air.",
    icon: "/water-icon.png",
  },
  {
    title: "Fiberglass Materials",
    desc: "Resin dan material pendukung untuk aplikasi komposit dan konstruksi.",
    icon: "/fence-icon.png",
  },
  {
    title: "Silicone Emulsion",
    desc: "Formulasi berbasis silikon berkualitas tinggi untuk kebutuhan industri.",
    icon: "/glue-icon.png",
  },
  {
    title: "Household & Cleaning Chemicals",
    desc: "Bahan kimia untuk produk pembersih dan kebutuhan sanitasi.",
    icon: "/clean-icon.png",
  },
  {
    title: "Food & Flavouring Ingredients",
    desc: "Bahan kimia terpilih untuk aplikasi industri makanan dan minuman.",
    icon: "/food-icon.png",
  },
]

const Categories = () => {
  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1E3E6D]">
            Kategori Produk
          </h2>

          <p className="text-gray-500 mt-2">
            Jelajahi berbagai produk bahan kimia industri dan specialty kami.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-blue-100 rounded-2xl p-8 hover:shadow-md transition"
            >

              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">

                <Image
                  src={item.icon}
                  alt={item.title}
                  width={32}
                  height={32}
                />

                <h3 className="text-lg font-semibold text-[#1E3E6D]">
                  {item.title}
                </h3>

              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {item.desc}
              </p>

              <div className="border-t pt-4">
                <Link
                  href="/products"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Lihat Produk →
                </Link>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Categories