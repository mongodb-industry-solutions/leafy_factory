/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, 
    webpack: (config) => {
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
        });
        return config;
    },
    productionBrowserSourceMaps: false, // Disable source maps for production
};

export default nextConfig;