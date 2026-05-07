import { describe, expect, it } from 'vitest'
import { formatNewsDescription } from '../src/services/newsService'
import {
  convertTemperature,
  getNextWeatherUnit,
  getWeatherImage,
  getWeatherUnitLabel,
} from '../src/services/weatherService'
import { formatCommandHelpLine } from '../src/utils/messageCommandHelp'

describe('weather service', () => {
  it('cycles units in the button order', () => {
    expect(getNextWeatherUnit('celsius')).toBe('fahrenheit')
    expect(getNextWeatherUnit('fahrenheit')).toBe('kelvin')
    expect(getNextWeatherUnit('kelvin')).toBe('celsius')
  })

  it('converts metric temperatures for display', () => {
    expect(convertTemperature(0, 'celsius')).toBe(0)
    expect(convertTemperature(0, 'fahrenheit')).toBe(32)
    expect(convertTemperature(0, 'kelvin')).toBe(273.15)
    expect(getWeatherUnitLabel('celsius')).toBe('C')
  })

  it('maps unknown weather conditions to the cloudy image fallback', () => {
    expect(getWeatherImage('unknown')).toContain('cloudy')
  })
})

describe('news service', () => {
  it('formats a maximum of five articles for Discord embeds', () => {
    const description = formatNewsDescription(
      Array.from({ length: 6 }, (_, index) => ({
        title: `Article ${index + 1}`,
        url: `https://example.com/${index + 1}`,
        description: `Summary ${index + 1}`,
      })),
    )

    expect(description).toContain('Article 1')
    expect(description).toContain('Article 5')
    expect(description).not.toContain('Article 6')
  })
})

describe('message command help', () => {
  it('displays aliases as prefixed command equivalences', () => {
    expect(
      formatCommandHelpLine({
        name: 'help',
        aliases: ['h'],
        description: 'Lists all available commands.',
      }),
    ).toContain('`ns.help` = `ns.h`')
  })

  it('displays commands without aliases as canonical prefixed commands', () => {
    expect(
      formatCommandHelpLine({
        name: 'ping',
        description: 'Replies with Ping!',
      }),
    ).toContain('`ns.ping`')
  })
})
