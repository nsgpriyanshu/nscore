import { EmbedBuilder, Message } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'

const devHelloMessage: MessageCommand = {
  name: 'devhello',
  description: 'Replies with devHello!',
  async executeMessage(message: Message) {
    const devHelloEmbed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setTitle('devHello Command')
      .setDescription(`${EMOJIS.success} devHello there, I am devHello`)

    await message.channel.send({ embeds: [devHelloEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: true,
}

export default devHelloMessage
