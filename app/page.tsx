"use client"

import { motion, useScroll, useTransform } from "framer-motion"

import Header from "@/components/layouts/header";
import Hero from "@/components/sections/hero/hero";
import Featured from "@/components/sections/featured/featured"
import Categories from "@/components/sections/categories/categories"
import FeaturedProduct from "@/components/sections/featured-product/featured-product"
import WhyUs from "@/components/sections/why-us/why-us"
import Industries from "@/components/sections/industries/industries"
import CTA from "@/components/sections/cta/cta"
import Footer from "@/components/layouts/footer"
import { Variants } from "framer-motion"

export default function Home() {

  const { scrollY } = useScroll()

  const ySlow = useTransform(scrollY, [0, 500], [0, 80])
  const yFast = useTransform(scrollY, [0, 500], [0, -80])

  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.6])

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const itemLeft = {
    hidden: { opacity: 0, x: -80 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const itemRight = {
    hidden: { opacity: 0, x: 80 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const reveal: Variants = {
    hidden: {
      clipPath: "inset(0 0 100% 0)",
    },
    show: {
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const viewport = {
    once: false,
    amount: 0.2,
  }

  return (
    <main className="w-full overflow-hidden">

      <Header />

      {/* ================= HERO ================= */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: ySlow }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
      </motion.div>

      <div className="relative bg-[#F7F9FC]">

        {/* ================= FEATURED ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          style={{ y: yFast }}
        >
          <motion.div variants={itemUp}>
            <Featured />
          </motion.div>
        </motion.div>

      </div>

      {/* ================= CATEGORIES ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <motion.div variants={itemLeft}>
          <Categories />
        </motion.div>
      </motion.div>

      {/* ================= FEATURED PRODUCT ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <motion.div variants={zoomIn}>
          <FeaturedProduct />
        </motion.div>
      </motion.div>

      {/* ================= WHY US ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <motion.div variants={itemRight}>
          <WhyUs />
        </motion.div>
      </motion.div>

      {/* ================= INDUSTRIES ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <motion.div variants={reveal}>
          <Industries />
        </motion.div>
      </motion.div>

      {/* ================= CTA ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={viewport}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <CTA />
      </motion.div>

      <Footer />

    </main>
  );
}