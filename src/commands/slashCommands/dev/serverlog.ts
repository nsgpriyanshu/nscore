import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const serverLog: SlashCommand = {
  name: 'serverlog',
  description: 'Lists all the servers the bot is currently in.',

  data: new SlashCommandBuilder()
    .setName('serverlog')
    .setDescription('Lists all the servers the bot is currently in.') as SlashCommand['data'],

  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  devOnly: true,

  async executeSlash(interaction: ChatInputCommandInteraction, client: ExtendedClient) {
    const guilds = client.guilds.cache.map(
      guild =>
        `${EMOJIS.username} Name: **${guild.name}** - ${guild.id} - ${guild.memberCount} members\n`,
    )

    const serverlogEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('Server List')
      .setDescription(guilds.join('\n'))
      .setTimestamp()

    await interaction.reply({ embeds: [serverlogEmbed] })
  },
}

export default serverLog
