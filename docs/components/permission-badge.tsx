'use client'

import { Badge } from '@/components/ui/badge'

/**
 * Permission groups ordered by severity (low → high)
 */
export type PermissionGroup = 'basic' | 'text' | 'voice' | 'moderation' | 'management' | 'admin'

interface PermissionConfig {
  group: PermissionGroup
  className: string
}

/**
 * Full Discord permission map (dark-theme optimized)
 */
export const permissionMap: Record<string, PermissionConfig> = {
  // ===== BASIC =====
  viewChannel: {
    group: 'basic',
    className:
      'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30',
  },
  sendMessages: {
    group: 'basic',
    className:
      'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30',
  },
  readMessageHistory: {
    group: 'basic',
    className:
      'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30',
  },
  addReactions: {
    group: 'basic',
    className:
      'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30',
  },
  useExternalEmojis: {
    group: 'basic',
    className:
      'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30',
  },

  // ===== TEXT =====
  embedLinks: {
    group: 'text',
    className:
      'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
  },
  attachFiles: {
    group: 'text',
    className:
      'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
  },
  mentionEveryone: {
    group: 'text',
    className:
      'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
  },
  manageThreads: {
    group: 'text',
    className:
      'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
  },
  createPublicThreads: {
    group: 'text',
    className:
      'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
  },
  createPrivateThreads: {
    group: 'text',
    className:
      'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
  },

  // ===== VOICE =====
  connect: {
    group: 'voice',
    className:
      'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
  },
  speak: {
    group: 'voice',
    className:
      'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
  },
  stream: {
    group: 'voice',
    className:
      'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
  },
  muteMembers: {
    group: 'voice',
    className:
      'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
  },
  deafenMembers: {
    group: 'voice',
    className:
      'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
  },
  moveMembers: {
    group: 'voice',
    className:
      'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
  },

  // ===== MODERATION =====
  kickMembers: {
    group: 'moderation',
    className:
      'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30',
  },
  timeoutMembers: {
    group: 'moderation',
    className:
      'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30',
  },
  manageMessages: {
    group: 'moderation',
    className:
      'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30',
  },

  // ===== MANAGEMENT =====
  manageChannels: {
    group: 'management',
    className:
      'bg-pink-500/10 text-pink-600 border-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/30',
  },
  manageRoles: {
    group: 'management',
    className:
      'bg-pink-500/10 text-pink-600 border-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/30',
  },
  manageWebhooks: {
    group: 'management',
    className:
      'bg-pink-500/10 text-pink-600 border-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/30',
  },
  manageGuild: {
    group: 'management',
    className:
      'bg-pink-500/10 text-pink-600 border-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/30',
  },

  // ===== ADMIN =====
  manageServer: {
    group: 'admin',
    className:
      'bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30',
  },
  banMembers: {
    group: 'admin',
    className:
      'bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30',
  },
  administrator: {
    group: 'admin',
    className:
      'bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30',
  },
}

function formatPermission(value: string) {
  return value.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())
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
