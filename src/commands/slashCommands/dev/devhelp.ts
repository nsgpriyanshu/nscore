import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
  MessageComponentInteraction,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'
import fs from 'fs'
import path from 'path'

// Helper function to load commands from a directory
const loadCommandsFromDirectory = (dir: string): SlashCommand[] => {
  const commands: SlashCommand[] = []
  const commandFiles = fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.js') || file.endsWith('.ts'))

  for (const file of commandFiles) {
    const command = require(path.join(dir, file)).default as SlashCommand
    commands.push(command)
  }

  return commands
}

const devHelp: SlashCommand = {
  name: 'devhelp',
  description: 'Lists all available developer commands.',

  data: {
    name: 'devhelp',
    description: 'Lists all available developer commands.',
  } as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
    const devCommands = loadCommandsFromDirectory(
      path.join(__dirname, '../../../commands/slashCommands/dev'),
    )

    const generateEmbed = (category: string, commands: SlashCommand[]): EmbedBuilder => {
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

    const devEmbed = generateEmbed('dev', devCommands)

    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('seen')
        .setLabel('Seen')
        .setEmoji(`${EMOJIS.seen}`)
        .setStyle(ButtonStyle.Secondary),
    )

    const sentMessage = await interaction.reply({
      embeds: [devEmbed],
      components: [actionRow],
      fetchReply: true,
    })

    const filter = (i: MessageComponentInteraction) => i.user.id === interaction.user.id

    const collector = sentMessage.createMessageComponentCollector({
      filter,
      componentType: ComponentType.Button,
      time: 120000, // 2 minutes
    })

    collector.on('collect', async (i: MessageComponentInteraction) => {
      if (i.customId === 'seen') {
        await i.update({ embeds: [devEmbed] })
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
