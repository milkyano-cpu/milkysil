"use client"

import { useState } from "react"
import Image from "next/image"

const AboutSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  return (
    <section className="bg-[#F7F9FC] pb-28">

      {/* HERO */}
      <div className="bg-primary pt-24 pb-36 rounded-b-[60px] text-center text-white">
        <h1 className="text-4xl font-bold">About Us</h1>

        <p className="mt-3 text-sm">
          <span className="font-semibold">MILKYSIL®</span> trusted brands of the nation`s pride
        </p>
      </div>

      {/* LOGO CARD */}
      <div className="max-w-[90%] md:max-w-[720px] lg:max-w-[900px] mx-auto px-4 md:px-6 -mt-24">

        <div className="bg-white rounded-[20px] shadow-lg py-12 flex justify-center">

          <Image
            src="/logo-aboutus.png"
            alt="CV Milky Makmur Sejahtera"
            width={800}
            height={200}
            className="w-[280px] md:w-[600px] h-auto"
          />

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-[90%] md:max-w-[720px] lg:max-w-[900px] mx-auto px-4 md:px-6 mt-14 text-[#1E3E6D] leading-relaxed text-[15px] space-y-6 text-justify">

        <p>
          <span className="font-semibold">
            CV MILKY MAKMUR SEJAHTERA
          </span>, sebuah Perusahaan Investasi dalam negeri, didirikan pada tahun
          2003 sebagai Perusahaan Dagang (Trading) dan Manufacturing yang
          menyediakan Product Bahan Baku dan Barang Jadi dalam Bidang Kimia,
          yang berkantor pusat di Kota Bandung. Kami adalah salah satu
          Perusahaan Dagang Kimia terkemuka di Bidang Kimia Umum (General) dan
          Kimia Khusus (Speciality).
        </p>

        <p>
          Jaringan pemasaran yang kuat dan kemampuan rantai pasokan yang luas
          telah memungkinkan CV MILKY MAKMUR SEJAHTERA untuk melayani pelanggan
          di seluruh wilayah Indonesia. Dengan komitmen untuk selalu memberikan
          yang terbaik serta mengutamakan kepuasan pelanggan. Kami terus menerus
          menciptakan inovasi terbaik yang selaras dengan visi kami yaitu: Menjadi
          yang terbaik dalam menyediakan segala kebutuhan yang diperlukan oleh Pelanggan.
        </p>

        <p>
          Visi tersebut diwujudkan dengan Misi : Menyediakan kualitas product
          yang terbaik dan memberikan service yang memuaskan pelanggan baik
          dari segi ketersediaan stock dan ketepatan waktu pengiriman barang.
          Memberikan kontribusi bagi pembangunan ekonomi dan sosial.
          Mengutamakan proses produksi yang berwawasan lingkungan.
          Menjamin kualitas product dan service yang terbaik.
          Selalu membina kepercayaan dengan Karyawan, Pelanggan,
          Distributor dan Pemasok/Supplier.
          Menjunjung tinggi kemampuan individu dan Kerjasama Team
          serta mengutamakan keselamatan kerja.
        </p>

      </div>

      {/* QUOTE */}
      <div className="max-w-[90%] md:max-w-[720px] lg:max-w-[900px] mx-auto px-4 md:px-6 mt-32 relative">

        {/* Quote background */}
        <Image
          src="/sidekick-image.png"
          alt="quote"
          width={350}
          height={400}
          className="
          absolute
          w-[220px] md:w-[350px]
          -left-15 top-0
          md:-left-20 md:-top-16
          opacity-[0.06]
          pointer-events-none
          select-none"
        />

        {/* Quote text */}
        <div className="relative text-primary text-3xl md:text-4xl font-bold leading-snug">

          <p>Be Your Best Friend In All Your Needs</p>

          <p className="mt-3">
            Provide The Best Quality For Products <br />
            And Services Of Your Every Need
          </p>

        </div>

      </div>

      {/* AFFILIATE COMPANY */}
      <div className="max-w-[90%] md:max-w-[720px] lg:max-w-[900px] mx-auto px-4 md:px-6 mt-36">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 md:gap-10 mb-8 text-center md:text-left">

          <h2 className="text-[25px] md:text-[34px] font-semibold text-primary">
            Perusahaan Afiliasi
          </h2>

          <Image
            src="/bahtera-kimia.png"
            alt="Bahtera Kimia"
            width={420}
            height={120}
            className="w-[350px] md:w-[450px] h-auto mx-auto md:mx-0"
          />

        </div>

        {/* Description */}
        <p className="text-primary text-[15px] leading-[1.8] max-w-[800px] mb-10 text-justify">
          <span className="font-semibold">TOKO BAHTERA KIMIA</span> yang berdiri pada Tahun
          2007 adalah anak Perusahaan dari CV MILKY MAKMUR SEJAHTERA.
          Kami memiliki pengalaman bertahun-tahun dan sumber yang terpercaya
          untuk menyediakan bahan kimia terbaik bagi pelanggan kami.
        </p>

        {/* MENYEDIAKAN */}
        <h3 className="text-primary font-bold mb-4">
          MENYEDIAKAN :
        </h3>

        <div className="flex flex-wrap gap-4 mb-10">
          {[
            "SILICON EMULSION MILKYSIL (SEMIR BAN)",
            "SNOW WASH / SHAMPOO MOBIL",
            "SABUN CUCI PIRING JERUK NIPIS",
            "SABUN CUCI TANGAN STRAWBERRY DAN LEMON",
            "LYSOL 100%, LYSOL LEMON & CARBOL",
            "SODA API/CAUSTIC SODA, DLL",
          ].map((item) => (
            <span
              key={item}
              className="px-5 py-2 bg-white rounded-full shadow-md text-[12px] md:text-[13px] font-semibold text-primary"
            >
              {item}
            </span>
          ))}
        </div>

        {/* WATER TREATMENT */}
        <h3 className="text-primary font-bold mb-4">
          WATER TREATMENT :
        </h3>

        <div className="flex flex-wrap gap-4 mb-10">
          {[
            "P A C",
            "TERUSI / COOPER SULPHATE",
            "TAWAS BENING & TAWAS BUTEK",
            "SODA ASH DENSE",
            "KAPORIT POWDER, GRANULAR, TABLET",
            "MANGANESE GREENSAND",
            "CARBON AKTIF",
            "PASIR AKTIF",
            "ZEOLIT, DLL",
          ].map((item) => (
            <span
              key={item}
              className="px-5 py-2 bg-white rounded-full shadow-md text-[12px] md:text-[13px] font-semibold text-primary"
            >
              {item}
            </span>
          ))}
        </div>

        {/* FIBER GLASS */}
        <h3 className="text-primary font-bold mb-4">
          FIBER GLASS :
        </h3>

        <div className="flex flex-wrap gap-4 mb-10">
          {[
            "RESIN BUTEK",
            "RESIN BENING",
            "CATALYST",
            "WACKER HDK / AEROSIL",
            "TALK LIAONING & HAICHEN",
            "PIGMENT",
            "MIRROR GLAZE",
            "SILICON RUBBER",
            "COBALT",
            "CS MATT 300 & 450",
            "WOVEN ROVING",
            "ROVING YARN",
          ].map((item) => (
            <span
              key={item}
              className="px-5 py-2 bg-white rounded-full shadow-md text-[12px] md:text-[13px] font-semibold text-primary"
            >
              {item}
            </span>
          ))}
        </div>

        {/* OTHER */}
        <h3 className="text-primary font-bold mb-4">
          OTHER :
        </h3>

        <div className="flex flex-wrap gap-4">
          {[
            "ANEKA SOLVENT & THINER",
            "TCE & PCE",
            "MONO ETHYLENE GLYCOL (MEG) & DIETHYLENE GLYCOL (DEG)",
            "ETHYL VANILLIN (RHODIA RUM)",
            "VANILLIN (RHOVANIL)",
            "VANILLIN POLAR BEAR",
            "SACHARINE",
            "BORIC ACID",
            "FERRIC CHLORIDE",
            "STEARIC ACID",
            "TEXAPON CAIR",
            "LABS",
            "FOAM BOOSTER",
            "NATRIUM CHLORIDE",
            "NATRIUM SULPHATE",
            "SODIUM SULPHITE",
            "CALCIUM CHLORIDE FLAKE",
            "GLYCERIN",
          ].map((item) => (
            <span
              key={item}
              className="px-5 py-2 bg-white rounded-full shadow-md text-[12px] md:text-[13px] font-semibold text-primary"
            >
              {item}
            </span>
          ))}
        </div>

      </div>

    <div className="max-w-[90%] md:max-w-[900px] mx-auto px-4 md:px-6 mt-36">

        <div className="text-center mb-10">
          <h2 className="text-[28px] md:text-[34px] font-semibold text-primary">
            GALERI PHOTO
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[
          {
            src: "/gallery.png",
            title: "TIRE POLISH S320 LV",
            subtitle: "CV. Milky Makmur Sejahtera",
          },
          {
            src: "/gallery.png",
            title: "SNOW WASH SHAMPOO",
            subtitle: "CV. Milky Makmur Sejahtera",
          },
          {
            src: "/gallery.png",
            title: "SABUN CUCI PIRING",
            subtitle: "CV. Milky Makmur Sejahtera",
          },
          {
            src: "/gallery.png",
            title: "CARBOL LYSOL",
            subtitle: "CV. Milky Makmur Sejahtera",
          },
          {
            src: "/gallery.png",
            title: "SODA API",
            subtitle: "CV. Milky Makmur Sejahtera",
          },
          {
            src: "/gallery.png",
            title: "WATER TREATMENT",
            subtitle: "CV. Milky Makmur Sejahtera",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(item.src)}
          >
            <Image
              src={item.src}
              alt={item.title}
              width={400}
              height={250}
              className="w-full h-[200px] object-cover rounded-xl shadow-md"
            />

            {/* 🔥 OVERLAY BARU */}
            <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-white text-center px-4">

              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-sm italic mb-4">
                {item.subtitle}
              </p>

              <div className="bg-black px-4 py-2 text-sm font-semibold">
                ZOOM
              </div>

            </div>

          </div>
        ))}

        </div>
      </div>

      {/* ======================= */}
      {/* MODAL ZOOM */}
      {/* ======================= */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="zoom"
              width={800}
              height={500}
              className="w-full h-auto rounded-lg"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </section>
  )
}

export default AboutSection