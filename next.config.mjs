/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "http",
        hostname: "43.202.237.172",
        port: "3000",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
