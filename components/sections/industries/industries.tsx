import Image from "next/image"

const industries = [
  {
    title: "Manufaktur",
    image: "/industry-manufacturing.jpg",
  },
  {
    title: "Konstruksi & Komposit",
    image: "/industry-construction.jpg",
  },
  {
    title: "Fasilitas Pengolahan Air",
    image: "/industry-water.jpg",
  },
  {
    title: "Otomotif & Fabrikasi",
    image: "/industry-automotive.jpg",
  },
  {
    title: "Cleaning & Manajemen Fasilitas",
    image: "/industry-cleaning.jpg",
  },
  {
    title: "Industri Makanan & Pengolahan",
    image: "/industry-food.jpg",
  },
]

const Industries = () => {
  return (
    <section className="py-24 bg-[#F7F9FC]">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">

          <h2 className="text-3xl font-bold text-[#1E3E6D]">
            Industri yang Kami Layani
          </h2>

          <p className="text-gray-500 mt-3">
            Mendukung berbagai sektor industri dengan pasokan bahan kimia yang andal.
          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-8">

          {industries.map((item, index) => (
            <div
              key={index}
              className="relative rounded-3xl overflow-hidden group"
            >

              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-[220px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-white/40"></div>

              {/* Title */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
                <h3 className="text-[#1E3E6D] font-semibold text-lg">
                    {item.title}
                </h3>
            </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Industries