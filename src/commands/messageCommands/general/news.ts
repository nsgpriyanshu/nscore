import { EmbedBuilder, Message } from 'discord.js'
import { BOT } from '../../../configs/metadata'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'
import { fetchNews, formatNewsDescription } from '../../../services/newsService'

const newsCommand: MessageCommand = {
  name: 'news',
  aliases: ['n'],
  description: 'Fetches the latest news based on a provided keyword.',
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,

  async executeMessage(message: Message, args: string[]) {
    const query = args.join(' ')
    if (!query) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.yellow)
            .setDescription(
              `${EMOJIS.caution} Please provide a topic to search news for. Example: \`${BOT.PREFIX}news <topic>\``,
            ),
        ],
      })
      return
    }

    try {
      const newsData = await fetchNews(query)
      if (!newsData.articles.length) {
        await message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(COLORS.red)
              .setDescription(`${EMOJIS.failed} No news found for the topic: **${query}**`),
          ],
        })
        return
      }

      await message.reply({
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
      await message.reply({
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
