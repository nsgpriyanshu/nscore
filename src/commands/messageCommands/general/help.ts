import {
  Message,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
  MessageComponentInteraction,
} from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'
import path from 'path'
import { loadMessageCommandsFromDirectory } from '../../../utils/commandDiscovery'
import { formatCommandHelpLine } from '../../../utils/messageCommandHelp'

const help: MessageCommand = {
  name: 'help',
  aliases: ['h', 'commands'],
  description: 'Lists all available commands.',
  async executeMessage(message: Message, _args: string[], _client: ExtendedClient) {
    // Load commands from directories
    const generalCommands = loadMessageCommandsFromDirectory(
      path.join(__dirname, '../../../commands/messageCommands/general'),
    )
    const infoCommands = loadMessageCommandsFromDirectory(
      path.join(__dirname, '../../../commands/messageCommands/info'),
    )
    const moderationCommands = loadMessageCommandsFromDirectory(
      path.join(__dirname, '../../../commands/messageCommands/moderation'),
    )

    // Function to generate embed for a specific category
    const generateEmbed = (category: string, commands: MessageCommand[]): EmbedBuilder => {
      const commandDescriptions = commands.map(cmd => formatCommandHelpLine(cmd)).join('\n\n')

      return new EmbedBuilder()
        .setTitle(`${EMOJIS.home} Help - ${category} Commands`)
        .setDescription(commandDescriptions)
        .addFields({
          name: `${EMOJIS.leaf} Resources`,
          value:
            '[Docs](https://nsgpriyanshu.github.io/nscore/)\n[Support Server](https://discord.gg/QhDM7s6Aps)',
          inline: true,
        })
    }

    // Create initial embeds
    const generalEmbed = generateEmbed('General', generalCommands)
    const infoEmbed = generateEmbed('Info', infoCommands)
    const moderationEmbed = generateEmbed('Moderation', moderationCommands)

    // Create buttons for pagination
    const hR = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('general')
        .setLabel('General')
        .setEmoji(`${EMOJIS.ar}`)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('info')
        .setLabel('Info')
        .setEmoji(`${EMOJIS.ar}`)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('moderation')
        .setLabel('Moderation')
        .setEmoji(`${EMOJIS.ar}`)
        .setStyle(ButtonStyle.Secondary),
    )

    // Send initial embed with buttons
    const sentMessage = await message.reply({
      embeds: [generalEmbed],
      components: [hR],
    })

    // Create a filter for the button interaction
    const filter = (interaction: MessageComponentInteraction) =>
      interaction.user.id === message.author.id

    // Create a collector to handle button interactions
    const collector = sentMessage.createMessageComponentCollector({
      filter,
      componentType: ComponentType.Button,
      time: 120000, // 2 minute
    })

    collector.on('collect', async (interaction: MessageComponentInteraction) => {
      if (interaction.customId === 'general') {
        await interaction.update({ embeds: [generalEmbed] })
      } else if (interaction.customId === 'info') {
        await interaction.update({ embeds: [infoEmbed] })
      } else if (interaction.customId === 'moderation') {
        await interaction.update({ embeds: [moderationEmbed] })
      }
    })

    collector.on('end', async () => {
      await sentMessage.edit({ components: [] })
    })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default help
