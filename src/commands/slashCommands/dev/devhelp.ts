import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
  MessageComponentInteraction,
  SlashCommandBuilder,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'
import path from 'path'
import { loadSlashCommandsFromDirectory } from '../../../utils/commandDiscovery'

const devHelp: SlashCommand = {
  name: 'devhelp',
  description: 'Lists all available developer commands.',

  data: new SlashCommandBuilder()
    .setName('devhelp')
    .setDescription('Lists all available developer commands.'),

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    const devCommands = loadSlashCommandsFromDirectory(
      path.join(__dirname, '../../../commands/slashCommands/dev'),
    )

    const generateEmbed = (category: string, commands: SlashCommand[]): EmbedBuilder => {
      const commandDescriptions = commands
        .map(cmd => `\`${cmd.name.padEnd(10)}\`     ${cmd.description}`)
        .join('\n')

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
