import { Collection } from 'discord.js'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { Command } from '../interfaces/Command'
import { ExtendedClient } from '../interfaces/ExtendedClient'
import { logger } from '../utils/logger'
import { logPastelGreen } from 'nstypocolors'

export const commandHandler = (client: ExtendedClient) => {
  const scope = 'CommandLoader'
  const stopTimer = logger.timer('Command loading')

  client.slashCommands = new Collection()
  client.messageCommands = new Collection()

  let slashCount = 0
  let messageCount = 0
  let warnCount = 0

  const loadSlashCommands = (dir: string) => {
    for (const file of readdirSync(dir)) {
      const filePath = join(dir, file)
      const stat = statSync(filePath)

      if (stat.isDirectory()) {
        loadSlashCommands(filePath)
        continue
      }

      if (!file.endsWith('.js') && !file.endsWith('.ts')) continue

      try {
        const command: Command = require(filePath).default

        if (typeof command.executeSlash !== 'function') {
          logger.warn(scope, `Missing executeSlash → ${filePath}`)
          warnCount++
          continue
        }

        client.slashCommands.set(command.name, command)
        slashCount++
        logger.success(scope, `Slash loaded: ${command.name}`)
      } catch (err) {
        logger.error(scope, `Failed to load slash command → ${filePath}`)
        warnCount++
      }
    }
  }

  const loadMessageCommands = (dir: string) => {
    for (const file of readdirSync(dir)) {
      const filePath = join(dir, file)
      const stat = statSync(filePath)

      if (stat.isDirectory()) {
        loadMessageCommands(filePath)
        continue
      }

      if (!file.endsWith('.js') && !file.endsWith('.ts')) continue

      try {
        const command: Command = require(filePath).default

        if (typeof command.executeMessage !== 'function') {
          logger.warn(scope, `Missing executeMessage → ${filePath}`)
          warnCount++
          continue
        }

        client.messageCommands.set(command.name, command)
        messageCount++
        logger.success(scope, `Message loaded: ${command.name}`)
      } catch (err) {
        logger.error(scope, `Failed to load message command → ${filePath}`)
        warnCount++
      }
    }
  }

  loadSlashCommands(join(__dirname, '../commands/slashCommands'))
  loadMessageCommands(join(__dirname, '../commands/messageCommands'))

  // Summary table for command counts
  const summaryTable = [
    { Type: 'Slash', Loaded: slashCount },
    { Type: 'Message', Loaded: messageCount },
  ]

  logger.info(scope, 'Command loading summary')
  logger.info(scope, '+------------+-------+')
  summaryTable.forEach(row => {
    logger.info(scope, `| ${row.Type.padEnd(10)} | ${row.Loaded.toString().padStart(5)} |`)
  })
  logger.info(scope, '+------------+-------+')

  if (warnCount > 0) {
    logger.warn(scope, `Warnings during load: ${warnCount}`)
  }

  stopTimer()
}
