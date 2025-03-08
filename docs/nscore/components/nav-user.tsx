'use client'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { ModeToggle } from './theme-toggle'

export function NavUser() {
  return (
    <SidebarMenu>
      {/* Theme-toggle */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <ModeToggle />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
