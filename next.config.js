/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
    env: {
      // Reference a variable that was defined in the .env file and make it available at Build Time
      NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
      NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
      NEXT_PUBLIC_STRAPI_DOMAIN: process.env.NEXT_PUBLIC_STRAPI_DOMAIN,
      NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: process.env.NEXT_PUBLIC_STRAPI_DOMAIN,
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: "/uploads/:path*",
          destination: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/uploads/:path*`,
        },
      ];
    },
};

module.exports = withSentryConfig(
  withNextIntl(nextConfig),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  
    // An auth token is required for uploading source maps.
    authToken: process.env.SENTRY_AUTH_TOKEN,

    // Suppresses source map uploading logs during build
    silent: true,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: false,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/api/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
