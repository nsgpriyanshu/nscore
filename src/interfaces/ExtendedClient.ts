import { Client, Collection } from 'discord.js'
import { Command } from './Command'

export interface ExtendedClient extends Client {
  events: Collection<string, (...args: any[]) => void> // Assuming events are functions
  messageCommands: Collection<string, Command>
  slashCommands: Collection<string, Command>
}
