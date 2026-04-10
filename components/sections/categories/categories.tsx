import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    title: "General Chemicals",
    desc: "Bahan baku esensial untuk berbagai proses manufaktur dan produksi.",
    icon: "/chemical-icon.png",
    link: "/product?tab=general",
  },
  {
    title: "Water Treatment Chemicals",
    desc: "Solusi kimia untuk sistem pengolahan dan pemurnian air.",
    icon: "/water-icon.png",
    link: "/product?tab=water",
  },
  {
    title: "Fiberglass Materials",
    desc: "Resin dan material pendukung untuk aplikasi komposit dan konstruksi.",
    icon: "/fence-icon.png",
    link: "/product?tab=fiberglass",
    
  },
  {
    title: "Silicone Emulsion",
    desc: "Formulasi berbasis silikon berkualitas tinggi untuk kebutuhan industri.",
    icon: "/glue-icon.png",
    link: "/product?tab=silicone",
  },
  {
    title: "Household & Cleaning Chemicals",
    desc: "Bahan kimia untuk produk pembersih dan kebutuhan sanitasi.",
    icon: "/clean-icon.png",
    link: "/product?tab=household",
  },
  {
    title: "Tobacoo, Food & Flavouring Ingredients",
    desc: "Bahan kimia terpilih untuk aplikasi industri makanan dan minuman.",
    icon: "/food-icon.png",
    link: "/product?tab=flavour",
  },
]

const Categories = () => {
  return (
    <section className="pt-20 pb-24 md:py-24 bg-[#F7F9FC]">

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
              className="bg-white border border-blue-100 rounded-2xl p-6 md:p-8 hover:shadow-md transition max-w-[320px] md:max-w-full mx-auto"
            >

              {/* Icon + Title */}
              <div className="flex flex-col items-center md:flex-row md:items-start gap-3 md:gap-4 mb-4 text-center md:text-left">

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

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6 text-center md:text-left">
                {item.desc}
              </p>

              {/* Link */}
              <div className="border-t pt-4 text-center md:text-left">

                <Link
                  href={item.link}
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