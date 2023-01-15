/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        unoptimized: true,
    },
    webpack: (config, { isServer }) => {
        config.experiments = {
            asyncWebAssembly: true,
        };
        config.output.webassemblyModuleFilename =
            (isServer ? '../' : '') + 'static/wasm/webassembly.wasm';
        return config;
    },
};

module.exports = nextConfig;
