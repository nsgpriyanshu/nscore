import { REST, Routes } from 'discord.js'
import { join } from 'path'
import config from '../configs/botConfig'
import { loadSlashCommandsFromDirectory } from './commandDiscovery'
import { logger } from './logger'

const loadDeployableSlashCommands = () => {
  const slashCommandsDir = join(__dirname, '../commands/slashCommands')

  return loadSlashCommandsFromDirectory(slashCommandsDir)
    .filter(command => command.data && typeof command.data.toJSON === 'function')
    .map(command => command.data.toJSON())
}

const deploySlashCommands = async () => {
  const commands = loadDeployableSlashCommands()
  const rest = new REST({ version: '10' }).setToken(config.BOT_TOKEN)

  logger.info('DeployCommands', `Started refreshing ${commands.length} application commands.`)

  await rest.put(Routes.applicationCommands(config.BOT_ID), {
    body: commands,
  })

  logger.success('DeployCommands', 'Successfully reloaded application commands.')
}

deploySlashCommands().catch(error => {
  if (error instanceof Error) {
    logger.error('DeployCommands', `Error registering commands: ${error.message}`)
    return
  }

  logger.error('DeployCommands', 'Unknown error occurred while registering commands.')
})
