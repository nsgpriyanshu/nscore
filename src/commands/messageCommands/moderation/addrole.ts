import { Message, EmbedBuilder } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'

const addrole: MessageCommand = {
  name: 'addrole',
  description: 'Assigns a role to a user.',
  async executeMessage(message: Message, args: string[]) {
    // Check if the correct number of arguments is provided
    if (args.length < 2) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(`${EMOJIS.caution} Usage: \`${BOT.PREFIX}addrole <@user> <@role>\``)
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    // Extract the user mention or ID and the role mention or ID
    const userMention = args[0]
    const roleMention = args[1]

    // Find the user
    const user =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(userMention.replace(/[<@!>]/g, ''))

    if (!user) {
      const noUserEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Please mention a valid user or provide a valid user ID.`)
      await message.reply({ embeds: [noUserEmbed] })
      return
    }

    // Find the role
    const role =
      message.mentions.roles.first() ||
      message.guild?.roles.cache.get(roleMention.replace(/[<@&>]/g, ''))

    if (!role) {
      const noRoleEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Please mention a valid role or provide a valid role ID.`)
      await message.reply({ embeds: [noRoleEmbed] })
      return
    }

    // Assign the role to the user
    try {
      await user.roles.add(role)
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully assigned the role ${role} to ${user}.`)
      await message.channel.send({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error adding role:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error assigning the role. Please try again.`)
      await message.channel.send({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['ManageRoles'],
  botPermissions: ['ManageRoles'],
  devOnly: false,
}

export default addrole
