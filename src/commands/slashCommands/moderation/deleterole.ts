import { ChatInputCommandInteraction, EmbedBuilder, Role, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'

const deleterole: SlashCommand = {
  name: 'deleterole',
  description: 'Deletes a role from the server.',

  data: new SlashCommandBuilder()
    .setName('deleterole')
    .setDescription('Deletes a role from the server.')
    .addRoleOption(option =>
      option.setName('role').setDescription('Role to delete').setRequired(true),
    ) as SlashCommand['data'],

  userPermissions: ['ManageRoles'],
  botPermissions: ['ManageRoles'],
  devOnly: false,

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const role = interaction.options.getRole('role') as Role

    if (!role) {
      const invalidRoleEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Please provide a valid role to delete.`)
      await interaction.reply({ embeds: [invalidRoleEmbed], ephemeral: true })
      return
    }

    try {
      await role.delete()
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully deleted the role ${role.name}.`)
      await interaction.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error deleting role:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error deleting the role. Please try again.`)
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },
}

export default deleterole
