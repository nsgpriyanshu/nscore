import { notFound } from 'next/navigation'
import { commands } from '@/lib/commands'
import { CommandPage } from '@/components/command-page'

interface PageProps {
  params: Promise<{
    category: string
    command: string
  }>
}

export default async function CommandDocPage({ params }: PageProps) {
  const { category, command } = await params

  const commandData = commands.find(cmd => cmd.category === category && cmd.name === command)

  if (!commandData) notFound()

  return (
    <CommandPage
      command={{
        name: commandData.name,
        description: commandData.description,
        type: commandData.type,
        usage: commandData.usage,
        permissions: commandData.permissions,
        examples: commandData.examples,
      }}
    />
  )
}
