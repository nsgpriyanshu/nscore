import { EmbedBuilder, Message, PermissionsBitField } from 'discord.js'
import { ExtendedClient } from '../../interfaces/ExtendedClient'
import { logger } from '../../utils/logger'
import { BOT } from '../../configs/metadata'
import config from '../../configs/botConfig'
import { COLORS } from '../../constants/botConst'
import { EMOJIS } from '../../constants/botConst'

export const eventHandlerMessage = (client: ExtendedClient) => {
  const scope = 'MessageCommand'

  client.on('messageCreate', async (message: Message) => {
    if (message.author.bot || !message.guild) return
    if (!message.content.startsWith(BOT.PREFIX)) return

    const args = message.content.slice(BOT.PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift()?.toLowerCase()
    if (!commandName) return

    const command = client.messageCommands.get(commandName)

    if (!command) {
      logger.warn(scope, `Command not found: ${commandName}`)

      const unknownCommand = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle(`You cannot use this command!`)
        .setDescription(`${EMOJIS.failed} There is no command like this`)
        .setTimestamp()

      return message.reply({ embeds: [unknownCommand] })
    }

    // Check user permissions
    if (
      command.userPermissions &&
      !message.member?.permissions.has(PermissionsBitField.resolve(command.userPermissions))
    ) {
      const userPermEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle(`You cannot use this command!`)
        .setDescription(
          `${EMOJIS.caution} You don't have the required permissions to use this command`,
        )
        .setTimestamp()

      return message.reply({ embeds: [userPermEmbed] })
    }

    if (!client.user) {
      logger.error(scope, 'Client user is null')
      return
    }

    // Check bot permissions
    if (
      command.botPermissions &&
      !message.guild.members.cache
        .get(client.user.id)
        ?.permissions.has(PermissionsBitField.resolve(command.botPermissions))
    ) {
      const botPermEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle(`I cannot use this command!`)
        .setDescription(
          `${EMOJIS.caution} I don't have the required permissions to run this command`,
        )
        .setTimestamp()

      return message.reply({ embeds: [botPermEmbed] })
    }

    // Check if the command is developer-only
    if (command.devOnly && !config.DEVELOPER_IDS.includes(message.author.id)) {
      const devOnlyEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle(`You cannot use this command!`)
        .setDescription(`${EMOJIS.caution} This command is only for developers`)
        .setTimestamp()

      return message.reply({ embeds: [devOnlyEmbed] })
    }

    try {
      await command.executeMessage(message, args, client)
      logger.success(scope, `Executed command: ${commandName}`)
    } catch (error) {
      logger.error(scope, `Error executing command: ${commandName}`)
      console.error(error)

      const eE = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Opps!')
        .setDescription(`${EMOJIS.failed} There was an error trying to run that command!`)

      await message.reply({ embeds: [eE] })
    }
  })
}
