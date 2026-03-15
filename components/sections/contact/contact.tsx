"use client"

import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"

const mainDistributor = {
  name: "MENTARI JAYA",
  region: "JABODETABEK",
  address:
    "Jl. Auto Ring Road Cengkareng, Ruko Malibu Blok No.55, City Resort Cengkareng - Jakarta Barat",
  image: "/distributor.png"
}

const distributors = [
  {
    name: "ADIPOOL",
    region: "JABODETABEK",
    address: "Jl. Margasatwa No.5, Pondok Labu, Jakarta Selatan",
    image: "/distributor.png"
  },
  {
    name: "ALAM KIMIA",
    region: "JABODETABEK",
    address: "Jalan Galah Mada No.50, Ruko Taman Sari",
    image: "/distributor.png"
  },
  {
    name: "BAHTERA KIMIA",
    region: "BANDUNG",
    address: "Jl. Babakan Ciparay No.72, Sukahaji, Bandung",
    image: "/distributor.png"
  },
  {
    name: "BRAVO CHEMICAL",
    region: "SURABAYA",
    address: "Jl. Raya Pabean No.20, Sedati - Sidoarjo",
    image: "/distributor.png"
  },
  {
    name: "CENTRAL KIMIA",
    region: "JABODETABEK",
    address: "Jl. Gedong Sawah No.88, Bogor",
    image: "/distributor.png"
  },
  {
    name: "CV. SABA KIMIA",
    region: "SURABAYA",
    address: "Jl. Kapas Krampung 202, Surabaya",
    image: "/distributor.png"
  },
  {
    name: "FAJAR SETIA",
    region: "JABODETABEK",
    address: "Jl. Prof. Dr. Satrio No.295, Jakarta Selatan",
    image: "/distributor.png"
  },
  {
    name: "INDO KIMIA",
    region: "SURABAYA",
    address: "Jl. Tidar No.278",
    image: "/distributor.png"
  },
  {
    name: "JAYA MAKMUR KIMIA",
    region: "SURABAYA",
    address: "Jl. Tidar No.210",
    image: "/distributor.png"
  },

  // tambahan dari screenshot

  {
    name: "PANCA KIMIA",
    region: "JABODETABEK",
    address: "Jl. Pulo Empang No 50A/B, Pancasan, Bogor Tengah",
    image: "/distributor.png"
  },
  {
    name: "PT. ARTHASRI BHADRATA INDONESIA",
    region: "MEDAN",
    address: "Jl. Komplek Multatuli Indah Blok C No.30-31",
    image: "/distributor.png"
  },
  {
    name: "JL. KOMPLEK MULTATULI INDAH BLOK C NO.30-31",
    region: "SURABAYA",
    address: "Jl. Pasar Kembang 28-30, Surabaya",
    image: "/distributor.png"
  },
  {
    name: "PT. KARUNIA SEJAHTERA ABADI (SABA KIMIA)",
    region: "BALI",
    address: "Jl. Buluh Indah No.99, Denpasar - Bali",
    image: "/distributor.png"
  },
  {
    name: "RODES CHEMINDO",
    region: "MEDAN",
    address: "Jalan Sekip Baru No.2",
    image: "/distributor.png"
  },
  {
    name: "SANDI ANEKA WANGI",
    region: "SEMARANG",
    address: "Jl. Jendral Sudirman No.117",
    image: "/distributor.png"
  },
  {
    name: "SINAR KIMIA",
    region: "JABODETABEK",
    address: "Jl. Hos Cokroaminoto No.1A, Kreo, Ciledug",
    image: "/distributor.png"
  },
  {
    name: "SUBUR JAYA",
    region: "TASIK - CIAMIS",
    address: "Jalan Selakaso No.39",
    image: "/distributor.png"
  },
  {
    name: "SUMBER ABADI KIMIA",
    region: "JABODETABEK",
    address: "Jl. Raya Serpong KM 8 No.24, Pakulonan Tangerang",
    image: "/distributor.png"
  },
  {
    name: "SUMBER BERKAT",
    region: "JABODETABEK",
    address: "Jalan Ciledug Raya, Ruko Puri Beta 1 No.9, Larangan",
    image: "/distributor.png"
  },
  {
    name: "SUMBER KIMIA",
    region: "TASIK - CIAMIS",
    address: "Jalan Pasar Manis Komplek Ruko No.30 (Depan Terminal)",
    image: "/distributor.png"
  },
  {
    name: "TOKO SABA KIMIA",
    region: "SOLO",
    address: "Jl. Urip Sumoharjo No.56, Solo",
    image: "/distributor.png"
  }
]

