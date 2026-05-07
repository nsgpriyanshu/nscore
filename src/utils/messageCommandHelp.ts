import { MessageCommand } from '../interfaces/Command'
import { BOT } from '../configs/metadata'

export const formatAliases = (aliases?: string[]) => {
  if (!aliases?.length) return 'None'
  return aliases.map(alias => `\`${BOT.PREFIX}${alias}\``).join(', ')
}

export const formatCommandAliases = (command: Pick<MessageCommand, 'name' | 'aliases'>) => {
  if (!command.aliases?.length) return `\`${BOT.PREFIX}${command.name}\``

  return command.aliases
    .map(alias => `\`${BOT.PREFIX}${command.name}\` = \`${BOT.PREFIX}${alias}\``)
    .join('\n')
}

export const formatCommandHelpLine = (
  command: Pick<MessageCommand, 'name' | 'description' | 'aliases'>,
) => `${formatCommandAliases(command)}\n${command.description || 'No description'}`
