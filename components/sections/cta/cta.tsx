import Image from "next/image"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="relative w-full">

      {/* Background Image */}
      <Image
        src="/cta-image.png"
        alt="Warehouse"
        width={1920}
        height={800}
        className="w-full h-[420px] object-cover object-right"
      />

      {/* Content */}
      <div className="absolute inset-y-0 left-0 flex items-center">

        <div className="max-w-[600px] pl-[200px]">

          <h2 className="text-4xl font-bold text-[#1E3E6D] leading-tight">
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