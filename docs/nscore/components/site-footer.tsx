import { siteConfig } from '@/utils/metadata'

function SiteFooter() {
  return (
    <footer className="border-grid border-t py-2 md:py-0">
      <div className="container-wrapper">
        <div className="container py-2">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Developed by{' '}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 text-neutral-900 dark:text-neutral-100"
            >
              nsgpriyanshu
            </a>
            . For support join our{' '}
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 text-neutral-900 dark:text-neutral-100"
            >
              Discord Server
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
