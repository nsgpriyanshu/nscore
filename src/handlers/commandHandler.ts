import { Collection } from 'discord.js'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { Command } from '../interfaces/Command'
import { ExtendedClient } from '../interfaces/ExtendedClient'
import { logger } from '../utils/logger'

export const commandHandler = (client: ExtendedClient) => {
  client.slashCommands = new Collection() // For slash commands
  client.messageCommands = new Collection() // For message commands

  const loadSlashCommands = (dir: string) => {
    const files = readdirSync(dir)

    for (const file of files) {
      const filePath = join(dir, file)
      const fileStat = statSync(filePath)

      if (fileStat.isDirectory()) {
        loadSlashCommands(filePath) // Recursively load commands from subdirectories
      } else if (file.endsWith('.js') || file.endsWith('.ts')) {
        const command: Command = require(filePath).default
        if (typeof command.executeSlash === 'function') {
          client.slashCommands.set(command.name, command)
          logger.log(`Slash command loaded: ${command.name} from ${filePath}`)
        }
      }
    }
  }

  const loadMessageCommands = (dir: string) => {
    const files = readdirSync(dir)

    for (const file of files) {
      const filePath = join(dir, file)
      const fileStat = statSync(filePath)

      if (fileStat.isDirectory()) {
        loadMessageCommands(filePath) // Recursively load commands from subdirectories
      } else if (file.endsWith('.js') || file.endsWith('.ts')) {
        const command: Command = require(filePath).default
        if (typeof command.executeMessage === 'function') {
          client.messageCommands.set(command.name, command)
          logger.log(`Message command loaded: ${command.name} from ${filePath}`)
        } else {
          logger.error(
            `Message command ${command.name} does not have executeMessage function defined`,
          )
        }
      }
    }
  }

  // Load both slash and message commands separately
  loadSlashCommands(join(__dirname, '../commands/slashCommands'))
  loadMessageCommands(join(__dirname, '../commands/messageCommands'))

  // Log all loaded commands
  logger.sLog('All commands loaded')
  client.slashCommands.forEach((command, name) => logger.log(`Loaded slash command: ${name}`))
  client.messageCommands.forEach((command, name) => logger.log(`Loaded message command: ${name}`))
}
