import Image from "next/image"

const reasons = [
  {
    title: "Pasokan Stabil & Terpercaya",
    desc: "Menjamin ketersediaan stok untuk mendukung operasional bisnis Anda.",
    icon: "/globe.svg",
  },
  {
    title: "Produk Terjamin Kualitasnya",
    desc: "Dipilih dan dikelola dengan standar kualitas industri.",
    icon: "/file.svg",
  },
  {
    title: "Harga Kompetitif & Transparan",
    desc: "Struktur harga yang adil untuk pembelian partai besar maupun kerja sama jangka panjang.",
    icon: "/window.svg",
  },
  {
    title: "Tim Profesional & Responsif",
    desc: "Siap membantu kebutuhan informasi produk dan konsultasi teknis.",
    icon: "/next.svg",
  },
]

const WhyUs = () => {
  return (
    <section className="py-28 bg-gradient-to-r from-[#0F4FA8] to-[#1E6BD6] text-white">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-20">

          <h2 className="text-3xl font-bold">
            Mengapa Bermitra dengan Kami?
          </h2>

          <p className="text-white/80 mt-3">
            Memberikan solusi bahan kimia yang andal dengan pengalaman dan profesionalisme.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-8">

          {reasons.map((item, index) => (
            <div
              key={index}
              className="relative bg-white text-[#1E3E6D] rounded-2xl p-8 text-center"
            >

              {/* Icon Circle */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow flex items-center justify-center">

                <Image
                  src={item.icon}
                  alt={item.title}
                  width={36}
                  height={36}
                />

              </div>

              <h3 className="font-semibold mt-8 mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default WhyUs