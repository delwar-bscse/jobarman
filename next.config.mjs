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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "blobs.experteer.com",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "d2q79iu7y748jz.cloudfront.net",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "media.glassdoor.com",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "logoimg.careerjet.net",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "internshala-uploads.internshala.com",
        port: "",
        pathname: "**", // Allow all paths under this domain
      },
    ],
  },

  allowedDevOrigins: ["http://172.31.16.1:3000", "http://localhost:3000"],
};

export default nextConfig;
