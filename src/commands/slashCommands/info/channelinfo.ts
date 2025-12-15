import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  TextChannel,
  VoiceChannel,
  CategoryChannel,
  NewsChannel,
  StageChannel,
  ForumChannel,
  ChannelType,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'

const channelInfo: SlashCommand = {
  name: 'channelinfo',
  description: 'Displays information about a specified channel or the current channel.',

  data: new SlashCommandBuilder()
    .setName('channelinfo')
    .setDescription('Displays information about a specified channel or the current channel.')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Select a channel (defaults to current channel)')
        .setRequired(false),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel('channel') || interaction.channel

    if (
      !channel ||
      !(
        channel instanceof TextChannel ||
        channel instanceof VoiceChannel ||
        channel instanceof NewsChannel ||
        channel instanceof StageChannel ||
        channel instanceof ForumChannel ||
        channel instanceof CategoryChannel
      )
    ) {
      const cE = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Opps!')
        .setDescription(`${EMOJIS.failed} Please select a valid channel.`)
        .setTimestamp()

      await interaction.reply({ embeds: [cE], ephemeral: true })
      return
    }

    let channelType: string
    switch (channel.type) {
      case ChannelType.GuildText:
        channelType = 'Text Channel'
        break
      case ChannelType.GuildVoice:
        channelType = 'Voice Channel'
        break
      case ChannelType.GuildCategory:
        channelType = 'Category'
        break
      case ChannelType.GuildStageVoice:
        channelType = 'Stage Channel'
        break
      case ChannelType.GuildForum:
        channelType = 'Forum Channel'
        break
      default:
        channelType = 'Unknown'
        break
    }

    const parentCategory = channel.parent ? channel.parent.name : 'None'
    const topic = 'topic' in channel && channel.topic ? channel.topic : 'No topic set'
    const createdAt = channel.createdAt ? channel.createdAt.toDateString() : 'Unknown'

    const channelEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('Channel Information')
      .setDescription(
        `${EMOJIS.channel} Channel Name: ${channel.name}
${EMOJIS.id} Channel ID: ${channel.id}
Channel Type: ${channelType}
Category: ${parentCategory}
Topic: ${topic}
${EMOJIS.inbox} Created At: ${createdAt}`,
      )

    await interaction.reply({ embeds: [channelEmbed] })
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default channelInfo
