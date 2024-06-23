import { Client, EmbedBuilder, TextChannel } from 'discord.js'
import config from '../configs/botConfig'
import { COLORS, EMOJIS } from '../constants/botConst'

const errorHandler = (client: Client) => {
  const errorChannelId = config.ERROR_CHANNEL

  const sendErrorEmbed = async (title: string, description: string) => {
    const errorChannel = client.channels.cache.get(errorChannelId) as TextChannel
    if (errorChannel) {
      const errorEmbed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(COLORS.red)
        .setTimestamp()

      await errorChannel.send({ embeds: [errorEmbed] })
    }
  }

  // First Type Of Error
  process.on('unhandledRejection', (reason, p) => {
    console.log('[ERROR-HANDLING] :: Unhandled Rejection/Catch')
    console.log(reason, p)

    sendErrorEmbed(
      `${EMOJIS.failed} New Error (Error type 1)`,
      `An error just occurred in the bot console! **\n\nERROR:\n\n** \`\`\`${reason}\n\n${p}\`\`\``,
    )
  })

  // Second Type Of Error
  process.on('uncaughtException', (err, origin) => {
    console.log('[ERROR-HANDLING] :: Unhandled Exception/Catch')
    console.log(err, origin)

    sendErrorEmbed(
      `${EMOJIS.failed} New Error (Error type 2)`,
      `An error just occurred in the bot console! **\n\nERROR:\n\n** \`\`\`${err}\n\n${origin}\`\`\``,
    )
  })

  // Third Type Of Error
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('[ERROR-HANDLING] :: Unhandled Exception/Catch (MONITOR)')
    console.log(err, origin)

    sendErrorEmbed(
      `${EMOJIS.failed} New Error (Error type 3)`,
      `An error just occurred in the bot console! **\n\nERROR:\n\n** \`\`\`${err}\n\n${origin}\`\`\``,
    )
  })
}

export default errorHandler
