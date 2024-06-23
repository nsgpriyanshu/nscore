import {
  ChatInputCommandInteraction,
  Message,
  PermissionResolvable,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { ExtendedClient } from './ExtendedClient'

// Interface for Slash Command
export interface SlashCommand {
  name: string
  description?: string
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    | SlashCommandSubcommandsOnlyBuilder
  executeSlash: (interaction: ChatInputCommandInteraction, client: ExtendedClient) => Promise<void>
  userPermissions?: PermissionResolvable[]
  botPermissions?: PermissionResolvable[]
  devOnly?: boolean
}

// Interface for Message Command
export interface MessageCommand {
  name: string
  description?: string
  executeMessage: (message: Message, args: string[], client: ExtendedClient) => Promise<void>
  userPermissions?: PermissionResolvable[]
  botPermissions?: PermissionResolvable[]
  devOnly?: boolean
}

// Combined interface for both types of commands
export interface Command extends SlashCommand, MessageCommand {}
