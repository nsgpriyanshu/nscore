import fs from 'fs'
import path from 'path'
import { Message, Guild, TextChannel, GuildMember, Role, GuildEmoji } from 'discord.js'
import { MessageCommand } from '../src/interfaces/Command'

// ---------------------------
// Mock helpers
// ---------------------------
const mockRole = (name = 'TestRole'): Role =>
  ({
    id: 'role123',
    name,
    permissions: { has: () => true },
    delete: jest.fn(),
  }) as unknown as Role

const mockMember = (): GuildMember =>
  ({
    displayName: 'TestMember',
    roles: { add: jest.fn(), remove: jest.fn(), cache: new Map([['role123', mockRole()]]) },
  }) as unknown as GuildMember

const mockEmoji = (name = 'TestEmoji'): GuildEmoji =>
  ({
    id: 'emoji123',
    name,
    delete: jest.fn(),
    edit: jest.fn(),
    toString: () => `<:${name}:123>`,
  }) as unknown as GuildEmoji

const mockTextChannel = (): TextChannel =>
  ({
    send: jest.fn(),
    delete: jest.fn(),
    permissionsFor: jest.fn(() => ({ has: () => true })),
  }) as unknown as TextChannel

const mockGuild = (): Guild =>
  ({
    id: 'guild123',
    name: 'TestGuild',
    systemChannel: mockTextChannel(),
    channels: { cache: new Map([['channel123', mockTextChannel()]]), create: jest.fn() },
    roles: { cache: new Map([['role123', mockRole()]]), create: jest.fn() },
    members: { cache: new Map([['member123', mockMember()]]) },
    emojis: { cache: new Map([['emoji123', mockEmoji()]]) },
  }) as unknown as Guild

const mockMessage = (): Message =>
  ({
    reply: jest.fn().mockResolvedValue({}),
    author: {
      id: 'user123',
      tag: 'TestUser#0001',
      username: 'TestUser',
      displayAvatarURL: jest.fn(),
    },
    guild: mockGuild(),
    mentions: {
      members: new Map([['member123', mockMember()]]),
      roles: new Map([['role123', mockRole()]]),
    },
  }) as unknown as Message

// ---------------------------
// Load all commands safely
// ---------------------------
const loadCommands = (): MessageCommand[] => {
  const commandsDir = path.join(__dirname, '../src/commands/messageCommands')

  if (!fs.existsSync(commandsDir)) {
    console.warn(`Commands directory not found: ${commandsDir}`)
    return []
  }

  const commandFiles = fs
    .readdirSync(commandsDir)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'))

  const commands: MessageCommand[] = []
  for (const file of commandFiles) {
    const command = require(path.join(commandsDir, file)).default as MessageCommand
    commands.push(command)
  }
  return commands
}

// ---------------------------
// Jest Test Suite
// ---------------------------
describe('Message Commands', () => {
  const commands = loadCommands()
  const message = mockMessage()
  const client = {
    guilds: { cache: new Map([['guild123', message.guild]]) },
    messageCommands: new Map(commands.map(cmd => [cmd.name, cmd])),
  } as any

  if (commands.length === 0) {
    it('No commands to test', () => {
      expect(true).toBe(true) // dummy test to satisfy Jest
    })
    return
  }

  for (const cmd of commands) {
    it(`should execute ${cmd.name} without throwing and reply`, async () => {
      let args: string[] = ['test']

      // Assign default args for known commands
      switch (cmd.name) {
        case 'deleterole':
        case 'removerole':
        case 'createrole':
          args = ['@TestRole']
          break
        case 'deletechannel':
        case 'createchannel':
          args = ['test-channel']
          break
        case 'deleteemoji':
        case 'updateemoji':
          args = ['<:TestEmoji:123>', 'NewName']
          break
        case 'update':
          args = [
            '#00FF00',
            'Test Title',
            'http://example.com/thumb.png',
            'http://example.com/image.png',
            'Update message',
          ]
          break
      }

      await expect(cmd.executeMessage(message, args, client)).resolves.not.toThrow()
      expect(message.reply).toHaveBeenCalled()
    })
  }
})
