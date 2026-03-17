import type { Metadata } from "next"
import type { ArticleWithAuthor } from "@/lib/types/article"

const SITE_URL = "https://milkysil.com"

export function generateArticleMetadata(article: ArticleWithAuthor): Metadata {
  const title = article.metaTitle || article.title
  const description = article.metaDescription || article.excerpt
  const url = `${SITE_URL}/blogs/${article.slug}`
  const image = article.image.startsWith("http")
    ? article.image
    : `${SITE_URL}${article.image}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.author.name],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateArticleJsonLd(article: ArticleWithAuthor) {
  const image = article.image.startsWith("http")
    ? article.image
    : `${SITE_URL}${article.image}`

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image,
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "CV. Milky Makmur Sejahtera",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${article.slug}`,
    },
  }
}
