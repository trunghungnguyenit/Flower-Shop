/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Nên để false để catch lỗi sớm
  },
  images: {
    unoptimized: true,
  },
  // Tối ưu cho production
  reactStrictMode: true,
  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
