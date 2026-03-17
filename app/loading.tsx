import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  )
}