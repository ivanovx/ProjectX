/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_ISSUER_URL: 'http://localhost:8001',
        NEXTAUTH_CLIENT_ID: 'sensor-network',
        NEXTAUTH_CLIENT_SECRET: 'sensor-network-secret',
        NEXTAUTH_SECRET: 'b0dd84a40d536d0e0adfea07edc3ae783048ffd3413899a4e73b72de34c7bb13'
    }
};

export default nextConfig;