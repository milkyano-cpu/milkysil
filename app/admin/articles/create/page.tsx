import { ArticleForm } from "@/components/admin/article-form"

export default function CreateArticlePage() {
  return (
    <div className="mt-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Create Article</h1>
        <p className="text-sm text-gray-500">
          Write a new blog or news article
        </p>
      </div>

      <ArticleForm mode="create" />
    </div>
  )
}
