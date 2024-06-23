const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const nextConfig = {
  output: 'export',
  basePath: '/nscore',
  assetPrefix: '/nscore/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = {
  ...withNextra(),
  ...nextConfig,
}
