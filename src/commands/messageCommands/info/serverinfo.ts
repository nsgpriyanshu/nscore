import {
  EmbedBuilder,
  Message,
  TextChannel,
  VoiceChannel,
  CategoryChannel,
  NewsChannel,
  StageChannel,
  ThreadChannel,
} from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'

const serverinfo: MessageCommand = {
  name: 'serverinfo',
  description: 'Displays information about the server.',
  async executeMessage(message: Message, args: string[]) {
    const { guild } = message

    if (!guild) {
      const eS = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} This command can only be used in a server.`)
        .setTimestamp()
      await message.reply({ embeds: [eS] })
      return
    }

    const owner = await guild.fetchOwner()

    // Separate members into users and bots
    const members = guild.members.cache
    const botCount = members.filter(member => member.user.bot).size
    const userCount = members.size - botCount

    const roles =
      guild.roles.cache
        .filter(role => role.id !== guild.id)
        .map(role => `<@&${role.id}>`)
        .join(', ') || 'No roles'

    // Count channels by type
    const textChannels = guild.channels.cache.filter(channel => channel instanceof TextChannel).size
    const voiceChannels = guild.channels.cache.filter(
      channel => channel instanceof VoiceChannel,
    ).size
    const newsChannels = guild.channels.cache.filter(channel => channel instanceof NewsChannel).size
    const stageChannels = guild.channels.cache.filter(
      channel => channel instanceof StageChannel,
    ).size
    const categoryChannels = guild.channels.cache.filter(
      channel => channel instanceof CategoryChannel,
    ).size
    const threadChannels = guild.channels.cache.filter(
      channel => channel instanceof ThreadChannel,
    ).size

    // Count emojis
    const emojiCount = guild.emojis.cache.size

    const serverInfoEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('Server Information')
      .setDescription(
        `${EMOJIS.server} Server Name: ${guild.name}\n${EMOJIS.id} Server ID: ${guild.id}\nServer Description: ${guild.description || 'No description set'}\n${EMOJIS.crown} Owner: ${owner.user.tag}\n${EMOJIS.id} Id: ${owner.id}\n${EMOJIS.inbox} Created At: ${guild.createdAt.toDateString()}\n${EMOJIS.members} Users ${guild.memberCount}:\nMembers: ${userCount}, Bots: ${botCount}\n${EMOJIS.channel} Channels:\nText Channels ${textChannels}\nVoice Channels: ${voiceChannels}\nNews Channels: ${newsChannels}\nStage Channels: ${stageChannels}\nCategory Channels: ${categoryChannels}\nThread Channels: ${threadChannels}\n${EMOJIS.fun} Emojis: ${emojiCount}\n${EMOJIS.roles} Roles: ${guild.roles.cache.size}\n${roles}`,
      )
      .setThumbnail(guild.iconURL())

    // If the server has a banner, add it to the embed
    if (guild.banner) {
      serverInfoEmbed.setImage(guild.bannerURL())
    }

    await message.channel.send({ embeds: [serverInfoEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default serverinfo
