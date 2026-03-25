import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/services/article-service"
import { generateArticleMetadata, generateArticleJsonLd } from "@/lib/utils/seo"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { Metadata } from "next"

function isValidImageUrl(url: string): boolean {
  return url?.startsWith("/") || url?.startsWith("http://") || url?.startsWith("https://")
}

function cleanBrokenImages(html: string): string {
  return html.replace(/<img[^>]*src=["']undefined\/[^"']*["'][^>]*\/?>/gi, "")
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: "Article Not Found" }
  }

  return generateArticleMetadata(article)
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article || !article.published) return notFound()

  const jsonLd = generateArticleJsonLd(article)

  return (
    <main className="bg-[#F7F9FC] min-h-screen pb-20">

      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= BREADCRUMB ================= */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 mt-10 md:mt-16 mb-6">
        <Breadcrumb>
          <BreadcrumbList className="text-xs md:text-sm text-gray-500">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/blogs">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/blogs?category=${article.category}`}>
                  {article.category === "NEWS" ? "News" : "Article"}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary">
                {article.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* ================= HERO IMAGE ================= */}
      {isValidImageUrl(article.image) && (
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={600}
            priority
            className="
              w-full
              h-auto
              rounded-2xl
            "
          />
        </div>
      )}

      {/* ================= CONTENT ================= */}
    <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-6 mt-10 md:mt-14">

        {/* CARD WRAPPER */}
        <div className="rounded-2xl space-y-6 md:space-y-8">

          {/* TITLE */}
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-primary leading-tight">
              {article.title}
            </h1>
            <div className="w-16 h-[3px] bg-primary mt-3 rounded-full"></div>
          </div>

          {/* META */}
          <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
            <span className="font-medium text-gray-500">
              {article.author.name}
            </span>
            <span>•</span>
            <span>
              {new Date(article.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* ARTICLE BODY */}
          <div
              className="
              prose prose-sm md:prose-base max-w-none

                prose-p:leading-relaxed md:prose-p:leading-loose
                prose-p:text-[#1E3E6D]

                prose-headings:text-primary
                prose-headings:font-bold

                prose-h2:text-xl md:prose-h2:text-2xl
                prose-h3:text-lg md:prose-h3:text-xl

                prose-a:text-blue-600 prose-a:underline

                prose-li:marker:text-primary

                prose-p:text-justify
                prose-li:text-justify

                prose-img:rounded-xl
                prose-img:my-6
                prose-img:mx-auto
                prose-img:max-w-[90%]
                sm:prose-img:max-w-[80%]
                md:prose-img:max-w-[650px]
                lg:prose-img:max-w-[700px]

                prose-li:marker:text-primary

                prose-p:text-justify
                prose-li:text-justify
              "
            dangerouslySetInnerHTML={{
              __html: cleanBrokenImages(article.content),
            }}
          />

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="mt-16 md:mt-24">
        <Footer />
      </div>

    </main>
  )
}