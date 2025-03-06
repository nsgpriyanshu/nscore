import type { Metadata } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Megaphone, HelpCircle, Wifi, Server, User, Newspaper, CloudRain } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Universal Commands - nsCore Docs',
  description: 'List of Universal commands available in nsCore.',
}

const commands = [
  {
    name: 'announce',
    description: 'Creates an announcement in a specified channel with customizable options.',
    usage: 'announce <channel> <color> <title> <message>',
    example:
      'ns.announce #discussion #1c1c1e ns Docs This is the official documentation of nsCore app!',
    icon: Megaphone,
  },
  {
    name: 'help',
    description: 'Lists all available commands.',
    usage: 'help',
    example: 'ns.help',
    icon: HelpCircle,
  },
  {
    name: 'ping',
    description: 'Replies with "Ping!" to test the responsiveness of the bot.',
    usage: 'ping',
    example: 'ns.ping',
    icon: Wifi,
  },
  {
    name: 'servericon',
    description: 'Displays the icon and banner of the server.',
    usage: 'servericon',
    example: 'ns.servericon',
    icon: Server,
  },
  {
    name: 'usericon',
    description: 'Displays the profile picture of the user who triggered the command.',
    usage: 'usericon',
    example: 'ns.usericon',
    icon: User,
  },
  {
    name: 'news',
    description: 'Displays the latest news on a specified topic.',
    usage: 'news <topic>',
    example: 'ns.news star wars',
    icon: Newspaper,
  },
  {
    name: 'weather',
    description: 'Displays weather information for a specified location.',
    usage: 'weather <location>',
    example: 'ns.weather New York',
    icon: CloudRain,
  },
]

export default function GeneralCommands() {
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold">Universal Commands</h1>
      <p className="mb-4">This is the list of our available Universal commands.</p>
      <p className="mb-4 font-semibold">This requires only Send Messages permission.</p>

      {commands.map(({ name, description, usage, example, icon: Icon }) => (
        <section key={name}>
          <h2 className="mb-4 mt-8 text-2xl font-semibold flex items-center gap-2">
            <Icon className="w-6 h-6" /> {name}
          </h2>
          <p className="mb-2">{description}</p>
          <p className="mb-4 font-semibold">
            Usage: <code>{usage}</code>
          </p>
          <Alert className="mb-4" variant={'default'}>
            <AlertTitle>Example</AlertTitle>
            <AlertDescription>{example}</AlertDescription>
          </Alert>
        </section>
      ))}
    </main>
  )
}
