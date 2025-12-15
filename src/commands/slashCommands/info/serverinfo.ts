import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  ChannelType,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const serverinfo: SlashCommand = {
  name: 'serverinfo',
  description: 'Displays information about the server.',

  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays information about the server.'),

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    const guild = interaction.guild

    if (!guild) {
      const eS = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} This command can only be used in a server.`)
        .setTimestamp()

      await interaction.reply({ embeds: [eS], ephemeral: true })
      return
    }

    const owner = await guild.fetchOwner()

    // Separate users & bots
    const members = guild.members.cache
    const botCount = members.filter(m => m.user.bot).size
    const userCount = members.size - botCount

    const roles =
      guild.roles.cache
        .filter(role => role.id !== guild.id)
        .map(role => `<@&${role.id}>`)
        .join(', ') || 'No roles'

    // Channel counts by type
    const channels = guild.channels.cache

    const textChannels = channels.filter(c => c.type === ChannelType.GuildText).size
    const voiceChannels = channels.filter(c => c.type === ChannelType.GuildVoice).size
    const newsChannels = channels.filter(c => c.type === ChannelType.GuildAnnouncement).size
    const stageChannels = channels.filter(c => c.type === ChannelType.GuildStageVoice).size
    const categoryChannels = channels.filter(c => c.type === ChannelType.GuildCategory).size
    const threadChannels = channels.filter(c =>
      [
        ChannelType.PublicThread,
        ChannelType.PrivateThread,
        ChannelType.AnnouncementThread,
      ].includes(c.type),
    ).size

    const emojiCount = guild.emojis.cache.size

    const serverInfoEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('Server Information')
      .setDescription(
        `${EMOJIS.server} Server Name: ${guild.name}
${EMOJIS.id} Server ID: ${guild.id}
Server Description: ${guild.description || 'No description set'}

${EMOJIS.crown} Owner: ${owner.user.tag}
${EMOJIS.id} Id: ${owner.id}
${EMOJIS.inbox} Created At: ${guild.createdAt.toDateString()}

${EMOJIS.members} Users ${guild.memberCount}:
Members: ${userCount}, Bots: ${botCount}

${EMOJIS.channel} Channels:
Text Channels: ${textChannels}
Voice Channels: ${voiceChannels}
News Channels: ${newsChannels}
Stage Channels: ${stageChannels}
Category Channels: ${categoryChannels}
Thread Channels: ${threadChannels}

${EMOJIS.fun} Emojis: ${emojiCount}
${EMOJIS.roles} Roles: ${guild.roles.cache.size}
${roles}`,
      )
      .setThumbnail(guild.iconURL())

    if (guild.banner) {
      serverInfoEmbed.setImage(guild.bannerURL())
    }

    await interaction.reply({ embeds: [serverInfoEmbed] })
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default serverinfo
