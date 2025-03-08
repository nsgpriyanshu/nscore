import {
  Message,
  EmbedBuilder,
  PermissionsBitField,
  ColorResolvable,
  PermissionResolvable,
} from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const createrole: MessageCommand = {
  name: 'createrole',
  description: 'Creates a new role in the server.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length < 2) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(
          `${EMOJIS.caution} Usage: \`${BOT.PREFIX}createrole <role_name> <color> [permissions]\``,
        )
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Extract the role name, color, and permissions
    const roleName = args[0]
    const color = args[1].toUpperCase() as ColorResolvable
    const permissions = args.slice(2) as PermissionResolvable[]

    // Validate the hex color
    const hexColorPattern = /^#[0-9A-F]{6}$/i
    if (!hexColorPattern.test(color.toString())) {
      const invalidColorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid hex color specified.`)
      await message.reply({ embeds: [invalidColorEmbed] })
      return
    }

    // Create the role options object
    const roleOptions = {
      name: roleName,
      color: color,
      permissions: permissions.length > 0 ? new PermissionsBitField(permissions) : [],
    }

    // Create the role in the guild
    try {
      const newRole = await message.guild?.roles.create({ ...roleOptions })
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully created the role ${newRole}.`)
      await message.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error creating role:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error creating the role. Please try again.`)
      await message.reply({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['ManageRoles'],
  botPermissions: ['ManageRoles'],
  devOnly: false,
}

export default createrole
