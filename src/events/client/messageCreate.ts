import { EmbedBuilder, Message, PermissionsBitField } from 'discord.js'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { logger } from '../../utils/logger'
import { BOT } from '../../configs/metadata'
import config from '../../configs/botConfig'
import { COLORS, EMOJIS } from '../../constants/botConst'

export const eventHandlerMessage = (client: ExtendedClient) => {
  const scope = 'MessageCommand'

  client.on('messageCreate', async (message: Message) => {
    if (message.author.bot || !message.guild) return
    if (!message.content.startsWith(BOT.PREFIX)) return

    const args = message.content.slice(BOT.PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift()?.toLowerCase()
    if (!commandName) return

    const command = client.messageCommands.get(commandName)

    if (!command || !('executeMessage' in command)) {
      logger.warn(scope, `Command not found: ${commandName}`)

      const unknownCommand = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('You cannot use this command!')
        .setDescription(`${EMOJIS.failed} There is no command like this`)
        .setTimestamp()

      return message.reply({ embeds: [unknownCommand] })
    }

    // User permissions
    if (
      command.userPermissions &&
      !message.member?.permissions.has(PermissionsBitField.resolve(command.userPermissions))
    ) {
      const embed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('You cannot use this command!')
        .setDescription(`${EMOJIS.caution} Missing required permissions`)
        .setTimestamp()

      return message.reply({ embeds: [embed] })
    }

    if (!client.user) return

    // Bot permissions
    if (
      command.botPermissions &&
      !message.guild.members.cache
        .get(client.user.id)
        ?.permissions.has(PermissionsBitField.resolve(command.botPermissions))
    ) {
      const embed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('I cannot use this command!')
        .setDescription(`${EMOJIS.caution} I lack required permissions`)
        .setTimestamp()

      return message.reply({ embeds: [embed] })
    }

    // Dev-only
    if (command.devOnly && !config.DEVELOPER_IDS.includes(message.author.id)) {
      const embed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('Restricted command')
        .setDescription(`${EMOJIS.caution} Developers only`)
        .setTimestamp()

      return message.reply({ embeds: [embed] })
    }

    try {
      await command.executeMessage(message, args, client)
      logger.success(scope, `Executed: ${commandName}`)
    } catch (error) {
      logger.error(scope, `Execution failed: ${commandName}`)
      console.error(error)

      const embed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} Something went wrong`)

      await message.reply({ embeds: [embed] })
    }
  })
}
