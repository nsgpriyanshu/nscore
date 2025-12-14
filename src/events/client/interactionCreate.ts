import {
  ChatInputCommandInteraction,
  PermissionsBitField,
  Interaction,
  EmbedBuilder,
  GuildMember,
} from 'discord.js'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { logger } from '../../utils/logger'
import config from '../../configs/botConfig'
import { COLORS, EMOJIS } from '../../constants/botConst'

export const eventHandlerInteraction = (client: ExtendedClient) => {
  const scope = 'SlashCommand'

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return

    const commandName = interaction.commandName
    const command = client.slashCommands.get(commandName)

    if (!command) {
      logger.warn(scope, `Command not found: ${commandName}`)
      return
    }

    // Check user permissions
    if (
      command.userPermissions &&
      !(interaction.member?.permissions as Readonly<PermissionsBitField>)?.has(
        PermissionsBitField.resolve(command.userPermissions),
      )
    ) {
      const userPermEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('You cannot use this command!')
        .setDescription(
          `${EMOJIS.caution} You don't have the required permissions to use this commandz`,
        )
        .setTimestamp()

      await interaction.reply({ embeds: [userPermEmbed], ephemeral: true })
      return
    }

    // Check bot permissions
    const botMember = interaction.guild?.members.cache.get(client.user?.id || '') as GuildMember
    if (
      command.botPermissions &&
      !botMember.permissions.has(PermissionsBitField.resolve(command.botPermissions))
    ) {
      const botPermEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('I cannot use this command!')
        .setDescription(
          `${EMOJIS.caution} I don't have the required permissions to run this command`,
        )
        .setTimestamp()

      await interaction.reply({ embeds: [botPermEmbed], ephemeral: true })
      return
    }

    // Check if the command is developer-only
    if (command.devOnly && !config.DEVELOPER_IDS.includes(interaction.user.id)) {
      const devOnlyEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('You cannot use this command!')
        .setDescription(`${EMOJIS.caution} This command is only for developers.`)
        .setTimestamp()

      await interaction.reply({ embeds: [devOnlyEmbed], ephemeral: true })
      return
    }

    try {
      await command.executeSlash(interaction as ChatInputCommandInteraction, client)
      logger.success(scope, `Executed slash command: /${commandName}`)
    } catch (error) {
      logger.error(scope, `Error executing slash command: /${commandName}`)
      console.error(error)

      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} There was an error trying to execute that command!`)
        .setTimestamp()

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  })
}
