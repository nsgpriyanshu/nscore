import { EmbedBuilder, Message } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'

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
    if (user.flags.has('TeamPseudoUser')) badges.push('Team User')
    if (user.flags.has('VerifiedBot')) badges.push('Verified Bot')
    if (user.flags.has('VerifiedDeveloper')) badges.push('Early Verified Bot Developer')
    if (user.flags.has('ActiveDeveloper')) badges.push('Active Bot Developer')
  }

  return badges.length > 0 ? badges.join(', ') : 'None'
}

const userinfo: MessageCommand = {
  name: 'info',
  description: 'Displays information about a user.',
  async executeMessage(message: Message, args: string[]) {
    // Get the user mentioned or use the message author
    const user =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]) ||
      message.member

    if (!user) {
      const uE = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} Please mention a valid user or provide a valid user ID.`)
        .setTimestamp()
      await message.reply({ embeds: [uE] })
      return
    }

    const roles =
      user.roles.cache
        .filter(role => role.id !== message.guild?.id)
        .map(role => `<@&${role.id}>`)
        .join(', ') || 'No roles'

    const badges = getUserBadges(user.user)

    const userInfoEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('User Information')
      .setDescription(
        `${EMOJIS.username} Username: ${user.user.username}\n${user.user.id} User ID: ${user.id}\n${EMOJIS.inbox} Dates:\nJoined Discord: ${user.user.createdAt.toDateString()}\nJoined Server: ${user.joinedAt?.toDateString() || 'Unknown'}\n${EMOJIS.badges} Badges: ${badges}\n${EMOJIS.roles} Roles: ${roles}`,
      )
      .setThumbnail(user.user.avatarURL())

    await message.channel.send({ embeds: [userInfoEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default userinfo
