import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'

const boostInfo: SlashCommand = {
  name: 'boostinfo',
  description: 'Displays information about server boosts and boosters.',

  data: new SlashCommandBuilder()
    .setName('boostinfo')
    .setDescription('Displays information about server boosts and boosters.'),

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const { guild } = interaction

    if (!guild) {
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} This command can only be used in a server.`)
        .setTimestamp()

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
      return
    }

    const boosts = guild.premiumSubscriptionCount || 0
    const boosters =
      guild.members.cache
        .filter(member => member.premiumSince)
        .map(member => `${EMOJIS.username} ${member.user.tag}`)
        .join('\n') || 'No boosters'

    const boostEmbed = new EmbedBuilder()
      //.setColor(COLORS.blue)
      .setTitle('Server Boost Information')
      .setDescription(
        `${EMOJIS.sparkles} Total Boosts  ${boosts}\n` +
          `${EMOJIS.sparklesd} Boosters \n${boosters}`,
      )

    await interaction.reply({ embeds: [boostEmbed] })
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default boostInfo
