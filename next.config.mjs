import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-8f27dac0e3e64617922a8af7758dbbf7.r2.dev',
        port: '',
        pathname: '/elen-cosmetic/**',
      }
    ], 
  }
};

const withNextIntl = createNextIntlPlugin();
// Chain both plugins
export default withPayload(withNextIntl(nextConfig));
