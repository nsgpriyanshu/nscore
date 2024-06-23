import { Message, EmbedBuilder, PermissionsBitField, TextChannel } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { EMOJIS } from '../../../constants/botConst'
import { COLORS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const announce: MessageCommand = {
  name: 'announce',
  description: 'Creates an announcement in a specified channel with customizable options.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length < 4) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(
          `${EMOJIS.caution} Usage: \`${BOT.PREFIX}announce <#channel> <color> <title> <message>\``,
        )
      await message.channel.send({ embeds: [usageEmbed] })
      return
    }

    // Extract the channel mention, color, title, and announcement message
    const channelMention = args.shift()
    const color = args.shift()?.toUpperCase() || `${COLORS.blue}`
    const title = args.shift() || `${EMOJIS.seen} It's an announcement message`
    const announcement = args.join(' ')

    // Validate the hex color
    const hexColorPattern = /^#[0-9A-F]{6}$/i
    if (!hexColorPattern.test(color || '')) {
      const invalidColorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid hex color specified.`)
      await message.reply({ embeds: [invalidColorEmbed] })
      return
    }

    // Find the mentioned channel
    const channel = message.guild?.channels.cache.get(
      channelMention?.replace(/[<#>]/g, '') || '',
    ) as TextChannel

    if (!channel || !channel.isTextBased()) {
      const noChannelEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid channel specified.`)
      await message.reply({ embeds: [noChannelEmbed] })
      return
    }

    // Create the announcement embed
    const announcementEmbed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color as `#${string}`)
      .setDescription(announcement)
      .setTimestamp()
      .setFooter({
        text: `Announced by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL(),
      })

    // Send the announcement to the specified channel
    await channel.send({ embeds: [announcementEmbed] })

    // Confirm the announcement was sent
    const confirmEmbed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setDescription(`${EMOJIS.success} Announcement sent to ${channel}.`)
    await message.channel.send({ embeds: [confirmEmbed] })
  },
  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default announce
