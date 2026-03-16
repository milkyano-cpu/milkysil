"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  categoryId: number;
};

type Category = {
  id: number;
  name: string;
  icon: string;
  iconWhite: string;
};

type ProductCategory = {
  name: string;
  icon: string;
  iconWhite: string;
  products: Record<string, string[]>;
};

const categoryMaster: Category[] = [
  {
    id: 1,
    name: "Fiberglass",
    icon: "/fence-icon.png",
    iconWhite: "/fence-white-icon.png",
  },
  {
    id: 2,
    name: "General Chemicals",
    icon: "/chemical-icon.png",
    iconWhite: "/chemical-white-icon.png",
  },
  {
    id: 3,
    name: "Water Treatment",
    icon: "/water-icon.png",
    iconWhite: "/water-white-icon.png",
  },
  {
    id: 4,
    name: "Silicone Emulsion",
    icon: "/glue-icon.png",
    iconWhite: "/glue-white-icon.png",
  },
  {
    id: 5,
    name: "Household",
    icon: "/clean-icon.png",
    iconWhite: "/clean-white-icon.png",
  },
  {
    id: 6,
    name: "Flavouring for Food & Tobacco",
    icon: "/food-icon.png",
    iconWhite: "/food-white-icon.png",
  },
  {
    id: 7,
    name: "Others",
    icon: "/other-icon.png",
    iconWhite: "/other-white-icon.png",
  },
];

