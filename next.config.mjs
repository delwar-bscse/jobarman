/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allowed external image patterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shariful5001.binarybards.online",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "shariful5001.binarybards.onlinehttps",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
    ],
  },

  allowedDevOrigins: ["http://172.31.16.1:3000", "http://localhost:3000"],
};

export default nextConfig;
