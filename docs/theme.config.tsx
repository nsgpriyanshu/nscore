import React from 'react'
import { useRouter } from 'next/router'
import { useConfig, DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  useNextSeoProps() {
    const { frontMatter } = useConfig()
    return {
      titleTemplate: '%s – nsCore',
      defaultTitle: 'nsCore',
      description:
        frontMatter.description ||
        'A comprehensive, production-level guide for developing and managing a Discord app effectively.',
      twitter: {
        handle: '@nsgpriyanshu',
        site: '@nsgpriyanshu',
        cardType: 'summary_large_image',
      },
      openGraph: {
        type: 'website',
        url: 'https://nsgpriyanshu.github.io/nsCore',
        site_name: 'nsCore',
        title: frontMatter.title || 'nsCore',
        description:
          frontMatter.description ||
          'A comprehensive, production-level guide for developing and managing a Discord app effectively.',
      },
    }
  },
  logo: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="./logo.png" alt="nsCore" style={{ height: '2rem', marginRight: '0.5rem' }} />
      <span style={{ fontWeight: 700 }}>nsCore</span>
    </div>
  ),
  project: {
    link: 'https://github.com/nsgpriyanshu/nscore',
  },
  chat: {
    link: 'https://discord.gg/G44dR8Zjwx',
  },
  docsRepositoryBase: 'https://github.com/nsgpriyanshu/nscore',
  footer: {
    text: 'Developed by ŊʂƓ ᴾᴿᴵᵞᴬᴺˢᴴᵁ',
  },
  sidebar: {
    toggleButton: true,
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter } = useConfig()
    const url =
      'https://nsgpriyanshu.github.io/nscore' +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || 'nsCore'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'A production level discord app guide'}
        />
        <meta property="og:image" content="https://nsgpriyanshu.github.io/nscore/preview.jpg" />
        <meta property="og:site_name" content="nsCore" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nsgpriyanshu" />
        <meta name="twitter:creator" content="@nsgpriyanshu" />
        <meta name="twitter:title" content={frontMatter.title || 'nsCore'} />
        <meta
          name="twitter:description"
          content={frontMatter.description || 'A production level discord app guide'}
        />
        <meta name="twitter:image" content="https://nsgpriyanshu.github.io/nscore/preview.jpg" />
        <meta name="keywords" content="Discord, app, guide, production-level, nsCore" />
        <meta name="author" content="ŊʂƓ ᴾᴿᴵᵞᴬᴺˢᴴᵁ" />
        <meta property="robots" content="index, follow" />
        <link rel="canonical" href="https://nsgpriyanshu.github.io/nscore" />
        <link
          rel="icon"
          href="https://nsgpriyanshu.github.io/nscore/favicon.ico"
          type="image/x-icon"
        />
      </>
    )
  },
}

export default config
