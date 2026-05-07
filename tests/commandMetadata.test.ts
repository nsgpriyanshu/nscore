import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { walkCommandFiles } from '../src/utils/commandDiscovery'

const slashFiles = walkCommandFiles(path.join(__dirname, '../src/commands/slashCommands'))
const messageFiles = walkCommandFiles(path.join(__dirname, '../src/commands/messageCommands'))

const read = (file: string) => fs.readFileSync(file, 'utf8')
const commandName = (source: string) => source.match(/name:\s*['"]([^'"]+)['"]/)?.[1]
const commandAliases = (source: string) =>
  Array.from(source.match(/aliases:\s*\[([^\]]*)\]/)?.[1].matchAll(/['"]([^'"]+)['"]/g) || []).map(
    match => match[1],
  )
const duplicates = (names: string[]) => names.filter((name, index) => names.indexOf(name) !== index)

describe('command metadata', () => {
  it('does not define duplicate command names within a command style', () => {
    const slashNames = slashFiles.map(file => commandName(read(file))).filter(Boolean)
    const messageNames = messageFiles.map(file => commandName(read(file))).filter(Boolean)

    expect(duplicates(slashNames as string[])).toEqual([])
    expect(duplicates(messageNames as string[])).toEqual([])
  })

  it('keeps every slash command backed by a SlashCommandBuilder', () => {
    for (const file of slashFiles) {
      expect(read(file), file).toContain('new SlashCommandBuilder()')
    }
  })

  it('keeps message command aliases unique and separate from command names', () => {
    const sources = messageFiles.map(read)
    const names = sources.map(commandName).filter(Boolean) as string[]
    const aliases = sources.flatMap(commandAliases)

    expect(duplicates(aliases)).toEqual([])
    expect(aliases.filter(alias => names.includes(alias))).toEqual([])
  })
})
