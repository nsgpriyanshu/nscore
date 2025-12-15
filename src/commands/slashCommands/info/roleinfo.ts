import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, Role } from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

// Helper function to convert hex color to RGBA
function hexToRgba(hex: string): string {
  const bigint = parseInt(hex.replace('#', ''), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, 1)`
}

// Helper function to format permissions
function formatPermission(permission: string): string {
  return permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

const roleInfo: SlashCommand = {
  name: 'roleinfo',
  description: 'Displays information about a specific role, including its permissions.',

  data: new SlashCommandBuilder()
    .setName('roleinfo')
    .setDescription('Displays information about a specific role, including its permissions.')
    .addRoleOption(option =>
      option.setName('role').setDescription('Select a role').setRequired(true),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    const role = interaction.options.getRole('role', true)

    if (!(role instanceof Role)) {
      await interaction.reply({
        content: 'Invalid role.',
        ephemeral: true,
      })
      return
    }

    const permissions = role.permissions.toArray().map(formatPermission)

    const rgbaColor = hexToRgba(role.hexColor)

    const roleEmbed = new EmbedBuilder()
      .setColor(role.color || COLORS.lightGray)
      .setTitle('Role Information')
      .setDescription(
        `${EMOJIS.roles} Role Name: ${role.name}
${EMOJIS.id} Role ID: ${role.id}
${EMOJIS.colors} Color:
Hex: ${role.hexColor} • RGBA: ${rgbaColor}
Mentionable: ${role.mentionable ? 'Yes' : 'No'}
Hoisted: ${role.hoist ? 'Yes' : 'No'}
${EMOJIS.inbox} Created At: ${role.createdAt.toDateString()}
${EMOJIS.members} Number of Members: ${role.members.size}
${EMOJIS.permissions} Permissions: ${permissions.length > 0 ? permissions.join(', ') : 'None'}`,
      )

    await interaction.reply({ embeds: [roleEmbed] })
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default roleInfo
