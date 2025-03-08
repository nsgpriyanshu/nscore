import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleAlertIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Getting Started - nsCore Docs',
  description: 'Quick start guide for nsCore Discord bot.',
}

export default function GettingStarted() {
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold">Getting Started</h1>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Installation</h2>
      <p className="mb-4">To add the nsCore app to your Discord server, follow these steps:</p>
      <ul className="mb-4 list-inside list-disc space-y-1">
        <li>Click on the invitation link provided by the app's developer.</li>
        <li>Select the server where you want to add the app.</li>
        <li>Authorize the app with the necessary permissions.</li>
        <li>Ensure the app has the correct permissions to perform its tasks effectively.</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Permissions</h2>
      <p className="mb-4">
        nsCore does not request administrative permissions upon installation to ensure better
        security for your Discord server. However, if you wish to use administrative features, you
        can find the required permissions in the respective command documentation.
      </p>
      <Alert variant="default">
        <CircleAlertIcon className="h-4 w-4" />
        <AlertTitle>Dont ignore!</AlertTitle>
        <AlertDescription>
          We strongly recommend granting only necessary permissions and avoiding unnecessary ones!
        </AlertDescription>
      </Alert>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Message Commands</h2>
      <p className="mb-4">
        The prefix for nsCore commands is <strong>ns.</strong>, designed to be simple and unique.
      </p>
      <p className="mb-4">
        Additionally, if you are using the <strong>Power Op</strong> app, please note that its
        prefix is <strong>Op.</strong>. This is not mentioned in the command docs, so don't panic!
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Slash Commands</h2>
      <p className="mb-4">
        Currently, nsCore does not fully support slash commands, as very few users rely on them.
        However, we plan to introduce full slash command support soon!
      </p>

      {/* <h2 className="mb-4 mt-8 text-2xl font-semibold">Navigation</h2>
      <div className="flex flex-wrap gap-4">
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary">Secondary</Button>
      </div> */}

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Thank You</h2>
      <p className="mb-4">We hope this documentation helps you! Happy using!</p>
    </main>
  )
}
