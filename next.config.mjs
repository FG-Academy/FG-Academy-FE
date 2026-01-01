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
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
  async rewrites() {
    // 개발 환경에서만 백엔드(8080)로 프록시
    // 프로덕션에서는 Nginx가 /api/* 요청을 백엔드로 라우팅
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/v1/:path*",
          destination: "http://localhost:8080/api/v1/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
