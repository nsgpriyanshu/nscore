import { Message, EmbedBuilder } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'
import { EMOJIS, COLORS } from '../../../constants/botConst'

const exeall: MessageCommand = {
  name: 'exeall',
  description: 'Test all message commands in the server',
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: true,
  executeMessage: async (message: Message, args: string[], client: ExtendedClient) => {
    const failedCommands: string[] = []
    const successCommands: string[] = []

    for (const [name, cmd] of client.messageCommands) {
      try {
        // Execute command with default test args
        await cmd.executeMessage(message, ['test'], client)
        successCommands.push(name)
      } catch (error) {
        failedCommands.push(`${name} → ${(error as Error).message}`)
      }
    }

    // Embed for the summary
    const summaryEmbed = new EmbedBuilder()
      .setTitle(`${EMOJIS.devlopers} Message Commands Test Results`)
      .setColor(COLORS.blue)
      .addFields(
        { name: `${EMOJIS.success} Success`, value: `${successCommands.length}`, inline: true },
        { name: `${EMOJIS.failed} Failed`, value: `${failedCommands.length}`, inline: true },
      )
      .setTimestamp()

    await message.reply({ embeds: [summaryEmbed] })

    // If any failed commands, list them in another embed
    if (failedCommands.length > 0) {
      const failedEmbed = new EmbedBuilder()
        .setTitle(`${EMOJIS.failed} Failed Commands`)
        .setColor(COLORS.red)
        .setDescription(failedCommands.join('\n'))
        .setTimestamp()

      await message.reply({ embeds: [failedEmbed] })
    }
  },
}

export default exeall
