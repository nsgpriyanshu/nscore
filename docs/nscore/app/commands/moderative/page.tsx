import type { Metadata } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, Hash, User, Shield, Server, Star, Link } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Moderation Commands - nsCore Docs',
  description: 'List of Moderation commands available in nsCore.',
}

const commands = [
  {
    name: 'addrole',
    description: 'Assigns a specified role to a user.',
    usage: 'addrole <@user> <@role>',
    example: 'ns.addrole @nsgpriyansu @ns creator',
    requiredPermissions: 'Manage Roles',
    icon: Shield,
  },
  {
    name: 'createchannel',
    description: 'Creates a new text channel in the server with an optional description.',
    usage: 'createchannel <channel_name> [description]',
    example: 'createchannel code-play-ground A place for creators thrive',
    requiredPermissions: 'Manage Channels',
    icon: Hash,
  },
  {
    name: 'createrole',
    description: 'Creates a new role within the server.',
    usage: 'createrole <role_name> <color> [permissions]',
    example: 'ns.createrole creators #ffffff SendMessages',
    requiredPermissions: 'Manage Roles, Manage Permissions',
    icon: Shield,
  },
  {
    name: 'deletechannel',
    description: 'Deletes a specified channel from the server.',
    usage: 'deletechannel <#channel>',
    example: 'deletechannel #old-play-ground',
    requiredPermissions: 'Manage Channels',
    icon: Hash,
  },
  {
    name: 'deleteemoji',
    description: 'Removes an existing emoji from the server.',
    usage: 'deleteemoji <emoji>',
    example: 'ns.deleteemoji :unhappy:',
    requiredPermissions: 'Manage Emojis',
    icon: Info,
  },
  {
    name: 'deleterole',
    description: 'Removes a specified role from the server.',
    usage: 'deleterole <role>',
    example: 'ns.deleterole gg-devs',
    requiredPermissions: 'Manage Roles',
    icon: Shield,
  },
  {
    name: 'removerole',
    description: 'Removes a specified role from a user.',
    usage: 'removerole <user> <role>',
    example: 'ns.removerole @xevy old-friend',
    requiredPermissions: 'Manage Roles',
    icon: Shield,
  },
  {
    name: 'updateemoji',
    description: 'Updates the name of an existing emoji within the server.',
    usage: 'updateemoji <old_name> <new_name>',
    example: 'ns.updateemoji :smile: :happy:',
    requiredPermissions: 'Manage Emojis',
    icon: Info,
  },
]

export default function ModerationCommands() {
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold">Moderation Commands</h1>
      <p className="mb-4">This is the list of available moderation commands.</p>
      <p className="mb-4 font-semibold">
        These commands require appropriate permissions mentioned below in each command.
      </p>

      {commands.map(({ name, description, usage, example, requiredPermissions, icon: Icon }) => (
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
          <Alert className="mb-4" variant={'destructive'}>
            <AlertTitle>Required Permissions</AlertTitle>
            <AlertDescription>{requiredPermissions}</AlertDescription>
          </Alert>
        </div>
      ))}
    </main>
  )
}
