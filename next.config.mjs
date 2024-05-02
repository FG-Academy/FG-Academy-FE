/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/asset/**",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "",
        pathname: "/asset/**",
      },
      {
        protocol: "http",
        hostname: "43.202.237.172",
        port: "",
        pathname: "/asset/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
