import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'

const inviteInfo: SlashCommand = {
  name: 'inviteinfo',
  description: 'Displays information about an invite.',

  data: new SlashCommandBuilder()
    .setName('inviteinfo')
    .setDescription('Displays information about an invite.')
    .addStringOption(option =>
      option.setName('invite').setDescription('Invite code or full invite link').setRequired(true),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const inviteCode = interaction.options.getString('invite', true)

    try {
      const invite = await interaction.client.fetchInvite(inviteCode)

      const inviteEmbed = new EmbedBuilder()
        //.setColor(COLORS.blue)
        .setTitle('Invite Information')
        .setDescription(`${EMOJIS.link} Invite Code: \`${invite.code}\``)
        .addFields(
          { name: `${EMOJIS.server} Server`, value: invite.guild?.name ?? 'N/A', inline: true },
          { name: `${EMOJIS.channel} Channel`, value: invite.channel?.name ?? 'N/A', inline: true },
          { name: `${EMOJIS.username} Inviter`, value: invite.inviter?.tag ?? 'N/A', inline: true },
          { name: `${EMOJIS.members} Member Count`, value: `${invite.memberCount}`, inline: true },
          { name: `Uses`, value: `${invite.uses}`, inline: true },
          {
            name: `${EMOJIS.inbox} Created At`,
            value: `${invite.createdAt?.toLocaleString() ?? 'N/A'}`,
            inline: true,
          },
          {
            name: `Expires At`,
            value: `${invite.expiresAt?.toLocaleString() ?? 'N/A'}`,
            inline: true,
          },
        )

      await interaction.reply({ embeds: [inviteEmbed] })
    } catch (error) {
      console.error('Error fetching invite:', error)

      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error fetching the invite. Please make sure the invite code is correct and try again.`,
        )

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default inviteInfo
