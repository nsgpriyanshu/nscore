import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PermissionBadge } from "@/components/permission-badge"

export default function InviteBotPage() {
    return (
        <div className="mx-auto max-w-4xl px-6 py-10 space-y-12">
            {/* Title */}
            <section className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Invite nsCore to Your Server
                </h1>
                <p className="text-muted-foreground">
                    Follow the steps below to safely invite nsCore and configure it for
                    your Discord server.
                </p>
            </section>

            <Separator />

            {/* Invite CTA */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Invite Link</h2>
                <p className="text-muted-foreground">
                    Use the official invite link to add nsCore to your server.
                </p>

                <Button size="lg">
                    Invite nsCore
                </Button>

                <p className="text-sm text-muted-foreground">
                    You must have the <span><PermissionBadge permission="manageServer" /></span> permission to invite
                    a bot.
                </p>
            </section>

            <Separator />

            {/* Step 1 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Step 1: Choose a Server</h2>
                <p className="text-muted-foreground">
                    Select the Discord server where you want to add nsCore.
                </p>

                <ImagePlaceholder label="Server selection screen" />
            </section>

            <Separator />

            {/* Step 2 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Step 2: Review Permissions</h2>
                <p className="text-muted-foreground">
                    nsCore requests permissions only when required for its features.
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                    <PermissionBadge permission="embedLinks" />
                    <PermissionBadge permission="sendMessages" />
                    <PermissionBadge permission="manageMessages" />
                </div>

                <ImagePlaceholder label="Permission authorization screen" />
            </section>

            <Separator />

            {/* Step 3 */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Step 3: Complete Authorization</h2>
                <p className="text-muted-foreground">
                    After authorizing, nsCore will join your server and be ready to use.
                </p>

                <ImagePlaceholder label="Bot added successfully" />
            </section>

            <Separator />

            {/* Security */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Security & Privacy</h2>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>nsCore does not read messages unless required by a command.</li>
                    <li>No sensitive user data is stored without reason.</li>
                    <li>You can remove the bot anytime from Server Settings.</li>
                </ul>
            </section>

            <Separator />

            {/* After Invite */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">After Inviting</h2>
                <p className="text-muted-foreground">
                    Once added, try these commands to get started:
                </p>

                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">ns.help</Badge>
                    <Badge variant="outline">ns.ping</Badge>
                    <Badge variant="outline">ns.serverinfo</Badge>
                    <Badge variant="outline">/help</Badge>
                    <Badge variant="outline">/ping</Badge>
                    <Badge variant="outline">/serverinfo</Badge>
                </div>
            </section>
        </div>
    )
}

/* ---------- Helpers ---------- */

function ImagePlaceholder({ label }: { label: string }) {
    return (
        <div className="relative flex h-56 items-center justify-center rounded-lg border bg-muted">
            <span className="text-sm text-muted-foreground">
                Image placeholder — {label}
            </span>
        </div>
    )
}

