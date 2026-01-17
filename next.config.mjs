/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d347yuo1lx3h4g.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
