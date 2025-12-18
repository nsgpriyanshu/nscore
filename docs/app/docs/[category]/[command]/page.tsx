import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { commands } from '@/lib/commands'
import { CommandPage } from '@/components/command-page'

interface PageProps {
  params: Promise<{
    category: string
    command: string
  }>
}

/**
 * Page-level dynamic SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, command } = await params

  const commandData = commands.find(cmd => cmd.category === category && cmd.name === command)

  if (!commandData) {
    return {
      title: 'Command Not Found - nsCore',
      robots: { index: false, follow: false },
    }
  }

  const title = `${commandData.name} Command - nsCore`
  const description =
    commandData.description ||
    `Learn how to use the ${commandData.name} command in nsCore Discord bot.`

  const url = `https://nscore.dev/docs/${category}/${command}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
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
