import {
  ChatInputCommandInteraction,
  Message,
  PermissionResolvable,
  SlashCommandBuilder,
} from 'discord.js'
import { ExtendedClient } from './ExtendedClient'

/* ───────── Slash Command ───────── */
export interface SlashCommand {
  name: string
  description?: string
  data: SlashCommandBuilder
  executeSlash: (interaction: ChatInputCommandInteraction, client: ExtendedClient) => Promise<void>
  userPermissions?: PermissionResolvable[]
  botPermissions?: PermissionResolvable[]
  devOnly?: boolean
}

/* ───────── Message Command ───────── */
export interface MessageCommand {
  name: string
  description?: string
  executeMessage: (message: Message, args: string[], client: ExtendedClient) => Promise<void>
  userPermissions?: PermissionResolvable[]
  botPermissions?: PermissionResolvable[]
  devOnly?: boolean
}

/* ───────── Union (IMPORTANT) ───────── */
export type Command = SlashCommand | MessageCommand
