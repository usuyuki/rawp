/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
