import { EmbedBuilder, Interaction, Message } from 'discord.js'
import { BOT } from '../../../configs/metadata'
import { COLORS } from '../../../constants/botConst'
import { MessageCommand } from '../../../interfaces/Command'
import {
  buildWeatherEmbed,
  buildWeatherUnitButton,
  fetchWeather,
  getNextWeatherUnit,
  WeatherUnit,
} from '../../../services/weatherService'

const weather: MessageCommand = {
  name: 'weather',
  aliases: ['w'],
  description: 'Displays weather information for a specified location.',
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,

  async executeMessage(message: Message, args: string[]) {
    const location = args.join(' ')
    if (!location) {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.yellow)
            .setDescription(`Usage: \`${BOT.PREFIX}weather <location>\``),
        ],
      })
      return
    }

    try {
      const data = await fetchWeather(location)
      let unit: WeatherUnit = 'celsius'

      const reply = await message.reply({
        embeds: [buildWeatherEmbed(data, unit)],
        components: [buildWeatherUnitButton(unit)],
      })

      const collector = reply.createMessageComponentCollector({ time: 60_000 })
      collector.on('collect', async (interaction: Interaction) => {
        if (!interaction.isButton()) return
        if (interaction.user.id !== message.author.id) {
          await interaction.reply({ content: 'This button is not for you.', ephemeral: true })
          return
        }

        unit = getNextWeatherUnit(unit)
        await interaction.update({
          embeds: [buildWeatherEmbed(data, unit)],
          components: [buildWeatherUnitButton(unit)],
        })
      })
    } catch {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.red)
            .setDescription('Unable to fetch weather information.'),
        ],
      })
    }
  },
}

export default weather
