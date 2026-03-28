"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  Tags,
  Package,
  FileText,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { NavUser } from "@/components/nav-user"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    desc: "View overview",
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tags,
    desc: "Manage categories",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
    desc: "Manage products",
  },
  {
    title: "Articles",
    url: "/admin/articles",
    icon: FileText,
    desc: "Manage blogs/news",
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpen, setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="offcanvas" {...props}>

      <SidebarHeader className="pb-8 border-b px-5 pt-4">
        <Link href="/admin" className="flex items-center gap-3">

          {/* LOGO */}
          <div className="bg-black text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
            ms.
          </div>

          {/* TEXT */}
          <div className="flex flex-col">
            <span className="text-lg font-bold">
              Milkysil Admin
            </span>
            <span className="text-xs text-gray-500">
                Chemicals Management
            </span>
          </div>

        </Link>
      </SidebarHeader>

      <SidebarContent className="pt-6 px-3 space-y-2">

        {menuItems.map((item) => {
          const isActive = item.url === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.url)

          const Icon = item.icon

          return (
          <Link
            key={item.title}
            href={item.url}
            onClick={() => {
              setOpenMobile(false)
            }}
            className={`flex items-center gap-3 p-3 rounded-xl transition
              ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}
            `}
          >

              {/* ICON */}
              <div className={`${isActive ? "text-white" : "text-gray-600"}`}>
                <Icon size={20} />
              </div>

              {/* TEXT */}
              <div className="flex flex-col leading-tight">
                <span className="font-medium">{item.title}</span>
                <span
                  className={`text-xs ${
                    isActive ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {item.desc}
                </span>
              </div>

            </Link>
          )
        })}

      </SidebarContent>

      <SidebarFooter className="px-4 pb-6 pt-4 border-t mt-4">
        <NavUser />
      </SidebarFooter>

    </Sidebar>
  )
}