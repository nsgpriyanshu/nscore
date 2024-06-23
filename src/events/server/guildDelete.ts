import { EmbedBuilder, Guild, TextChannel } from 'discord.js'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { logger } from '../../utils/logger'
import config from '../../configs/botConfig'
import { COLORS, EMOJIS } from '../../constants/botConst'

export const guildDeleteHandler = (client: ExtendedClient) => {
  client.on('guildDelete', async (guild: Guild) => {
    const GateChannelId = config.GATE_CHANNEL
    const GateChannel = client.channels.cache.get(GateChannelId) as TextChannel

    logger.log(
      `Left a guild: ${guild.name} (id: ${guild.id}). This guild had ${guild.memberCount} members!`,
    )

    // Create embed message
    const serverRemoveEmbed = new EmbedBuilder()
      .setTitle('Left form a server')
      .setColor(COLORS.red)
      .setDescription(`${EMOJIS.failed} Left a guild: ${guild.name}`)
      .addFields({ name: 'Guild ID', value: guild.id, inline: true })
      .addFields({ name: 'Member Count', value: guild.memberCount.toString(), inline: true })
      .setTimestamp()

    // Send embed message to the gate channel
    if (GateChannel && GateChannel.isTextBased()) {
      await GateChannel.send({ embeds: [serverRemoveEmbed] })
    } else {
      logger.error(`Gate channel with ID ${GateChannelId} not found or is not a text channel.`)
    }
  })
}
