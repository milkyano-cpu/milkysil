import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({subsets: ["latin"], weight:["400","500","600","700","800","900"], variable: "--font-poppins"});

export const metadata: Metadata = {
  title: "Milkysil | Chemical Trading & Manufacturing",
  description:
    "CV Milky Makmur Sejahtera adalah perusahaan trading dan manufaktur bahan kimia sejak 2003, melayani seluruh Indonesia dengan kualitas terbaik.",

  openGraph: {
    title: "Milkysil | Chemical Trading & Manufacturing",
    description:
      "Perusahaan trading dan manufaktur bahan kimia terpercaya sejak 2003 dengan jaringan distribusi luas di Indonesia.",
    url: "https://milkysil.vercel.app/", 
    siteName: "Milkysil",
    images: [
      {
        url: "https://milkysil.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Milkysil | Chemical Trading & Manufacturing",
    description:
      "Supplier bahan kimia umum & khusus dengan distribusi nasional.",
    images: ["https://milkysil.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
