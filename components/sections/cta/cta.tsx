import Image from "next/image"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="py-24 bg-[#F7F9FC]">

      <div className="max-w-[1200px] mx-auto px-6">

        <div className="relative overflow-hidden rounded-3xl bg-[#E9EEF6] flex items-center">

          {/* Text */}
          <div className="w-1/2 p-16 z-10">

            <h2 className="text-4xl font-bold text-[#1E3E6D] leading-tight">
              Dukung Operasional Industri
              <br />
              Anda Bersama Kami
            </h2>

            <p className="text-gray-600 mt-6 max-w-[420px]">
              Bermitra dengan kami untuk pasokan yang konsisten,
              jaminan kualitas, dan layanan profesional.
            </p>

            <Link
              href="/contact"
              className="inline-block mt-8 bg-[#1E3E6D] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              Minta Penawaran Sekarang
            </Link>

          </div>

          {/* Image */}
          <div className="absolute right-0 top-0 h-full w-1/2">

            <Image
              src="/warehouse.jpg"
              alt="warehouse"
              fill
              className="object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E9EEF6] via-[#E9EEF6]/70 to-transparent"></div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default CTA