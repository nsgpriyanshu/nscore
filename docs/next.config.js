const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const nextConfig = {
  output: 'export',
  basePath: '/nscoretest',
  assetPrefix: '/nscoretest/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = {
  ...withNextra(),
  ...nextConfig,
}
