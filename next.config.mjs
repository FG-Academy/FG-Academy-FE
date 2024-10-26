/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  images: {
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "",
      //   pathname: "/asset/**",
      // },
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
        hostname: "43.202.237.172",
        port: "",
        pathname: "/asset/**",
      },
      {
        protocol: "http",
        hostname: "3.35.133.209",
        port: "",
        pathname: "/asset/**",
      },
      {
        protocol: "https",
        hostname: "3.35.133.209",
        port: "",
        pathname: "/asset/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
