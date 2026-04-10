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

interface TradingProduct {
  name: string;
  description: string;
  shortDescription: string;
  specifications: { key: string; value: string }[];
}

const tradingProducts: TradingProduct[] = [
  // ──────────────────────────────────────────────
  // GENERAL CHEMICALS
  // ──────────────────────────────────────────────
  {
    name: "Aqua DM (Demineralized Water)",
    description:
      "Aqua DM (Demineralized Water) adalah air murni yang telah dihilangkan kandungan mineral dan ionnya, digunakan sebagai pelarut bahan aktif dan aditif untuk menjaga kestabilan formulasi, mengontrol konsentrasi, serta mencegah reaksi yang disebabkan oleh ion mineral.",
    shortDescription:
      "Air murni bebas mineral dan ion, digunakan sebagai pelarut bahan aktif dan aditif dalam berbagai formulasi industri dan laboratorium.",
    specifications: [
      { key: "Form", value: "Cairan jernih" },
      { key: "Color", value: "Tidak berwarna" },
      { key: "Odor", value: "Tidak berbau" },
      { key: "TDS", value: "0" },
      { key: "pH", value: "Netral hingga sedikit asam" },
      { key: "Grade", value: "Industrial / Laboratory Use" },
      { key: "Netto", value: "20 LT, 1 LT" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Cairan Mutiara (Pearlizing Agent)",
    description:
      "Cairan Mutiara (Pearlizing Agent) adalah bahan aditif yang berfungsi memberikan efek kilap seperti mutiara (pearly/shimmering appearance) sehingga meningkatkan daya tarik visual produk. Digunakan dalam formulasi kosmetik dan produk perawatan.",
    shortDescription:
      "Bahan aditif penghasil efek kilap seperti mutiara untuk meningkatkan daya tarik visual produk kosmetik dan industrial.",
    specifications: [
      { key: "Form", value: "Cairan kental" },
      { key: "Color", value: "Putih susu" },
      { key: "Appearance", value: "Efek kilap seperti mutiara" },
      { key: "Solubility", value: "Mudah terdispersi dalam formulasi" },
      { key: "pH Stability", value: "Stabil pada berbagai kondisi pH" },
      { key: "Grade", value: "Cosmetic / Industrial Grade" },
      { key: "Netto", value: "50 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Calcium Chloride (CaCl2)",
    description:
      "Calcium Chloride (CaCl₂) adalah garam anorganik yang sangat mudah larut dalam air dan bersifat higroskopis. Digunakan sebagai pengikat kelembapan, pengatur kekerasan air, dan bahan tambahan pada industri deterjen, konstruksi, minyak & gas, serta pengolahan air.",
    shortDescription:
      "Garam anorganik higroskopis yang digunakan sebagai pengikat kelembapan, pengatur kekerasan air, dan bahan tambahan industri deterjen, konstruksi, serta minyak & gas.",
    specifications: [
      { key: "Form", value: "Serpihan (Flakes)" },
      { key: "Color", value: "Putih" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Purity", value: "±74%" },
      { key: "Origin", value: "RRC (China)" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "25 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Castor Oil (Minyak Jarak)",
    description:
      "Castor Oil (minyak jarak) adalah pelarut yang berfungsi sebagai bahan emolien untuk menjaga kelembapan dan elastisitas permukaan produk, serta membantu meningkatkan viskositas untuk stabilitas produk. Banyak digunakan dalam industri kosmetik, farmasi, dan manufaktur.",
    shortDescription:
      "Minyak jarak alami yang berfungsi sebagai emolien dan peningkat viskositas, digunakan dalam industri kosmetik, farmasi, dan manufaktur.",
    specifications: [
      { key: "Form", value: "Minyak kental" },
      { key: "Color", value: "Kuning bening / kekuningan" },
      { key: "Odor", value: "Aroma khas minyak jarak" },
      { key: "Texture", value: "Pekat dan mudah dicampurkan" },
      { key: "Grade", value: "No.1 Grade Thailand" },
      { key: "Netto", value: "195 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Caustic Soda Flake 98.5%",
    description:
      "Caustic Soda Flakes adalah bahan kimia basa kuat yang digunakan untuk menaikkan pH serta mereaksikan minyak atau lemak menjadi sabun dalam proses saponifikasi. Juga dapat digunakan untuk membuka saluran air yang mampet, menghilangkan noda membandel, pembersih lemak dan kerak, serta pengencer cat.",
    shortDescription:
      "Basa kuat NaOH 98,5% untuk saponifikasi, pengolahan air, pembersih lemak & kerak, serta berbagai kebutuhan industri kimia.",
    specifications: [
      { key: "Form", value: "Padatan (Flakes)" },
      { key: "Color", value: "Putih" },
      { key: "Odor", value: "Tidak berbau" },
      { key: "Purity (NaOH)", value: "98,5%" },
      { key: "pH", value: "14" },
      { key: "Properties", value: "Higroskopis, reaksi eksotermis saat dilarutkan" },
      { key: "Solubility", value: "Sangat mudah larut dalam air" },
      { key: "Netto", value: "25 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Defoamer",
    description:
      "Defoamer adalah bahan aditif yang digunakan untuk mengurangi dan mencegah terbentuknya busa dalam formulasi dengan cara memecah gelembung udara sehingga proses produksi menjadi lebih stabil. Berbasis mineral oil dan cocok untuk berbagai aplikasi industri.",
    shortDescription:
      "Bahan aditif berbasis mineral oil untuk mengurangi dan mencegah pembentukan busa dalam proses formulasi industri.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Putih" },
      { key: "Odor", value: "Bau ringan khas" },
      { key: "Texture", value: "Encer hingga sedikit kental" },
      { key: "Base", value: "Mineral oil" },
      { key: "Netto", value: "195 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Ferric Chloride Anhydrous (FeCl3)",
    description:
      "Ferric Chloride Anhydrous (FeCl₃) adalah larutan garam anorganik yang bersifat korosif, digunakan sebagai koagulan dan agen pengendap dalam proses pengolahan air dan limbah industri. Juga banyak digunakan di industri electroplating.",
    shortDescription:
      "Garam anorganik korosif yang digunakan sebagai koagulan dalam pengolahan air & limbah industri, serta aplikasi electroplating.",
    specifications: [
      { key: "Form", value: "Kristal padat" },
      { key: "Color", value: "Coklat kehijauan" },
      { key: "Properties", value: "Bersifat asam, korosif, dan higroskopis" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "50 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Hydrofluoric Acid (HF)",
    description:
      "Hydrofluoric Acid (HF) adalah larutan asam anorganik yang sangat korosif, digunakan dalam proses industri seperti etching kaca, pembersihan logam, dan produksi fluorokimia. Wajib menggunakan APD lengkap saat penanganan.",
    shortDescription:
      "Asam anorganik sangat korosif untuk proses etching kaca, pembersihan logam, dan produksi fluorokimia dalam skala industri.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Tidak berwarna" },
      { key: "Odor", value: "Berbau tajam" },
      { key: "Properties", value: "Sangat korosif, bereaksi kuat dengan kaca dan silika" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "1 KG, 25 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Hydrogen Peroxide (H2O2)",
    description:
      "Hydrogen Peroxide (H₂O₂) adalah cairan oksidator kuat yang berfungsi sebagai pemutih dan disinfektan. Digunakan dalam bleaching tekstil, pengolahan air, dan antiseptik ringan. Mudah terurai menjadi air dan oksigen sehingga ramah lingkungan.",
    shortDescription:
      "Cairan oksidator kuat yang berfungsi sebagai pemutih dan disinfektan untuk bleaching tekstil, pengolahan air, dan antiseptik.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Berbau ringan" },
      { key: "Properties", value: "Oksidator kuat, mudah terurai menjadi air & oksigen" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "35 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Isopropyl Alcohol (IPA)",
    description:
      "Isopropyl Alcohol (IPA) adalah pelarut organik yang mudah menguap, digunakan sebagai disinfektan, antiseptik, pembersih permukaan, dan pelarut industri. Bukan untuk dikonsumsi. Simpan jauh dari sumber api.",
    shortDescription:
      "Pelarut organik mudah menguap untuk disinfektan, antiseptik, pembersih permukaan, dan pelarut industri.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Berbau khas alkohol" },
      { key: "Properties", value: "Mudah menguap dan mudah terbakar" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "200 LT, 1 LT" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Nitric Acid (HNO3)",
    description:
      "Nitric Acid (HNO₃) adalah asam mineral kuat dengan sifat oksidator tinggi yang digunakan sebagai agen reaksi kimia dalam produksi pupuk (seperti amonium nitrat), proses nitrasi, pengolahan dan pembersihan logam. Asal: Korea.",
    shortDescription:
      "Asam mineral kuat dengan sifat oksidator tinggi untuk produksi pupuk, proses nitrasi, dan pengolahan logam industri.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening" },
      { key: "Odor", value: "Berbau tajam menyengat" },
      { key: "Properties", value: "Korosif kuat, oksidator kuat" },
      { key: "Origin", value: "Korea" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "35 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Nonylphenol Ethoxylate 6 (NP-6)",
    description:
      "Nonylphenol Ethoxylate 6 (NP-6) adalah surfaktan non-ionik yang berfungsi sebagai emulsifier, pembersih, dan agen pembasah dalam berbagai formulasi deterjen dan produk kimia. Lebih bersifat lipofilik dibanding NP-10 dan NP-15, sehingga lebih efektif dalam emulsifikasi minyak dengan busa lebih rendah.",
    shortDescription:
      "Surfaktan non-ionik lipofilik untuk emulsifikasi minyak, pembersih, dan agen pembasah dalam formulasi deterjen dan produk kimia.",
    specifications: [
      { key: "Form", value: "Cairan kental" },
      { key: "Color", value: "Bening" },
      { key: "pH Stability", value: "Stabil pada berbagai kondisi pH" },
      { key: "Properties", value: "Lipofilik, busa lebih rendah dari NP-10 dan NP-15" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "210 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Nonylphenol Ethoxylate 10 (NP-10)",
    description:
      "Nonylphenol Ethoxylate 10 (NP-10) adalah surfaktan non-ionik yang berfungsi sebagai emulsifier, pembersih, dan agen pembasah dengan kelarutan tinggi dalam air. Memiliki sifat hidrofilik tinggi dan stabil pada berbagai kondisi pH.",
    shortDescription:
      "Surfaktan non-ionik dengan kelarutan tinggi dalam air untuk emulsifier, pembersih, dan agen pembasah dalam formulasi industri.",
    specifications: [
      { key: "Form", value: "Cairan kental" },
      { key: "Color", value: "Bening" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Properties", value: "Hidrofilik tinggi, stabil pada berbagai pH" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "210 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Nonylphenol Ethoxylate 15 (NP-15)",
    description:
      "Nonylphenol Ethoxylate 15 (NP-15) adalah surfaktan non-ionik yang berfungsi sebagai emulsifier, pembersih, dan agen pembasah dengan kelarutan sangat tinggi dalam air. Memiliki sifat hidrofilik paling tinggi di antara seri NP dan stabil pada berbagai kondisi pH.",
    shortDescription:
      "Surfaktan non-ionik dengan kelarutan sangat tinggi dalam air untuk emulsifier, pembersih, dan agen pembasah kebutuhan industri.",
    specifications: [
      { key: "Form", value: "Cairan kental" },
      { key: "Color", value: "Bening" },
      { key: "Solubility", value: "Sangat mudah larut dalam air" },
      { key: "Properties", value: "Hidrofilik sangat tinggi, stabil pada berbagai pH" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "210 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Oleic Acid",
    description:
      "Oleic Acid adalah asam lemak tak jenuh yang berfungsi utama sebagai bahan emolien dan emulsifier. Digunakan dalam sabun, kosmetik, pelumas, serta bahan tambahan dalam industri kimia. Tidak larut dalam air, larut dalam pelarut organik.",
    shortDescription:
      "Asam lemak tak jenuh yang digunakan sebagai emolien dan emulsifier dalam sabun, kosmetik, pelumas, dan industri kimia.",
    specifications: [
      { key: "Form", value: "Cairan kental" },
      { key: "Color", value: "Kuning pucat" },
      { key: "Odor", value: "Berbau khas lemak" },
      { key: "Solubility", value: "Tidak larut dalam air, larut dalam pelarut organik" },
      { key: "Grade", value: "Cosmetic Grade" },
      { key: "Netto", value: "190 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Perchloro Ethylene (PCE)",
    description:
      "Perchloro Ethylene (PCE) adalah pelarut organik non-flammable yang digunakan sebagai degreaser dan pembersih pada dry cleaning, pembersihan logam, dan pelarut industri. Tidak mudah terbakar namun mudah menguap.",
    shortDescription:
      "Pelarut organik non-flammable untuk dry cleaning, degreasing logam, dan pelarut industri dengan daya larut tinggi.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Berbau khas seperti eter" },
      { key: "Properties", value: "Tidak mudah terbakar, mudah menguap" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "300 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Pine Oil",
    description:
      "Pine Oil adalah minyak esensial berbasis turunan pinus yang digunakan sebagai disinfektan dan pewangi dalam produk pembersih lantai dan karbol. Memiliki aroma khas pinus yang menyegarkan dan sedikit larut dalam air.",
    shortDescription:
      "Minyak esensial berbasis pinus sebagai disinfektan dan pewangi dalam produk pembersih lantai dan karbol.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening kekuningan" },
      { key: "Odor", value: "Berbau khas pinus" },
      { key: "Solubility", value: "Sedikit larut dalam air, larut dalam pelarut organik" },
      { key: "Purity", value: "50% (Ex RRC)" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "180 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Polyethylene Glycol 8000 (PEG 8000)",
    description:
      "Polyethylene Glycol 8000 (PEG 8000) adalah polimer larut air dengan fungsi utama sebagai binder/bahan pengikat dan pelumas. Digunakan dalam farmasi, kosmetik, dan bahan tambahan dalam proses industri. Tidak berbau dan tidak berwarna.",
    shortDescription:
      "Polimer larut air sebagai binder dan pelumas dalam formulasi farmasi, kosmetik, dan proses industri.",
    specifications: [
      { key: "Form", value: "Padatan (serbuk/flake)" },
      { key: "Color", value: "Putih" },
      { key: "Odor", value: "Tidak berbau" },
      { key: "Solubility", value: "Larut dalam air" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "25 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Potassium Nitrate (KNO3)",
    description:
      "Potassium Nitrate (KNO₃) adalah garam anorganik bersifat oksidator yang digunakan sebagai sumber nitrogen dan kalium dalam pupuk, serta bahan piroteknik. Berbentuk powder putih dan mudah larut dalam air. Asal: China.",
    shortDescription:
      "Garam anorganik oksidator sebagai sumber nitrogen & kalium untuk pupuk dan bahan piroteknik.",
    specifications: [
      { key: "Form", value: "Powder" },
      { key: "Color", value: "Putih" },
      { key: "Odor", value: "Tidak berbau" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Origin", value: "RRC (China)" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "25 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Silicone Oil 1000 CST",
    description:
      "Silicone Oil 1000 CST adalah cairan silikon dengan viskositas 1000 CST yang digunakan sebagai pelumas, release agent, bahan pembantu kosmetik, serta pengkilap ban, PVC, karet, plastik, dan kulit. Stabil terhadap suhu tinggi dan tidak mudah menguap.",
    shortDescription:
      "Cairan silikon viskositas 1000 CST untuk pelumas, release agent, pengkilap ban, PVC, karet, plastik, dan kulit.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Tidak berbau" },
      { key: "Properties", value: "Stabil terhadap suhu tinggi, tidak mudah menguap" },
      { key: "Viscosity", value: "1000 CST" },
      { key: "Origin", value: "China" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "200 KG, 30 KG, 5 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Solvent P-334 Thinner Acetone",
    description:
      "Solvent P-334 adalah pelarut campuran (solvent blend) yang digunakan untuk melarutkan dan menurunkan viskositas bahan dalam industri cat, tinta, dan pembersih. Mudah menguap dan mudah terbakar, gunakan di area berventilasi baik.",
    shortDescription:
      "Pelarut campuran untuk melarutkan dan menurunkan viskositas bahan dalam industri cat, tinta, dan pembersih.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Berbau khas solvent" },
      { key: "Properties", value: "Mudah menguap, mudah terbakar" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "200 LT, 20 LT, 1 LT" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Solvent Thinner Toluene",
    description:
      "Solvent/Thinner Toluene adalah pelarut aromatik berbasis toluena yang berfungsi sebagai pengencer dan pelarut, digunakan dalam cat, coating, tinta, dan pembersih industri. Memiliki laju penguapan lebih cepat dibanding xylene.",
    shortDescription:
      "Pelarut aromatik berbasis toluena untuk pengencer cat, coating, tinta, dan pembersih industri dengan penguapan cepat.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Berbau khas solvent" },
      { key: "Properties", value: "Mudah menguap cepat, mudah terbakar" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "200 LT, 1 LT" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Solvent Thinner Xylene",
    description:
      "Solvent/Thinner Xylene adalah pelarut aromatik berbasis xylene dengan daya larut lebih kuat dan laju penguapan lebih lambat dibanding Thinner Toluene. Digunakan sebagai pengencer dan pelarut untuk hasil aplikasi yang lebih rata dan waktu kerja lebih panjang dalam produk cat, coating, tinta, serta pembersih industri.",
    shortDescription:
      "Pelarut aromatik berbasis xylene dengan daya larut kuat dan penguapan lambat untuk cat, coating, tinta, dan pembersih industri.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Berbau khas solvent" },
      { key: "Properties", value: "Penguapan lebih lambat dari toluene, mudah terbakar" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "200 LT, 1 LT" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Stearic Acid 1842 (Triple Press)",
    description:
      "Stearic Acid 1842 (Triple Press) adalah asam lemak jenuh yang berfungsi sebagai emulsifier dan pengental, digunakan dalam sabun, kosmetik, lilin, serta industri karet dan plastik. Berbentuk padatan flake putih dengan kualitas triple press.",
    shortDescription:
      "Asam lemak jenuh grade kosmetik sebagai emulsifier dan pengental dalam sabun, kosmetik, lilin, karet, dan plastik.",
    specifications: [
      { key: "Form", value: "Padatan (Flake)" },
      { key: "Color", value: "Putih" },
      { key: "Odor", value: "Berbau khas lemak" },
      { key: "Solubility", value: "Tidak larut dalam air" },
      { key: "Grade", value: "Cosmetic Grade (Triple Press)" },
      { key: "Netto", value: "25 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Texapon EMAL 270N - SLES",
    description:
      "Texapon EMAL 270N (Sodium Lauryl Ether Sulfate / SLES) adalah surfaktan anionik yang berfungsi sebagai pembentuk busa dan pembersih dalam produk seperti sampo, sabun cair, dan deterjen. Menghasilkan busa tinggi dan mudah larut dalam air.",
    shortDescription:
      "Surfaktan anionik (SLES) pembentuk busa tinggi untuk sampo, sabun cair, dan deterjen.",
    specifications: [
      { key: "Form", value: "Cairan kental / pasta" },
      { key: "Color", value: "Bening hingga keputihan" },
      { key: "Properties", value: "Menghasilkan busa tinggi" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "165 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Trichloroethylene (TCE) ASAHI China",
    description:
      "Trichloroethylene (TCE) EX. ASAHI China adalah pelarut organik berklorin dengan daya degreasing tinggi yang digunakan untuk menghilangkan minyak dan kotoran pada pembersihan logam, dry cleaning, dan proses industri. Tidak mudah terbakar namun mudah menguap. Asal: China.",
    shortDescription:
      "Pelarut organik berklorin daya degreasing tinggi untuk pembersihan logam, dry cleaning, dan proses industri. Origin: China.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Berbau khas seperti kloroform" },
      { key: "Properties", value: "Tidak mudah terbakar, mudah menguap" },
      { key: "Origin", value: "China" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "280 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Trichloroethylene (TCE) ASAHI Jepang",
    description:
      "Trichloroethylene (TCE) EX. ASAHI Jepang adalah pelarut organik berklorin dengan daya degreasing tinggi yang digunakan untuk menghilangkan minyak dan kotoran pada pembersihan logam, dry cleaning, dan proses industri. Tidak mudah terbakar namun mudah menguap. Kualitas Jepang (ASAHI Japan).",
    shortDescription:
      "Pelarut organik berklorin daya degreasing tinggi untuk pembersihan logam, dry cleaning, dan proses industri. Origin: Jepang.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Bening tidak berwarna" },
      { key: "Odor", value: "Berbau khas seperti kloroform" },
      { key: "Properties", value: "Tidak mudah terbakar, mudah menguap" },
      { key: "Origin", value: "Jepang" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "290 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },

  // ──────────────────────────────────────────────
  // WATER TREATMENT CHEMICALS
  // ──────────────────────────────────────────────
  {
    name: "Manganese Greensand",
    description:
      "Manganese Greensand adalah media filtrasi berbasis pasir berlapis mangan oksida untuk menghilangkan besi, mangan, dan hidrogen sulfida dari air melalui proses oksidasi dan filtrasi. Digunakan pada pengolahan air bersih dan air sumur.",
    shortDescription:
      "Media filtrasi berlapis mangan oksida untuk menghilangkan besi, mangan, dan hidrogen sulfida dalam sistem pengolahan air.",
    specifications: [
      { key: "Form", value: "Butiran (Granular)" },
      { key: "Color", value: "Hijau kehitaman" },
      { key: "Properties", value: "Mengandung lapisan mangan oksida aktif" },
      { key: "Application", value: "Sistem filtrasi air" },
      { key: "Grade", value: "Filter Media Grade" },
      { key: "Netto", value: "25 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Poly Aluminium Chloride (PAC) China",
    description:
      "Poly Aluminium Chloride (PAC) China adalah bahan koagulan berbasis aluminium yang berfungsi untuk menggumpalkan partikel kotoran dalam air. Digunakan pada pengolahan air bersih, air limbah, dan industri untuk penjernihan air. Grade teknikal untuk pengolahan limbah.",
    shortDescription:
      "Koagulan berbasis aluminium grade teknikal untuk penjernihan air bersih dan pengolahan air limbah industri.",
    specifications: [
      { key: "Form", value: "Serbuk (Powder)" },
      { key: "Color", value: "Kuning" },
      { key: "Properties", value: "Bersifat asam lemah" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Origin", value: "China" },
      { key: "Grade", value: "Technical Grade (pengolahan limbah)" },
      { key: "Netto", value: "25 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Poly Aluminium Chloride (PAC) Jepang",
    description:
      "Poly Aluminium Chloride (PAC) Jepang adalah bahan koagulan berbasis aluminium yang berfungsi untuk menggumpalkan partikel kotoran dalam air. Digunakan pada pengolahan air bersih, air limbah, dan industri untuk penjernihan air. Berkualitas drinking grade dan dikemas dalam kemasan putih.",
    shortDescription:
      "Koagulan berbasis aluminium drinking grade asal Jepang untuk penjernihan air bersih dan pengolahan air minum.",
    specifications: [
      { key: "Form", value: "Serbuk (Powder)" },
      { key: "Color", value: "Putih semu kuning" },
      { key: "Properties", value: "Bersifat asam lemah" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Origin", value: "Jepang" },
      { key: "Grade", value: "Drinking Grade" },
      { key: "Netto", value: "20 KG, 1 KG" },
      { key: "Packaging", value: "Kemasan putih" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Poly Aluminium Chloride (PAC) Jerman",
    description:
      "Poly Aluminium Chloride (PAC) Jerman adalah bahan koagulan berbasis aluminium yang berfungsi untuk menggumpalkan partikel kotoran dalam air. Digunakan pada pengolahan air bersih, air limbah, dan industri untuk penjernihan air. Purity tinggi 30% minimum, drinking grade, dikemas dalam kemasan putih.",
    shortDescription:
      "Koagulan berbasis aluminium drinking grade asal Jerman dengan purity tinggi (30% min) untuk penjernihan air bersih.",
    specifications: [
      { key: "Form", value: "Serbuk (Powder)" },
      { key: "Color", value: "Putih" },
      { key: "Properties", value: "Bersifat asam lemah" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Purity", value: "30,0% Min" },
      { key: "Origin", value: "Jerman" },
      { key: "Grade", value: "Drinking Grade" },
      { key: "Netto", value: "25 KG" },
      { key: "Packaging", value: "Kemasan putih" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },

  // ──────────────────────────────────────────────
  // FIBERGLASS MATERIALS
  // ──────────────────────────────────────────────
  {
    name: "MAT 450 E-Glass",
    description:
      "MAT 450 E-Glass adalah bahan serat kaca berbentuk mat (lembaran serat acak) yang berfungsi sebagai penguat (reinforcement) dalam material komposit. Digunakan pada pembuatan fiberglass seperti tangki, perahu, dan berbagai komponen industri.",
    shortDescription:
      "Lembaran serat kaca acak (mat) sebagai material penguat komposit untuk pembuatan tangki fiberglass, perahu, dan komponen industri.",
    specifications: [
      { key: "Form", value: "Lembaran serat acak (Mat)" },
      { key: "Color", value: "Putih" },
      { key: "Texture", value: "Serat halus dan fleksibel" },
      { key: "Properties", value: "Daya serap resin tinggi" },
      { key: "Grade", value: "E-Glass" },
      { key: "Weight", value: "450 g/m²" },
      { key: "Netto", value: "30 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Catalyst Mepoxe",
    description:
      "Catalyst Mepoxe adalah bahan aditif untuk pencampuran dalam proses produksi fiberglass yang berfungsi untuk mempercepat proses pengeringan pada resin fiberglass. Tersedia dalam berbagai ukuran kemasan untuk kebutuhan industri.",
    shortDescription:
      "Katalis cair untuk mempercepat proses pengeringan resin fiberglass dalam produksi material komposit.",
    specifications: [
      { key: "Form", value: "Cairan (Liquid)" },
      { key: "Color", value: "Bening" },
      { key: "Function", value: "Mempercepat pengeringan resin fiberglass" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "20 KG (1 dus isi 4 jerigen @5 KG), 5 KG, 1 KG, 100 GR" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },

  // ──────────────────────────────────────────────
  // HOUSE HOLD
  // ──────────────────────────────────────────────
  {
    name: "Lysol 100%",
    description:
      "Lysol 100% adalah produk disinfektan yang banyak digunakan sebagai pembersih lantai dan kamar mandi dengan aroma khas fenolik. Berfungsi untuk membunuh kuman dan bakteri secara efektif pada berbagai permukaan.",
    shortDescription:
      "Disinfektan 100% beraroma fenolik untuk pembersih lantai dan kamar mandi yang efektif membunuh kuman dan bakteri.",
    specifications: [
      { key: "Form", value: "Cairan" },
      { key: "Color", value: "Coklat tua" },
      { key: "Odor", value: "Berbau fenolik ringan" },
      { key: "Function", value: "Disinfektan, pembunuh kuman dan bakteri" },
      { key: "Grade", value: "Industrial Grade" },
      { key: "Netto", value: "1 LT, 5 LT, 20 LT" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
  {
    name: "Detergent Powder",
    description:
      "Detergent Powder adalah pembersih pakaian berbentuk bubuk yang berfungsi mengangkat kotoran dan noda, melarutkan minyak atau lemak, serta menjaga kebersihan dan kesegaran kain. Mengandung butiran biru pencerah warna (OBA) untuk hasil lebih cerah.",
    shortDescription:
      "Deterjen bubuk dengan butiran biru pencerah warna (OBA) untuk mengangkat noda, melarutkan lemak, dan menjaga kesegaran kain.",
    specifications: [
      { key: "Form", value: "Bubuk" },
      { key: "Appearance", value: "Butiran dengan biru pencerah warna (OBA)" },
      { key: "Odor", value: "Harum khas deterjen" },
      { key: "Texture", value: "Halus hingga sedikit kasar" },
      { key: "Netto", value: "25 KG, 1 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },

  // ──────────────────────────────────────────────
  // TOBACCO, FOOD & FLAVOURING INGREDIENTS
  // ──────────────────────────────────────────────
  {
    name: "Sodium Saccharin M",
    description:
      "Sodium Saccharin M (Saccharin Sodium) adalah pemanis buatan intensitas tinggi yang digunakan sebagai pengganti gula dalam makanan, minuman, serta produk farmasi dan kosmetik. Ukuran butiran Medium (Size M), rasa sangat manis, mudah larut dalam air.",
    shortDescription:
      "Pemanis buatan intensitas tinggi Food Grade (Size M) sebagai pengganti gula dalam makanan, minuman, farmasi, dan kosmetik.",
    specifications: [
      { key: "Form", value: "Butiran (Medium/Size M)" },
      { key: "Color", value: "Putih" },
      { key: "Taste", value: "Sangat manis" },
      { key: "Solubility", value: "Mudah larut dalam air" },
      { key: "Grade", value: "Food Grade" },
      { key: "Type", value: "Size M" },
      { key: "Netto", value: "25 KG" },
      { key: "Stock Status", value: "Ready Stock" },
    ],
  },
];

async function main() {
  console.log("Seeding Trading & Distribution products...");

  for (const product of tradingProducts) {
    const slug = slugify(product.name);

    await prisma.product.upsert({
      where: { slug },
      update: {
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        specifications: product.specifications,
        productType: "TRADING",
        categoryId: 3,
        published: true,
        stockStatus: "IN_STOCK",
      },
      create: {
        name: product.name,
        slug,
        description: product.description,
        shortDescription: product.shortDescription,
        specifications: product.specifications,
        productType: "TRADING",
        categoryId: 3,
        published: true,
        stockStatus: "IN_STOCK",
      },
    });

    console.log(`  Upserted: ${product.name}`);
  }

  console.log(`\nSeeded ${tradingProducts.length} Trading & Distribution products`);
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
