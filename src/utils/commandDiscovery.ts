import { existsSync, readdirSync, statSync } from 'fs'
import { extname, join } from 'path'
import { Command, MessageCommand, SlashCommand } from '../interfaces/Command'

const commandExtensions = new Set(['.js', '.ts'])

export const walkCommandFiles = (dir: string): string[] => {
  if (!existsSync(dir)) return []

  return readdirSync(dir)
    .flatMap(file => {
      const filePath = join(dir, file)
      const fileStat = statSync(filePath)

      if (fileStat.isDirectory()) return walkCommandFiles(filePath)
      if (commandExtensions.has(extname(file))) return [filePath]
      return []
    })
    .sort()
}

export const loadCommandModule = (filePath: string): Command | undefined => {
  const command = require(filePath).default as Command | undefined
  return command
}

export const isSlashCommand = (command: Command | undefined): command is SlashCommand =>
  Boolean(command?.name && 'executeSlash' in command)

export const isMessageCommand = (command: Command | undefined): command is MessageCommand =>
  Boolean(command?.name && 'executeMessage' in command)

export const loadSlashCommandsFromDirectory = (dir: string): SlashCommand[] =>
  walkCommandFiles(dir).map(loadCommandModule).filter(isSlashCommand)

export const loadMessageCommandsFromDirectory = (dir: string): MessageCommand[] =>
  walkCommandFiles(dir).map(loadCommandModule).filter(isMessageCommand)
