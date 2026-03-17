"use client"

import Image from "next/image"
import { blogs, news } from "@/lib/blogs/data"
import Link from "next/link"

type Blog = {
  id: number
  title: string
  date: string
  description: string
  image: string
  category: "BLOG" | "NEWS"
}

export default function BlogsSection() {
  return (
    <section className="bg-[#F7F9FC] pb-28">

      {/* HERO */}
      <div className="bg-primary pt-24 pb-36 rounded-b-[70px] text-center text-white">

        <h1 className="text-4xl font-bold">
          News & Blog
        </h1>

        <p className="mt-3 text-sm">
          <span className="font-semibold">MILKYSIL®</span> trusted brands of the nation`s pride
        </p>

      </div>


      {/* BLOG TITLE */}
      <div className="max-w-[1200px] mx-auto px-6 mt-20">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-primary inline-block pb-1">
          Blogs
        </h2>
      </div>


      {/* BLOG GRID */}
           <div className="max-w-[1200px] mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">

          {blogs.map((blog) => (

            <Link key={blog.id} href={`/blogs/${blog.slug}`}>
              <div className="group cursor-pointer hover:opacity-90 transition">

                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="w-full h-[220px] object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-gray-800 text-[17px]">
                  {blog.title}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  {blog.date}
                </p>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-5">
                  {blog.description}
                </p>

              </div>
            </Link>

          ))}

        </div>
      </div>


      {/* NEWS TITLE */}
      <div className="max-w-[1200px] mx-auto px-6 mt-35">
        <h2 className="text-2xl font-semibold text-primary border-b-2 border-primary inline-block pb-1">
          News
        </h2>
      </div>


      {/* NEWS GRID */}
 <div className="max-w-[1200px] mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">

          {news.map((item) => (

            <Link key={item.id} href={`/blogs/${item.slug}`}>
              <div className="group cursor-pointer hover:opacity-90 transition">

                <div className="relative rounded-2xl overflow-hidden shadow-md">

                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={600}
                    className="w-full h-[350px] object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  <div className="absolute bottom-0 p-5 text-white">
                    <h3 className="font-semibold text-lg leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs mt-1 opacity-80">
                      {item.date}
                    </p>
                  </div>

                </div>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-5">
                  {item.description}
                </p>

              </div>
            </Link>

          ))}

        </div>
      </div>

    </section>
  )
}