export type CommandType = 'slash' | 'message' | 'hybrid'

export interface CommandData {
  name: string
  category: string
  description: string
  usage: string
  type: CommandType
  permissions: {
    bot: string[]
    user: string[]
  }
  examples?: string[]
}

export const commands: CommandData[] = [
  {
    name: 'ping',
    category: 'general',
    type: 'hybrid',
    description: 'Check bot latency.',
    usage: '/ping',
    permissions: {
      bot: ['sendMessages'],
      user: ['sendMessages'],
    },
    examples: ['/examples/ping.png'],
  },
]
