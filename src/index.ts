import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { ExtendedClient } from './interfaces/ExtendedClient'
import { logSuccess } from 'nstypocolors'
import config from './configs/botConfig'

import { commandHandler } from './handlers/commandHandler'
import { eventHandlers } from './events/eventIndex'
import errorHandler from './handlers/errorHandler'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}) as ExtendedClient

client.slashCommands = new Collection()
client.messageCommands = new Collection()
client.events = new Collection()

commandHandler(client)
eventHandlers(client)
errorHandler(client)

client
  .login(config.BOT_TOKEN)
  .then(() => logSuccess('Successfully connected all the commands and the bot is online'))
  .catch((err: string) => console.error('Failed to login: ' + err))
