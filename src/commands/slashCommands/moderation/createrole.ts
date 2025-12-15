import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  ColorResolvable,
  PermissionsBitField,
  PermissionResolvable,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const createRole: SlashCommand = {
  name: 'createrole',
  description: 'Creates a new role in the server.',

  data: new SlashCommandBuilder()
    .setName('createrole')
    .setDescription('Creates a new role in the server.')
    .addStringOption(option =>
      option.setName('role_name').setDescription('Name of the role').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('color').setDescription('Hex color of the role (e.g., #FF0000)').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('permissions').setDescription('Optional permissions, comma separated').setRequired(false),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    if (!interaction.guild) {
      await interaction.reply({
        content: `${EMOJIS.failed} This command can only be used in a server.`,
        ephemeral: true,
      })
      return
    }

    const roleName = interaction.options.getString('role_name', true)
    const color = interaction.options.getString('color', true).toUpperCase() as ColorResolvable
    const permissionsInput = interaction.options.getString('permissions')
    const permissions: PermissionResolvable[] = permissionsInput
      ? permissionsInput.split(',').map(p => p.trim() as PermissionResolvable)
      : []

    const hexColorPattern = /^#[0-9A-F]{6}$/i
    if (!hexColorPattern.test(color.toString())) {
      const invalidColorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid hex color specified.`)
      await interaction.reply({ embeds: [invalidColorEmbed], ephemeral: true })
      return
    }

    const roleOptions = {
      name: roleName,
      color: color,
      permissions: permissions.length > 0 ? new PermissionsBitField(permissions) : [],
    }

    try {
      const newRole = await interaction.guild.roles.create({ ...roleOptions })
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully created the role ${newRole}.`)
      await interaction.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error creating role:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error creating the role. Please try again.`)
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },

  userPermissions: ['ManageRoles'],
  botPermissions: ['ManageRoles'],
  devOnly: false,
}

export default createRole
