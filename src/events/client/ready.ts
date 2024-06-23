import { logPastelPink } from 'nstypocolors'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { ActivityType } from 'discord.js'
import { BOT } from '../../configs/metadata'

export const registerReadyEvent = (client: ExtendedClient) => {
  client.once('ready', () => {
    logPastelPink(`Successfully connected both Message & Slash clients ${client.user?.tag}!`)

    client.user?.setPresence({
      activities: [
        {
          name: `${BOT.PREFIX}help • ${client.user?.username}`,
          type: ActivityType.Custom,
        },
      ],
      status: 'online',
    })
  })
}
