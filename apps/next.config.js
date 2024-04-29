const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: ['ui'],
  i18n: {
    locales: ['en', 'lt'],
    defaultLocale: 'en',
  },
});
