import React from 'react'
import { useRouter } from 'next/router'
import { useConfig, DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: '%s – nsCore',
      defaultTitle: 'nsCore',
      description: 'This is official documentation of nsCore',
      twitter: {
        handle: '@nsgpriyanshu',
        site: '@nsgpriyanshu',
        cardType: 'summary_large_image',
      },
      openGraph: {
        type: 'website',
        url: 'https://nsgpriyanshu.github.io/nscorebot/docs',
        site_name: 'nsCore',
      },
    }
  },
  logo: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/nscore.png" alt="nsCore" style={{ height: '2rem', marginRight: '0.5rem' }} />
      <span style={{ fontWeight: 700 }}>nsDocs</span>
    </div>
  ),
  project: {
    link: 'https://github.com/nsgpriyanshu/nscore',
  },
  chat: {
    link: 'https://discord.gg/G44dR8Zjwx',
  },
  docsRepositoryBase: 'https://github.com/nsgpriyanshu/nscore/docs',
  footer: {
    text: 'Developed by ŊʂƓ ᴾᴿᴵᵞᴬᴺˢᴴᵁ ',
  },
  sidebar: {
    toggleButton: true,
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter } = useConfig()
    const url =
      'https://github.com/nsgpriyanshu/nscore/docs' +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || 'nsCore'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'This is official documentation of nsCore'}
        />
        <link rel="icon" href="public/favicon.ico" type="image/x-icon" />
      </>
    )
  },
}

export default config
