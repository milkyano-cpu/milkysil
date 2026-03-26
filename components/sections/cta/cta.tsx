import Image from "next/image"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="relative w-full bg-[#E8F0FC] overflow-hidden">

      {/* DESKTOP IMAGE */}
      <Image
        src="/cta-image.png"
        alt="Warehouse"
        width={1100}
        height={600}
        className="hidden md:block absolute right-0 top-0 h-full w-auto object-cover"
      />

      {/* MOBILE */}
      <div className="md:hidden w-full">

        {/* IMAGE */}
        <div className="relative">
          <Image
            src="/cta-mobile.png"
            alt="Warehouse"
            width={768}
            height={420}
            className="w-full h-auto object-cover"
          />

          {/* GRADIENT BLEND */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#E8F0FC]" />
        </div>

        {/* CONTENT */}
        <div className="px-6 pt-0 py-10 text-center">

          <h2 className="text-[28px] leading-[36px] font-bold text-[#1E3E6D]">
            Dukung Operasional Industri Anda Bersama Kami
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Bermitra dengan kami untuk pasokan yang konsisten, jaminan kualitas,
            dan layanan profesional.
          </p>

          <a
            href="https://wa.me/628170297297?text=Halo%20Milkysil%2C%20saya%20mengunjungi%20website%20Milkysil%20dan%20ingin%20mengetahui%20informasi%20lebih%20lanjut%20mengenai%20produk%20yang%20tersedia.%20Mohon%20bantuannya.%20Terima%20kasih."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3568ae] transition"
          >
            Minta Penawaran Sekarang
          </a>

        </div>

      </div>

      {/* DESKTOP CONTENT */}
      <div className="hidden md:flex relative max-w-[1200px] mx-auto px-6 py-24 items-center">

        <div className="max-w-[520px]">

          <h2 className="text-4xl font-bold text-[#1E3E6D] leading-tight">
            Dukung Operasional Industri Anda Bersama Kami
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Bermitra dengan kami untuk pasokan yang konsisten, jaminan kualitas,
            dan layanan profesional.
          </p>

          <a
              href="https://wa.me/628170297297?text=Halo%20Milkysil%2C%20saya%20mengunjungi%20website%20Milkysil%20dan%20ingin%20mengetahui%20informasi%20lebih%20lanjut%20mengenai%20produk%20yang%20tersedia.%20Mohon%20bantuannya.%20Terima%20kasih."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3568ae] transition"
            >
              Minta Penawaran Sekarang
          </a>

        </div>

      </div>

    </section>
  )
}

export default CTA