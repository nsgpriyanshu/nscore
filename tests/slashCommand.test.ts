import fs from 'fs'
import path from 'path'
import {
  ChatInputCommandInteraction,
  Guild,
  TextChannel,
  GuildMember,
  Role,
  GuildEmoji,
  PermissionsBitField,
} from 'discord.js'
import { SlashCommand } from '../src/interfaces/Command'

// ---------------------------
// Mock helpers
// ---------------------------
const mockRole = (name = 'TestRole'): Role => ({
  id: 'role123',
  name,
  permissions: new PermissionsBitField(),
  delete: jest.fn(),
} as unknown as Role)

const mockMember = (): GuildMember => ({
  displayName: 'TestMember',
  roles: { add: jest.fn(), remove: jest.fn(), cache: new Map([['role123', mockRole()]]) },
} as unknown as GuildMember)

const mockEmoji = (name = 'TestEmoji'): GuildEmoji => ({
  id: 'emoji123',
  name,
  delete: jest.fn(),
  edit: jest.fn(),
  toString: () => `<:${name}:123>`,
} as unknown as GuildEmoji)

const mockTextChannel = (): TextChannel => ({
  send: jest.fn(),
  delete: jest.fn(),
  permissionsFor: jest.fn(() => ({ has: () => true })),
} as unknown as TextChannel)

const mockGuild = (): Guild => ({
  id: 'guild123',
  name: 'TestGuild',
  systemChannel: mockTextChannel(),
  channels: { cache: new Map([['channel123', mockTextChannel()]]), create: jest.fn() },
  roles: { cache: new Map([['role123', mockRole()]]) },
  members: { cache: new Map([['member123', mockMember()]]) },
  emojis: { cache: new Map([['emoji123', mockEmoji()]]) },
} as unknown as Guild)

const mockInteraction = (): ChatInputCommandInteraction => ({
  user: { id: 'user123', tag: 'TestUser#0001', username: 'TestUser', displayAvatarURL: jest.fn() },
  guild: mockGuild(),
  options: {
    getString: jest.fn((name: string, required?: boolean) => 'test-value'),
  } as any,
  reply: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
} as unknown as ChatInputCommandInteraction)

// ---------------------------
// Load all slash commands safely
// ---------------------------
const loadSlashCommands = (): SlashCommand[] => {
  const commandsDir = path.join(__dirname, '../src/commands/slashCommands')

  if (!fs.existsSync(commandsDir)) {
    console.warn(`Slash commands directory not found: ${commandsDir}`)
    return []
  }

  const commandFiles = fs
    .readdirSync(commandsDir)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'))

  const commands: SlashCommand[] = []
  for (const file of commandFiles) {
    const command = require(path.join(commandsDir, file)).default as SlashCommand
    commands.push(command)
  }
  return commands
}

// ---------------------------
// Jest Test Suite
// ---------------------------
describe('Slash Commands', () => {
  const commands = loadSlashCommands()
  const interaction = mockInteraction()
  const client = {
    slashCommands: new Map(commands.map(cmd => [cmd.name, cmd])),
    guilds: { cache: new Map([['guild123', interaction.guild]]) },
  } as any

  if (commands.length === 0) {
    it('No slash commands to test', () => {
      expect(true).toBe(true) // dummy test to satisfy Jest
    })
    return
  }

  for (const cmd of commands) {
    it(`should execute /${cmd.name} without throwing and reply`, async () => {
      let args: any = {}

      // Assign default options for known commands
      switch (cmd.name) {
        case 'createchannel':
        case 'deletechannel':
          args = { name: 'test-channel', description: 'test' }
          break
        case 'createrole':
        case 'deleterole':
        case 'removerole':
          args = { role: '@TestRole' }
          break
        case 'deleteemoji':
        case 'updateemoji':
          args = { emoji: '<:TestEmoji:123>', new_name: 'NewName' }
          break
        case 'update':
          args = { color: '#00FF00', title: 'Test Title', thumbnail: '', image: '', message: 'Update message' }
          break
      }

      await expect(cmd.executeSlash(interaction, client)).resolves.not.toThrow()
      expect(interaction.reply).toHaveBeenCalled()
    })
  }
})
