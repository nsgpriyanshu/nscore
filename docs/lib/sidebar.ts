import sidebarData from "@/data/sidebar.json"

export type SidebarItem = {
  title: string
  href: string
  description?: string
}

export type SidebarSection = {
  title: string
  items: SidebarItem[]
}

export const sidebar = {
  brand: sidebarData.brand,
  main: sidebarData.main as SidebarSection[],
  secondary: sidebarData.secondary as SidebarItem[],
}
