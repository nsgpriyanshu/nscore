import { Message, EmbedBuilder, TextChannel } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const deleteChannel: MessageCommand = {
  name: 'deletechannel',
  description: 'Deletes a specified channel in the server.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length !== 1) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(`${EMOJIS.caution} Usage: \`${BOT.PREFIX}deletechannel <#channel>\``)
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Extract the channel mention from the arguments
    const channelMention = args[0]
    const channelId = channelMention.replace(/<#|>/g, '')
    const channel = message.guild?.channels.cache.get(channelId) as TextChannel

    if (!channel) {
      const invalidChannelEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid channel specified.`)
      await message.reply({ embeds: [invalidChannelEmbed] })
      return
    }

    try {
      // Delete the channel in the guild
      await channel.delete(`Requested by ${message.author.tag}`)

      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully deleted the channel ${channel.name}.`)
      await message.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error deleting channel:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error deleting the channel. Please try again.`,
        )
      await message.reply({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['ManageChannels'],
  botPermissions: ['ManageChannels'],
  devOnly: false,
}

export default deleteChannel
