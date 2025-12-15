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
import { COLORS, EMOJIS } from '../../../constants/botConst'
import fs from 'fs'
import path from 'path'

/* ────────────────────────────────────────────── */
/* Helper: Load message commands from directory */
/* ────────────────────────────────────────────── */
const loadCommandsFromDirectory = (dir: string) => {
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.js') || file.endsWith('.ts'))
    .map(file => require(path.join(dir, file)).default)
}

/* ────────────────────────────────────────────── */
/* Slash Command */
/* ────────────────────────────────────────────── */
const help: SlashCommand = {
  name: 'help',
  description: 'Lists all available commands.',

  data: new SlashCommandBuilder().setName('help').setDescription('Lists all available commands.'),

  async executeSlash(interaction: ChatInputCommandInteraction) {
    /* ────────────────────────────────────────────── */
    /* Load Commands */
    /* ────────────────────────────────────────────── */
    const basePath = path.join(__dirname, '../../../commands/messageCommands')

    const generalCommands = loadCommandsFromDirectory(path.join(basePath, 'general'))
    const infoCommands = loadCommandsFromDirectory(path.join(basePath, 'info'))
    const moderationCommands = loadCommandsFromDirectory(path.join(basePath, 'moderation'))

    /* ────────────────────────────────────────────── */
    /* Embed Generator */
    /* ────────────────────────────────────────────── */
    const generateEmbed = (category: string, commands: any[]) => {
      const description =
        commands
          .map(cmd => `\`${cmd.name.padEnd(10)}\`     ${cmd.description || 'No description'}`)
          .join('\n') || 'No commands found.'

      return new EmbedBuilder()
        .setTitle(`${EMOJIS.home} Help - ${category} Commands`)
        .setDescription(description)
        .addFields({
          name: `${EMOJIS.leaf} Resources`,
          value:
            '[Docs](https://nsgpriyanshu.github.io/nscore/)\n[Support Server](https://discord.gg/QhDM7s6Aps)',
          inline: true,
        })
    }

    const generalEmbed = generateEmbed('General', generalCommands)
    const infoEmbed = generateEmbed('Info', infoCommands)
    const moderationEmbed = generateEmbed('Moderation', moderationCommands)

    /* ────────────────────────────────────────────── */
    /* Buttons */
    /* ────────────────────────────────────────────── */
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('general')
        .setLabel('General')
        .setEmoji(EMOJIS.ar)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('info')
        .setLabel('Info')
        .setEmoji(EMOJIS.ar)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('moderation')
        .setLabel('Moderation')
        .setEmoji(EMOJIS.ar)
        .setStyle(ButtonStyle.Secondary),
    )

    /* ────────────────────────────────────────────── */
    /* Initial Reply */
    /* ────────────────────────────────────────────── */
    await interaction.reply({
      embeds: [generalEmbed],
      components: [row],
    })

    const sentMessage = await interaction.fetchReply()

    /* ────────────────────────────────────────────── */
    /* Collector */
    /* ────────────────────────────────────────────── */
    const collector = sentMessage.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 120000, // 2 minutes
      filter: (i: MessageComponentInteraction) => i.user.id === interaction.user.id,
    })

    collector.on('collect', async i => {
      if (i.customId === 'general') {
        await i.update({ embeds: [generalEmbed] })
      }

      if (i.customId === 'info') {
        await i.update({ embeds: [infoEmbed] })
      }

      if (i.customId === 'moderation') {
        await i.update({ embeds: [moderationEmbed] })
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
