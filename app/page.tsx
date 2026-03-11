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
  return (
    <main className="w-full">
      <Header/>
      <div className="relative bg-[#F7F9FC]">
        <Hero/>
        <Featured />
      </div>
      <Categories />
      <FeaturedProduct />
      <WhyUs />
      <Industries />
      <CTA />
      <Footer />
    </main>
  );
}
