import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { EMOJIS, COLORS } from '../../../constants/botConst'

const announce: SlashCommand = {
  name: 'announce',
  description: 'Creates an announcement in a specified channel with customizable options.',

  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Creates an announcement in a specified channel with customizable options.')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel to send the announcement in')
        .setRequired(true),
    )
    .addStringOption(option =>
      option.setName('color').setDescription('Hex color (example: #5865F2)').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('title').setDescription('Announcement title').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('message').setDescription('Announcement message').setRequired(true),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel('channel', true) as TextChannel
    const color = interaction.options.getString('color', true).toUpperCase()
    const title = interaction.options.getString('title', true)
    const announcement = interaction.options.getString('message', true)

    const hexColorPattern = /^#[0-9A-F]{6}$/i
    if (!hexColorPattern.test(color)) {
      const invalidColorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid hex color specified.`)

      await interaction.reply({ embeds: [invalidColorEmbed], ephemeral: true })
      return
    }

    if (!channel || !channel.isTextBased()) {
      const noChannelEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid channel specified.`)

      await interaction.reply({ embeds: [noChannelEmbed], ephemeral: true })
      return
    }

    const announcementEmbed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color as `#${string}`)
      .setDescription(announcement)
      .setTimestamp()
      .setFooter({
        text: `Announced by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })

    await channel.send({ embeds: [announcementEmbed] })

    const confirmEmbed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setDescription(`${EMOJIS.success} Announcement sent to ${channel}.`)

    await interaction.reply({ embeds: [confirmEmbed] })
  },

  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default announce
