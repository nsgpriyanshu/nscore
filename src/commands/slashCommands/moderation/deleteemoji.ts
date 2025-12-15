import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  GuildEmoji,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const deleteEmoji: SlashCommand = {
  name: 'deleteemoji',
  description: 'Deletes an existing emoji from the server.',

  data: new SlashCommandBuilder()
    .setName('deleteemoji')
    .setDescription('Deletes an existing emoji from the server.')
    .addStringOption(option =>
      option
        .setName('emoji')
        .setDescription('The emoji to delete (must be from this server)')
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

    const emojiInput = interaction.options.getString('emoji', true)
    const emoji = interaction.guild.emojis.cache.find(
      e => e.toString() === emojiInput,
    ) as GuildEmoji

    if (!emoji) {
      const invalidEmojiEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Please provide a valid emoji from this server.`)
      await interaction.reply({ embeds: [invalidEmojiEmbed], ephemeral: true })
      return
    }

    try {
      await emoji.delete()
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully deleted the emoji.`)
      await interaction.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error deleting emoji:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} There was an error deleting the emoji. Please try again.`)
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },

  userPermissions: ['ManageEmojisAndStickers'],
  botPermissions: ['ManageEmojisAndStickers'],
  devOnly: false,
}

export default deleteEmoji
