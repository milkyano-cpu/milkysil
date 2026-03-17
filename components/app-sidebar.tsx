"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { CommandIcon, FileTextIcon, FolderIcon } from "lucide-react"

const data = {
  navMain: [
    {
      title: "Product",
      url: "/admin/products",
      icon: <FolderIcon className="size-5" />,
    },
    {
      title: "Article",
      url: "/admin/articles",
      icon: <FileTextIcon className="size-5" />,
    },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>

      {/* HEADER */}
      <SidebarHeader className="pb-4 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-2">
              <Link href="/admin" className="flex items-start gap-3 w-full">
                
                {/* ICON */}
                <CommandIcon className="size-7 mt-1" />

                {/* TITLE + SUBTITLE */}
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-bold">
                    Milkysil Admin
                  </span>
                  <span className="text-sm text-gray-500">
                    General & Speciality Chemical Management
                  </span>
                </div>

              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* MENU */}
      <SidebarContent className="pt-4">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

    </Sidebar>
  )
}