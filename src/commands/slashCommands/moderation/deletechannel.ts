import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const deleteChannel: SlashCommand = {
  name: 'deletechannel',
  description: 'Deletes a specified channel in the server.',

  data: new SlashCommandBuilder()
    .setName('deletechannel')
    .setDescription('Deletes a specified channel in the server.')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to delete')
        .setRequired(true),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    if (!interaction.guild) {
      await interaction.reply({
        content: `${EMOJIS.failed} This command can only be used in a server.`,
        ephemeral: true,
      })
      return
    }

    const channel = interaction.options.getChannel('channel', true) as TextChannel
    if (!channel || channel.type !== 0) { // 0 = GuildText
      const invalidChannelEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Invalid channel specified.`)
      await interaction.reply({ embeds: [invalidChannelEmbed], ephemeral: true })
      return
    }

    try {
      await channel.delete(`Requested by ${interaction.user.tag}`)

      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully deleted the channel ${channel.name}.`)
      await interaction.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error deleting channel:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error deleting the channel. Please try again.`)
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },

  userPermissions: ['ManageChannels'],
  botPermissions: ['ManageChannels'],
  devOnly: false,
}

export default deleteChannel
