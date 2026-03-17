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
  return url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://")
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
    <main className="bg-[#F7F9FC] pb-20 pt-6 md:pt-10">

      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BREADCRUMB */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 mt-6 md:mt-16 mb-4 md:mb-6">
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
              <BreadcrumbPage className="text-primary">{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* IMAGE */}
      {isValidImageUrl(article.image) && (
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={500}
            priority
            className="
              w-full
              h-[220px] sm:h-[280px] md:h-[400px]
              object-cover
              rounded-xl md:rounded-2xl
            "
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="max-w-[700px] mx-auto px-4 md:px-6 mt-8 md:mt-12 space-y-4 md:space-y-6">

        <h1 className="
          text-xl sm:text-2xl md:text-4xl
          font-bold
          text-primary
          leading-tight
        ">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
          <span>{article.author.name}</span>
          <span>·</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div
          className="
            prose prose-sm md:prose-base max-w-none
            text-[#1E3E6D]
            leading-relaxed md:leading-loose
            text-justify
            [&_a]:text-blue-600 [&_a]:underline
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-8
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-primary [&_h3]:mt-6
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic
            [&_img]:rounded-xl [&_img]:my-4
          "
          dangerouslySetInnerHTML={{ __html: cleanBrokenImages(article.content) }}
        />

      </div>

      <div className="mt-16 md:mt-24">
        <Footer />
      </div>

    </main>
  )
}
