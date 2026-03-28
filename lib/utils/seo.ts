import type { Metadata } from "next"
import type { ArticleWithAuthor } from "@/lib/types/article"
import type { ProductWithCategory } from "@/lib/types/product"

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

export function generateProductMetadata(product: ProductWithCategory): Metadata {
  const title = product.metaTitle || product.name
  const description =
    product.metaDescription || product.shortDescription || `${product.name} - ${product.category.name}`
  const url = `${SITE_URL}/product/${product.slug}`
  const image =
    product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : product.images?.[0]
        ? `${SITE_URL}${product.images[0]}`
        : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: product.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateProductJsonLd(product: ProductWithCategory) {
  const image =
    product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : product.images?.[0]
        ? `${SITE_URL}${product.images[0]}`
        : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.metaDescription || product.shortDescription || product.name,
    ...(image && { image }),
    category: product.category.name,
    brand: {
      "@type": "Brand",
      name: "Milkysil",
    },
    manufacturer: {
      "@type": "Organization",
      name: "CV. Milky Makmur Sejahtera",
      url: SITE_URL,
    },
    url: `${SITE_URL}/product/${product.slug}`,
  }
}
