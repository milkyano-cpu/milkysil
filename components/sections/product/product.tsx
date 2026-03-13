"use client"

import { useState } from "react"
import Image from "next/image"

type ProductCategory = {
  name: string
  icon: string
  products: Record<string, string[]>
}

const categories: ProductCategory[] = [
  {
    name: "Fiberglass",
    icon: "/fence-icon.png",
    products: {
      C: ["CATALYST", "COBALT", "CSMATT 300 & 450"],
      R: [
        "RESIN BENING (LAQUER)",
        "RESIN BUTEK (GENERAL PURPOSE)",
        "ROVING YARN",
        "RESIN COR (CLEAR CASTING)"
      ],
      T: ["TALK HAICHEN", "TALK LIAO NING"],
      W: ["WACKER HDK N-20 / AEROSIL", "WOVEN ROVING"]
    }
  },

  {
    name: "General Chemicals",
    icon: "/chemical-icon.png",
    products: {
      A: ["AMONIAK", "ADHESIVE / LEM PUTIH PVAC"],
      B: ["BORIC ACID"],
      C: [
        "CALCIUM CHLORIDE FLAKE",
        "CASTOR OIL",
        "CAUSTIC SODA LIQUID",
        "CAUSTIC SODA FLAKE",
        "COCAMIDOPROPYL BETAINE / CAPB / FOAM BOOSTER",
        "CITRIC ACID",
        "CREASYLIC ACID"
      ],
      D: [
        "DI PROPYLENE GLYCOL",
        "DI PROPYLENE GLYCOL"
      ],
      E: ["EPOXY RESIN"],
      F: ["FERRIC CHLORIDE", "FOAM BOOSTER"],
      G: ["GLYCERIN"],
      H: [
        "HCL / ASAM KLORIDA",
        "H2SO4 / ASAM SULPHATE",
        "HARDENER EPOXY RESIN",
        "HCL / HYDROCHLORIC ACID 32%",
        "HIDROFLOURIC ACID (HF)",
        "KNO3 POWDER / SENDAWA"
      ],
      L: [
        "LABS",
        "LINEAR ALKYLBENZENE / LABSA"
      ],
      M: [
        "MGSO4 / MAGNESIUM SULPHATE",
        "NAOH / NATRIUM HIDROKSIDA ASAHI"
      ],
      N: [
        "NAOH / NATRIUM HIDROKSIDA CAIR",
        "NAOH / NATRIUM HIDROKSIDA CHINA",
        "NATRIUM CHLORIDE",
        "NATRIUM SULPHATE",
        "NITRIC ACID BELGIUM",
        "NITRIC ACID KOREA"
      ],
      O: ["OLEIC ACID", "OXALIC ACID"],
      P: [
        "PHOSPORIC ACID",
        "PROPYLENE GLYCOL",
        "PINE OIL 50%",
        "POTASIUM HIDROXIDE / KOH EX. KOREA"
      ],
      S: [
        "SILICONE OIL 1000 CST",
        "SILICONE OIL 350 CST",
        "SODA ASH DENSE / SODIUM CARBONATE",
        "SODIUM BENZOATE",
        "SODIUM BICARBONATE / SODA KUE",
        "SODIUM METABISULPHITE",
        "SODIUM SILICATE / WATER GLASS",
        "SODIUM SULPHITE",
        "STEARIC ACID"
      ],
      T: ["TEXAPON EMAL 270N"],
      W: ["WHITE OIL"]
    }
  },

  {
    name: "Water Treatment",
    icon: "/water-icon.png",
    products: {
      C: ["CARBON AKTIF"],
      F: ["FLOKULAN ANIONIC POLYMER"],
      K: [
        "KAPORIT CAIR / HYPO",
        "KAPORIT GRANULE 90% / TCCA",
        "KAPORIT POWDER TJIWI 60%",
        "KAPORIT TABLET BESAR / TCCA"
      ],
      M: ["MANGANESE GREEN SAND"],
      P: [
        "PAC",
        "PASIR AKTIF",
        "POLY ALUMINIUM CHLORIDE / PAC JEPANG",
        "POLY ALUMINIUM CHLORIDE / PAC JERMAN"
      ],
      T: [
        "TAWAS BENING",
        "TAWAS BUTEK",
        "TERUSI / COOPER SULPHATE"
      ],
      Z: ["ZEOLIT"]
    }
  },

  {
    name: "Silicone Emulsion",
    icon: "/glue-icon.png",
    products: {
      M: [
        "MILKYSIL CONCENTRATE",
        "MILKYSIL S108SP",
        "MILKYSIL S168HV",
        "MILKYSIL S168LV",
        "MILKYSIL S22SKS",
        "MILKYSIL S297HV",
        "MILKYSIL S297LV",
        "MILKYSIL S303B",
        "MILKYSIL S305MR",
        "MILKYSIL S306HVM",
        "MILKYSIL S30HV",
        "MILKYSIL S320HV",
        "MILKYSIL S320LV",
        "MILKYSIL S33HV",
        "MILKYSIL S36HV",
        "MILKYSIL S36HVM",
        "MILKYSIL S36LV",
        "MILKYSIL S36TPK",
        "MILKYSIL S40LV"
      ],
      S: [
        "SNOW WASH MRH (SHAMPOO MOBIL)",
        "SNOW WASH PREMIUM (SHAMPOO MOBIL)"
      ],
      T: ["THICKENER"]
    }
  },

  {
    name: "Household",
    icon: "/clean-icon.png",
    products: {
      C: ["CARBOL LEMON"],
      D: [
        "HANDSOAP CLEAR (NON AROMATIC)",
        "HANDSOAP LEMON",
        "HANDSOAP STRAWBERRY"
      ],
      L: ["LYSOL 100%", "LYSOL LEMON"],
      M: [
        "MILKYCLEAN CARBOL SEREH",
        "MILKYCLEAN FLOOR CLEANER APPLE",
        "MILKYCLEAN GLASS CLEANER",
        "MILKYCLEAN HAND SANITIZER GREEN TEA",
        "MILKYCLEAN PORCELEIN CLEANER"
      ],
      S: [
        "SABUN CUCI PIRING JERUK NIPIS",
        "SABUN CUCI PIRING JERUK NIPIS SP"
      ]
    }
  },

  {
    name: "Flavouring for Food & Tobacco",
    icon: "/food-icon.png",
    products: {
      E: [
        "ESSENCE",
        "ETHYL MALTHOL",
        "ETHYL VANILIN RHODIA RUM"
      ],
      F: ["FUMIGAN", "FURANEOL"],
      M: ["MENTHOL CRYSTAL"],
      S: ["SACHARINE", "SWEET AROMATIC"],
      V: [
        "VANELLIN BUAH",
        "VANELLIN CAIR",
        "VANELLIN KUNING",
        "VANILIN POLAR ETERNAL"
      ]
    }
  },

  {
    name: "Others",
    icon: "/other-icon.png",
    products: {
      A: ["AQUA DM / DEMINERALISASI"],
      C: ["COCODIETHANOLAMIDE / CDEA"],
      D: ["DIETHYLENE GLYCOL (DEG)"],
      E: ["ESSENTIAL OIL", "EXTRA VIRGIN OLIVE OIL"],
      G: ["GALON 1 LITER TRANSPARAN", "GALON 5 LITER TRANSPARAN"],
      I: ["ISO PROPHYL ALKOHOL"],
      J: ["JERIGEN 20 LITER TRANSPARAN", "JERIGEN 30 LITER BIRU"],
      K: ["KNO3 PRILL / SENDAWA"],
      M: ["MONO ETHYLENE GLYCOL (MEG)"],
      P: ["PARFUM LAUNDRY", "PER CHLORO ETHYLENE"],
      T: [
        "TEMIX / RACUN TIKUS & BABI HUTAN",
        "THINNER ACS",
        "THINNER METHANOL",
        "THINNER SUPER GLOSS",
        "THINNER TLN",
        "THINNER XYLENE",
        "TRI CHLORO ETHYLENE (TCE)"
      ],
      W: ["WASH BENSIN / SBP"]
    }
  }
]
export default function ProductSection() {

  const [activeTab, setActiveTab] = useState(0)
  const activeProducts = categories[activeTab].products

  return (
    <section className="bg-[#F7F9FC] pb-24">

      {/* HERO */}
      <div className="bg-primary pt-24 pb-36 rounded-b-[60px] text-center text-white">
        <h1 className="text-4xl font-bold">List Product</h1>

        <p className="mt-3 text-white text-sm">
          <span className="font-semibold">MILKYSIL®</span> trusted brands of the nation`s pride
        </p>
      </div>


      {/* CATEGORY TAB */}
        <div className="w-full px-6 -mt-12">
                <div className="flex gap-4 overflow-x-auto md:overflow-visible md:justify-center md:max-w-[1100px] md:mx-auto no-scrollbar">

        {categories.map((cat, index) => (

            <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center justify-center gap-3 flex-shrink-0 md:flex-1 min-w-[227px] h-[72px] px-8 rounded-lg text-base font-medium shadow-md transition cursor-pointer
                ${
                    activeTab === index
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >

            <Image
            src={cat.icon}
            alt={cat.name}
            width={20}
            height={20}
            />

            {cat.name}

        </button>

        ))}

    </div>
    </div>


      {/* PRODUCT LIST */}
      <div className="max-w-[1100px] mx-auto px-6 mt-14 space-y-10">

        {Object.entries(activeProducts).map(([letter, items]) => (

          <div key={letter} className="flex gap-8 items-start">

            {/* LETTER */}
            <div className="text-gray-300 text-xl font-semibold min-w-[60px]">
              #{letter}
            </div>


            {/* PRODUCTS */}
            <div className="flex flex-wrap gap-4">

              {items.map((item, index) => (

                <div
                  key={index}
                  className="px-6 py-3 rounded-full bg-white shadow text-primary text-sm font-semibold"
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}