const productMaster: Product[] = [
  /* Fiberglass */
  { id: 1, name: "CATALYST", categoryId: 1 },
  { id: 2, name: "COBALT", categoryId: 1 },
  { id: 3, name: "CSMATT 300 & 450", categoryId: 1 },
  { id: 4, name: "RESIN BENING (LAQUER)", categoryId: 1 },
  { id: 5, name: "RESIN BUTEK (GENERAL PURPOSE)", categoryId: 1 },
  { id: 6, name: "ROVING YARN", categoryId: 1 },
  { id: 7, name: "RESIN COR (CLEAR CASTING)", categoryId: 1 },
  { id: 8, name: "TALK HAICHEN", categoryId: 1 },
  { id: 9, name: "TALK LIAO NING", categoryId: 1 },
  { id: 10, name: "WACKER HDK N-20 / AEROSIL", categoryId: 1 },
  { id: 11, name: "WOVEN ROVING", categoryId: 1 },

  /* General Chemicals */

  { id: 12, name: "AMONIAK", categoryId: 2 },
  { id: 13, name: "ADHESIVE / LEM PUTIH PVAC", categoryId: 2 },
  { id: 14, name: "BORIC ACID", categoryId: 2 },
  { id: 15, name: "CALCIUM CHLORIDE FLAKE", categoryId: 2 },
  { id: 16, name: "CASTOR OIL", categoryId: 2 },
  { id: 17, name: "CAUSTIC SODA LIQUID", categoryId: 2 },
  { id: 18, name: "CAUSTIC SODA FLAKE", categoryId: 2 },
  {
    id: 19,
    name: "COCAMIDOPROPYL BETAINE / CAPB / FOAM BOOSTER",
    categoryId: 2,
  },
  { id: 20, name: "CITRIC ACID", categoryId: 2 },
  { id: 21, name: "CREASYLIC ACID", categoryId: 2 },
  { id: 22, name: "DI PROPYLENE GLYCOL", categoryId: 2 },
  { id: 23, name: "EPOXY RESIN", categoryId: 2 },
  { id: 24, name: "FERRIC CHLORIDE", categoryId: 2 },
  { id: 25, name: "FOAM BOOSTER", categoryId: 2 },
  { id: 26, name: "GLYCERIN", categoryId: 2 },
  { id: 27, name: "HCL / ASAM KLORIDA", categoryId: 2 },
  { id: 28, name: "H2SO4 / ASAM SULPHATE", categoryId: 2 },
  { id: 29, name: "HARDENER EPOXY RESIN", categoryId: 2 },
  { id: 30, name: "HCL / HYDROCHLORIC ACID 32%", categoryId: 2 },
  { id: 31, name: "HIDROFLOURIC ACID (HF)", categoryId: 2 },
  { id: 32, name: "KNO3 POWDER / SENDAWA", categoryId: 2 },
  { id: 33, name: "LABS", categoryId: 2 },
  { id: 34, name: "LINEAR ALKYLBENZENE / LABSA", categoryId: 2 },
  { id: 35, name: "MGSO4 / MAGNESIUM SULPHATE", categoryId: 2 },
  { id: 36, name: "NAOH / NATRIUM HIDROKSIDA ASAHI", categoryId: 2 },
  { id: 37, name: "NAOH / NATRIUM HIDROKSIDA CAIR", categoryId: 2 },
  { id: 38, name: "NAOH / NATRIUM HIDROKSIDA CHINA", categoryId: 2 },
  { id: 39, name: "NATRIUM CHLORIDE", categoryId: 2 },
  { id: 40, name: "NATRIUM SULPHATE", categoryId: 2 },
  { id: 41, name: "NITRIC ACID BELGIUM", categoryId: 2 },
  { id: 42, name: "NITRIC ACID KOREA", categoryId: 2 },
  { id: 43, name: "OLEIC ACID", categoryId: 2 },
  { id: 44, name: "OXALIC ACID", categoryId: 2 },
  { id: 45, name: "PHOSPORIC ACID", categoryId: 2 },
  { id: 46, name: "PROPYLENE GLYCOL", categoryId: 2 },
  { id: 47, name: "PINE OIL 50%", categoryId: 2 },
  { id: 48, name: "POTASIUM HIDROXIDE / KOH EX. KOREA", categoryId: 2 },
  { id: 49, name: "SILICONE OIL 1000 CST", categoryId: 2 },
  { id: 50, name: "SILICONE OIL 350 CST", categoryId: 2 },
  { id: 51, name: "SODA ASH DENSE / SODIUM CARBONATE", categoryId: 2 },
  { id: 52, name: "SODIUM BENZOATE", categoryId: 2 },
  { id: 53, name: "SODIUM BICARBONATE / SODA KUE", categoryId: 2 },
  { id: 54, name: "SODIUM METABISULPHITE", categoryId: 2 },
  { id: 55, name: "SODIUM SILICATE / WATER GLASS", categoryId: 2 },
  { id: 56, name: "SODIUM SULPHITE", categoryId: 2 },
  { id: 57, name: "STEARIC ACID", categoryId: 2 },
  { id: 58, name: "TEXAPON EMAL 270N", categoryId: 2 },
  { id: 59, name: "WHITE OIL", categoryId: 2 },

  /* Water Treatment */

  { id: 60, name: "CARBON AKTIF", categoryId: 3 },
  { id: 61, name: "FLOKULAN ANIONIC POLYMER", categoryId: 3 },
  { id: 62, name: "KAPORIT CAIR / HYPO", categoryId: 3 },
  { id: 63, name: "KAPORIT GRANULE 90% / TCCA", categoryId: 3 },
  { id: 64, name: "KAPORIT POWDER TJIWI 60%", categoryId: 3 },
  { id: 65, name: "KAPORIT TABLET BESAR / TCCA", categoryId: 3 },
  { id: 66, name: "MANGANESE GREEN SAND", categoryId: 3 },
  { id: 67, name: "PAC", categoryId: 3 },
  { id: 68, name: "PASIR AKTIF", categoryId: 3 },
  { id: 69, name: "POLY ALUMINIUM CHLORIDE / PAC JEPANG", categoryId: 3 },
  { id: 70, name: "POLY ALUMINIUM CHLORIDE / PAC JERMAN", categoryId: 3 },
  { id: 71, name: "TAWAS BENING", categoryId: 3 },
  { id: 72, name: "TAWAS BUTEK", categoryId: 3 },
  { id: 73, name: "TERUSI / COOPER SULPHATE", categoryId: 3 },
  { id: 74, name: "ZEOLIT", categoryId: 3 },

  /* Silicone */

  { id: 75, name: "MILKYSIL CONCENTRATE", categoryId: 4 },
  { id: 76, name: "MILKYSIL S108SP", categoryId: 4 },
  { id: 77, name: "MILKYSIL S168HV", categoryId: 4 },
  { id: 78, name: "MILKYSIL S168LV", categoryId: 4 },
  { id: 79, name: "MILKYSIL S22SKS", categoryId: 4 },
  { id: 80, name: "MILKYSIL S297HV", categoryId: 4 },
  { id: 81, name: "MILKYSIL S297LV", categoryId: 4 },
  { id: 82, name: "MILKYSIL S303B", categoryId: 4 },
  { id: 83, name: "MILKYSIL S305MR", categoryId: 4 },
  { id: 84, name: "MILKYSIL S306HVM", categoryId: 4 },
  { id: 85, name: "MILKYSIL S30HV", categoryId: 4 },
  { id: 86, name: "MILKYSIL S320HV", categoryId: 4 },
  { id: 87, name: "MILKYSIL S320LV", categoryId: 4 },
  { id: 88, name: "MILKYSIL S33HV", categoryId: 4 },
  { id: 89, name: "MILKYSIL S36HV", categoryId: 4 },
  { id: 90, name: "MILKYSIL S36HVM", categoryId: 4 },
  { id: 91, name: "MILKYSIL S36LV", categoryId: 4 },
  { id: 92, name: "MILKYSIL S36TPK", categoryId: 4 },
  { id: 93, name: "MILKYSIL S40LV", categoryId: 4 },
  { id: 94, name: "SNOW WASH MRH (SHAMPOO MOBIL)", categoryId: 4 },
  { id: 95, name: "SNOW WASH PREMIUM (SHAMPOO MOBIL)", categoryId: 4 },
  { id: 96, name: "THICKENER", categoryId: 4 },

  /* Household */

  { id: 97, name: "CARBOL LEMON", categoryId: 5 },
  { id: 98, name: "HANDSOAP CLEAR (NON AROMATIC)", categoryId: 5 },
  { id: 99, name: "HANDSOAP LEMON", categoryId: 5 },
  { id: 100, name: "HANDSOAP STRAWBERRY", categoryId: 5 },
  { id: 101, name: "LYSOL 100%", categoryId: 5 },
  { id: 102, name: "LYSOL LEMON", categoryId: 5 },
  { id: 103, name: "MILKYCLEAN CARBOL SEREH", categoryId: 5 },
  { id: 104, name: "MILKYCLEAN FLOOR CLEANER APPLE", categoryId: 5 },
  { id: 105, name: "MILKYCLEAN GLASS CLEANER", categoryId: 5 },
  { id: 106, name: "MILKYCLEAN HAND SANITIZER GREEN TEA", categoryId: 5 },
  { id: 107, name: "MILKYCLEAN PORCELEIN CLEANER", categoryId: 5 },
  { id: 108, name: "SABUN CUCI PIRING JERUK NIPIS", categoryId: 5 },
  { id: 109, name: "SABUN CUCI PIRING JERUK NIPIS SP", categoryId: 5 },

  /* Flavour */

  { id: 110, name: "ESSENCE", categoryId: 6 },
  { id: 111, name: "ETHYL MALTHOL", categoryId: 6 },
  { id: 112, name: "ETHYL VANILIN RHODIA RUM", categoryId: 6 },
  { id: 113, name: "FUMIGAN", categoryId: 6 },
  { id: 114, name: "FURANEOL", categoryId: 6 },
  { id: 115, name: "MENTHOL CRYSTAL", categoryId: 6 },
  { id: 116, name: "SACHARINE", categoryId: 6 },
  { id: 117, name: "SWEET AROMATIC", categoryId: 6 },
  { id: 118, name: "VANELLIN BUAH", categoryId: 6 },
  { id: 119, name: "VANELLIN CAIR", categoryId: 6 },
  { id: 120, name: "VANELLIN KUNING", categoryId: 6 },
  { id: 121, name: "VANILIN POLAR ETERNAL", categoryId: 6 },

  /* Others */

  { id: 122, name: "AQUA DM / DEMINERALISASI", categoryId: 7 },
  { id: 123, name: "COCODIETHANOLAMIDE / CDEA", categoryId: 7 },
  { id: 124, name: "DIETHYLENE GLYCOL (DEG)", categoryId: 7 },
  { id: 125, name: "ESSENTIAL OIL", categoryId: 7 },
  { id: 126, name: "EXTRA VIRGIN OLIVE OIL", categoryId: 7 },
  { id: 127, name: "GALON 1 LITER TRANSPARAN", categoryId: 7 },
  { id: 128, name: "GALON 5 LITER TRANSPARAN", categoryId: 7 },
  { id: 129, name: "ISO PROPHYL ALKOHOL", categoryId: 7 },
  { id: 130, name: "JERIGEN 20 LITER TRANSPARAN", categoryId: 7 },
  { id: 131, name: "JERIGEN 30 LITER BIRU", categoryId: 7 },
  { id: 132, name: "KNO3 PRILL / SENDAWA", categoryId: 7 },
  { id: 133, name: "MONO ETHYLENE GLYCOL (MEG)", categoryId: 7 },
  { id: 134, name: "PARFUM LAUNDRY", categoryId: 7 },
  { id: 135, name: "PER CHLORO ETHYLENE", categoryId: 7 },
  { id: 136, name: "TEMIX / RACUN TIKUS & BABI HUTAN", categoryId: 7 },
  { id: 137, name: "THINNER ACS", categoryId: 7 },
  { id: 138, name: "THINNER METHANOL", categoryId: 7 },
  { id: 139, name: "THINNER SUPER GLOSS", categoryId: 7 },
  { id: 140, name: "THINNER TLN", categoryId: 7 },
  { id: 141, name: "THINNER XYLENE", categoryId: 7 },
  { id: 142, name: "TRI CHLORO ETHYLENE (TCE)", categoryId: 7 },
  { id: 143, name: "WASH BENSIN / SBP", categoryId: 7 },
];

