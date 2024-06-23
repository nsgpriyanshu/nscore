import { Message, EmbedBuilder } from 'discord.js'
import { MessageCommand } from '../../../interfaces/Command'
import axios from 'axios'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { BOT } from '../../../configs/metadata'
import config from '../../../configs/botConfig'

const BASE_URL = 'https://newsapi.org/v2/everything'

const fetchNews = async (query: string) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${config.NEWS_API_KEY}`
  const response = await axios.get(url)
  return response.data
}

const newsCommand: MessageCommand = {
  name: 'news',
  description: 'Fetches the latest news based on a provided keyword.',
  async executeMessage(message: Message, args: string[]) {
    const query = args.join(' ')
    if (!query) {
      const usageEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setDescription(
          `${EMOJIS.caution} Please provide a topic to search news for. Instance: \`${BOT.PREFIX}news <topic>\``,
        )
      await message.reply({ embeds: [usageEmbed] })
      return
    }

    try {
      const newsData = await fetchNews(query)
      if (newsData.articles.length === 0) {
        const noNewsEmbed = new EmbedBuilder()
          .setColor(COLORS.red)
          .setDescription(`${EMOJIS.failed} No news found for the topic: **${query}**`)
        await message.reply({ embeds: [noNewsEmbed] })
        return
      }

      const newsEmbed = new EmbedBuilder()
        //.setColor(COLORS.green)
        .setTitle(`Latest News on ${query}`)
        .setDescription(
          newsData.articles
            .slice(0, 5)
            .map((article: any) => {
              return `[${article.title}](${article.url})\n${article.description || ''}`
            })
            .join('\n\n'),
        )
        .setTimestamp()
        .setImage(newsData.articles[0].urlToImage)

      await message.channel.send({ embeds: [newsEmbed] })
    } catch (error) {
      console.error('Error fetching news:', error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error fetching the news. Please try again later.`,
        )
      await message.reply({ embeds: [errorEmbed] })
    }
  },
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default newsCommand
