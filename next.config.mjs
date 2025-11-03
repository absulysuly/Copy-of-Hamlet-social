/** @type {import('next').NextConfig} */
const nextConfig = {
    // Removed 'output: export' for dynamic routes support
    trailingSlash: true,
    images: {
        unoptimized: true
    }
    // Removed distDir as we're not doing static export
};

export default nextConfig;
