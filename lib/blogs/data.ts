export type Blog = {
  id: number
  slug: string
  title: string
  date: string
  description: string
  image: string
  category: "BLOG" | "NEWS"
}

// ================= BLOG =================
export const blogs: Blog[] = [
  {
    id: 1,
    slug: "foam-booster",
    title: "Foam Booster",
    date: "24 Januari 2026",
    description:
      "Pengertian Foam Booster Foam booster adalah bahan kimia yang ditambahkan ke dalam formulasi pembersih (deterjen, sabun cair, sampo, dan sebagainya) dengan tujuan utama:",
    image: "/blog/foam-booster.jpg",
    category: "BLOG"
  },
  {
    id: 2,
    slug: "asam-sitrat",
    title: "Asam Sitrat",
    date: "24 Januari 2026",
    description:
      "Asam sitrat adalah senyawa asam organik lemah yang banyak dikenal karena rasa masamnya yang khas dan penggunaan yang sangat luas, mulai dari bahan tambahanan pangan, obat-obatan, kosmetik,...",
    image: "/blog/asam-sitrat.jpg",
    category: "BLOG"
  },
  {
    id: 3,
    slug: "caustic-soda",
    title: "Caustic Soda: Mengungkap Kekuatan",
    date: "24 Januari 2026",
    description:
      "Caustic Soda: Mengungkap Kekuatan di Balik Pembersih Multifungsi Pernahkah kita bertanya-tanya, apa rahasia di balik produk pembersih lantai...",
    image: "/blog/caustic-soda.jpg",
    category: "BLOG"
  },
  {
    id: 4,
    slug: "castor-oil",
    title: "Mengungkap Rahasia Minyak Jarak (Castor Oil)",
    date: "24 Januari 2026",
    description:
      "Asam sitrat adalah senyawa asam organik lemah yang banyak dikenal karena rasa masamnya yang khas dan penggunaannya...",
    image: "/blog/castor-oil.jpg",
    category: "BLOG"
  },
  {
    id: 5,
    slug: "milkysil-tire-polish",
    title: "Milkysil Tire Polish",
    date: "05 Januari 2026",
    description:
      "Milkysil Tire Polish Semi Ban Mobil dan Motor berbasis SiliconeMilkysil Polish adalah semir ban mobil dan motor berbasis silicone emulsion...",
    image: "/blog/tire-polish.jpg",
    category: "BLOG"
  },
  {
    id: 6,
    slug: "produk-kebersihan-aman",
    title: "Pentingnya Produk Kebersihan yang Aman",
    date: "02 Januari 2026",
    description:
      "Produk kebersihan yang aman sangat penting untuk menjaga kesehatan lingkungan...",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 7,
    slug: "selamat-datang-milkysil",
    title: "Selamat datang di Milkysil",
    date: "18 Agustus 2025",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 8,
    slug: "supplier-bahan-kimia-terpercaya",
    title: "Milkysil Supplier Bahan Kimia Partai dan Eceran Terpercaya",
    date: "05 Mei 2015",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 9,
    slug: "kimia-anorganik",
    title: "Kimia Anorganik",
    date: "04 Mei 2015",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 10,
    slug: "kimia-organik",
    title: "Kimia Organik",
    date: "04 Mei 2015",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
  {
    id: 11,
    slug: "kimia-industri",
    title: "Kimia Industri",
    date: "04 Mei 2015",
    description: "",
    image: "/blog/milkysil-clean.jpg",
    category: "BLOG"
  },
]

// ================= NEWS =================
export const news: Blog[] = [
  {
    id: 101,
    slug: "komitmen-milkysil-produk-kebersihan",
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "26 Desember 2025",
    description:
      "Komitmen Milkysil dalam menyediakan produk kebersihan yang aman dan berkualitasPendahuluan. Dalam Meningkatnya kebutuhan akan standar kebersihan.",
    image: "/news/news1.jpg",
    category: "NEWS"
  },
  {
    id: 102,
    slug: "musim-hujan-milkyclean",
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "24 November 2025",
    description:
      "Sambut Musim Hujan & Libur Akhir Tahun, Milkyclean Solusi Lengkap Agar Rumah dan Mobil Tetap Kinclong! Bandung - Memasuki pertengahan November 2025,",
    image: "/news/news2.jpg",
    category: "NEWS"
  },
  {
    id: 103,
    slug: "hari-toilet-sedunia-2025",
    title: "Peran Produk Kebersihan Milkyclean untuk Hari Toilet Sedunia 2025",
    date: "17 November 2025",
    description:
      "Hari Toilet Sedunia (19 November) dengan rangkaian produk MilkyClean, menyoroti bagaimana produk-produk kebersihan rumah tangga ini turut mendukung",
    image: "/news/news3.jpg",
    category: "NEWS"
  },
  {
    id: 104,
    slug: "kesehatan-lingkungan-milkyclean",
    title: "Peran Produk Kebersihan Milkyclean dalam Kesehatan Lingkungan",
    date: "13 November 2025",
    description:
      "Peran kebersihan dalam pencegahan Komplikasi Diabetes Bandung, 14 November 2023 Memperingati Hari Diabetes Sedunia, para ahli kesehatan menyoroti pentingnya kebersihan lingkungan",
    image: "/news/news4.jpg",
    category: "NEWS"
  },
  {
    id: 105,
    slug: "bersih-itu-patriotik",
    title: "Bersih itu Patriotik",
    date: "04 November 2025",
    description:
      "Kampanye Hari Pahlawan Nasional 'Bersih Itu Patriotik' bersama Milkyclean & MilkysilBandung, 10 November 2025 - Dalam rangka memperingati Hari Pahlawan Nasional.",
    image: "/news/news5.jpg",
    category: "NEWS"
  },
  {
    id: 106,
    slug: "halloween-kebersihan",
    title: "Peran Produk Kebersihan Milkyclean untuk Hari Toilet Sedunia 2025",
    date: "30 Oktober 2025",
    description:
      "Bandung, 31 Oktober 2025 Perayaan Halloween kini menjadi salah satu momen yang banyak dinantikan masyarakat Indonesia,",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 107,
    slug: "risiko-kimia-global",
    title: "Komitmen Milkysil dalam Menyediakan Produk Kebersihan",
    date: "05 Mei 2015",
    description:
      "Loncatan Risiko Kimia GlobalTantangan, Peluang, dan Jalan menuju Keamanan Lingkungan",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 108,
    slug: "80-tahun-indonesia",
    title: "80 Tahun Indonesia Berinsipirasi Bersama Milkysil",
    date: "05 Mei 2015",
    description: "",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 109,
    slug: "test-tube-food",
    title: "Test tube food",
    date: "05 Mei 2015",
    description:
      "Types of Food Tests Food testing serves different purposes...",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 110,
    slug: "food-chemistry-development",
    title: "Food Chemistry and Food Development",
    date: "05 Mei 2015",
    description:
      "Material Chemistry: Polymers (Plastics)...",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
  {
    id: 111,
    slug: "chemistry-concept",
    title: "Chemistry concept",
    date: "05 Mei 2015",
    description:
      "Chemistry is the central science...",
    image: "/news/news6.jpg",
    category: "NEWS"
  },
]