import { Collection } from 'discord.js'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { Command } from '../interfaces/Command'
import { ExtendedClient } from '../interfaces/ExtendedClient'
import { logger } from '../utils/logger'

export const commandHandler = (client: ExtendedClient) => {
  const scope = 'CommandLoader'
  const stopTimer = logger.timer('Command loading')

  client.slashCommands = new Collection()
  client.messageCommands = new Collection()

  let slashCount = 0
  let messageCount = 0
  let warnCount = 0

  /* ────────────────────────────────────────────── */
  /* Slash Commands Loader */
  /* ────────────────────────────────────────────── */
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

        if (!('executeSlash' in command)) {
          logger.warn(scope, `Invalid slash command → ${filePath}`)
          warnCount++
          continue
        }

        client.slashCommands.set(command.name, command)
        slashCount++
        logger.success(scope, `Slash loaded: ${command.name}`)
      } catch (error) {
        logger.error(scope, `Failed to load slash command → ${filePath}`)
        warnCount++
      }
    }
  }

  /* ────────────────────────────────────────────── */
  /* Message Commands Loader */
  /* ────────────────────────────────────────────── */
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

        if (!('executeMessage' in command)) {
          logger.warn(scope, `Invalid message command → ${filePath}`)
          warnCount++
          continue
        }

        client.messageCommands.set(command.name, command)
        messageCount++
        logger.success(scope, `Message loaded: ${command.name}`)
      } catch (error) {
        logger.error(scope, `Failed to load message command → ${filePath}`)
        warnCount++
      }
    }
  }

  /* ────────────────────────────────────────────── */
  /* Load All Commands */
  /* ────────────────────────────────────────────── */
  loadSlashCommands(join(__dirname, '../commands/slashCommands'))
  loadMessageCommands(join(__dirname, '../commands/messageCommands'))

  /* ────────────────────────────────────────────── */
  /* Summary Table */
  /* ────────────────────────────────────────────── */
  logger.build(scope, 'Command loading summary')
  logger.build(scope, '+------------+-------+')
  logger.build(scope, `| ${'Slash'.padEnd(10)} | ${slashCount.toString().padStart(5)} |`)
  logger.build(scope, `| ${'Message'.padEnd(10)} | ${messageCount.toString().padStart(5)} |`)
  logger.build(scope, '+------------+-------+')

  if (warnCount > 0) {
    logger.warn(scope, `Warnings during load: ${warnCount}`)
  }

  stopTimer()
}
