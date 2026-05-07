import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'
import { fetchNews, formatNewsDescription } from '../../../services/newsService'

const newsCommand: SlashCommand = {
  name: 'news',
  description: 'Fetches the latest news based on a provided keyword.',
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,

  data: new SlashCommandBuilder()
    .setName('news')
    .setDescription('Fetches the latest news based on a provided keyword.')
    .addStringOption(option =>
      option.setName('topic').setDescription('Topic to search news for').setRequired(true),
    ),

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const query = interaction.options.getString('topic', true)
    await interaction.deferReply()

    try {
      const newsData = await fetchNews(query)
      if (!newsData.articles.length) {
        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor(COLORS.red)
              .setDescription(`${EMOJIS.failed} No news found for **${query}**`),
          ],
        })
        return
      }

      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Latest News on ${query}`)
            .setDescription(formatNewsDescription(newsData.articles))
            .setImage(newsData.articles[0].urlToImage || null)
            .setTimestamp(),
        ],
      })
    } catch (error) {
      console.error('Error fetching news:', error)
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.red)
            .setDescription(
              `${EMOJIS.failed} There was an error fetching the news. Please try again later.`,
            ),
        ],
      })
    }
  },
}

export default newsCommand
