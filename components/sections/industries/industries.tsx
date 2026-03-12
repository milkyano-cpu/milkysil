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
    <section className="py-20 md:py-24 bg-[#F7F9FC]">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-12 md:mb-16">

          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3E6D]">
            Industri yang Kami Layani
          </h2>

          <p className="text-gray-500 mt-3 max-w-[600px] mx-auto">
            Mendukung berbagai sektor industri dengan pasokan bahan kimia yang andal.
          </p>

        </div>

        {/* Cards */}
        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 scrollbar-hide">

          {industries.map((item, index) => (
            <div
              key={index}
              className="bg-[#E9EEF6] rounded-3xl overflow-hidden min-w-[260px] md:min-w-0 snap-start"
            >

              {/* Image */}
              <div className="relative h-[268px] md:h-auto">
                
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="object-cover"
                />

                {/* Blend Gradient */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#E9EEF6]/70 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-start justify-center text-center pt-10 px-6">
                  <h3 className="text-[#1E3E6D] font-semibold text-base md:text-lg leading-snug">
                    {item.title}
                  </h3>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Industries