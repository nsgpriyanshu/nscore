import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  GuildMember,
} from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'

const usericon: SlashCommand = {
  name: 'usericon',
  description: 'Displays the profile of the user who triggered the command.',

  data: new SlashCommandBuilder()
    .setName('usericon')
    .setDescription('Displays the profile of the user who triggered the command.')
    .addUserOption(option =>
      option.setName('user').setDescription('Select a user').setRequired(false),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const member = (interaction.options.getMember('user') as GuildMember) || interaction.member

    if (!member) {
      const uE = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} Please mention a valid user or provide a valid user ID.`)
        .setTimestamp()

      await interaction.reply({ embeds: [uE], ephemeral: true })
      return
    }

    const profileEmbed = new EmbedBuilder()
      // .setColor(COLORS.blue)
      .setTitle(`${EMOJIS.seo} ${member.displayName}'s Profile Picture`)
      .setImage(member.user.avatarURL())

    await interaction.reply({ embeds: [profileEmbed] })
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default usericon
