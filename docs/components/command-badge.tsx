import { Badge } from '@/components/ui/badge'

export function CommandBadge({ type }: { type: 'slash' | 'message' | 'hybrid' }) {
  const styles = {
    slash: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    message: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    hybrid: 'bg-green-500/10 text-green-600 border-green-500/20',
  }

  return (
    <Badge variant="outline" className={styles[type]}>
      {type.toUpperCase()}
    </Badge>
  )
}
