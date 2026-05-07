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

const devHelp: MessageCommand = {
  name: 'devhelp',
  aliases: ['dh'],
  description: 'Lists all available developer commands.',
  async executeMessage(message: Message, _args: string[], _client: ExtendedClient) {
    // Load commands from directories
    const devCommands = loadMessageCommandsFromDirectory(
      path.join(__dirname, '../../../commands/messageCommands/dev'),
    )

    // Function to generate embed for a specific category
    const generateEmbed = (category: string, commands: MessageCommand[]): EmbedBuilder => {
      const commandDescriptions = commands.map(cmd => formatCommandHelpLine(cmd)).join('\n\n')

      return new EmbedBuilder()
        .setTitle(`${EMOJIS.devlopers} Help - ${category} Commands`)
        .setDescription(commandDescriptions)
        .addFields({
          name: `${EMOJIS.leaf} Resources`,
          value:
            '[Docs](https://github.com/nsgpriyanshu/nscorebot)\n[Support Server](https://discord.gg/QhDM7s6Aps)',
          inline: true,
        })
    }

    // Create initial embeds
    const devEmbed = generateEmbed('dev', devCommands)

    // Create buttons for pagination
    const hR = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('seen')
        .setLabel('Seen')
        .setEmoji(`${EMOJIS.seen}`)
        .setStyle(ButtonStyle.Secondary),
    )

    // Send initial embed with buttons
    const sentMessage = await message.reply({
      embeds: [devEmbed],
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
      if (interaction.customId === 'seen') {
        await interaction.update({ embeds: [devEmbed] })
      }
    })

    collector.on('end', async () => {
      await sentMessage.edit({ components: [] })
    })
  },
  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: true,
}

export default devHelp
