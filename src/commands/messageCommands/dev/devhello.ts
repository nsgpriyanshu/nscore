import { EmbedBuilder, Message } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'

const devHelloMessage: MessageCommand = {
  name: 'devhello',
  description: 'Replies with devHello!',
  async executeMessage(message: Message) {
    try {
      const devHelloEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('devHello Command')
        .setDescription(`${EMOJIS.success} devHello there, I am devHello!`)

      await message.reply({ embeds: [devHelloEmbed] }) // Using reply instead of send
    } catch (error) {
      console.error('Error executing devhello command:', error)
    }
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: true,
}

export default devHelloMessage
