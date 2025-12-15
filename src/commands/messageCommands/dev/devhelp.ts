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
import fs from 'fs'
import path from 'path'

// Helper function to load commands from a directory
const loadCommandsFromDirectory = (dir: string): MessageCommand[] => {
  const commands: MessageCommand[] = []
  const commandFiles = fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.js') || file.endsWith('.ts'))

  for (const file of commandFiles) {
    const command = require(path.join(dir, file)).default as MessageCommand
    commands.push(command)
  }

  return commands
}

const devHelp: MessageCommand = {
  name: 'devhelp',
  description: 'Lists all available developer commands.',
  async executeMessage(message: Message, args: string[], client: ExtendedClient) {
    // Load commands from directories
    const devCommands = loadCommandsFromDirectory(
      path.join(__dirname, '../../../commands/messageCommands/dev'),
    )

    // Function to generate embed for a specific category
    const generateEmbed = (category: string, commands: MessageCommand[]): EmbedBuilder => {
      const commandDescriptions = commands
        .map(cmd => `\`${cmd.name.padEnd(10)}\`     ${cmd.description}`)
        .join('\n')

      return (
        new EmbedBuilder()
          //.setColor(COLORS.blue)
          .setTitle(`${EMOJIS.devlopers} Help - ${category} Commands`)
          .setDescription(commandDescriptions)
          .addFields({
            name: `${EMOJIS.leaf} Resources`,
            value:
              '[Docs](https://github.com/nsgpriyanshu/nscorebot)\n[Support Server](https://discord.gg/QhDM7s6Aps)',
            inline: true,
          })
      )
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
