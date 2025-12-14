import { EmbedBuilder, Guild, TextChannel } from 'discord.js'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { logger } from '../../utils/logger'
import config from '../../configs/botConfig'
import { COLORS, EMOJIS } from '../../constants/botConst'

export const guildCreateHandler = (client: ExtendedClient) => {
  const scope = 'GuildCreate'

  client.on('guildCreate', async (guild: Guild) => {
    const gateChannelId = config.GATE_CHANNEL
    const gateChannel = client.channels.cache.get(gateChannelId) as TextChannel

    logger.info(
      scope,
      `Joined new guild: ${guild.name} (ID: ${guild.id}) | Members: ${guild.memberCount}`,
    )

    // Create embed message
    const serverAddEmbed = new EmbedBuilder()
      .setTitle('Joined a new server')
      .setColor(COLORS.green)
      .setDescription(`${EMOJIS.success} Joined a new guild: ${guild.name}`)
      .addFields({ name: 'Guild ID', value: guild.id, inline: true })
      .addFields({ name: 'Member Count', value: guild.memberCount.toString(), inline: true })
      .setTimestamp()

    // Send embed message to the join gate channel
    if (gateChannel && gateChannel.isTextBased()) {
      await gateChannel.send({ embeds: [serverAddEmbed] })
    } else {
      logger.error(
        scope,
        `Join gate channel with ID ${gateChannelId} not found or is not a text channel.`,
      )
    }
  })
}
