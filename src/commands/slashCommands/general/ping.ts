import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'

const ping: SlashCommand = {
  name: 'ping',
  description: 'Replies with Ping!',
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Ping!'),

  async executeSlash(interaction: CommandInteraction) {
    const pingEmbed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setTitle('Ping Command')
      .setDescription(`${EMOJIS.success} Ping pong ping`)

    await interaction.reply({ embeds: [pingEmbed] })
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default ping
