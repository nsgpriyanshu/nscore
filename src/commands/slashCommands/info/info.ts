import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  GuildMember,
} from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'

// Helper function to get user badges
function getUserBadges(user: any): string {
  const badges = []

  if (user.flags) {
    if (user.flags.has('Staff')) badges.push('Discord Staff')
    if (user.flags.has('Partner')) badges.push('Partnered Server Owner')
    if (user.flags.has('Hypesquad')) badges.push('HypeSquad Events')
    if (user.flags.has('BugHunterLevel1')) badges.push('Bug Hunter Level 1')
    if (user.flags.has('BugHunterLevel2')) badges.push('Bug Hunter Level 2')
    if (user.flags.has('HypeSquadOnlineHouse1')) badges.push('House Bravery')
    if (user.flags.has('HypeSquadOnlineHouse2')) badges.push('House Brilliance')
    if (user.flags.has('HypeSquadOnlineHouse3')) badges.push('House Balance')
    if (user.flags.has('PremiumEarlySupporter')) badges.push('Early Supporter')
    if (user.flags.has('VerifiedBot')) badges.push('Verified Bot')
    if (user.flags.has('VerifiedDeveloper')) badges.push('Early Verified Bot Developer')
    if (user.flags.has('ActiveDeveloper')) badges.push('Active Bot Developer')
  }

  return badges.length > 0 ? badges.join(', ') : 'None'
}

const userinfo: SlashCommand = {
  name: 'info',
  description: 'Displays information about a user.',
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays information about a user.')
    .addUserOption(option =>
      option.setName('user').setDescription('Select a user').setRequired(false),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const member = (interaction.options.getMember('user') as GuildMember) || interaction.member

    if (!member || !interaction.guild) {
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} Unable to fetch user information.`)

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
      return
    }

    const roles =
      member.roles.cache
        .filter(role => role.id !== interaction.guild!.id)
        .map(role => `<@&${role.id}>`)
        .join(', ') || 'No roles'

    const badges = getUserBadges(member.user)

    const userInfoEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('User Information')
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(
        `${EMOJIS.username} Username: ${member.user.username}
${member.user.id} User ID: ${member.id}

${EMOJIS.inbox} Dates:
Joined Discord: ${member.user.createdAt.toDateString()}
Joined Server: ${member.joinedAt?.toDateString() || 'Unknown'}

${EMOJIS.badges} Badges: ${badges}
${EMOJIS.roles} Roles: ${roles}`,
      )

    await interaction.reply({ embeds: [userInfoEmbed] })
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default userinfo
