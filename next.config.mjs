/** @type {import('next').NextConfig} */
const nextConfig = {
    // Removed 'output: export' to support dynamic routes and API calls
    trailingSlash: true,
    images: {
        unoptimized: true
    }
};

export default nextConfig;
