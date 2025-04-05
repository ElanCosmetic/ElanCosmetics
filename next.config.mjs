import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-136c0d4103a4428c9a0d7dd387ce8b0e.r2.dev',
        port: '',
        pathname: '/elancosmetic/**',
      }
    ], 
  }
};

const withNextIntl = createNextIntlPlugin();
// Chain both plugins
export default withPayload(withNextIntl(nextConfig));
