import { Message } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'
import { EmbedBuilder } from 'discord.js'

const serverIcon: MessageCommand = {
  name: 'servericon',
  description: 'Displays the icon and banner of the server.',
  async executeMessage(message: Message) {
    const { guild } = message

    if (!guild) {
      const eS = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} This command can only be used in a server.`)
        .setTimestamp()
      await message.reply({ embeds: [eS] })
      return
    }

    const iconURL = guild.iconURL() || ''
    const bannerURL = guild.bannerURL() || 'No'

    const serverIconEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle(`${EMOJIS.seo} ${guild.name}'s Icon and Banner`)
      .setImage(iconURL)
      .addFields({ name: 'Icon', value: `(${iconURL})`, inline: true })

    // If the server has a banner, add it to the embed
    if (guild.banner) {
      serverIconEmbed.addFields({ name: 'Banner', value: `(${bannerURL})`, inline: true })
    }

    await message.channel.send({ embeds: [serverIconEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default serverIcon
