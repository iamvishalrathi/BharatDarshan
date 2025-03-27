/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        // Enable ESLint
        ignoreDuringBuilds: true, // Ignore ESLint during production builds
        dirs: ['app', 'components'], // Specify the directories to lint
    },
    images: {
        domains: ['https://localhost:3000'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'amiable-ladybug-321.convex.cloud'
            },
            {
                protocol: 'https',
                hostname: 'amiable-ladybug-321.convex.cloud'
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            },
        ]
    }
};

export default nextConfig;
