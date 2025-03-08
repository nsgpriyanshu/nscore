import { Message, EmbedBuilder, GuildEmoji } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const updateEmoji: MessageCommand = {
  name: 'updateemoji',
  description: 'Updates the name of an existing emoji in the server.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length < 2) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(`${EMOJIS.caution} Usage: \`${BOT.PREFIX}updateemoji <emoji> <new_name>\``)
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Extract the emoji and new name from the arguments
    const emoji = message.guild?.emojis.cache.find(e => e.toString() === args[0])
    const newName = args[1]

    // Check if the emoji exists in the guild
    if (!emoji) {
      const invalidEmojiEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Please provide a valid emoji from this server.`)
      await message.reply({ embeds: [invalidEmojiEmbed] })
      return
    }

    // Update the emoji name
    try {
      await emoji.edit({ name: newName })
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully updated the emoji name to \`${newName}\`.`)
      await message.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error updating emoji name:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error updating the emoji name. Please try again.`,
        )
      await message.reply({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['ManageEmojisAndStickers'],
  botPermissions: ['ManageEmojisAndStickers'],
  devOnly: false,
}

export default updateEmoji
