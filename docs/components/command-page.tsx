'use client'

import * as React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Check, Copy, Bot, User as UserIcon } from 'lucide-react'
import { CommandType } from '@/lib/commands'
import { CommandBadge } from './command-badge'
import { PermissionBadge, permissionMap } from './permission-badge'

interface CommandPageProps {
  command: {
    name: string
    description: string
    usage: string
    type: CommandType
    permissions: {
      bot: string[]
      user: string[]
    }
    examples?: string[]
  }
}

export function CommandPage({ command }: CommandPageProps) {
  const [copied, setCopied] = React.useState(false)

  async function copyUsage() {
    await navigator.clipboard.writeText(command.usage)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function sortBySeverity(perms: string[]) {
    const order = ['basic', 'text', 'voice', 'moderation', 'management', 'admin']

    return [...perms].sort((a, b) => {
      const g1 = permissionMap[a]?.group ?? 'basic'
      const g2 = permissionMap[b]?.group ?? 'basic'
      return order.indexOf(g1) - order.indexOf(g2)
    })
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{command.name}</h1>
          <CommandBadge type={command.type} />
        </div>

        <p className="text-muted-foreground">{command.description}</p>
      </div>

      <Separator />

      {/* Usage */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Usage</h2>

          <Button variant="ghost" size="sm" onClick={copyUsage} className="gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy
              </>
            )}
          </Button>
        </div>

        <pre className="rounded-md bg-muted px-4 py-3 text-sm overflow-x-auto">
          <code>ns.{command.usage}</code>
        </pre>
      </section>

      <Separator />

      {/* Permissions */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Required Permissions</h2>

        {/* Bot permissions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Bot className="h-4 w-4" /> Bot permissions
          </div>

          <div className="flex flex-wrap gap-2">
            {command.permissions.bot.length ? (
              sortBySeverity(command.permissions.bot).map(perm => (
                <PermissionBadge key={perm} permission={perm} />
              ))
            ) : (
              <Badge variant="outline" className="text-xs">
                None
              </Badge>
            )}
          </div>
        </div>

        {/* User permissions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <UserIcon className="h-4 w-4" /> User permissions
          </div>

          <div className="flex flex-wrap gap-2">
            {command.permissions.user.length ? (
              sortBySeverity(command.permissions.user).map(perm => (
                <PermissionBadge key={perm} permission={perm} />
              ))
            ) : (
              <Badge variant="outline" className="text-xs">
                None
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Examples */}
      {command.examples?.length ? (
        <>
          <Separator />
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Examples</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {command.examples.map((src, index) => (
                <div key={index} className="overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={src}
                    alt={`${command.name} example ${index + 1}`}
                    width={800}
                    height={450}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  )
}
