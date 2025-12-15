import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  ChannelType,
  TextChannel,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const createChannel: SlashCommand = {
  name: 'createchannel',
  description: 'Creates a new text channel in the server with an optional description.',

  data: new SlashCommandBuilder()
    .setName('createchannel')
    .setDescription('Creates a new text channel in the server.')
    .addStringOption(option =>
      option.setName('name').setDescription('Name of the channel').setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('Optional channel topic/description')
        .setRequired(false),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    const channelName = interaction.options.getString('name', true)
    const description = interaction.options.getString('description')

    if (!interaction.guild) {
      await interaction.reply({
        content: `${EMOJIS.failed} This command can only be used in a server.`,
        ephemeral: true,
      })
      return
    }

    try {
      const newChannel = (await interaction.guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        topic: description ?? undefined,
        reason: `Requested by ${interaction.user.tag}`,
      })) as TextChannel

      const successEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setDescription(`${EMOJIS.success} Successfully created the channel ${newChannel}.`)

      await interaction.reply({ embeds: [successEmbed] })
    } catch (error) {
      console.error('Error creating channel:', error)

      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error creating the channel. Please check permissions and try again.`,
        )

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  },

  userPermissions: ['ManageChannels'],
  botPermissions: ['ManageChannels'],
  devOnly: false,
}

export default createChannel
