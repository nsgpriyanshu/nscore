import { Message, EmbedBuilder, GuildEmoji } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const deleteEmoji: MessageCommand = {
  name: 'deleteemoji',
  description: 'Deletes an existing emoji from the server.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length < 1) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(`${EMOJIS.caution} Usage: \`${BOT.PREFIX}deleteemoji <emoji>\``)
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Extract the emoji from the arguments
    const emoji = message.guild?.emojis.cache.find(e => e.toString() === args[0])

    // Check if the emoji exists in the guild
    if (!emoji) {
      const invalidEmojiEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Please provide a valid emoji from this server.`)
      await message.reply({ embeds: [invalidEmojiEmbed] })
      return
    }

    // Delete the emoji
    try {
      await emoji.delete()
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully deleted the emoji.`)
      await message.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error deleting emoji:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error deleting the emoji. Please try again.`)
      await message.reply({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['ManageEmojisAndStickers'],
  botPermissions: ['ManageEmojisAndStickers'],
  devOnly: false,
}

export default deleteEmoji
