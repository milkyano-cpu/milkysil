import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface MilkysilProduct {
  name: string;
  description: string;
  shortDescription: string;
  specifications: { key: string; value: string }[];
}

const milkysilProducts: MilkysilProduct[] = [
  {
    name: "MILKYSIL TIRE POLISH CONCENTRATE",
    description:
      "MilkySil Tire Polish Concentrate adalah cairan konsentrat berkualitas tinggi yang diformulasikan untuk membersihkan dan mengembalikan tampilan mengkilap pada ban serta berbagai permukaan seperti jok mobil, bahan kulit, PVC, vinyl, dan plastik. Memberikan hasil bersih, hitam pekat, dan tampilan lebih terawat.",
    shortDescription:
      "MilkySil Tire Polish Concentrate adalah cairan konsentrat berkualitas tinggi yang diformulasikan untuk membersihkan dan mengembalikan tampilan mengkilap pada ban serta berbagai permukaan seperti jok mobil, bahan kulit, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish Concentrate" },
      { key: "Form", value: "Liquid (Concentrate)" },
      { key: "Function", value: "Cleans, restores shine & protects surfaces" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 320 LV",
    description:
      "MilkySil Tire Polish S 320 LV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan mengembalikan tampilan mengkilap pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan hasil bersih, hitam pekat, dan tampilan lebih terawat untuk kebutuhan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 320 LV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan mengembalikan tampilan mengkilap pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans, restores shine & enhances appearance" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 320 HV",
    description:
      "MilkySil Tire Polish S 320 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan hasil kilap lebih maksimal pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan tampilan lebih hitam, mengkilap, dan tahan lama untuk kebutuhan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 320 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan hasil kilap lebih maksimal pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans, enhances shine & durability" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 306 HVM",
    description:
      "MilkySil Tire Polish S 306 HVM adalah cairan polish berkualitas tinggi dengan performa maksimal untuk membersihkan dan memberikan kilap ekstra pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Menghasilkan tampilan hitam pekat, mengkilap, dan tahan lama untuk kebutuhan profesional dan detailing.",
    shortDescription:
      "MilkySil Tire Polish S 306 HVM adalah cairan polish berkualitas tinggi dengan performa maksimal untuk membersihkan dan memberikan kilap ekstra pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans, delivers high gloss & long-lasting finish" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 305 MR",
    description:
      "MilkySil Tire Polish S 305 MR adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam alami dengan kilap seimbang pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan hasil bersih, rapi, dan tampilan terawat untuk penggunaan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 305 MR adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam alami dengan kilap seimbang pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans, enhances natural shine & appearance" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 303 B",
    description:
      "MilkySil Tire Polish S 303 B adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam dasar dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Cocok untuk penggunaan yang membutuhkan hasil bersih dengan tampilan natural.",
    shortDescription:
      "MilkySil Tire Polish S 303 B adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam dasar dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & provides light shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 297 LV",
    description:
      "MilkySil Tire Polish S 297 LV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Cocok untuk penggunaan yang membutuhkan hasil bersih dengan finishing yang lebih soft dan tidak terlalu mengkilap.",
    shortDescription:
      "MilkySil Tire Polish S 297 LV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & provides light, natural shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 297 HV",
    description:
      "MilkySil Tire Polish S 297 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap lebih intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan tampilan lebih hitam, mengkilap, dan tetap rapi untuk kebutuhan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 297 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap lebih intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & enhances shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 168 HV",
    description:
      "MilkySil Tire Polish S 168 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan tampilan hitam mengkilap yang lebih tegas serta hasil akhir yang rapi dan tahan lama untuk penggunaan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 168 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & delivers high shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 168 LV",
    description:
      "MilkySil Tire Polish S 168 LV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan hasil bersih dengan finishing soft untuk penggunaan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 168 LV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & provides light, natural shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 108 SP",
    description:
      "MilkySil Tire Polish S 108 SP adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Cocok untuk penggunaan ekonomis dengan hasil bersih dan rapi.",
    shortDescription:
      "MilkySil Tire Polish S 108 SP adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & provides light shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 40 LV",
    description:
      "MilkySil Tire Polish S 40 LV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Cocok untuk penggunaan yang membutuhkan hasil bersih dengan finishing soft dan natural.",
    shortDescription:
      "MilkySil Tire Polish S 40 LV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & provides light, natural shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 36 TPK",
    description:
      "MilkySil Tire Polish S 36 TPK adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan serta memberikan tampilan hitam alami dengan kilap yang rapi pada ban dan berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Cocok untuk penggunaan profesional yang membutuhkan hasil bersih dengan finishing seimbang.",
    shortDescription:
      "MilkySil Tire Polish S 36 TPK adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan serta memberikan tampilan hitam alami dengan kilap yang rapi pada ban dan berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & enhances natural shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 36 HVM",
    description:
      "MilkySil Tire Polish S 36 HVM adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap maksimal pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Menghasilkan tampilan hitam pekat, mengkilap, dan tahan lama untuk kebutuhan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 36 HVM adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap maksimal pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & delivers high gloss finish" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 36 HV",
    description:
      "MilkySil Tire Polish S 36 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap lebih intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan tampilan hitam mengkilap yang lebih tegas dengan hasil akhir yang rapi untuk penggunaan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 36 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap lebih intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & enhances high shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 33 HV",
    description:
      "MilkySil Tire Polish S 33 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan tampilan hitam mengkilap dengan hasil akhir rapi dan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 33 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & enhances high shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 30 HV",
    description:
      "MilkySil Tire Polish S 30 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Memberikan tampilan hitam mengkilap dengan hasil akhir rapi untuk penggunaan profesional.",
    shortDescription:
      "MilkySil Tire Polish S 30 HV adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan kilap intens pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & enhances high shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
  {
    name: "MILKYSIL TIRE POLISH S 22 SKS",
    description:
      "MilkySil Tire Polish S 22 SKS adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik. Cocok untuk penggunaan yang membutuhkan hasil bersih dengan finishing sederhana dan ekonomis.",
    shortDescription:
      "MilkySil Tire Polish S 22 SKS adalah cairan polish berkualitas tinggi yang diformulasikan untuk membersihkan dan memberikan tampilan hitam natural dengan kilap ringan pada ban serta berbagai permukaan seperti bahan kulit, jok mobil, PVC, vinyl, dan plastik.",
    specifications: [
      { key: "Type", value: "Tire & Surface Polish" },
      { key: "Form", value: "Liquid" },
      { key: "Function", value: "Cleans & provides light shine" },
      { key: "Surface", value: "Tire, leather, PVC, vinyl & plastic" },
      { key: "Usage", value: "Automotive & commercial" },
    ],
  },
];

async function main() {
  console.log("Seeding Milkysil products with full details...");

  for (const product of milkysilProducts) {
    const slug = slugify(product.name);

    await prisma.product.upsert({
      where: { slug },
      update: {
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        specifications: product.specifications,
        productType: "MILKYSIL",
        categoryId: 4,
        published: true,
        stockStatus: "IN_STOCK",
      },
      create: {
        name: product.name,
        slug,
        description: product.description,
        shortDescription: product.shortDescription,
        specifications: product.specifications,
        productType: "MILKYSIL",
        categoryId: 4,
        published: true,
        stockStatus: "IN_STOCK",
      },
    });

    console.log(`  Upserted: ${product.name}`);
  }

  console.log(`\nSeeded ${milkysilProducts.length} Milkysil products`);
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
