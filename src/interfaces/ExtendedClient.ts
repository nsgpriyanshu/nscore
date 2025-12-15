import { Client, Collection } from 'discord.js'
import { MessageCommand, SlashCommand } from './Command'

export interface ExtendedClient extends Client {
  events: Collection<string, (...args: any[]) => void> // Assuming events are functions
  slashCommands: Collection<string, SlashCommand>
  messageCommands: Collection<string, MessageCommand>
}
