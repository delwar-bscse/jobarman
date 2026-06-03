/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
      allowedDevOrigins: [
        "localhost:3000",
        "localhost:3001",
        "10.10.7.47:3000",
        "10.10.7.47:3001",
      ],
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        // pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
