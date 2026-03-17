"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b px-4 bg-white">

      <Link href="/admin">
        <div className="bg-black text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm hover:opacity-80 transition cursor-pointer">
          ms.
        </div>
      </Link>

      <SidebarTrigger className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
        <Menu size={30} /> 
      </SidebarTrigger>

    </header>
  )
}