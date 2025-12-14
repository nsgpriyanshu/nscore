import { Message } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'
import { EMOJIS } from '../../../constants/botConst'

const runall: MessageCommand = {
  name: 'runall',
  description: 'Test all message commands in the server',
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: true,
  executeMessage: async (message: Message, args: string[], client: ExtendedClient) => {
    const failedCommands: string[] = []
    const successCommands: string[] = []

    for (const [name, cmd] of client.messageCommands) {
      try {
        // Simulate command execution
        // Use empty args or some default test args
        await cmd.executeMessage(message, ['test'], client)
        successCommands.push(name)
      } catch (error) {
        failedCommands.push(`${name} → ${(error as Error).message}`)
      }
    }

    const resultMessage = `**Test Results:**\n${EMOJIS.success} Success: ${successCommands.length}\n${EMOJIS.failed} Failed: ${failedCommands.length}`

    await message.reply(resultMessage)

    if (failedCommands.length > 0) {
      await message.reply('**Failed Commands:**\n' + failedCommands.join('\n'))
    }
  },
}

export default runall
