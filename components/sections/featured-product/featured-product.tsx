import Image from "next/image"
import Link from "next/link"

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-[#F7F9FC]">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">

          <h2 className="text-3xl font-bold text-[#1E3E6D]">
            Produk Unggulan
          </h2>

          <p className="text-gray-500 mt-3">
            Produk andalan kami dengan performa terbaik.
          </p>

        </div>

        {/* Featured Product Banner */}
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F4FA8] to-[#1E6BD6] text-white flex items-center">

          {/* Product Image */}
          <div className="w-1/2 p-12 flex justify-center">
            <Image
              src="/clean-icon.png"
              alt="MilkyClean"
              width={300}
              height={300}
            />
          </div>

          {/* Product Info */}
          <div className="w-1/2 p-12">

            <h3 className="text-2xl font-semibold mb-4">
              MilkyClean Porcelain Cleaner
            </h3>

            <p className="text-white/90 mb-6 leading-relaxed">
              Solusi pembersih berkinerja tinggi yang diformulasikan untuk
              mengembalikan kilap dan menghilangkan noda membandel pada
              permukaan keramik dan porselen.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8 text-sm">

              <li className="flex items-center gap-3">
                <span className="w-5 h-5 bg-white text-blue-600 rounded-full flex items-center justify-center text-xs">
                  ✓
                </span>
                Mengangkat Noda Membandel
              </li>

              <li className="flex items-center gap-3">
                <span className="w-5 h-5 bg-white text-blue-600 rounded-full flex items-center justify-center text-xs">
                  ✓
                </span>
                Aman untuk Permukaan Porselen
              </li>

              <li className="flex items-center gap-3">
                <span className="w-5 h-5 bg-white text-blue-600 rounded-full flex items-center justify-center text-xs">
                  ✓
                </span>
                Cocok untuk Penggunaan Industri & Komersial
              </li>

            </ul>

            {/* Buttons */}
            <div className="flex gap-4">

              <Link
                href="/products"
                className="bg-white text-[#1E3E6D] px-6 py-3 rounded-lg font-medium"
              >
                Lihat Detail Produk
              </Link>

              <Link
                href="/contact"
                className="border border-white px-6 py-3 rounded-lg font-medium"
              >
                Minta Harga Grosir
              </Link>

            </div>

          </div>

        </div>

        {/* Small Products */}
        <div className="grid grid-cols-3 gap-8 mt-12">

          {[1,2,3].map((item) => (
            <div
              key={item}
              className="bg-white border border-blue-100 rounded-xl p-6 flex gap-4 items-center"
            >

              <div className="w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center">

                <Image
                  src="/food-icon.png"
                  alt="product"
                  width={60}
                  height={60}
                />

              </div>

              <div>

                <h4 className="font-semibold text-[#1E3E6D]">
                  MilkyClean Handsoap Lemon
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Lorem ipsum dolor sit amet consectetur.
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default FeaturedProducts