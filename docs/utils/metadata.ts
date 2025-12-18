import { Metadata } from 'next'

const siteConfig = {
  siteName: 'nsCore',
  siteDescription:
    'Official documentation for nsCore — a powerful, hybrid Discord bot built with TypeScript, JavaScript, and discord.js.',
  siteKeywords:
    'nsCore, Discord bot, discord.js, Discord commands, moderation bot, open source discord bot, nsgpriyanshu',
  links: {
    discord: 'https://discord.gg/VUMVuArkst',
    twitter: '@nsgpriyanshu',
    siteUrl: 'https://nscore.vercel.app',
    ogImage: '/assets/og-nscore.png',
    twitterImage: '/assets/og-nscore.png',
  },
}

export const generateMetadata = ({
  title = 'nsCore Documentation',
  description = siteConfig.siteDescription,
  image = siteConfig.links.ogImage,
  icons = [
    {
      rel: 'apple-touch-icon',
      sizes: '32x32',
      url: '/favicon.ico',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      url: '/favicon.ico',
    },
  ],
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string | null
  icons?: Metadata['icons']
  noIndex?: boolean
} = {}): Metadata => {
  const baseUrl = siteConfig.links.siteUrl
  const ogImageUrl = image?.startsWith('http') ? image : `${baseUrl}${image}`
  const twitterImageUrl = image?.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title,
    description,
    icons,
    keywords: siteConfig.siteKeywords,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: {
      title,
      description,
      url: baseUrl,
      type: 'website',
      locale: 'en_US',
      siteName: siteConfig.siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: twitterImageUrl,
          alt: siteConfig.siteName,
        },
      ],
      site: siteConfig.links.twitter,
      creator: siteConfig.links.twitter,
    },
  }
}
