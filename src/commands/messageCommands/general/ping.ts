import { EmbedBuilder, Message } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'

const ping: MessageCommand = {
  name: 'ping',
  description: 'Replies with Ping!',
  async executeMessage(message: Message) {
    const pingEmbed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setTitle('ping Command')
      .setDescription(`${EMOJIS.success} Ping pong ping`)

    await message.reply({ embeds: [pingEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default ping
