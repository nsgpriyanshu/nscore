import { EmbedBuilder, GuildMember, TextChannel } from 'discord.js'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { logger } from '../../utils/logger'
import config from '../../configs/botConfig'
import { COLORS, EMOJIS } from '../../constants/botConst'
import { Minimal } from 'greetify'

export const guildMemberAddHandler = (client: ExtendedClient) => {
  client.on('guildMemberAdd', async (member: GuildMember) => {
    const welcomeChannelId = config.WELCOME_CHANNEL
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId) as TextChannel
    const welcomeMessage = `YOU ARE ${member.guild.memberCount}TH MEMBER`

    // Create embed message
    const card = await Minimal({
      name: member.user.username,
      avatar: member.user.displayAvatarURL({
        size: 4096,
      }),
      type: 'WELCOME',
      message: welcomeMessage,
    })

    // Create embed message
    const welcomeEmbed = new EmbedBuilder()
      .setTitle('Welcome to the server!')
      .setColor(COLORS.pink)
      .setDescription(
        `${EMOJIS.sparkles} Welcome, ${member.user.username}! We hope you enjoy your stay.`,
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
        embeds: [welcomeEmbed],
      })
    } else {
      logger.error(
        `Welcome channel with ID ${welcomeChannelId} not found or is not a text channel.`,
      )
    }
  })
}