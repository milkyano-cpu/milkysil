import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const blogs = [
  {
    slug: "foam-booster",
    title: "Foam Booster",
    date: "2026-01-24",
    description:
      "Pengertian Foam Booster Foam booster adalah bahan kimia yang ditambahkan ke dalam formulasi pembersih (deterjen, sabun cair, sampo, dan sebagainya) dengan tujuan utama:",
    image: "/blog/foam-booster.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "asam-sitrat",
    title: "Asam Sitrat",
    date: "2026-01-24",
    description:
      "Asam sitrat adalah senyawa asam organik lemah yang banyak dikenal karena rasa masamnya yang khas dan penggunaan yang sangat luas, mulai dari bahan tambahanan pangan, obat-obatan, kosmetik,...",
    image: "/blog/asam-sitrat.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "caustic-soda",
    title: "Caustic Soda: Mengungkap Kekuatan",
    date: "2026-01-24",
    description:
      "Caustic Soda: Mengungkap Kekuatan di Balik Pembersih Multifungsi Pernahkah kita bertanya-tanya, apa rahasia di balik produk pembersih lantai...",
    image: "/blog/caustic-soda.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "castor-oil",
    title: "Mengungkap Rahasia Minyak Jarak (Castor Oil)",
    date: "2026-01-24",
    description:
      "Asam sitrat adalah senyawa asam organik lemah yang banyak dikenal karena rasa masamnya yang khas dan penggunaannya...",
    image: "/blog/castor-oil.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "milkysil-tire-polish",
    title: "Milkysil Tire Polish",
    date: "2026-01-05",
    description:
      "Milkysil Tire Polish Semi Ban Mobil dan Motor berbasis SiliconeMilkysil Polish adalah semir ban mobil dan motor berbasis silicone emulsion...",
    image: "/blog/tire-polish.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "produk-kebersihan-aman",
    title: "Pentingnya Produk Kebersihan yang Aman",
    date: "2026-01-02",
    description:
      "Produk kebersihan yang aman sangat penting untuk menjaga kesehatan lingkungan...",
    image: "/blog/milkysil-clean.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "selamat-datang-milkysil",
    title: "Selamat datang di Milkysil",
    date: "2025-08-18",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "supplier-bahan-kimia-terpercaya",
    title: "Milkysil Supplier Bahan Kimia Partai dan Eceran Terpercaya",
    date: "2015-05-05",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "kimia-anorganik",
    title: "Kimia Anorganik",
    date: "2015-05-04",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "kimia-organik",
    title: "Kimia Organik",
    date: "2015-05-04",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "ARTICLE" as const,
  },
  {
    slug: "kimia-industri",
    title: "Kimia Industri",
    date: "2015-05-04",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "ARTICLE" as const,
  },
];

const newsItems = [
  {
    slug: "komitmen-milkysil-produk-kebersihan",
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "2025-12-26",
    description:
      "Komitmen Milkysil dalam menyediakan produk kebersihan yang aman dan berkualitasPendahuluan. Dalam Meningkatnya kebutuhan akan standar kebersihan.",
    image: "/news/news1.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "musim-hujan-milkyclean",
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "2025-11-24",
    description:
      "Sambut Musim Hujan & Libur Akhir Tahun, Milkyclean Solusi Lengkap Agar Rumah dan Mobil Tetap Kinclong! Bandung - Memasuki pertengahan November 2025,",
    image: "/news/news2.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "hari-toilet-sedunia-2025",
    title: "Peran Produk Kebersihan Milkyclean untuk Hari Toilet Sedunia 2025",
    date: "2025-11-17",
    description:
      "Hari Toilet Sedunia (19 November) dengan rangkaian produk MilkyClean, menyoroti bagaimana produk-produk kebersihan rumah tangga ini turut mendukung",
    image: "/news/news3.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "kesehatan-lingkungan-milkyclean",
    title: "Peran Produk Kebersihan Milkyclean dalam Kesehatan Lingkungan",
    date: "2025-11-13",
    description:
      "Peran kebersihan dalam pencegahan Komplikasi Diabetes Bandung, 14 November 2023 Memperingati Hari Diabetes Sedunia, para ahli kesehatan menyoroti pentingnya kebersihan lingkungan",
    image: "/news/news4.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "bersih-itu-patriotik",
    title: "Bersih itu Patriotik",
    date: "2025-11-04",
    description:
      "Kampanye Hari Pahlawan Nasional 'Bersih Itu Patriotik' bersama Milkyclean & MilkysilBandung, 10 November 2025 - Dalam rangka memperingati Hari Pahlawan Nasional.",
    image: "/news/news5.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "halloween-kebersihan",
    title: "Peran Produk Kebersihan Milkyclean untuk Hari Toilet Sedunia 2025",
    date: "2025-10-30",
    description:
      "Bandung, 31 Oktober 2025 Perayaan Halloween kini menjadi salah satu momen yang banyak dinantikan masyarakat Indonesia,",
    image: "/news/news6.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "risiko-kimia-global",
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "2015-05-05",
    description:
      "Loncatan Risiko Kimia GlobalTantangan, Peluang, dan Jalan menuju Keamanan Lingkungan",
    image: "/news/news6.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "80-tahun-indonesia",
    title: "80 Tahun Indonesia Berinsipirasi Bersama Milkysil",
    date: "2015-05-05",
    description: "",
    image: "/news/news6.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "test-tube-food",
    title: "Test tube food",
    date: "2015-05-05",
    description:
      "Types of Food Tests Food testing serves different purposes...",
    image: "/news/news6.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "food-chemistry-development",
    title: "Food Chemistry and Food Development",
    date: "2015-05-05",
    description: "Material Chemistry: Polymers (Plastics)...",
    image: "/news/news6.jpg",
    category: "NEWS" as const,
  },
  {
    slug: "chemistry-concept",
    title: "Chemistry concept",
    date: "2015-05-05",
    description: "Chemistry is the central science...",
    image: "/news/news6.jpg",
    category: "NEWS" as const,
  },
];

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@milkysil.com" },
    update: {},
    create: {
      email: "admin@milkysil.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log(`Seeded admin user: ${admin.email} (${admin.id})`);

  // Seed articles
  const allArticles = [...blogs, ...newsItems];
  let created = 0;

  for (const article of allArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.description,
        content: article.description
          ? `<p>${article.description}</p>`
          : `<p>${article.title}</p>`,
        image: article.image,
        category: article.category,
        published: true,
        authorId: admin.id,
        createdAt: new Date(article.date),
      },
    });
    created++;
  }

  console.log(`Seeded ${created} articles`);
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
