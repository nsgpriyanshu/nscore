'use client'

import { Badge } from '@/components/ui/badge'

/**
 * Permission groups ordered by severity (low → high)
 */
export type PermissionGroup =
  | 'basic'
  | 'text'
  | 'voice'
  | 'moderation'
  | 'management'
  | 'admin'

interface PermissionConfig {
  group: PermissionGroup
  className: string
}

/**
 * Full Discord permission map (string-based, dynamic)
 * This acts as the single source of truth for permission → color
 */
export const permissionMap: Record<string, PermissionConfig> = {
  // ===== BASIC =====
  viewChannel: { group: 'basic', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
  sendMessages: { group: 'basic', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
  readMessageHistory: { group: 'basic', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
  addReactions: { group: 'basic', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
  useExternalEmojis: { group: 'basic', className: 'bg-green-500/10 text-green-600 border-green-500/20' },

  // ===== TEXT =====
  embedLinks: { group: 'text', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  attachFiles: { group: 'text', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  mentionEveryone: { group: 'text', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  manageThreads: { group: 'text', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  createPublicThreads: { group: 'text', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  createPrivateThreads: { group: 'text', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },

  // ===== VOICE =====
  connect: { group: 'voice', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  speak: { group: 'voice', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  stream: { group: 'voice', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  muteMembers: { group: 'voice', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  deafenMembers: { group: 'voice', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  moveMembers: { group: 'voice', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },

  // ===== MODERATION =====
  kickMembers: { group: 'moderation', className: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
  timeoutMembers: { group: 'moderation', className: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
  manageMessages: { group: 'moderation', className: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },

  // ===== MANAGEMENT =====
  manageChannels: { group: 'management', className: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },
  manageRoles: { group: 'management', className: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },
  manageWebhooks: { group: 'management', className: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },
  manageGuild: { group: 'management', className: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },

  // ===== ADMIN =====
  manageServer: { group: 'admin', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
  banMembers: { group: 'admin', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
  administrator: { group: 'admin', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
}

function formatPermission(value: string) {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, c => c.toUpperCase())
}

export function PermissionBadge({ permission }: { permission: string }) {
  const config = permissionMap[permission]

  if (!config) {
    return (
      <Badge variant="outline" className="text-xs">
        {formatPermission(permission)}
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className={`text-xs ${config.className}`}>
      {formatPermission(permission)}
    </Badge>
  )
}
