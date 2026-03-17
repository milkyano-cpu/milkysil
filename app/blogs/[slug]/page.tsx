import Image from "next/image"
import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import { notFound } from "next/navigation"
import { blogs, news } from "@/lib/blogs/data"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogDetail({ params }: Props) {

  const { slug } = await params

  const allData = [...blogs, ...news]
  const blog = allData.find((item) => item.slug === slug)

  if (!blog) return notFound()

  return (
    <main className="bg-[#F7F9FC] pb-20 pt-6 md:pt-10">

      <Header />

      {/* BREADCRUMB */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 mt-6 md:mt-16 mb-4 md:mb-6 text-xs md:text-sm text-gray-500">
        Blogs &gt; <span className="text-primary">{blog.title}</span>
      </div>

      {/* IMAGE */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={500}
          className="
            w-full 
            h-[220px] sm:h-[280px] md:h-[400px] 
            object-cover 
            rounded-xl md:rounded-2xl
          "
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-[700px] mx-auto px-4 md:px-6 mt-8 md:mt-12 space-y-4 md:space-y-6">

        <h1 className="
          text-xl sm:text-2xl md:text-4xl 
          font-bold 
          text-primary 
          leading-tight
        ">
          {blog.title}
        </h1>

        <p className="text-xs md:text-sm text-gray-400">
          {blog.date}
        </p>

        <p className="
          text-[#1E3E6D] 
          text-sm md:text-base 
          leading-relaxed md:leading-loose 
          text-justify
        ">
          {blog.description}
        </p>

      </div>

    <div className="mt-16 md:mt-24">
        <Footer />
    </div>

    </main>
  )
}