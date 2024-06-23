import {
  EmbedBuilder,
  Message,
  TextChannel,
  VoiceChannel,
  CategoryChannel,
  NewsChannel,
  StageChannel,
  ForumChannel,
  DMChannel,
  ChannelType,
} from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'

const channelInfo: MessageCommand = {
  name: 'channelinfo',
  description: 'Displays information about a specified channel or the current channel.',
  async executeMessage(message: Message, args: string[]) {
    // Check if a channel was mentioned or provided as an argument
    const channel =
      message.mentions.channels.first() ||
      message.guild?.channels.cache.get(args[0]) ||
      message.channel

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
        .setDescription(
          `${EMOJIS.failed} Please mention a valid channel or provide a valid channel ID.`,
        )
        .setTimestamp()
      await message.reply({ embeds: [cE] })
      return
    }

    // Convert channel type to a readable string
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

    // Check if the channel has a parent category
    const parentCategory = channel.parent ? channel.parent.name : 'None'

    // Check if the channel has a topic
    const topic = 'topic' in channel && channel.topic ? channel.topic : 'No topic set'

    // Check if the createdAt property is null
    const createdAt = channel.createdAt ? channel.createdAt.toDateString() : 'Unknown'

    const channelEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('Channel Information')
      .setDescription(`${EMOJIS.channel} Channel Name: ${channel.name}\n${EMOJIS.id} Channel ID: ${channel.id}\nChannel Type: ${channelType}\nCategory: ${parentCategory}\nTopic: ${topic}\n ${EMOJIS.inbox} Created At: ${createdAt}
      `)

    await message.channel.send({ embeds: [channelEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default channelInfo
