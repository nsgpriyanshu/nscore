import { EmbedBuilder, Message } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'
import { BOT } from '../../../configs/metadata'

const inviteInfo: MessageCommand = {
  name: 'inviteinfo',
  description: 'Displays information about an invite.',
  async executeMessage(message: Message, args: string[]) {
    const inviteCode = args[0]

    if (!inviteCode) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(`${EMOJIS.caution} Usage: \`${BOT.PREFIX}inviteinfo <invite_code/link>\``)
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    try {
      const invite = await message.client.fetchInvite(inviteCode)
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

      await message.channel.send({ embeds: [inviteEmbed] })
    } catch (error) {
      console.error('Error fetching invite:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error fetching the invite. Please make sure the invite code is correct and try again.`,
        )
      await message.channel.send({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default inviteInfo
