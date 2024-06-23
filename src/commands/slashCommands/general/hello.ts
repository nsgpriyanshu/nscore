import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'

const Hello: SlashCommand = {
  name: 'hello',
  description: 'Replies with Hello!',
  data: new SlashCommandBuilder().setName('hello').setDescription('Replies with Hello!'),
  async executeSlash(interaction: CommandInteraction) {
    const helloEmbed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setTitle('Hello Command')
      .setDescription(`${EMOJIS.success} Hello there, I am Hello`)

    await interaction.reply({ embeds: [helloEmbed] })
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default Hello
