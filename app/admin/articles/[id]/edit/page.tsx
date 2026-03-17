import { notFound } from "next/navigation"
import { getArticleById } from "@/lib/services/article-service"
import { ArticleForm } from "@/components/admin/article-form"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const article = await getArticleById(id)

  if (!article) return notFound()

  return (
    <div className="mt-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Edit Article</h1>
        <p className="text-sm text-gray-500">
          Update &quot;{article.title}&quot;
        </p>
      </div>

      <ArticleForm
        mode="edit"
        initialData={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          image: article.image,
          category: article.category,
          published: article.published,
          metaTitle: article.metaTitle,
          metaDescription: article.metaDescription,
        }}
      />
    </div>
  )
}
