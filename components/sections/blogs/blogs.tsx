import Image from "next/image"
import Link from "next/link"
import { getPublishedArticles } from "@/lib/services/article-service"

function isValidImageUrl(url: string): boolean {
  return url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://")
}

export default async function BlogsSection() {
  const [articles, newsItems] = await Promise.all([
    getPublishedArticles("ARTICLE"),
    getPublishedArticles("NEWS"),
  ])

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

          {articles.map((article) => (

            <Link key={article.id} href={`/blogs/${article.slug}`}>
              <div className="group cursor-pointer hover:opacity-90 transition">

                <div className="overflow-hidden rounded-xl">
                  {isValidImageUrl(article.image) ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={500}
                      height={300}
                      className="w-full h-[220px] object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-[220px] bg-gray-200 flex items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <h3 className="mt-4 font-semibold text-gray-800 text-[17px]">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-5">
                  {article.excerpt}
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

          {newsItems.map((item) => (

            <Link key={item.id} href={`/blogs/${item.slug}`}>
              <div className="group cursor-pointer hover:opacity-90 transition">

                <div className="relative rounded-2xl overflow-hidden shadow-md">

                  {isValidImageUrl(item.image) ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={600}
                      className="w-full h-[350px] object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-[350px] bg-gray-200" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  <div className="absolute bottom-0 p-5 text-white">
                    <h3 className="font-semibold text-lg leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs mt-1 opacity-80">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                </div>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-5">
                  {item.excerpt}
                </p>

              </div>
            </Link>

          ))}

        </div>
      </div>

    </section>
  )
}
