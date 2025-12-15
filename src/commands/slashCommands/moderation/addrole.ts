import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  GuildMember,
  Role,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const addrole: SlashCommand = {
  name: 'addrole',
  description: 'Assigns a role to a user.',

  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Assigns a role to a user.')
    .addUserOption(option =>
      option.setName('user').setDescription('Select a user').setRequired(true),
    )
    .addRoleOption(option =>
      option.setName('role').setDescription('Select a role to assign').setRequired(true),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    const member = interaction.options.getMember('user') //true
    const role = interaction.options.getRole('role', true)

    if (!(member instanceof GuildMember)) {
      await interaction.reply({
        content: `${EMOJIS.failed} Invalid user.`,
        ephemeral: true,
      })
      return
    }

    if (!(role instanceof Role)) {
      await interaction.reply({
        content: `${EMOJIS.failed} Invalid role.`,
        ephemeral: true,
      })
      return
    }

    try {
      await member.roles.add(role)

      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully assigned the role ${role} to ${member}.`)

      await interaction.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error adding role:', error)

      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error assigning the role. Please check role hierarchy and permissions.`,
        )

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },

  userPermissions: ['ManageRoles'],
  botPermissions: ['ManageRoles'],
  devOnly: false,
}

export default addrole
