"use client"

import { motion } from "framer-motion"

import Header from "@/components/layouts/header";
import Hero from "@/components/sections/hero/hero";
import Featured from "@/components/sections/featured/featured"
import Categories from "@/components/sections/categories/categories"
import FeaturedProduct from "@/components/sections/featured-product/featured-product"
import WhyUs from "@/components/sections/why-us/why-us"
import Industries from "@/components/sections/industries/industries"
import CTA from "@/components/sections/cta/cta"
import Footer from "@/components/layouts/footer"

export default function Home() {

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  return (
    <main className="w-full overflow-hidden">

      <Header />

      {/* ================= HERO ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show" // langsung animasi pas load
      >
        <Hero />
      </motion.div>

      <div className="relative bg-[#F7F9FC]">

        {/* ================= FEATURED ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Featured />
        </motion.div>

      </div>

      {/* ================= CATEGORIES ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Categories />
      </motion.div>

      {/* ================= FEATURED PRODUCT ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <FeaturedProduct />
      </motion.div>

      {/* ================= WHY US ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <WhyUs />
      </motion.div>

      {/* ================= INDUSTRIES ================= */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Industries />
      </motion.div>

      {/* ================= CTA (NO ANIMATION) ================= */}
      <CTA />

      <Footer />

    </main>
  );
}