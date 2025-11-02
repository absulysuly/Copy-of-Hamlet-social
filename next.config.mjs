/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',
            },
            {
                protocol: 'https',
                hostname: 'hamlet-unified-complete-2027-production.up.railway.app'
            }
        ],
    },
};

export default nextConfig;