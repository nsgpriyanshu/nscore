import { EmbedBuilder, Message, Role, PermissionsBitField } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'

// Helper function to convert hex color to RGBA
function hexToRgba(hex: string): string {
  const bigint = parseInt(hex.replace('#', ''), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, 1)`
}

const roleInfo: MessageCommand = {
  name: 'roleinfo',
  description: 'Displays information about a specific role, including its permissions.',
  async executeMessage(message: Message, args: string[]) {
    // Check if a role was mentioned or provided as an argument
    const role = message.mentions.roles.first() || message.guild?.roles.cache.get(args[0])

    if (!role) {
      const rE = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Opps!')
        .setDescription(`${EMOJIS.failed} Please mention a valid role or provide a valid role ID.`)
        .setTimestamp()
      await message.reply({ embeds: [rE] })
      return
    }

    // Helper function to convert camel case to readable format
    function formatPermission(permission: string): string {
      return permission
        .replace(/([A-Z])/g, ' $1') // Add space before each capital letter
        .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
    }
    // Convert permissions to a readable format
    const permissions = role.permissions.toArray().map(formatPermission)

    const rgbaColor = hexToRgba(role.hexColor)

    const roleEmbed = new EmbedBuilder()
      .setColor(role.color || COLORS.lightGray)
      .setTitle('Role Information')
      .setDescription(
        `${EMOJIS.roles} Role Name: ${role.name}\n${EMOJIS.id} Role ID: ${role.id}\n${EMOJIS.colors} Color:\nHex: ${role.hexColor} • RGBA: ${rgbaColor}\nMentionable: ${role.mentionable ? 'Yes' : 'No'}\nHoisted: ${role.hoist ? 'Yes' : 'No'}\n${EMOJIS.inbox} Created At: ${role.createdAt?.toDateString()}\n${EMOJIS.members} Number of Members: ${role.members.size}\n${EMOJIS.permissions} Permissions: ${permissions.length > 0 ? permissions.join(', ') : 'None'}`,
      )

    await message.reply({ embeds: [roleEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default roleInfo
