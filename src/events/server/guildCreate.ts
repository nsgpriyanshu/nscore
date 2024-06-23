import { EmbedBuilder, Guild, TextChannel } from 'discord.js'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { logger } from '../../utils/logger'
import config from '../../configs/botConfig'
import { COLORS, EMOJIS } from '../../constants/botConst'

export const guildCreateHandler = (client: ExtendedClient) => {
  client.on('guildCreate', async (guild: Guild) => {
    const GateChannelId = config.GATE_CHANNEL
    const GateChannel = client.channels.cache.get(GateChannelId) as TextChannel

    logger.log(
      `Joined a new guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`,
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
    if (GateChannel && GateChannel.isTextBased()) {
      await GateChannel.send({ embeds: [serverAddEmbed] })
    } else {
      logger.error(`Join gate channel with ID ${GateChannelId} not found or is not a text channel.`)
    }
  })
}
