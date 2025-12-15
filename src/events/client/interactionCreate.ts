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
    if (!interaction.isChatInputCommand() || !interaction.guildId) return

    const command = client.slashCommands.get(interaction.commandName)

    if (!command || !('executeSlash' in command)) {
      logger.warn(scope, `Command not found: ${interaction.commandName}`)
      return
    }

    // User permissions
    if (
      command.userPermissions &&
      !(interaction.member?.permissions as PermissionsBitField)?.has(
        PermissionsBitField.resolve(command.userPermissions),
      )
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.yellow)
            .setTitle('Permission denied')
            .setDescription(`${EMOJIS.caution} Missing permissions`)
            .setTimestamp(),
        ],
        ephemeral: true,
      })
    }

    // Bot permissions
    const botMember = interaction.guild?.members.cache.get(client.user!.id) as GuildMember
    if (
      command.botPermissions &&
      !botMember.permissions.has(PermissionsBitField.resolve(command.botPermissions))
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.yellow)
            .setTitle('Bot lacks permissions')
            .setDescription(`${EMOJIS.caution} Cannot execute command`)
            .setTimestamp(),
        ],
        ephemeral: true,
      })
    }

    // Dev-only
    if (command.devOnly && !config.DEVELOPER_IDS.includes(interaction.user.id)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.yellow)
            .setTitle('Restricted command')
            .setDescription(`${EMOJIS.caution} Developers only`)
            .setTimestamp(),
        ],
        ephemeral: true,
      })
    }

    try {
      await command.executeSlash(interaction as ChatInputCommandInteraction, client)
      logger.success(scope, `Executed: /${interaction.commandName}`)
    } catch (error) {
      logger.error(scope, `Execution failed: /${interaction.commandName}`)
      console.error(error)

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.red)
            .setTitle('Oops!')
            .setDescription(`${EMOJIS.failed} Something went wrong`)
            .setTimestamp(),
        ],
        ephemeral: true,
      })
    }
  })
}
