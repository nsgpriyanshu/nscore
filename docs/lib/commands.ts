import type { LucideIcon } from 'lucide-react'

/* ───────────── COMMAND TYPES ───────────── */

export type CommandType = 'slash' | 'message' | 'hybrid'

export interface CommandData {
  name: string
  category: 'general' | 'info' | 'moderation'
  description: string
  usage: string
  type: CommandType
  permissions: {
    bot: string[]
    user: string[]
  }
  examples?: string[]
}

/* ───────────── SIDEBAR TYPES ───────────── */

export interface CommandNavItem {
  title: string
  url: string
  type: CommandType
}

export interface CommandGroup {
  title: string
  icon?: LucideIcon
  isActive?: boolean
  items: readonly CommandNavItem[]
}

/* ───────────── COMMAND DATA ───────────── */

export const commands: CommandData[] = [
  /* ───────────── GENERAL ───────────── */

  {
    name: 'ping',
    description:
      'Replies with "Ping!" to test the responsiveness of the bot. No parameters needed.',
    category: 'general',
    type: 'hybrid',
    usage: 'ping',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/general/ping1.png'],
  },
  {
    name: 'help',
    description:
      'Lists all available commands. Can be used without parameters or with a command name to get detailed info.',
    category: 'general',
    type: 'hybrid',
    usage: 'help [command]',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/general/help1.png'],
  },
  {
    name: 'announce',
    description:
      'Creates an announcement in a specified channel with customizable options.\n' +
      'Parameters:\n' +
      '<#channel> → the channel to send the announcement\n' +
      '<color> → hex color or Discord color name for embed\n' +
      '<title> → embed title\n' +
      '<message> → embed message content',
    category: 'general',
    type: 'hybrid',
    usage: 'announce <#channel> <color> <title> <message>',
    permissions: {
      bot: ['sendMessages'],
      user: ['administrator'],
    },
    examples: ['/examples/general/announce1.png'],
  },
  {
    name: 'servericon',
    description: 'Displays the icon and banner of the server. No parameters needed.',
    category: 'general',
    type: 'hybrid',
    usage: 'servericon',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/general/servericon1.png'],
  },
  {
    name: 'usericon',
    description:
      'Displays the profile picture of the user who triggered the command. No parameters needed.',
    category: 'general',
    type: 'hybrid',
    usage: 'usericon',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/general/usericon1.png'],
  },
  {
    name: 'news',
    description:
      'Displays the latest news on a specified topic.\nParameters:\n<topic> → keyword or topic to search for news.',
    category: 'general',
    type: 'hybrid',
    usage: 'news <topic>',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/general/news1.png'],
  },
  {
    name: 'weather',
    description:
      'Displays weather information for a specified location.\nParameters:\n<location> → city name, coordinates, or ZIP code.',
    category: 'general',
    type: 'hybrid',
    usage: 'weather <location>',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/general/weather1.png'],
  },

  /* ───────────── INFO ───────────── */

  {
    name: 'appinfo',
    description: 'Displays information about the app. No parameters needed.',
    category: 'info',
    type: 'hybrid',
    usage: 'appinfo',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/info/info/appinfo1.png'],
  },
  {
    name: 'channelinfo',
    description:
      'Displays information about a specified channel or the current channel.\n' +
      'Parameters:\n[#channel] → optional channel to query, defaults to current channel.',
    category: 'info',
    type: 'hybrid',
    usage: 'channelinfo [#channel]',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/info/channelinfo1.png'],
  },
  {
    name: 'info',
    description: 'Displays information about a user.\nParameters:\n<@user> → the user to query.',
    category: 'info',
    type: 'hybrid',
    usage: 'info <@user>',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/info/info1.png'],
  },
  {
    name: 'roleinfo',
    description:
      'Displays information about a specific role, including its permissions.\nParameters:\n<@role> → role to query.',
    category: 'info',
    type: 'hybrid',
    usage: 'roleinfo <@role>',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/info/roleinfo1.png'],
  },
  {
    name: 'serverinfo',
    description: 'Displays information about the server. No parameters needed.',
    category: 'info',
    type: 'hybrid',
    usage: 'serverinfo',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/info/serverinfo1.png'],
  },
  {
    name: 'boostinfo',
    description: 'Displays information about the current server boosts. No parameters needed.',
    category: 'info',
    type: 'hybrid',
    usage: 'boostinfo',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/info/boostinfo1.png'],
  },
  {
    name: 'inviteinfo',
    description:
      'Displays information about an invite.\nParameters:\n<invite_code | link> → invite code or full invite link.',
    category: 'info',
    type: 'hybrid',
    usage: 'inviteinfo <invite_code | link>',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/info/inviteinfo1.png'],
  },

  /* ───────────── MODERATION ───────────── */

  {
    name: 'addrole',
    description:
      'Assigns a specified role to a user.\nParameters:\n<@user> → user to assign role\n<@role> → role to assign',
    category: 'moderation',
    type: 'hybrid',
    usage: 'addrole <@user> <@role>',
    permissions: {
      bot: ['manageRoles'],
      user: ['manageRoles'],
    },
    examples: ['/examples/addrole1.png'],
  },
  {
    name: 'removerole',
    description:
      'Removes a specified role from a user.\nParameters:\n<@user> → user to remove role\n<@role> → role to remove',
    category: 'moderation',
    type: 'hybrid',
    usage: 'removerole <@user> <@role>',
    permissions: {
      bot: ['manageRoles'],
      user: ['manageRoles'],
    },
    examples: ['/examples/removerole1.png'],
  },
  {
    name: 'createrole',
    description:
      'Creates a new role within the server.\nParameters:\n<role_name> → name of the role\n<color> → hex or name\n[permissions] → optional permission overrides',
    category: 'moderation',
    type: 'hybrid',
    usage: 'createrole <role_name> <color> [permissions]',
    permissions: {
      bot: ['manageRoles'],
      user: ['manageRoles', 'managePermissions'],
    },
    examples: ['/examples/createrole1.png'],
  },
  {
    name: 'deleterole',
    description: 'Removes a specified role from the server.\nParameters:\n<@role> → role to delete',
    category: 'moderation',
    type: 'hybrid',
    usage: 'deleterole <@role>',
    permissions: {
      bot: ['manageRoles'],
      user: ['manageRoles'],
    },
    examples: ['/examples/deleterole1.png'],
  },
  {
    name: 'createchannel',
    description:
      'Creates a new text channel.\nParameters:\n<channel_name> → name of the channel\n[description] → optional description',
    category: 'moderation',
    type: 'hybrid',
    usage: 'createchannel <channel_name> [description]',
    permissions: {
      bot: ['manageChannels'],
      user: ['manageChannels'],
    },
    examples: ['/examples/createchannel1.png'],
  },
  {
    name: 'deletechannel',
    description:
      'Deletes a specified channel from the server.\nParameters:\n<#channel> → channel to delete',
    category: 'moderation',
    type: 'hybrid',
    usage: 'deletechannel <#channel>',
    permissions: {
      bot: ['manageChannels'],
      user: ['manageChannels'],
    },
    examples: ['/examples/deletechannel1.png'],
  },
  {
    name: 'deleteemoji',
    description:
      'Removes an existing emoji from the server.\nParameters:\n<emoji> → emoji to delete',
    category: 'moderation',
    type: 'hybrid',
    usage: 'deleteemoji <emoji>',
    permissions: {
      bot: ['manageEmojisAndStickers'],
      user: ['manageEmojisAndStickers'],
    },
    examples: ['/examples/deleteemoji1.png'],
  },
  {
    name: 'updateemoji',
    description:
      'Updates the name of an existing emoji.\nParameters:\n<old_name> → current emoji name\n<new_name> → new emoji name',
    category: 'moderation',
    type: 'hybrid',
    usage: 'updateemoji <old_name> <new_name>',
    permissions: {
      bot: ['manageEmojisAndStickers'],
      user: ['manageEmojisAndStickers'],
    },
    examples: ['/examples/updateemoji1.png'],
  },
]
