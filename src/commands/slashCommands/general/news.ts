import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import axios from 'axios'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import config from '../../../configs/botConfig'

const BASE_URL = 'https://newsapi.org/v2/everything'

/* ────────────────────────────────────────────── */
/* Fetch News Helper */
/* ────────────────────────────────────────────── */
const fetchNews = async (query: string) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${config.NEWS_API_KEY}`
  const response = await axios.get(url)
  return response.data
}

/* ────────────────────────────────────────────── */
/* Slash Command */
/* ────────────────────────────────────────────── */
const newsCommand: SlashCommand = {
  name: 'news',
  description: 'Fetches the latest news based on a provided keyword.',
  data: new SlashCommandBuilder()
    .setName('news')
    .setDescription('Fetches the latest news based on a provided keyword.')
    .addStringOption(option =>
      option.setName('topic').setDescription('Topic to search news for').setRequired(true),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const query = interaction.options.getString('topic', true)

    await interaction.deferReply()

    try {
      const newsData = await fetchNews(query)

      if (!newsData.articles || newsData.articles.length === 0) {
        const noNewsEmbed = new EmbedBuilder()
          .setColor(COLORS.red)
          .setDescription(`${EMOJIS.failed} No news found for **${query}**`)

        await interaction.editReply({ embeds: [noNewsEmbed] })
        return
      }

      const newsEmbed = new EmbedBuilder()
        .setTitle(`📰 Latest News on ${query}`)
        .setDescription(
          newsData.articles
            .slice(0, 5)
            .map((article: any) => {
              return `**[${article.title}](${article.url})**\n${article.description || ''}`
            })
            .join('\n\n'),
        )
        .setImage(newsData.articles[0]?.urlToImage || null)
        .setTimestamp()

      await interaction.editReply({ embeds: [newsEmbed] })
    } catch (error) {
      console.error('Error fetching news:', error)

      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error fetching the news. Please try again later.`,
        )

      await interaction.editReply({ embeds: [errorEmbed] })
    }
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default newsCommand
