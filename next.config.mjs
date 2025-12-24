/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    bodySizeLimit: "500mb",
  },

  images: {
    // Allowed external image patterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allow all https hostnames
        pathname: "**", // allow all paths
      },
    ],
  },

  allowedDevOrigins: ["http://10.10.7.30:3010", "http://localhost:3000"],
};

export default nextConfig;
