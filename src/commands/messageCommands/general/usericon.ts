import { Message } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'
import { EmbedBuilder } from 'discord.js'

const profile: MessageCommand = {
  name: 'usericon',
  description: 'Displays the profile of the user who triggered the command.',
  async executeMessage(message: Message, args: string[]) {
    const user =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]) ||
      message.member

    if (!user) {
      const uE = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} Please mention a valid user or provide a valid user ID.`)
        .setTimestamp()
      await message.reply({ embeds: [uE] })
      return
    }

    const profileEmbed = new EmbedBuilder()
      // .setColor(COLORS.blue)
      .setTitle(`${EMOJIS.seo} ${user.displayName}'s Profile Picture`)
      .setImage(user.user.avatarURL())

    await message.reply({ embeds: [profileEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default profile
