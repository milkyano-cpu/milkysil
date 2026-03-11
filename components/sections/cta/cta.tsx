import Image from "next/image"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="relative w-full">

      {/* Desktop Image */}
      <Image
        src="/cta-image.png"
        alt="Warehouse"
        width={1920}
        height={800}
        className="hidden md:block w-full h-[420px] object-cover object-right"
      />

      {/* Mobile Image */}
      <Image
        src="/cta-mobile.png"
        alt="Warehouse"
        width={768}
        height={800}
        className="block md:hidden w-full h-[800px] object-cover object-top"
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 md:inset-y-0 md:left-0 flex items-end md:items-center justify-center md:justify-start">

        <div className="w-full max-w-[600px] px-6 md:pl-[200px] text-center md:text-left py-10 md:py-0 bg-[#E8F0FC]/95 md:bg-transparent">

          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3E6D] leading-tight">
            Dukung Operasional Industri Anda Bersama Kami
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Bermitra dengan kami untuk pasokan yang konsisten, jaminan kualitas,
            dan layanan profesional.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 bg-[#1E3E6D] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3568ae] transition"
          >
            Minta Penawaran Sekarang
          </Link>

        </div>

      </div>

    </section>
  )
}

export default CTA