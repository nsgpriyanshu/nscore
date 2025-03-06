import type { Metadata } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, Hash, User, Shield, Server, Star, Link } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Information Commands - nsCore Docs',
  description: 'List of Information commands available in nsCore.',
}

const commands = [
  {
    name: 'appinfo',
    description: 'Displays information about the app.',
    usage: 'appinfo',
    example: 'ns.appinfo',
    icon: Info,
  },
  {
    name: 'channelinfo',
    description: 'Displays information about a specified channel or the current channel.',
    usage: 'channelinfo [channel]',
    example: 'ns.channelinfo #code-chat',
    icon: Hash,
  },
  {
    name: 'info',
    description: 'Displays information about a user.',
    usage: 'info <user>',
    example: 'ns.info @nsgpriyansu',
    icon: User,
  },
  {
    name: 'roleinfo',
    description: 'Displays information about a specific role, including its permissions.',
    usage: 'roleinfo <@role>',
    example: 'ns.roleinfo @ns developers',
    icon: Shield,
  },
  {
    name: 'serverinfo',
    description: 'Displays information about the server.',
    usage: 'serverinfo',
    example: 'ns.serverinfo',
    icon: Server,
  },
  {
    name: 'boostinfo',
    description: 'Displays information about the current server boosts.',
    usage: 'boostinfo',
    example: 'ns.boostinfo',
    icon: Star,
  },
  {
    name: 'inviteinfo',
    description: 'Displays information about an invite.',
    usage: 'inviteinfo <invite_code/link>',
    example: 'ns.inviteinfo https://discord.gg/VUMVuArkst',
    icon: Link,
  },
]

export default function InformationCommands() {
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold">Information Commands</h1>
      <p className="mb-4">This is the list of available information commands.</p>
      <p className="mb-4 font-semibold">This requires only Send Messages permission.</p>

      {commands.map(({ name, description, usage, example, icon: Icon }) => (
        <div key={name}>
          <h2 className="mb-4 mt-8 text-2xl font-semibold flex items-center gap-2">
            <Icon className="w-6 h-6" /> {name}
          </h2>
          <p className="mb-2">{description}</p>
          <p className="mb-4">
            <strong>Usage:</strong> `{usage}`
          </p>
          <Alert className="mb-4" variant={'default'}>
            <AlertTitle>Example</AlertTitle>
            <AlertDescription>{example}</AlertDescription>
          </Alert>
        </div>
      ))}
    </main>
  )
}
