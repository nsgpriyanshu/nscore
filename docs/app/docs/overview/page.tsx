import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CommandBadge } from '@/components/command-badge'
import { PermissionBadge } from '@/components/permission-badge'

export default function DocsOverviewPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 space-y-12">
      {/* Title */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documentation Overview</h1>
        <p className="text-muted-foreground">
          Learn how to read and understand nsCore command documentation.
        </p>
      </section>

      <Separator />

      {/* Command Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Command Types</h2>
        <p className="text-muted-foreground">
          Each command in nsCore is categorized by how it can be used in Discord.
        </p>

        <div className="space-y-4">
          <CommandType
            badge={<CommandBadge type="slash" />}
            title="Slash Command"
            description="Used via Discord’s slash (/) interface. These commands provide autocomplete and validation."
            example="/ping"
          />

          <CommandType
            badge={<CommandBadge type="message" />}
            title="Message Command"
            description="Triggered by sending a normal message, usually with a prefix."
            example="ns.ping"
          />

          <CommandType
            badge={<CommandBadge type="hybrid" />}
            title="Hybrid Command"
            description="Can be used both as a slash command and as a message command."
            example="/ping or ns.ping"
          />
        </div>
      </section>

      <Separator />

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage Section</h2>
        <p className="text-muted-foreground">
          The usage block shows the correct syntax for running a command.
        </p>

        <div className="rounded-lg border bg-muted p-4 text-sm font-mono">/ping [user]</div>

        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>Required arguments appear without brackets.</li>
          <li>Optional arguments appear inside square brackets.</li>
          <li>Slash commands will show hints directly in Discord.</li>
        </ul>
      </section>

      <Separator />

      {/* Permissions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Required Permissions</h2>
        <p className="text-muted-foreground">
          Some commands require special permissions to function correctly.
        </p>

        <div className="space-y-3">
          <div>
            <p className="font-medium">Bot Permissions</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <PermissionBadge permission="sendMessages" />
              <PermissionBadge permission="embedLinks" />
            </div>
          </div>

          <div>
            <p className="font-medium">User Permissions</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <PermissionBadge permission="manageMessages" />
              <PermissionBadge permission="administrator" />
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          If either the bot or the user lacks required permissions, the command may fail.
        </p>
      </section>

      <Separator />

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <p className="text-muted-foreground">
          Example images show how a command behaves inside Discord.
        </p>

        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>Examples help you verify correct usage.</li>
          <li>They may include bot responses or embeds.</li>
          <li>Not all commands require examples.</li>
        </ul>
      </section>

      <Separator />

      {/* Navigation */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Navigating the Docs</h2>
        <p className="text-muted-foreground">
          Use the sidebar to browse command categories such as General, Info, and Moderation. Each
          command has its own dedicated page.
        </p>
      </section>
    </div>
  )
}

/* ---------- Helpers ---------- */

function CommandType({
  badge,
  title,
  description,
  example,
}: {
  badge: React.ReactNode
  title: string
  description: string
  example: string
}) {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center gap-2">
        {badge}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="rounded bg-muted px-3 py-2 text-sm font-mono">{example}</div>
    </div>
  )
}
