/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    images: {
        domains: ["storage.googleapis.com"],
        minimumCacheTTL: 1500000,
    },
    compiler: {
        // removeConsole: process.env.NODE_ENV === "production",
        removeConsole: false,
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
