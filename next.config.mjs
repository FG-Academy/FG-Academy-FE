/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "fgcacademy.co.kr",
        port: "",
        pathname: "/asset/**",
      },
      {
        protocol: "https",
        hostname: "fgcacademy.co.kr",
        port: "",
        pathname: "/asset/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
