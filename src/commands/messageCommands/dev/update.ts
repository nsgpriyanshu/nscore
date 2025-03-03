import { Message, EmbedBuilder, TextChannel, ChannelType } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'
import { BOT } from '../../../configs/metadata'

const update: MessageCommand = {
  name: 'update',
  description: 'Sends an update message to all servers where the bot is present.',
  async executeMessage(message: Message, args: string[], client: ExtendedClient) {
    // Check if the correct number of arguments is provided
    if (args.length < 3) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(
          `${EMOJIS.caution} Usage: \`${BOT.PREFIX}update <color> <title> [thumbnail URL] [image URL] <message>\``,
        )
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Extract the color, title, and update message
    const color = args.shift()?.toUpperCase() || ''
    const title = args.shift() || `${EMOJIS.seen} It's an update message`

    // Optional: thumbnail URL and image URL
    let thumbnailURL = ''
    let imageURL = ''

    if (args[0]?.startsWith('http')) {
      thumbnailURL = args.shift() || ''
    }
    if (args[0]?.startsWith('http')) {
      imageURL = args.shift() || ''
    }

    const updateMessage = args.join(' ')

    // Validate the hex color
    const hexColorPattern = /^#[0-9A-F]{6}$/i
    if (!hexColorPattern.test(color)) {
      const invalidColorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription('Invalid hex color specified.')
      await message.reply({ embeds: [invalidColorEmbed] })
      return
    }

    // Ensure that the update message is not empty
    if (!updateMessage.trim()) {
      const noMessageEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription('The update message cannot be empty.')
      await message.reply({ embeds: [noMessageEmbed] })
      return
    }

    // Create the update embed
    const updateEmbed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color as `#${string}`)
      .setDescription(updateMessage)
      .setTimestamp()
      .setFooter({
        text: `Update from ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL(),
      })

    if (thumbnailURL) {
      updateEmbed.setThumbnail(thumbnailURL)
    }

    if (imageURL) {
      updateEmbed.setImage(imageURL)
    }

    // Send the update to all servers
    client.guilds.cache.forEach(async guild => {
      const defaultChannel =
        (guild.systemChannel as TextChannel) ||
        (guild.channels.cache.find(
          channel =>
            channel.type === ChannelType.GuildText &&
            (channel as TextChannel).permissionsFor(guild.members.me!)?.has('SendMessages'),
        ) as TextChannel)

      if (defaultChannel) {
        try {
          await defaultChannel.send({ embeds: [updateEmbed] })
        } catch (error) {
          console.error(`Failed to send update to ${guild.name}:`, error)
        }
      }
    })

    // Confirm the update was sent
    const confirmEmbed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setDescription('Update message sent to all servers.')
    await message.reply({ embeds: [confirmEmbed] })
  },
  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: true,
}

export default update
