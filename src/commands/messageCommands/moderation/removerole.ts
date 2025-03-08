import { Message, EmbedBuilder } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const removerole: MessageCommand = {
  name: 'removerole',
  description: 'Removes a specified role from a user.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length < 2) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(`${EMOJIS.caution} Usage: \`${BOT.PREFIX}removerole <user> <role>\``)
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Extract the user and role from the arguments
    const userMention = args[0]
    const roleName = args.slice(1).join(' ')

    // Get the user and role objects from the guild
    const member =
      message.mentions.members?.first() || message.guild?.members.cache.get(userMention)
    const role = message.guild?.roles.cache.find(role => role.name === roleName)

    // Validate the user and role
    if (!member) {
      const invalidUserEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid user specified.`)
      await message.reply({ embeds: [invalidUserEmbed] })
      return
    }

    if (!role) {
      const invalidRoleEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid role specified.`)
      await message.reply({ embeds: [invalidRoleEmbed] })
      return
    }

    // Remove the role from the user
    try {
      await member.roles.remove(role)
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(
          `${EMOJIS.success} Successfully removed the role ${role.name} from ${member.displayName}.`,
        )
      await message.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error removing role:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error removing the role. Please try again.`)
      await message.reply({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['ManageRoles'],
  botPermissions: ['ManageRoles'],
  devOnly: false,
}

export default removerole
