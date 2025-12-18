'use client'

import * as React from 'react'
import { Home, Info, ShieldCheck, SquareTerminal, UserPlus, WholeWord } from 'lucide-react'

import { NavMain } from '@/components/nav-main'

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { NavHome } from './nav-home'
import Image from 'next/image'
import { TeamSwitcher } from './team-switcher'

const data = {
  teams: [
    {
      name: 'nsCore',
      plan: 'v2.0.0 - Beta',
    },
  ],
  home: [
    {
      name: 'Overview',
      url: '/docs/overview',
      icon: Home,
    },
    {
      name: 'Invite',
      url: '/docs/invite',
      icon: UserPlus,
    },
  ],
  navMain: [
    {
      title: 'General',
      url: '/docs/general',
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: 'ping', url: '/docs/general/ping', type: 'hybrid' },
        { title: 'help', url: '/docs/general/help', type: 'hybrid' },
        { title: 'news', url: '/docs/general/news', type: 'hybrid' },
        { title: 'weather', url: '/docs/general/weather', type: 'hybrid' },
        { title: 'announce', url: '/docs/general/announce', type: 'hybrid' },
        { title: 'servericon', url: '/docs/general/servericon', type: 'hybrid' },
        { title: 'usericon', url: '/docs/general/usericon', type: 'hybrid' },
      ],
    },
    {
      title: 'Info',
      url: '/docs/info',
      icon: Info,
      items: [
        { title: 'appinfo', url: '/docs/info/appinfo', type: 'hybrid' },
        { title: 'boostinfo', url: '/docs/info/boostinfo', type: 'hybrid' },
        { title: 'channelinfo', url: '/docs/info/channelinfo', type: 'hybrid' },
        { title: 'inviteinfo', url: '/docs/info/inviteinfo', type: 'hybrid' },
        { title: 'roleinfo', url: '/docs/info/roleinfo', type: 'hybrid' },
        { title: 'serverinfo', url: '/docs/info/serverinfo', type: 'hybrid' },
        { title: 'info', url: '/docs/info/info', type: 'hybrid' },
      ],
    },
    {
      title: 'Moderation',
      url: '/docs/moderation',
      icon: ShieldCheck,
      items: [
        { title: 'addrole', url: '/docs/moderation/addrole', type: 'hybrid' },
        { title: 'removerole', url: '/docs/moderation/removerole', type: 'hybrid' },
        { title: 'createrole', url: '/docs/moderation/createrole', type: 'hybrid' },
        { title: 'deleterole', url: '/docs/moderation/deleterole', type: 'hybrid' },
        { title: 'createchannel', url: '/docs/moderation/createchannel', type: 'hybrid' },
        { title: 'deletechannel', url: '/docs/moderation/deletechannel', type: 'hybrid' },
        { title: 'deleteemoji', url: '/docs/moderation/deleteemoji', type: 'hybrid' },
        { title: 'updateemoji', url: '/docs/moderation/updateemoji', type: 'hybrid' },
      ],
    },
  ] as const,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavHome Home={data.home} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
