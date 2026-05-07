import { Collection } from 'discord.js'
import { join } from 'path'
import { ExtendedClient } from '../interfaces/ExtendedClient'
import { MessageCommand } from '../interfaces/Command'
import {
  isMessageCommand,
  isSlashCommand,
  loadCommandModule,
  walkCommandFiles,
} from '../utils/commandDiscovery'
import { logger } from '../utils/logger'

export const commandHandler = (client: ExtendedClient) => {
  const scope = 'CommandLoader'
  const stopTimer = logger.timer('Command loading')

  client.slashCommands = new Collection()
  client.messageCommands = new Collection()

  let slashCount = 0
  let messageCount = 0
  let aliasCount = 0
  let warnCount = 0
  const loadedMessageCommands: MessageCommand[] = []

  const registerMessageAlias = (alias: string, commandName: string) => {
    const normalizedAlias = alias.trim().toLowerCase()
    if (!normalizedAlias) return

    const existingCommand = client.messageCommands.get(normalizedAlias)

    if (existingCommand) {
      logger.warn(
        scope,
        `Skipped alias "${normalizedAlias}" for ${commandName}; already used by ${existingCommand.name}`,
      )
      warnCount++
      return
    }

    const command = client.messageCommands.get(commandName)
    if (!command) return

    client.messageCommands.set(normalizedAlias, command)
    aliasCount++
  }

  for (const filePath of walkCommandFiles(join(__dirname, '../commands/slashCommands'))) {
    try {
      const command = loadCommandModule(filePath)

      if (!isSlashCommand(command)) {
        logger.warn(scope, `Invalid slash command: ${filePath}`)
        warnCount++
        continue
      }

      client.slashCommands.set(command.name, command)
      slashCount++
      logger.success(scope, `Slash loaded: ${command.name}`)
    } catch {
      logger.error(scope, `Failed to load slash command: ${filePath}`)
      warnCount++
    }
  }

  for (const filePath of walkCommandFiles(join(__dirname, '../commands/messageCommands'))) {
    try {
      const command = loadCommandModule(filePath)

      if (!isMessageCommand(command)) {
        logger.warn(scope, `Invalid message command: ${filePath}`)
        warnCount++
        continue
      }

      client.messageCommands.set(command.name, command)
      loadedMessageCommands.push(command)
      messageCount++
      logger.success(scope, `Message loaded: ${command.name}`)
    } catch {
      logger.error(scope, `Failed to load message command: ${filePath}`)
      warnCount++
    }
  }

  for (const command of loadedMessageCommands) {
    command.aliases?.forEach(alias => registerMessageAlias(alias, command.name))
  }

  logger.build(scope, 'Command loading summary')
  logger.build(scope, '+------------+-------+')
  logger.build(scope, `| ${'Slash'.padEnd(10)} | ${slashCount.toString().padStart(5)} |`)
  logger.build(scope, `| ${'Message'.padEnd(10)} | ${messageCount.toString().padStart(5)} |`)
  logger.build(scope, `| ${'Aliases'.padEnd(10)} | ${aliasCount.toString().padStart(5)} |`)
  logger.build(scope, '+------------+-------+')

  if (warnCount > 0) {
    logger.warn(scope, `Warnings during load: ${warnCount}`)
  }

  stopTimer()
}
