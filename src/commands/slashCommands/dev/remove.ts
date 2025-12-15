import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const remove: SlashCommand = {
  name: 'remove',
  description: 'Removes the bot from the specified server.',

  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Removes the bot from the specified server.')
    .addStringOption(option =>
      option.setName('guild_id').setDescription('ID of the server to leave').setRequired(true),
    ) as SlashCommand['data'],

  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: true,

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    const guildId = interaction.options.getString('guild_id', true)

    const guild = interaction.client.guilds.cache.get(guildId)

    if (!guild) {
      const invalidIdEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Invalid Server ID')
        .setDescription(
          `${EMOJIS.failed} The provided server ID is not valid or the bot is not in that server.`,
        )
        .setTimestamp()
      await interaction.reply({ embeds: [invalidIdEmbed], ephemeral: true })
      return
    }

    const confirmEmbed = new EmbedBuilder()
      .setColor(COLORS.yellow)
      .setTitle('Remove Bot Confirmation')
      .setDescription(
        `${EMOJIS.caution} Are you sure you want to remove the bot from the server **${guild.name}**?`,
      )
      .setTimestamp()

    const rRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('confirmRemove')
        .setLabel('Approve')
        .setEmoji(`${EMOJIS.success}`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('cancelRemove')
        .setLabel('Deny')
        .setEmoji(`${EMOJIS.failed}`)
        .setStyle(ButtonStyle.Danger),
    )

    const confirmMessage = await interaction.reply({
      embeds: [confirmEmbed],
      components: [rRow],
      fetchReply: true,
    })

    const filter = (i: any) => i.user.id === interaction.user.id

    const collector = (confirmMessage as any).createMessageComponentCollector({
      filter,
      componentType: ComponentType.Button,
      time: 60000, // 1 minute
    })

    collector.on(
      'collect',
      async (i: {
        customId: string
        update: (arg0: { embeds: EmbedBuilder[]; components: never[] }) => any
      }) => {
        if (i.customId === 'confirmRemove') {
          const successEmbed = new EmbedBuilder()
            .setColor(COLORS.green)
            .setDescription(
              `${EMOJIS.success} The bot left the server, this command is approved by ${interaction.user.username}`,
            )
            .setTimestamp()
          await i.update({ embeds: [successEmbed], components: [] })
          await guild.leave()
        } else if (i.customId === 'cancelRemove') {
          const cancelEmbed = new EmbedBuilder()
            .setColor(COLORS.red)
            .setDescription(`${EMOJIS.failed} Bot removal request canceled`)
            .setTimestamp()
          await i.update({ embeds: [cancelEmbed], components: [] })
        }
      },
    )

    collector.on('end', async () => {
      const tE = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(`${EMOJIS.failed} Timeout! Bot removal request canceled due to inactivity.`)
        .setTimestamp()
      await (confirmMessage as any).edit({ embeds: [tE], components: [] })
    })
  },
}

export default remove
