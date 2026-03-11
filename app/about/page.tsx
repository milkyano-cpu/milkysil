import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"

export default function About() {
  return (
    <main>

      <Header />

      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1200px] mx-auto px-6">

          <h1 className="text-4xl font-bold text-[#1E3E6D]">
            About Us
          </h1>

          <p className="mt-4 text-gray-600 max-w-[600px]">
            CV. Milky Makmur Sejahtera adalah perusahaan trading dan manufaktur
            bahan kimia yang berdiri sejak 2003 dan berpusat di Bandung.
          </p>

        </div>
      </section>

      <Footer />

    </main>
  )
}