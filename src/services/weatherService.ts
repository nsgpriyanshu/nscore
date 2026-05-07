import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ColorResolvable,
  EmbedBuilder,
} from 'discord.js'
import fetch from 'node-fetch'
import config from '../configs/botConfig'
import {
  COLORS,
  EMOJIS,
  weather_clear,
  weather_cloudy,
  weather_fog,
  weather_rain,
  weather_snow,
  weather_thunderstorm,
} from '../constants/botConst'

export type WeatherUnit = 'celsius' | 'fahrenheit' | 'kelvin'

export interface WeatherData {
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

export const getNextWeatherUnit = (unit: WeatherUnit): WeatherUnit => {
  if (unit === 'celsius') return 'fahrenheit'
  if (unit === 'fahrenheit') return 'kelvin'
  return 'celsius'
}

export const convertTemperature = (value: number, unit: WeatherUnit) => {
  if (unit === 'fahrenheit') return value * 1.8 + 32
  if (unit === 'kelvin') return value + 273.15
  return value
}

export const getWeatherUnitLabel = (unit: WeatherUnit) => {
  if (unit === 'fahrenheit') return 'F'
  if (unit === 'kelvin') return 'K'
  return 'C'
}

export const getWeatherColor = (condition: string): ColorResolvable => {
  const key = condition.toLowerCase()
  if (key.includes('clear')) return 0x38bdf8
  if (key.includes('cloud')) return 0x94a3b8
  if (key.includes('rain')) return 0x2563eb
  if (key.includes('thunder')) return 0x7c3aed
  if (key.includes('snow')) return 0xe5e7eb
  if (key.includes('fog') || key.includes('mist')) return 0x64748b
  return COLORS.blue
}

export const getWeatherImage = (condition: string) => {
  const key = condition.toLowerCase()
  if (key.includes('clear')) return weather_clear
  if (key.includes('cloud')) return weather_cloudy
  if (key.includes('rain')) return weather_rain
  if (key.includes('thunder')) return weather_thunderstorm
  if (key.includes('snow')) return weather_snow
  if (key.includes('fog') || key.includes('mist')) return weather_fog
  return weather_cloudy
}

const formatTime = (unix: number) =>
  new Date(unix * 1000).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location,
    )}&appid=${config.WEATHER_API_KEY}&units=metric`,
  )

  const data = (await response.json()) as WeatherData
  if (data.cod !== 200) throw new Error('Invalid weather response')
  return data
}

export const buildWeatherEmbed = (data: WeatherData, unit: WeatherUnit) => {
  const weather = data.weather[0]
  const description = weather.description.charAt(0).toUpperCase() + weather.description.slice(1)
  const temp = (value: number) =>
    `${convertTemperature(value, unit).toFixed(1)} ${getWeatherUnitLabel(unit)}`

  return new EmbedBuilder()
    .setTitle(`${EMOJIS.weather} ${data.name}, ${data.sys.country}`)
    .setDescription(`\`${description}\``)
    .setColor(getWeatherColor(weather.main))
    .setImage(getWeatherImage(weather.main))
    .setThumbnail(`https://openweathermap.org/img/wn/${weather.icon}@2x.png`)
    .addFields(
      {
        name: 'Temperature',
        value:
          `Current: \`${temp(data.main.temp)}\`\n` +
          `Feels Like: \`${temp(data.main.feels_like)}\`\n` +
          `Min: \`${temp(data.main.temp_min)}\`\n` +
          `Max: \`${temp(data.main.temp_max)}\``,
        inline: true,
      },
      {
        name: 'Atmosphere',
        value: `Humidity: \`${data.main.humidity}%\`\nPressure: \`${data.main.pressure} hPa\``,
        inline: true,
      },
      {
        name: 'Wind & Visibility',
        value: `Wind Speed: \`${data.wind.speed} m/s\`\nVisibility: \`${data.visibility ?? 'N/A'} m\``,
        inline: true,
      },
      {
        name: `${EMOJIS.timer} Sun Cycle`,
        value: `Sunrise: \`${formatTime(data.sys.sunrise)}\`\nSunset: \`${formatTime(data.sys.sunset)}\``,
        inline: true,
      },
    )
    .setFooter({ text: `Unit: ${getWeatherUnitLabel(unit)} - OpenWeather` })
    .setTimestamp()
}

export const buildWeatherUnitButton = (unit: WeatherUnit) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('toggle_unit')
      .setLabel(getWeatherUnitLabel(unit))
      .setStyle(ButtonStyle.Secondary),
  )
