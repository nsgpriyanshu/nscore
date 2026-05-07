import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js'
import { COLORS } from '../../../constants/botConst'
import { SlashCommand } from '../../../interfaces/Command'
import {
  buildWeatherEmbed,
  buildWeatherUnitButton,
  fetchWeather,
  getNextWeatherUnit,
  WeatherUnit,
} from '../../../services/weatherService'

const weather: SlashCommand = {
  name: 'weather',
  description: 'Displays weather information for a specified location.',
  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,

  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Get current weather information for a location')
    .addStringOption(option =>
      option.setName('location').setDescription('City or place name').setRequired(true),
    ),

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const location = interaction.options.getString('location', true)
    await interaction.deferReply()

    try {
      const data = await fetchWeather(location)
      let unit: WeatherUnit = 'celsius'

      const reply = await interaction.editReply({
        embeds: [buildWeatherEmbed(data, unit)],
        components: [buildWeatherUnitButton(unit)],
      })

      const collector = reply.createMessageComponentCollector({ time: 60_000 })
      collector.on('collect', async (componentInteraction: Interaction) => {
        if (!componentInteraction.isButton()) return
        if (componentInteraction.user.id !== interaction.user.id) {
          await componentInteraction.reply({
            content: 'This button is not for you.',
            ephemeral: true,
          })
          return
        }

        unit = getNextWeatherUnit(unit)
        await componentInteraction.update({
          embeds: [buildWeatherEmbed(data, unit)],
          components: [buildWeatherUnitButton(unit)],
        })
      })
    } catch (error) {
      console.error('[Weather Slash Command]', error)
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(COLORS.red)
            .setDescription(
              'Unable to fetch weather information. Please verify the location or try again later.',
            ),
        ],
      })
    }
  },
}

export default weather
