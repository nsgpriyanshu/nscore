import path from 'path'
import { describe, expect, it } from 'vitest'
import { isMessageCommand, isSlashCommand, walkCommandFiles } from '../src/utils/commandDiscovery'

const srcRoot = path.join(__dirname, '../src')
const slashCommandsDir = path.join(srcRoot, 'commands/slashCommands')
const messageCommandsDir = path.join(srcRoot, 'commands/messageCommands')

describe('command discovery', () => {
  it('walks nested command folders recursively', () => {
    const slashFiles = walkCommandFiles(slashCommandsDir)
    const messageFiles = walkCommandFiles(messageCommandsDir)

    expect(slashFiles.some(file => file.endsWith(path.join('general', 'ping.ts')))).toBe(true)
    expect(slashFiles.some(file => file.endsWith(path.join('moderation', 'addrole.ts')))).toBe(true)
    expect(messageFiles.some(file => file.endsWith(path.join('dev', 'devhelp.ts')))).toBe(true)
  })

  it('identifies valid slash command shapes', () => {
    const command = {
      name: 'ping',
      data: { toJSON: () => ({ name: 'ping' }) },
      executeSlash: async () => undefined,
    }

    expect(isSlashCommand(command as any)).toBe(true)
    expect(isMessageCommand(command as any)).toBe(false)
  })

  it('identifies valid message command shapes', () => {
    const command = {
      name: 'ping',
      executeMessage: async () => undefined,
    }

    expect(isMessageCommand(command as any)).toBe(true)
    expect(isSlashCommand(command as any)).toBe(false)
  })
})
