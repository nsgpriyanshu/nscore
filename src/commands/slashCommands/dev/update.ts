import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  TextChannel,
  ChannelType,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const update: SlashCommand = {
  name: 'update',
  description: 'Sends an update message to all servers where the bot is present.',

  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Sends an update message to all servers.')
    .addStringOption(option =>
      option.setName('color').setDescription('Hex color of the embed').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('title').setDescription('Title of the update embed').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('thumbnail').setDescription('Thumbnail URL').setRequired(false),
    )
    .addStringOption(option =>
      option.setName('image').setDescription('Image URL').setRequired(false),
    )
    .addStringOption(option =>
      option.setName('message').setDescription('The update message').setRequired(true),
    ) as SlashCommand['data'],

  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: true,

  async executeSlash(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
    const color = interaction.options.getString('color', true).toUpperCase()
    const title = interaction.options.getString('title', true)
    const thumbnailURL = interaction.options.getString('thumbnail') || ''
    const imageURL = interaction.options.getString('image') || ''
    const updateMessage = interaction.options.getString('message', true)

    const hexColorPattern = /^#[0-9A-F]{6}$/i
    if (!hexColorPattern.test(color)) {
      const invalidColorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription('Invalid hex color specified.')
      await interaction.reply({ embeds: [invalidColorEmbed], ephemeral: true })
      return
    }

    if (!updateMessage.trim()) {
      const noMessageEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription('The update message cannot be empty.')
      await interaction.reply({ embeds: [noMessageEmbed], ephemeral: true })
      return
    }

    const updateEmbed = new EmbedBuilder()
      .setTitle(title)
      .setColor(color as `#${string}`)
      .setDescription(updateMessage)
      .setTimestamp()
      .setFooter({
        text: `Update from ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })

    if (thumbnailURL) updateEmbed.setThumbnail(thumbnailURL)
    if (imageURL) updateEmbed.setImage(imageURL)

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

    const confirmEmbed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setDescription('Update message sent to all servers.')
    await interaction.reply({ embeds: [confirmEmbed] })
  },
}

export default update
