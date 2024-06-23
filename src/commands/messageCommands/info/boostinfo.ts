import { EmbedBuilder, Message } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'

const boostInfo: MessageCommand = {
  name: 'boostinfo',
  description: 'Displays information about server boosts and boosters.',
  async executeMessage(message: Message, args: string[]) {
    const { guild } = message

    if (!guild) {
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} This command can only be used in a server.`)
        .setTimestamp()
      await message.reply({ embeds: [errorEmbed] })
      return
    }

    const boosts = guild.premiumSubscriptionCount || 0
    const boosters =
      guild.members.cache
        .filter(member => member.premiumSince)
        .map(member => `${EMOJIS.username} ${member.user.tag}`)
        .join('\n') || 'No boosters'

    const boostEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('Server Boost Information')
      .setDescription(
        `${EMOJIS.sparkles} Total Boosts  ${boosts}\n` +
          `${EMOJIS.sparklesd} Boosters \n${boosters}`,
      )

    await message.channel.send({ embeds: [boostEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default boostInfo
