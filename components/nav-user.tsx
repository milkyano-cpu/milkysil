"use client"

import { useRouter } from "next/navigation"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { LogOutIcon } from "lucide-react"

export function NavUser() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <div className="border-t pt-4 mt-4">
      <SidebarMenu>
        <SidebarMenuItem>

          <SidebarMenuButton
            onClick={handleLogout}
            className="flex items-center gap-4 py-4 text-lg font-semibold cursor-pointer transition-all hover:bg-red-100 hover:text-red-600"
          >
            {/* ICON */}
            <LogOutIcon className="size-7" />

            {/* TEXT */}
            <span className="text-xl">Logout</span>

          </SidebarMenuButton>

        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}