function buildCategories(): ProductCategory[] {
  return categoryMaster.map((cat) => {
    const list = productMaster
      .filter((p) => p.categoryId === cat.id)
      .map((p) => p.name);

    const grouped: Record<string, string[]> = {};

    list.forEach((product) => {
      const letter = product.charAt(0).toUpperCase();

      if (!grouped[letter]) grouped[letter] = [];

      grouped[letter].push(product);
    });

    return {
      name: cat.name,
      icon: cat.icon,
      iconWhite: cat.iconWhite,
      products: grouped,
    };
  });
}

export default function ProductSection() {
  const categories = useMemo(() => buildCategories(), []);

  const searchParams = useSearchParams();
  const router = useRouter();

  const tabMap: Record<string, number> = {
    fiberglass: 0,
    general: 1,
    water: 2,
    silicone: 3,
    household: 4,
    flavour: 5,
    others: 6,
  };

  const tabKeys = [
    "fiberglass",
    "general",
    "water",
    "silicone",
    "household",
    "flavour",
    "others",
  ];

  const initialTab =
    tabMap[searchParams.get("tab") as keyof typeof tabMap] ?? 0;

  const [activeTab, setActiveTab] = useState(initialTab);

  const activeProducts = categories[activeTab].products;

  return (
    <section className="bg-[#F7F9FC] pb-24">
      {/* HERO */}

      <div className="bg-primary pt-24 pb-36 rounded-b-[60px] text-center text-white">
        <h1 className="text-4xl font-bold">List Product</h1>

        <p className="mt-3 text-white text-sm">
          <span className="font-semibold">MILKYSIL®</span> trusted brands of the
          nation`s pride
        </p>
      </div>

      {/* CATEGORY TAB */}

      <div className="relative z-20 w-full -mt-12">
        <div className="flex gap-3 overflow-x-auto px-6 md:px-0 md:overflow-visible md:justify-center md:max-w-[1100px] md:mx-auto no-scrollbar pb-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index);
                router.push(`/product?tab=${tabKeys[index]}`);
              }}
              className={`flex items-center justify-center gap-2 flex-shrink-0
    w-[160px] md:w-[180px]
    h-[60px] md:h-[70px]
    px-3
    text-xs md:text-sm
    rounded-lg font-medium shadow-md transition cursor-pointer
    ${
      activeTab === index
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
            >
              <Image
                src={activeTab === index ? cat.iconWhite : cat.icon}
                alt={cat.name}
                width={20}
                height={20}
                className="flex-shrink-0"
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
            <div className="text-gray-300 text-xl font-semibold min-w-[60px]">
              #{letter}
            </div>

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
  );
}
