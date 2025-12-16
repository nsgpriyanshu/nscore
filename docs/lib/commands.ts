// lib/commands.ts
export type CommandType = "message" | "slash" | "hybrid"

export interface BotCommand {
  name: string
  description: string
  type: CommandType
}

export interface CommandCategory {
  label: string
  slug: string
  commands: BotCommand[]
}

export const commandCategories: CommandCategory[] = [
  {
    label: "General",
    slug: "general",
    commands: [
      { name: "ping", description: "Check bot latency", type: "hybrid" },
      { name: "help", description: "Show help menu", type: "hybrid" },
      { name: "news", description: "Latest news", type: "slash" },
      { name: "weather", description: "Weather info", type: "slash" },
    ],
  },
  {
    label: "Info",
    slug: "info",
    commands: [
      { name: "serverinfo", description: "Server details", type: "hybrid" },
      { name: "roleinfo", description: "Role details", type: "hybrid" },
      { name: "usericon", description: "User avatar", type: "slash" },
    ],
  },
  {
    label: "Moderation",
    slug: "moderation",
    commands: [
      { name: "addrole", description: "Add role to user", type: "hybrid" },
      { name: "removerole", description: "Remove role", type: "hybrid" },
      { name: "createchannel", description: "Create channel", type: "slash" },
    ],
  },
  {
    label: "Dev",
    slug: "dev",
    commands: [
      { name: "devhelp", description: "Developer help", type: "message" },
      { name: "update", description: "Update bot", type: "slash" },
    ],
  },
]
