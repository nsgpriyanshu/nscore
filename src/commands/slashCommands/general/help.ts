import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ComponentType,
  EmbedBuilder,
  MessageComponentInteraction,
  SlashCommandBuilder,
} from 'discord.js'
import path from 'path'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'
import { loadMessageCommandsFromDirectory } from '../../../utils/commandDiscovery'

const commandGroups = [
  { id: 'general', label: 'General' },
  { id: 'info', label: 'Info' },
  { id: 'moderation', label: 'Moderation' },
] as const

const buildHelpEmbed = (category: string, commands: { name: string; description?: string }[]) => {
  const description =
    commands
      .map(
        command => `\`${command.name.padEnd(10)}\`     ${command.description || 'No description'}`,
      )
      .join('\n') || 'No commands found.'

  return new EmbedBuilder()
    .setColor(COLORS.blue)
    .setTitle(`${EMOJIS.home} Help - ${category} Commands`)
    .setDescription(description)
    .addFields({
      name: `${EMOJIS.leaf} Resources`,
      value:
        '[Docs](https://nsgpriyanshu.github.io/nscore/)\n[Support Server](https://discord.gg/QhDM7s6Aps)',
      inline: true,
    })
}

const buildButtons = () =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    ...commandGroups.map(group =>
      new ButtonBuilder()
        .setCustomId(group.id)
        .setLabel(group.label)
        .setEmoji(EMOJIS.ar)
        .setStyle(ButtonStyle.Secondary),
    ),
  )

const help: SlashCommand = {
  name: 'help',
  description: 'Lists all available commands.',

  data: new SlashCommandBuilder().setName('help').setDescription('Lists all available commands.'),

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const basePath = path.join(__dirname, '../../../commands/messageCommands')
    const embeds = new Map(
      commandGroups.map(group => [
        group.id,
        buildHelpEmbed(
          group.label,
          loadMessageCommandsFromDirectory(path.join(basePath, group.id)),
        ),
      ]),
    )

    await interaction.reply({
      embeds: [embeds.get('general')!],
      components: [buildButtons()],
    })

    const sentMessage = await interaction.fetchReply()
    const collector = sentMessage.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 120000,
      filter: (i: MessageComponentInteraction) => i.user.id === interaction.user.id,
    })

    collector.on('collect', async interaction => {
      const customId = interaction.customId as (typeof commandGroups)[number]['id']
      await interaction.update({ embeds: [embeds.get(customId)!] })
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
