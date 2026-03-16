"use client"

import { Mail, Phone, MapPin } from "lucide-react"

const mainDistributor = {
  name: "MENTARI JAYA",
  region: "JABODETABEK",
  address:
    "JL AUTO RING ROAD CENGKARENG, RUKO MALIBU BLOK NO. 55, CITY RESORT – CENGKARENG – JAKARTA BARAT"
}

const distributors = [
  {
    name: "ADI POOL",
    region: "JABODETABEK",
    address: "JL MARGASATWA NO. 5, PONDOK LABU, JAKARTA SELATAN"
  },
  {
    name: "ALAM KIMIA",
    region: "JABODETABEK",
    address: "JALAN GAJAH MADA NO. 50, KRUKUT – TAMAN SARI"
  },
  {
    name: "BAHTERA KIMIA",
    region: "BANDUNG",
    address: "JL MARGASATWA NO. 5, PONDOK LABU, JAKARTA SELATAN"
  },
  {
    name: "BRAVO CHEMICAL",
    region: "SURABAYA",
    address: "JL RAYA PABEAN NO. 20, SEDATI – SIDOARJO"
  },
  {
    name: "CENTRAL KIMIA",
    region: "JABODETABEK",
    address: "JL GEDONG SAWAH IV NO. 5D, BOGOR"
  },
  {
    name: "CV. SABA KIMIA",
    region: "SURABAYA",
    address: "JL KAPAS KRAMPUNG 202, SURABAYA"
  },
  {
    name: "FAJAR SETIA",
    region: "JABODETABEK",
    address: "JL PROF DR. SATRIO NO. 295, KARET KUNINGAN, SETIABUDI, JAKARTA SELATAN"
  },
  {
    name: "INDO KIMIA",
    region: "SURABAYA",
    address: "JL TIDAR NO. 278"
  },
  {
    name: "JAYA MAKMUR KIMIA",
    region: "SURABAYA",
    address: "JL TIDAR NO. 210"
  },
  {
    name: "PANCA KIMIA",
    region: "JABODETABEK",
    address: "JL PULO EMPANG NO 50A/B, PANCASAN, BOGOR TENGAH"
  },
  {
    name: "PT. ARTHASRI BHADRATA INDONESIA",
    region: "MEDAN",
    address: "JL. KOMPLEK MULTATULI INDAH BLOK C NO. 30-31"
  },
  {
    name: "PT. HARAPAN KIMIA INDONESIA",
    region: "SURABAYA",
    address: "JL PASAR KEMBANG 28–30, SURABAYA"
  },
  {
    name: "PT. KARUNIA SEJAHTERA ABADI (SABA KIMIA)",
    region: "BALI",
    address: "JL BULUH INDAH NO. 99, DENPASAR – BALI"
  },  
  {
    name: "RODES CHEMINDO",
    region: "MEDAN",
    address: "JALAN SEKIP BARU NO. 2"
  },
  {
    name: "SANDI ANEKA WANGI",
    region: "SEMARANG",
    address: "JL PULO EMPANG NO 50A/B, PANCASAN, BOGOR TENGAH"
  },
  {
    name: "SINAR KIMIA",
    region: "JABODETABEK",
    address: "JL PULO EMPANG NO 50A/B, PANCASAN, BOGOR TENGAH"
  },
  {
    name: "SUBUR JAYA",
    region: "TASIK – CIAMIS",
    address: "JALAN SELAKASO NO. 39"
  },
  {
    name: "SUMBER ABADI KIMIA",
    region: "JABODETABEK",
    address: "JL RAYA SERPONG KM 8 NO. 24, PAKULONAN TANGERANG"
  },
  {
    name: "SUMBER BERKAT",
    region: "JABODETABEK",
    address: "JALAN CILEDUG RAYA, RUKO PURI BETA 1 NO. 9, LARANGAN"
  },
  {
    name: "SUMBER KIMIA",
    region: "TASIK – CIAMIS",
    address: "JALAN PASAR MANIS KOMPLEK RUKO NO. 30 (DEPAN TERMINAL)"
  },
  {
    name: "TOKO SABA KIMIA",
    region: "SOLO",
    address: "JL URIP SUMOHARJO NO. 56, SOLO"
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

      {/* CONTACT INFO */}

      <div className="max-w-[1100px] mx-auto px-6 mt-16">
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

            <div className="flex items-start gap-4 mt-6">
              <Mail className="text-blue-600 mt-1" size={22} />
              <div>
                <p className="text-sm font-semibold text-gray-700">Email</p>
                <p className="text-sm text-gray-500">
                  milkymakmursejahtera@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mt-4">
              <Phone className="text-blue-600 mt-1" size={22} />
              <div>
                <p className="text-sm font-semibold text-gray-700">Phone</p>
                <p className="text-sm text-gray-500">(022) 6026165</p>
              </div>
            </div>

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

              <div>
                <label className="text-sm text-gray-500">Nama</label>
                <input
                  type="text"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Pesan</label>
                <textarea
                  rows={4}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1674D3] hover:bg-[#245a91] text-white px-10 py-3 rounded-md transition"
                >
                  Submit
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>

      {/* DISTRIBUTOR */}

      <div className="max-w-[1000px] mx-auto px-6 mt-28">

        <div className="text-center mb-14">
          <h3 className="text-2xl font-bold text-primary">
            Distributor Utama
          </h3>
          <div className="w-16 h-[3px] bg-primary mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="flex justify-center mb-20">

          <div className="bg-white rounded-[24px] border border-[#E4ECF8] p-8 w-full max-w-[300px] shadow-[0_4px_12px_rgba(37,99,235,0.06)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)] hover:-translate-y-1 transition-all duration-300">

            <div className="flex items-start gap-3">

              <MapPin className="text-primary mt-1" size={20} />

              <div>
                <p className="font-semibold text-sm text-primary">
                  {mainDistributor.name}
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  {mainDistributor.region}
                </p>
              </div>

            </div>

            <div className="border-t mt-4 pt-4">

              <p className="text-xs text-gray-400 leading-relaxed">
                {mainDistributor.address}
              </p>

            </div>

          </div>

        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-primary">
            Toko Yang Menjual Produk Milkysil
          </h3>
          <div className="w-20 h-[3px] bg-primary mx-auto mt-2 rounded-full"></div>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">

          {distributors.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-[24px] border border-[#E4ECF8]
              p-8 w-full max-w-[300px] mx-auto
              shadow-[0_4px_12px_rgba(37,99,235,0.06)]
              hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]
              hover:-translate-y-1
              transition-all duration-300"
            >

              <div className="flex items-start gap-3">

                <MapPin className="text-primary mt-1" size={20} />

                <div>
                  <p className="font-semibold text-sm text-primary">
                    {item.name}
                  </p>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {item.region}
                  </p>
                </div>

              </div>

              <div className="border-t mt-4 pt-4">

                <p className="text-xs text-gray-400 leading-relaxed">
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