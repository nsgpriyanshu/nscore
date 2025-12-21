import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import fetch from 'node-fetch'
import { SlashCommand } from '../../../interfaces/Command'
import { COLORS } from '../../../constants/botConst'
import config from '../../../configs/botConfig'

/* ---------- Types ---------- */

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
    main: string
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

/* ---------- Abstract Banner Assets ---------- */

const ABSTRACT_BANNERS = {
  clear: 'https://raw.githubusercontent.com/nsgpriyanshu/assets/main/weather/clear.png',
  clouds: 'https://raw.githubusercontent.com/nsgpriyanshu/assets/main/weather/clouds.png',
  rain: 'https://raw.githubusercontent.com/nsgpriyanshu/assets/main/weather/rain.png',
  thunder: 'https://raw.githubusercontent.com/nsgpriyanshu/assets/main/weather/thunder.png',
  snow: 'https://raw.githubusercontent.com/nsgpriyanshu/assets/main/weather/snow.png',
  fog: 'https://raw.githubusercontent.com/nsgpriyanshu/assets/main/weather/fog.png',
  default: 'https://raw.githubusercontent.com/nsgpriyanshu/assets/main/weather/default.png',
}

/* ---------- Helpers ---------- */

function formatTime(unix: number) {
  return new Date(unix * 1000).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getWeatherColor(condition: string) {
  const key = condition.toLowerCase()

  if (key.includes('clear')) return 0x4facfe
  if (key.includes('cloud')) return 0xa1a1aa
  if (key.includes('rain')) return 0x2563eb
  if (key.includes('thunder')) return 0x7c3aed
  if (key.includes('snow')) return 0xe5e7eb
  if (key.includes('fog') || key.includes('mist')) return 0x64748b

  return COLORS.blue
}

function getAbstractBanner(condition: string) {
  const key = condition.toLowerCase()

  if (key.includes('clear')) return ABSTRACT_BANNERS.clear
  if (key.includes('cloud')) return ABSTRACT_BANNERS.clouds
  if (key.includes('rain')) return ABSTRACT_BANNERS.rain
  if (key.includes('thunder')) return ABSTRACT_BANNERS.thunder
  if (key.includes('snow')) return ABSTRACT_BANNERS.snow
  if (key.includes('fog') || key.includes('mist')) return ABSTRACT_BANNERS.fog

  return ABSTRACT_BANNERS.default
}

/* ---------- Slash Command ---------- */

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
    ) as SlashCommandBuilder,

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const location = interaction.options.getString('location', true)

    await interaction.deferReply()

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location,
        )}&appid=${config.WEATHER_API_KEY}&units=metric`,
      )

      if (!response.ok) {
        throw new Error(`Weather API failed with status ${response.status}`)
      }

      const data = (await response.json()) as WeatherData

      if (data.cod !== 200 || !data.weather?.length) {
        throw new Error('Invalid weather data')
      }

      const condition = data.weather[0].main

      const weatherEmbed = new EmbedBuilder()
        .setTitle(`${data.name}, ${data.sys.country}`)
        .setDescription(
          data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1),
        )
        .setColor(getWeatherColor(condition))
        .setImage(getAbstractBanner(condition)) // banner-style image
        .setThumbnail(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        .addFields(
          {
            name: 'Temperature',
            value: `Current: ${data.main.temp}°C
Feels Like: ${data.main.feels_like}°C
Min: ${data.main.temp_min}°C
Max: ${data.main.temp_max}°C`,
            inline: true,
          },
          {
            name: 'Atmosphere',
            value: `Humidity: ${data.main.humidity}%
Pressure: ${data.main.pressure} hPa`,
            inline: true,
          },
          {
            name: 'Wind & Visibility',
            value: `Wind Speed: ${data.wind.speed} m/s
Visibility: ${data.visibility ?? 'N/A'} m`,
            inline: true,
          },
          {
            name: 'Sun Cycle',
            value: `Sunrise: ${formatTime(data.sys.sunrise)}
Sunset: ${formatTime(data.sys.sunset)}`,
            inline: true,
          },
        )
        .setFooter({ text: 'Powered by OpenWeather' })
        .setTimestamp()

      await interaction.editReply({ embeds: [weatherEmbed] })
    } catch (error) {
      console.error('[Weather Slash Command]', error)

      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setDescription(
          'Unable to fetch weather information. Please verify the location or try again later.',
        )

      await interaction.editReply({ embeds: [errorEmbed] })
    }
  },
}

export default weather
