/** @type {import('next').NextConfig} */
const nextConfig = {
}

module.exports = nextConfig

module.exports = {
    // ... other webpack configuration options
    reactStrictMode: false, // React strict mode is disabled

    experimental: {
        serverActions: true, // Experimental server actions are enabled
    },

    webpack: (config, { webpack }) => {
        // Define the Markdown loader rule
        config.module.rules.push({
            test: /\.md$/,
            use: ['html-loader', 'markdown-loader'],
        });

        return config;
    },
};


