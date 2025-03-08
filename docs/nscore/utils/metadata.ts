import { Metadata } from 'next'

export const siteConfig = {
  siteName: 'nsCore',
  siteDescription: 'An informative open source discord app written by nsgpriyanshu',
  links: {
    siteUrl: 'https://',
    ogImage: 'https://images/preview.png',
    twitterImage: 'https://images/preview.png',
    twitter: '@nsgpriyanshu',
    discord: 'https://discord.gg/YqgR7dcbfP',
  },
}

export const generateMetadata = ({
  title = `nsCore - Home`,
  description = `An informative open source discord app written by nsgpriyanshu`,
  image = '/thumbnail.png',
  icons = [
    {
      rel: 'apple-touch-icon',
      sizes: '32x32',
      url: '/nscorebot.png',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      url: '/nscorebot.png',
    },
  ],
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string | null
  icons?: Metadata['icons']
  noIndex?: boolean
} = {}): Metadata => ({
  title,
  description,
  icons,
  ...(noIndex && { robots: { index: false, follow: false } }),

  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    url: siteConfig.links.siteUrl,
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.links.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    images: [
      {
        url: siteConfig.links.twitterImage,
        alt: siteConfig.siteName,
      },
    ],
    site: siteConfig.links.twitter,
    creator: siteConfig.links.twitter,
  },
})
