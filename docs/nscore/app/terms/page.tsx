import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - nsCore Docs',
  description: 'Terms and conditions for using the nsCore Discord bot.',
}

export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold">Terms of Service</h1>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Terms of Condition</h2>
      <p className="mb-4">These terms of condition also apply to Power Op!</p>

      <p className="mb-4">
        By using nsCore ("the Bot"), you agree to be bound by the following terms and conditions:
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Use of the Bot</h2>
      <p className="mb-4">
        You agree to use the Bot only in accordance with its intended purpose and functionality as
        described in the bot's commands and documentation.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Prohibited Behavior</h2>
      <p className="mb-4">
        You agree not to use the Bot for any unlawful or prohibited activities, including but not
        limited to spamming, harassment, or any activity that violates Discord's Terms of Service.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">No Warranty</h2>
      <p className="mb-4">
        The Bot is provided "as is" without any warranty of any kind, express or implied. We make no
        guarantees regarding the availability, reliability, or accuracy of the Bot.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Limitation of Liability</h2>
      <p className="mb-4">
        We shall not be liable for any direct, indirect, incidental, special, or consequential
        damages arising out of or in any way connected with the use or inability to use the Bot.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify or update these terms of condition at any time without prior
        notice. It is your responsibility to review these terms periodically for changes.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate or suspend your access to the Bot at any time, without
        prior notice or liability, for any reason whatsoever.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Contact</h2>
      <p className="mb-4">
        If you have any questions or concerns about these terms, please contact us on Discord.
      </p>
    </main>
  )
}