export default function ContactSection() {

  const mapEmbed =
    "https://www.google.com/maps?q=Jl%20Babakan%20Ciparay%20No.72%20Bandung&output=embed"

  const mapLink =
    "https://www.google.com/maps/place/Jl.+Babakan+Ciparay+No.72,+Bandung"

  return (
    <section className="bg-[#F5F7FB] pb-24">

      {/* HERO */}

      <div className="bg-primary pt-24 pb-36 rounded-b-[60px] text-center text-white">
        <h1 className="text-4xl font-bold">Contact Us</h1>

        <p className="mt-3 text-sm">
          <span className="font-semibold">MILKYSIL®</span> trusted brands of the nation`s pride
        </p>
      </div>

      {/* CONTENT */}

      <div className="max-w-[1100px] mx-auto px-6 mt-15">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT */}

          <div>

            <h2 className="text-3xl font-bold text-[#2B3F6C]">
              CV. Milky Makmur Sejahtera
            </h2>

            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              Jl. Babakan Ciparay No.72, Sukahaji, Kec. Babakan Ciparay,
              Kota Bandung, Jawa Barat 40221
            </p>

            {/* EMAIL */}

            <div className="flex items-start gap-4 mt-6">
              <Mail className="text-blue-600 mt-1" size={22} />

              <div>
                <p className="text-sm font-semibold text-gray-700">Email</p>

                <p className="text-sm text-gray-500">
                  milkymakmursejahtera@gmail.com
                </p>
              </div>
            </div>

            {/* PHONE */}

            <div className="flex items-start gap-4 mt-4">
              <Phone className="text-blue-600 mt-1" size={22} />

              <div>
                <p className="text-sm font-semibold text-gray-700">Phone</p>

                <p className="text-sm text-gray-500">
                  (022) 6026165
                </p>
              </div>
            </div>

            {/* MAP */}

            <a
              href={mapLink}
              target="_blank"
              className="block mt-8 rounded-xl overflow-hidden shadow-md"
            >
              <iframe
                src={mapEmbed}
                width="100%"
                height="320"
                loading="lazy"
                className="border-0"
              />
            </a>

          </div>

          {/* RIGHT FORM */}

         <div className="bg-white rounded-2xl shadow-lg p-10">

            <h3 className="text-2xl font-bold text-[#2B3F6C] mb-8">
              Kirim Pesan
            </h3>

            <form className="space-y-8">

              {/* NAMA */}

              <div>
                <label className="text-sm text-gray-500">
                  Nama
                </label>

                <input
                  type="text"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="text-sm text-gray-500">
                  Email
                </label>

                <input
                  type="email"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* PESAN */}

              <div>
                <label className="text-sm text-gray-500">
                  Pesan
                </label>

                <textarea
                  rows={4}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* BUTTON */}

              <div className="pt-4 flex justify-end">

                <button
                  type="submit"
                  className="flex items-center gap-3 bg-[#1674D3] hover:bg-[#245a91] text-white px-15 py-3 rounded-md transition cursor-pointer"
                >
                  Submit
                </button>

              </div>

            </form>

          </div>

        </div>
      </div>

<div className="max-w-[1100px] mx-auto px-6 mt-28">

  {/* DISTRIBUTOR UTAMA */}

  <div className="text-center mb-14">

    <h3 className="text-2xl font-bold text-primary">
      Distributor Utama
    </h3>

    <div className="w-16 h-[3px] bg-primary mx-auto mt-2 rounded-full"></div>

  </div>


  {/* MAIN DISTRIBUTOR CARD */}

  <div className="flex justify-center mb-20">

    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-[340px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">

      <div className="overflow-hidden rounded-xl aspect-[4/3]">

        <Image
          src={mainDistributor.image}
          alt=""
          width={400}
          height={200}
          className="object-cover w-full h-full transition duration-500 group-hover:scale-110"
        />

      </div>

      <div className="mt-4 text-left">

        <p className="font-semibold text-sm tracking-wide">
          {mainDistributor.name}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {mainDistributor.region}
        </p>

        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          {mainDistributor.address}
        </p>

      </div>

    </div>

  </div>


  {/* TOKO TITLE */}

  <div className="text-center mt-35 mb-12">

    <h3 className="text-2xl font-bold text-primary">
      Toko Yang Menjual Produk Milkysil
    </h3>

    <div className="w-20 h-[3px] bg-primary mx-auto mt-2 rounded-full"></div>

  </div>


  {/* TOKO GRID */}

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

    {distributors.map((item, index) => (

      <div
        key={index}
        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      >

        <div className="overflow-hidden rounded-xl aspect-[4/3]">

          <Image
            src={item.image}
            alt=""
            width={400}
            height={200}
            className="object-cover w-full h-full transition duration-500 group-hover:scale-110"
          />

        </div>

        <div className="mt-4">

          <p className="font-semibold text-sm tracking-wide">
            {item.name}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {item.region}
          </p>

          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            {item.address}
          </p>

        </div>

      </div>

    ))}

  </div>

</div>

    </section>
  )
}