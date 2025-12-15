import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  GuildEmoji,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const updateEmoji: SlashCommand = {
  name: 'updateemoji',
  description: 'Updates the name of an existing emoji in the server.',

  data: new SlashCommandBuilder()
    .setName('updateemoji')
    .setDescription('Updates the name of an existing emoji in the server.')
    .addStringOption(option =>
      option
        .setName('emoji')
        .setDescription('The emoji to update (must be from this server)')
        .setRequired(true),
    )
    .addStringOption(option =>
      option.setName('new_name').setDescription('The new name for the emoji').setRequired(true),
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
    const newName = interaction.options.getString('new_name', true)

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
      await emoji.edit({ name: newName })
      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully updated the emoji name to \`${newName}\`.`)
      await interaction.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error updating emoji name:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error updating the emoji name. Please try again.`,
        )
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },

  userPermissions: ['ManageEmojisAndStickers'],
  botPermissions: ['ManageEmojisAndStickers'],
  devOnly: false,
}

export default updateEmoji
