import {
  EmbedBuilder,
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Interaction,
} from 'discord.js'
import fetch from 'node-fetch'
import { MessageCommand } from '../../../interfaces/Command'
import { COLORS, EMOJIS } from '../../../constants/botConst'
import config from '../../../configs/botConfig'
import { BOT } from '../../../configs/metadata'

import {
  weather_clear,
  weather_cloudy,
  weather_rain,
  weather_thunderstorm,
  weather_snow,
  weather_fog,
} from '../../../constants/botConst'

/* ---------- Types ---------- */

type Unit = 'celsius' | 'fahrenheit' | 'kelvin'

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
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
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
  if (key.includes('clear')) return 0x38bdf8
  if (key.includes('cloud')) return 0x94a3b8
  if (key.includes('rain')) return 0x2563eb
  if (key.includes('thunder')) return 0x7c3aed
  if (key.includes('snow')) return 0xe5e7eb
  if (key.includes('fog') || key.includes('mist')) return 0x64748b
  return COLORS.blue
}

function getWeatherImage(condition: string) {
  const key = condition.toLowerCase()
  if (key.includes('clear')) return weather_clear
  if (key.includes('cloud')) return weather_cloudy
  if (key.includes('rain')) return weather_rain
  if (key.includes('thunder')) return weather_thunderstorm
  if (key.includes('snow')) return weather_snow
  if (key.includes('fog') || key.includes('mist')) return weather_fog
  return weather_cloudy
}

function convertTemp(value: number, unit: Unit) {
  if (unit === 'fahrenheit') return value * 1.8 + 32
  if (unit === 'kelvin') return value + 273.15
  return value
}

function unitSymbol(unit: Unit) {
  if (unit === 'fahrenheit') return 'F'
  if (unit === 'kelvin') return 'K'
  return 'C'
}

function unitLabel(unit: Unit) {
  if (unit === 'fahrenheit') return '°F'
  if (unit === 'kelvin') return 'K'
  return '°C'
}

function buildEmbed(data: WeatherData, unit: Unit) {
  const condition = data.weather[0].main
  const description =
    data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)

  const t = (v: number) => convertTemp(v, unit).toFixed(1)

  return new EmbedBuilder()
    .setTitle(`${EMOJIS.weather} ${data.name}, ${data.sys.country}`)
    .setDescription(`\`${description}\``)
    .setColor(getWeatherColor(condition))
    .setImage(getWeatherImage(condition))
    .setThumbnail(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    .addFields(
      {
        name: 'Temperature',
        value:
          `Current: \`${t(data.main.temp)}${unitLabel(unit)}\`\n` +
          `Feels Like: \`${t(data.main.feels_like)}${unitLabel(unit)}\`\n` +
          `Min: \`${t(data.main.temp_min)}${unitLabel(unit)}\`\n` +
          `Max: \`${t(data.main.temp_max)}${unitLabel(unit)}\``,
        inline: true,
      },
      {
        name: 'Atmosphere',
        value: `Humidity: \`${data.main.humidity}%\`\n` + `Pressure: \`${data.main.pressure} hPa\``,
        inline: true,
      },
      {
        name: 'Wind & Visibility',
        value:
          `Wind Speed: \`${data.wind.speed} m/s\`\n` +
          `Visibility: \`${data.visibility ?? 'N/A'} m\``,
        inline: true,
      },
      {
        name: `${EMOJIS.timer} Sun Cycle`,
        value:
          `Sunrise: \`${formatTime(data.sys.sunrise)}\`\n` +
          `Sunset: \`${formatTime(data.sys.sunset)}\``,
        inline: true,
      },
    )
    .setFooter({ text: `Unit: ${unitLabel(unit)} • OpenWeather` })
    .setTimestamp()
}

function buildButton(unit: Unit) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('toggle_unit')
      .setLabel(unitSymbol(unit))
      .setStyle(ButtonStyle.Secondary),
  )
}

/* ---------- Command ---------- */

const weather: MessageCommand = {
  name: 'weather',
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
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location,
        )}&appid=${config.WEATHER_API_KEY}&units=metric`,
      )

      const data = (await response.json()) as WeatherData
      if (data.cod !== 200) throw new Error('Invalid weather')

      let unit: Unit = 'celsius'

      const msg = await message.reply({
        embeds: [buildEmbed(data, unit)],
        components: [buildButton(unit)],
      })

      const collector = msg.createMessageComponentCollector({ time: 60_000 })

      collector.on('collect', async (i: Interaction) => {
        if (!i.isButton()) return
        if (i.user.id !== message.author.id) {
          await i.reply({ content: 'This button is not for you.', ephemeral: true })
          return
        }

        unit = unit === 'celsius' ? 'fahrenheit' : unit === 'fahrenheit' ? 'kelvin' : 'celsius'

        await i.update({
          embeds: [buildEmbed(data, unit)],
          components: [buildButton(unit)],
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
