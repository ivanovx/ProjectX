/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_ISSUER_URL: 'http://localhost:8001',
        NEXTAUTH_CLIENT_ID: 'sensor-network',
        NEXTAUTH_CLIENT_SECRET: 'sensor-network-secret',
        NEXTAUTH_SECRET: 'wR0V0Y3oVn9FvWpvEp43w7vC0aILCUEhb/a8WfRJuG0='
    }
};

export default nextConfig;