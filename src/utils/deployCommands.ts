import { REST, Routes, SlashCommandBuilder } from 'discord.js'
import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { logger } from './logger'
import config from '../configs/botConfig'

interface SlashCommandJSON {
  name: string
  description: string
  options?: Array<any>
}

// List of directories to include
const includeDirectories = ['commands/slashCommands/general', 'commands/slashCommands/info']

const loadSlashCommands = (dirs: string[]): Promise<SlashCommandJSON[]> => {
  return new Promise((resolve, reject) => {
    const commands: SlashCommandJSON[] = []

    const loadCommandsFromDir = async (dir: string) => {
      const files = readdirSync(dir)

      for (const file of files) {
        const filePath = join(dir, file)
        const fileStat = statSync(filePath)

        if (fileStat.isDirectory()) {
          await loadCommandsFromDir(filePath)
        } else if (extname(file) === '.ts' || extname(file) === '.js') {
          const commandModule = await import(filePath)
          const command = commandModule.default
          if (command && command.data instanceof SlashCommandBuilder) {
            commands.push(command.data.toJSON())
          }
        }
      }
    }

    // Load commands from each included directory
    Promise.all(dirs.map(dir => loadCommandsFromDir(dir)))
      .then(() => resolve(commands))
      .catch(reject)
  })
}

// Convert includeDirectories to absolute paths
const absoluteIncludeDirectories = includeDirectories.map(dir => join(__dirname, '../', dir))

// Load slash commands
loadSlashCommands(absoluteIncludeDirectories)
  .then(commands => {
    const rest = new REST({ version: '10' }).setToken(config.BOT_TOKEN!)
    logger.log('Started refreshing application (/) commands.')

    return rest.put(Routes.applicationCommands(config.BOT_ID!), { body: commands })
  })
  .then(() => {
    logger.log('Successfully reloaded application (/) commands.')
  })
  .catch(error => {
    if (error instanceof Error) {
      logger.error(`Error registering commands: ${error.message}`)
    } else {
      logger.error('Unknown error occurred while registering commands.')
    }
  })
