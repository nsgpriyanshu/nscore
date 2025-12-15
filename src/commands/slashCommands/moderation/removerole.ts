import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  Role,
  GuildMember,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const removeRole: SlashCommand = {
  name: 'removerole',
  description: 'Removes a specified role from a user.',

  data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('Removes a specified role from a user.')
    .addUserOption(option =>
      option.setName('user').setDescription('The user to remove the role from').setRequired(true),
    )
    .addRoleOption(option =>
      option.setName('role').setDescription('The role to remove').setRequired(true),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    if (!interaction.guild) {
      await interaction.reply({
        content: `${EMOJIS.failed} This command can only be used in a server.`,
        ephemeral: true,
      })
      return
    }

    const member = interaction.options.getMember('user') as GuildMember
    const role = interaction.options.getRole('role') as Role

    if (!member) {
      const invalidUserEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid user specified.`)
      await interaction.reply({ embeds: [invalidUserEmbed], ephemeral: true })
      return
    }

    if (!role) {
      const invalidRoleEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid role specified.`)
      await interaction.reply({ embeds: [invalidRoleEmbed], ephemeral: true })
      return
    }

    try {
      await member.roles.remove(role)
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(
          `${EMOJIS.success} Successfully removed the role ${role.name} from ${member.displayName}.`,
        )
      await interaction.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error removing role:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error removing the role. Please try again.`)
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },

  userPermissions: ['ManageRoles'],
  botPermissions: ['ManageRoles'],
  devOnly: false,
}

export default removeRole
