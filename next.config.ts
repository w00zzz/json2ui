import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Configuración de alias de ruta
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "."),
      "@/backend": path.resolve(__dirname, "./backend"),
      "@/db": path.resolve(__dirname, "./db"),
    };
    return config;
  },
  // Habilitar el modo estricto para desarrollo
  reactStrictMode: true,
  // Configuración de imágenes
  images: {
    domains: ["localhost"], // Agrega aquí los dominios de tus imágenes
  },
  // Configuración de encabezados de seguridad
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
