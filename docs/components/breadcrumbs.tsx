'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function Breadcrumbs() {
  const pathname = usePathname()

  // remove empty segments and 'dashboard'
  const segments = pathname.split('/').filter(segment => segment && segment !== 'dashboard')

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/dashboard/${segments.slice(0, index + 1).join('/')}`

    // prettify segment text
    const name = decodeURIComponent(segment)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())

    return { href, name }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Always start with Dashboard */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-1">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={crumb.href}>{crumb.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
