import Link from 'next/link'

export function AppFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
        <p>
          Developed by{' '}
          <Link
            href="https://github.com/nsgpriyanshu"
            target="_blank"
            className="font-medium text-foreground hover:underline"
          >
            nsgpriyanshu
          </Link>
        </p>
      </div>
    </footer>
  )
}
