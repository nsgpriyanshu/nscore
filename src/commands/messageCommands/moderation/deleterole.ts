import { Message, EmbedBuilder, Role } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const deleterole: MessageCommand = {
  name: 'deleterole',
  description: 'Deletes a role from the server.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length < 1) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(`${EMOJIS.caution} Usage: \`${BOT.PREFIX}deleterole <@role>\``)
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Get the mentioned role
    const role = message.mentions.roles.first()

    // Check if a role was mentioned
    if (!role) {
      const invalidRoleEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Please mention a valid role to delete.`)
      await message.reply({ embeds: [invalidRoleEmbed] })
      return
    }

    // Delete the role
    try {
      await role.delete()
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully deleted the role ${role.name}.`)
      await message.channel.send({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error deleting role:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error deleting the role. Please try again.`)
      await message.channel.send({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['ManageRoles'],
  botPermissions: ['ManageRoles'],
  devOnly: false,
}

export default deleterole
