import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { ExtendedClient } from '../../../interfaces/ExtendedClient'

const devHello: SlashCommand = {
  name: 'devhello',
  description: 'Replies with devHello!',

  data: new SlashCommandBuilder()
    .setName('devhello')
    .setDescription('Replies with devHello!') as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction, _client: ExtendedClient) {
    try {
      const devHelloEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('devHello Command')
        .setDescription(`${EMOJIS.success} devHello there, I am devHello!`)

      await interaction.reply({ embeds: [devHelloEmbed] })
    } catch (error) {
      console.error('Error executing devhello command:', error)
    }
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: true,
}

export default devHello
