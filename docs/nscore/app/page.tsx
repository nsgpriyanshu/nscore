import SiteFooter from '@/components/site-footer'
import { RocketIcon } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Introduction - nsCore Docs',
  description: 'Official documentation of the nsCore Discord bot.',
}

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold">Introducing nsCore</h1>
      <p className="mb-4">
        Welcome to the official documentation of <strong>nsCore</strong>, an informative Discord bot
        developed by <strong>nsgpriyansu</strong> using TypeScript, JavaScript, and discord.js!
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">About</h2>
      <p className="mb-4">
        nsCore is designed to provide a wide range of features and commands to enhance your Discord
        server experience. Whether you're looking for moderation tools or informational resources,
        nsCore has you covered. With its user-friendly interface and powerful functionality, nsCore
        aims to elevate your Discord community to the next level.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Users Section</h2>
      <p className="mb-4">
        This section is exclusively for end users who encounter problems while using nsCore or are
        confused about commands. Please check out our <strong>command docs</strong> for a brief
        description of all commands with examples!
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Developers Section</h2>
      <p className="mb-4">
        As an open-source Discord bot, we believe it's important to provide a detailed developer
        guide. Since existing guides are quite basic, we've created this comprehensive guide
        covering everything from npm installation to command usage. Please check out the{' '}
        <strong>dev guide</strong> here.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Thank You</h2>
      <p className="mb-4">
        Thank you for using nsCore! We hope this guide assists you in your journey. Happy coding!
        <RocketIcon />
      </p>

      <SiteFooter />
    </main>
  )
}
