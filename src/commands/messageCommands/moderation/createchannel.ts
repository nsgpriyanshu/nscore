import { Message, TextChannel, EmbedBuilder, ChannelType } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const createChannel: MessageCommand = {
  name: 'createchannel',
  description: 'Creates a new text channel in the server with an optional description.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length < 1) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(
          `${EMOJIS.caution} Usage: \`${BOT.PREFIX}createchannel <channel_name> [description]\``,
        )
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Extract the channel name from the arguments
    const channelName = args[0]
    const description = args.slice(1).join(' ') // Optional description

    try {
      // Create the channel in the guild
      const newChannel = (await message.guild?.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        topic: description || undefined, // Set the description if provided
        reason: `Requested by ${message.author.tag}`,
      })) as TextChannel

      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully created the channel ${newChannel}.`)
      await message.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error creating channel:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error creating the channel. Please try again.`,
        )
      await message.reply({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['ManageChannels'],
  botPermissions: ['ManageChannels'],
  devOnly: false,
}

export default createChannel
