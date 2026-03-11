import Image from "next/image"

const industries = [
  {
    title: "Manufaktur",
    image: "/industries1.png",
  },
  {
    title: "Konstruksi & Komposit",
    image: "/industries2.png",
  },
  {
    title: "Fasilitas Pengolahan Air",
    image: "/industries3.png",
  },
  {
    title: "Otomotif & Fabrikasi",
    image: "/industries4.png",
  },
  {
    title: "Cleaning & Manajemen Fasilitas",
    image: "/industries5.png",
  },
  {
    title: "Industri Makanan & Pengolahan",
    image: "/industries6.png",
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
              className="bg-[#E9EEF6] rounded-3xl overflow-hidden"
            >

              {/* Title */}
              <div className="text-center py-6 px-6">

                <h3 className="text-[#1E3E6D] font-semibold text-lg leading-snug">
                  {item.title}
                </h3>

              </div>

              {/* Image */}
              <div className="relative">

                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-[220px] object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Industries