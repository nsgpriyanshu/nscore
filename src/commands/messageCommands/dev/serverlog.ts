import { Message, EmbedBuilder } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const serverLog: MessageCommand = {
  name: 'serverlog',
  description: 'Lists all the servers the bot is currently in.',
  async executeMessage(message: Message, args: string[], client: ExtendedClient) {
    // Get the list of servers
    const guilds = client.guilds.cache.map(
      guild =>
        `${EMOJIS.username} Name: **${guild.name}** - ${guild.id} - ${guild.memberCount} members\n`,
    )

    // Create an embed with the list of servers
    const serverlogEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('Server List')
      .setDescription(guilds.join('\n'))
      .setTimestamp()

    // Send the embed with the list of servers
    await message.reply({ embeds: [serverlogEmbed] })
  },
  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: true,
}

export default serverLog
