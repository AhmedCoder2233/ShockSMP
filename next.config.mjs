/** @type {import('next').NextConfig} */
const nextConfig = {
        experimental: {
          serverComponentsExternalPackages: ["keyv", "gamedig"],
        },      
};

export default nextConfig;
