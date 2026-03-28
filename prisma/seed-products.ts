import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function main() {
  // ================= CATEGORY =================
  const categories = [
    { id: 1, name: "Fiberglass" },
    { id: 2, name: "General Chemicals" },
    { id: 3, name: "Water Treatment" },
    { id: 4, name: "Silicone Emulsion" },
    { id: 5, name: "Household" },
    { id: 6, name: "Flavouring for Food & Tobacco" },
    { id: 7, name: "Others" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    });
  }

  console.log("Categories seeded");

  // ================= PRODUCTS =================
  const products = [
    // Fiberglass
    { name: "CATALYST", categoryId: 1 },
    { name: "COBALT", categoryId: 1 },
    { name: "CSMATT 300 & 450", categoryId: 1 },
    { name: "RESIN BENING (LAQUER)", categoryId: 1 },
    { name: "RESIN BUTEK (GENERAL PURPOSE)", categoryId: 1 },
    { name: "ROVING YARN", categoryId: 1 },
    { name: "RESIN COR (CLEAR CASTING)", categoryId: 1 },
    { name: "TALK HAICHEN", categoryId: 1 },
    { name: "TALK LIAO NING", categoryId: 1 },
    { name: "WACKER HDK N-20 / AEROSIL", categoryId: 1 },
    { name: "WOVEN ROVING", categoryId: 1 },

    // General Chemicals
    { name: "AMONIAK", categoryId: 2 },
    { name: "ADHESIVE / LEM PUTIH PVAC", categoryId: 2 },
    { name: "BORIC ACID", categoryId: 2 },
    { name: "CALCIUM CHLORIDE FLAKE", categoryId: 2 },
    { name: "CASTOR OIL", categoryId: 2 },
    { name: "CAUSTIC SODA LIQUID", categoryId: 2 },
    { name: "CAUSTIC SODA FLAKE", categoryId: 2 },
    { name: "COCAMIDOPROPYL BETAINE / CAPB / FOAM BOOSTER", categoryId: 2 },
    { name: "CITRIC ACID", categoryId: 2 },
    { name: "CREASYLIC ACID", categoryId: 2 },
    { name: "DI PROPYLENE GLYCOL", categoryId: 2 },
    { name: "EPOXY RESIN", categoryId: 2 },
    { name: "FERRIC CHLORIDE", categoryId: 2 },
    { name: "FOAM BOOSTER", categoryId: 2 },
    { name: "GLYCERIN", categoryId: 2 },
    { name: "HCL / ASAM KLORIDA", categoryId: 2 },
    { name: "H2SO4 / ASAM SULPHATE", categoryId: 2 },
    { name: "HARDENER EPOXY RESIN", categoryId: 2 },
    { name: "HCL / HYDROCHLORIC ACID 32%", categoryId: 2 },
    { name: "HIDROFLOURIC ACID (HF)", categoryId: 2 },
    { name: "KNO3 POWDER / SENDAWA", categoryId: 2 },
    { name: "LABS", categoryId: 2 },
    { name: "LINEAR ALKYLBENZENE / LABSA", categoryId: 2 },
    { name: "MGSO4 / MAGNESIUM SULPHATE", categoryId: 2 },
    { name: "NAOH / NATRIUM HIDROKSIDA ASAHI", categoryId: 2 },
    { name: "NAOH / NATRIUM HIDROKSIDA CAIR", categoryId: 2 },
    { name: "NAOH / NATRIUM HIDROKSIDA CHINA", categoryId: 2 },
    { name: "NATRIUM CHLORIDE", categoryId: 2 },
    { name: "NATRIUM SULPHATE", categoryId: 2 },
    { name: "NITRIC ACID BELGIUM", categoryId: 2 },
    { name: "NITRIC ACID KOREA", categoryId: 2 },
    { name: "OLEIC ACID", categoryId: 2 },
    { name: "OXALIC ACID", categoryId: 2 },
    { name: "PHOSPORIC ACID", categoryId: 2 },
    { name: "PROPYLENE GLYCOL", categoryId: 2 },
    { name: "PINE OIL 50%", categoryId: 2 },
    { name: "POTASIUM HIDROXIDE / KOH EX. KOREA", categoryId: 2 },
    { name: "SILICONE OIL 1000 CST", categoryId: 2 },
    { name: "SILICONE OIL 350 CST", categoryId: 2 },
    { name: "SODA ASH DENSE / SODIUM CARBONATE", categoryId: 2 },
    { name: "SODIUM BENZOATE", categoryId: 2 },
    { name: "SODIUM BICARBONATE / SODA KUE", categoryId: 2 },
    { name: "SODIUM METABISULPHITE", categoryId: 2 },
    { name: "SODIUM SILICATE / WATER GLASS", categoryId: 2 },
    { name: "SODIUM SULPHITE", categoryId: 2 },
    { name: "STEARIC ACID", categoryId: 2 },
    { name: "TEXAPON EMAL 270N", categoryId: 2 },
    { name: "WHITE OIL", categoryId: 2 },

    // Water Treatment
    { name: "CARBON AKTIF", categoryId: 3 },
    { name: "FLOKULAN ANIONIC POLYMER", categoryId: 3 },
    { name: "KAPORIT CAIR / HYPO", categoryId: 3 },
    { name: "KAPORIT GRANULE 90% / TCCA", categoryId: 3 },
    { name: "KAPORIT POWDER TJIWI 60%", categoryId: 3 },
    { name: "KAPORIT TABLET BESAR / TCCA", categoryId: 3 },
    { name: "MANGANESE GREEN SAND", categoryId: 3 },
    { name: "PAC", categoryId: 3 },
    { name: "PASIR AKTIF", categoryId: 3 },
    { name: "POLY ALUMINIUM CHLORIDE / PAC JEPANG", categoryId: 3 },
    { name: "POLY ALUMINIUM CHLORIDE / PAC JERMAN", categoryId: 3 },
    { name: "TAWAS BENING", categoryId: 3 },
    { name: "TAWAS BUTEK", categoryId: 3 },
    { name: "TERUSI / COOPER SULPHATE", categoryId: 3 },
    { name: "ZEOLIT", categoryId: 3 },

    // Silicone
    { name: "MILKYSIL CONCENTRATE", categoryId: 4 },
    { name: "MILKYSIL S108SP", categoryId: 4 },
    { name: "MILKYSIL S168HV", categoryId: 4 },
    { name: "MILKYSIL S168LV", categoryId: 4 },
    { name: "MILKYSIL S22SKS", categoryId: 4 },
    { name: "MILKYSIL S297HV", categoryId: 4 },
    { name: "MILKYSIL S297LV", categoryId: 4 },
    { name: "MILKYSIL S303B", categoryId: 4 },
    { name: "MILKYSIL S305MR", categoryId: 4 },
    { name: "MILKYSIL S306HVM", categoryId: 4 },
    { name: "MILKYSIL S30HV", categoryId: 4 },
    { name: "MILKYSIL S320HV", categoryId: 4 },
    { name: "MILKYSIL S320LV", categoryId: 4 },
    { name: "MILKYSIL S33HV", categoryId: 4 },
    { name: "MILKYSIL S36HV", categoryId: 4 },
    { name: "MILKYSIL S36HVM", categoryId: 4 },
    { name: "MILKYSIL S36LV", categoryId: 4 },
    { name: "MILKYSIL S36TPK", categoryId: 4 },
    { name: "MILKYSIL S40LV", categoryId: 4 },
    { name: "SNOW WASH MRH (SHAMPOO MOBIL)", categoryId: 4 },
    { name: "SNOW WASH PREMIUM (SHAMPOO MOBIL)", categoryId: 4 },
    { name: "THICKENER", categoryId: 4 },

    // Household
    { name: "CARBOL LEMON", categoryId: 5 },
    { name: "HANDSOAP CLEAR (NON AROMATIC)", categoryId: 5 },
    { name: "HANDSOAP LEMON", categoryId: 5 },
    { name: "HANDSOAP STRAWBERRY", categoryId: 5 },
    { name: "LYSOL 100%", categoryId: 5 },
    { name: "LYSOL LEMON", categoryId: 5 },
    { name: "MILKYCLEAN CARBOL SEREH", categoryId: 5 },
    { name: "MILKYCLEAN FLOOR CLEANER APPLE", categoryId: 5 },
    { name: "MILKYCLEAN GLASS CLEANER", categoryId: 5 },
    { name: "MILKYCLEAN HAND SANITIZER GREEN TEA", categoryId: 5 },
    { name: "MILKYCLEAN PORCELEIN CLEANER", categoryId: 5 },
    { name: "SABUN CUCI PIRING JERUK NIPIS", categoryId: 5 },
    { name: "SABUN CUCI PIRING JERUK NIPIS SP", categoryId: 5 },

    // Flavour
    { name: "ESSENCE", categoryId: 6 },
    { name: "ETHYL MALTHOL", categoryId: 6 },
    { name: "ETHYL VANILIN RHODIA RUM", categoryId: 6 },
    { name: "FUMIGAN", categoryId: 6 },
    { name: "FURANEOL", categoryId: 6 },
    { name: "MENTHOL CRYSTAL", categoryId: 6 },
    { name: "SACHARINE", categoryId: 6 },
    { name: "SWEET AROMATIC", categoryId: 6 },
    { name: "VANELLIN BUAH", categoryId: 6 },
    { name: "VANELLIN CAIR", categoryId: 6 },
    { name: "VANELLIN KUNING", categoryId: 6 },
    { name: "VANILIN POLAR ETERNAL", categoryId: 6 },

    // Others
    { name: "AQUA DM / DEMINERALISASI", categoryId: 7 },
    { name: "COCODIETHANOLAMIDE / CDEA", categoryId: 7 },
    { name: "DIETHYLENE GLYCOL (DEG)", categoryId: 7 },
    { name: "ESSENTIAL OIL", categoryId: 7 },
    { name: "EXTRA VIRGIN OLIVE OIL", categoryId: 7 },
    { name: "GALON 1 LITER TRANSPARAN", categoryId: 7 },
    { name: "GALON 5 LITER TRANSPARAN", categoryId: 7 },
    { name: "ISO PROPHYL ALKOHOL", categoryId: 7 },
    { name: "JERIGEN 20 LITER TRANSPARAN", categoryId: 7 },
    { name: "JERIGEN 30 LITER BIRU", categoryId: 7 },
    { name: "KNO3 PRILL / SENDAWA", categoryId: 7 },
    { name: "MONO ETHYLENE GLYCOL (MEG)", categoryId: 7 },
    { name: "PARFUM LAUNDRY", categoryId: 7 },
    { name: "PER CHLORO ETHYLENE", categoryId: 7 },
    { name: "TEMIX / RACUN TIKUS & BABI HUTAN", categoryId: 7 },
    { name: "THINNER ACS", categoryId: 7 },
    { name: "THINNER METHANOL", categoryId: 7 },
    { name: "THINNER SUPER GLOSS", categoryId: 7 },
    { name: "THINNER TLN", categoryId: 7 },
    { name: "THINNER XYLENE", categoryId: 7 },
    { name: "TRI CHLORO ETHYLENE (TCE)", categoryId: 7 },
    { name: "WASH BENSIN / SBP", categoryId: 7 },
  ];

  const productsWithSlugs = products.map(p => ({
    ...p,
    slug: slugify(p.name),
  }));

  await prisma.product.createMany({
    data: productsWithSlugs,
    skipDuplicates: true,
  });

  console.log("Products seeded 🚀");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });