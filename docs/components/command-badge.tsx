import { Badge } from '@/components/ui/badge'

export function CommandBadge({ type }: { type: 'slash' | 'message' | 'hybrid' }) {
  const styles = {
    slash:
      'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
    message:
      'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30',
    hybrid:
      'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30',
  } as const

  return (
    <Badge variant="outline" className={styles[type]}>
      {type.toUpperCase()}
    </Badge>
  )
}
