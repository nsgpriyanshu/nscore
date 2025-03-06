'use client'

import * as React from 'react'
import {
  BanIcon,
  FileTextIcon,
  GalleryVerticalEnd,
  HammerIcon,
  HouseIcon,
  InfoIcon,
  RocketIcon,
  Shield,
  ShieldIcon,
  TerminalSquareIcon,
} from 'lucide-react'

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { NavMain } from './nav-main'
import { TeamSwitcher } from './team-switcher'
import { NavNotes } from './nav-cmds'

const data = {
  teams: [
    {
      name: 'nsCore',
      logo: GalleryVerticalEnd,
      plan: 'User Manual',
    },
  ],
  navMain: [
    {
      title: 'Overview',
      url: '/',
      icon: HouseIcon,
      isActive: true,
    },
    {
      title: 'Quick Start',
      url: '/quick-start',
      icon: RocketIcon,
      isActive: true,
    },
    {
      title: 'Terms & Conditions',
      url: '/terms',
      icon: FileTextIcon,
      isActive: true,
    },
    {
      title: 'Privacy Policy',
      url: '/privacy',
      icon: ShieldIcon,
      isActive: true,
    },
  ],
  Commands: [
    {
      name: 'Universal',
      url: '/',
      icon: TerminalSquareIcon,
    },
    {
      name: 'Infromative',
      url: '/',
      icon: InfoIcon,
    },
    {
      name: 'Modetrative',
      url: '/',
      icon: HammerIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavNotes notes={data.Commands} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
