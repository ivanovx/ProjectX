/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_ISSUER_URL: 'http://localhost:8001',
        NEXTAUTH_CLIENT_ID: 'sensor-network',
        NEXTAUTH_CLIENT_SECRET: 'sensor-network-secret',
        NEXTAUTH_SECRET: 'uVpRHsWdxXTornKzdZM4m55eE7fxYoa/IfPLNqLb9fk='
    }
};

export default nextConfig;