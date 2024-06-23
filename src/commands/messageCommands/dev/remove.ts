import { Message, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'

const remove: MessageCommand = {
  name: 'remove',
  description: 'Removes the bot from the specified server',
  async executeMessage(message: Message, args: string[]) {
    const guildId = args[0]

    if (!guildId) {
      const noIdEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('No Server ID Provided')
        .setDescription(`${EMOJIS.failed} Please provide a valid server ID.`)
        .setTimestamp()

      await message.reply({ embeds: [noIdEmbed] })
      return
    }

    const guild = message.client.guilds.cache.get(guildId)

    if (!guild) {
      const invalidIdEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Invalid Server ID')
        .setDescription(
          `${EMOJIS.failed} The provided server ID is not valid or the bot is not in that server.`,
        )
        .setTimestamp()

      await message.reply({ embeds: [invalidIdEmbed] })
      return
    }

    // Create a confirmation embed and button
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
        .setLabel(`Approve`)
        .setEmoji(`${EMOJIS.success}`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('cancelRemove')
        .setLabel(`Deny`)
        .setEmoji(`${EMOJIS.failed}`)
        .setStyle(ButtonStyle.Danger),
    )

    const confirmMessage = await message.channel.send({
      embeds: [confirmEmbed],
      components: [rRow],
    })

    // Create a filter for the button interaction
    const filter = (interaction: any) => {
      return interaction.user.id === message.author.id
    }

    const collector = confirmMessage.createMessageComponentCollector({
      filter,
      time: 60000, // 1 minute
    })

    collector.on('collect', async interaction => {
      if (interaction.customId === 'confirmRemove') {
        // Remove the bot from the guild
        const aRE = new EmbedBuilder()
          .setColor(COLORS.green)
          .setDescription(
            `${EMOJIS.success} The bot left the server, this command is approved by ${message.author.username}`,
          )
          .setTimestamp()
        await interaction.update({
          embeds: [aRE],
          components: [],
        })
        await guild.leave()
      } else if (interaction.customId === 'cancelRemove') {
        // Cancel the removal
        const dRE = new EmbedBuilder()
          .setColor(COLORS.red)
          .setDescription(`${EMOJIS.failed} Bot removal request canceled`)
          .setTimestamp()
        await interaction.update({
          embeds: [dRE],
          components: [],
        })
      }
    })

    collector.on('end', async () => {
      if (!confirmMessage.delete) {
        // Timeout occurred
        const tE = new EmbedBuilder()
          .setColor(COLORS.red)
          .setDescription(
            `${EMOJIS.failed} Timeout! Bot removal request canceled due to inactivity.`,
          )
          .setTimestamp()
        await confirmMessage.edit({
          embeds: [tE],
          components: [],
        })
      }
    })
  },
  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: true,
}

export default remove
