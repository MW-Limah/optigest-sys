import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Esta opção permite que o Next.js busque imagens de IPs locais
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
    // Tente adicionar isto se o erro persistir em ambiente de desenvolvimento
    unoptimized: true,
  },
};

export default nextConfig;
