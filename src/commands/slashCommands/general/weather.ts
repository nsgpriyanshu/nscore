import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import config from '../../../configs/botConfig'
import fetch from 'node-fetch'

interface WeatherData {
  cod: number
  name: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
  }
  weather: {
    description: string
    icon: string
  }[]
  visibility?: number
  clouds?: {
    all: number
  }
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
}

const weather: SlashCommand = {
  name: 'weather',
  description: 'Displays weather information for a specified location.',

  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Displays weather information for a specified location.')
    .addStringOption(option =>
      option.setName('location').setDescription('Location to fetch weather for').setRequired(true),
    ) as SlashCommand['data'],

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const location = interaction.options.getString('location', true)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location,
        )}&appid=${config.WEATHER_API_KEY}&units=metric`,
      )

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`)
      }

      const data = (await response.json()) as Partial<WeatherData>

      if (!data.cod || !data.main || !data.weather || !data.sys) {
        throw new Error('Invalid API response structure')
      }

      const weatherData = data as WeatherData

      if (weatherData.cod !== 200) {
        const errorEmbed = new EmbedBuilder()
          .setColor(COLORS.red)
          .setDescription(
            `${EMOJIS.failed} Could not find weather information for the specified location.`,
          )

        await interaction.reply({ embeds: [errorEmbed] })
        return
      }

      const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()
      const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()

      const weatherEmbed = new EmbedBuilder()
        .setTitle(`Weather Information for ${weatherData.name}, ${weatherData.sys.country}`)
        .setColor(COLORS.blue)
        .addFields(
          { name: '🌡️ Temperature', value: `${weatherData.main.temp}°C`, inline: true },
          { name: '🤔 Feels Like', value: `${weatherData.main.feels_like}°C`, inline: true },
          { name: '📉 Min Temperature', value: `${weatherData.main.temp_min}°C`, inline: true },
          { name: '📈 Max Temperature', value: `${weatherData.main.temp_max}°C`, inline: true },
          { name: '💧 Humidity', value: `${weatherData.main.humidity}%`, inline: true },
          { name: '🌀 Pressure', value: `${weatherData.main.pressure} hPa`, inline: true },
          { name: '💨 Wind Speed', value: `${weatherData.wind.speed} m/s`, inline: true },
          {
            name: '👀 Visibility',
            value: `${weatherData.visibility ?? 'N/A'} meters`,
            inline: true,
          },
          { name: '☁️ Cloudiness', value: `${weatherData.clouds?.all ?? 'N/A'}%`, inline: true },
          { name: '🌦️ Condition', value: weatherData.weather[0].description, inline: true },
          { name: '🌅 Sunrise', value: sunrise, inline: true },
          { name: '🌇 Sunset', value: sunset, inline: true },
        )
        .setThumbnail(`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`)
        .setTimestamp()

      await interaction.reply({ embeds: [weatherEmbed] })
    } catch (error) {
      console.error('Error fetching weather data:', error)

      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          `${EMOJIS.failed} There was an error fetching the weather information. Please try again later.`,
        )

      await interaction.reply({ embeds: [errorEmbed] })
    }
  },

  userPermissions: ['SendMessages'],
  botPermissions: ['SendMessages'],
  devOnly: false,
}

export default weather
