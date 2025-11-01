/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',
                port: '',
                pathname: '/public/**',
            }
        ]
    },
    // Ensure middleware runs on Edge Runtime
    experimental: {
        // Middleware runs on Edge Runtime by default in Next.js 14
    },
};

export default nextConfig;
