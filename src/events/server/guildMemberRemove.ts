import { EmbedBuilder, GuildMember, PartialGuildMember, TextChannel } from 'discord.js'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { logger } from '../../utils/logger'
import config from '../../configs/botConfig'
import { COLORS, EMOJIS } from '../../constants/botConst'
import { Minimal } from 'greetify'

export const guildMemberRemoveHandler = (client: ExtendedClient) => {
  client.on('guildMemberRemove', async (member: GuildMember | PartialGuildMember) => {
    const welcomeChannelId = config.WELCOME_CHANNEL
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId) as TextChannel

    // Create leave message
    const leaveMessage = `We now have ${member.guild.memberCount} members`

    // Create goodbye card
    const card = await Minimal({
      name: member.user.username,
      avatar: member.user.displayAvatarURL({
        size: 4096,
      }),
      type: 'GOODBYE',
      message: leaveMessage,
    })

    // Create embed message
    const leaveEmbed = new EmbedBuilder()
      .setTitle('Goodbye!')
      .setColor(COLORS.red)
      .setDescription(
        `${EMOJIS.sparklesd} ${member.user.username} has left the server. We hope to see you again!`,
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp()

    // Send embed message to the welcome channel
    if (welcomeChannel && welcomeChannel.isTextBased()) {
      await welcomeChannel.send({
        files: [
          {
            attachment: card,
          },
        ],
        embeds: [leaveEmbed],
      })
    } else {
      logger.error(
        `Welcome channel with ID ${welcomeChannelId} not found or is not a text channel.`,
      )
    }
  })
}