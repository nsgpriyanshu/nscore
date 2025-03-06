import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - nsCore Docs',
  description: 'Privacy policy for nsCore Discord bot.',
}

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>

      <p className="mb-4">This Privacy Policy also applies to Power Op!</p>

      <p className="mb-4">
        nsCore respects your privacy and is committed to ensuring that your personal information is
        protected. As a general Discord bot, nsCore does not collect, store, or process any user
        data.
      </p>

      <p className="mb-4">
        We do not track your messages, user IDs, server information, or any other personal data when
        you interact with nsCore. Our sole purpose is to provide the functionalities and features as
        described in our bot's commands and documentation.
      </p>

      <p className="mb-4">
        While using nsCore, you can rest assured that your privacy and data security are our top
        priorities. We do not have access to any information beyond what is publicly available
        within the Discord platform.
      </p>

      <p className="mb-4">
        Please note that this privacy policy applies solely to nsCore and does not extend to any
        third-party services or bots that you may interact with on Discord. We encourage you to
        review the privacy policies of any third-party services or bots you engage with on Discord.
      </p>

      <p className="mb-4">
        If you have any questions or concerns about our privacy policy, please contact us at
        Discord.
      </p>
    </main>
  )
}
