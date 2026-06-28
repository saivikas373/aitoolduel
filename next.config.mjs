/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'aitoolduel.com' }],
        destination: 'https://www.aitoolduel.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
