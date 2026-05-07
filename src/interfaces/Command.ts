import {
  ChatInputCommandInteraction,
  Message,
  PermissionResolvable,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { ExtendedClient } from './ExtendedClient'

export interface SlashCommand {
  name: string
  description?: string
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
  executeSlash: (interaction: ChatInputCommandInteraction, client: ExtendedClient) => Promise<void>
  userPermissions?: PermissionResolvable[]
  botPermissions?: PermissionResolvable[]
  devOnly?: boolean
}

export interface MessageCommand {
  name: string
  aliases?: string[]
  description?: string
  executeMessage: (message: Message, args: string[], client: ExtendedClient) => Promise<void>
  userPermissions?: PermissionResolvable[]
  botPermissions?: PermissionResolvable[]
  devOnly?: boolean
}

export type Command = SlashCommand | MessageCommand
