'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import { CommandBadge } from '@/components/command-badge'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { CommandGroup } from '@/lib/commands'

export function NavMain({ items }: { items: readonly CommandGroup[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Commands</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(cmd => (
                    <SidebarMenuSubItem key={cmd.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={cmd.url} className="flex items-center justify-between gap-2">
                          <span className="truncate">{cmd.title}</span>
                          <CommandBadge type={cmd.type} />
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
