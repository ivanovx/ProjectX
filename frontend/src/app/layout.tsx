import './globals.css'
import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
    title: 'ProjectX',
    description: 'Make open data from community sensors.',
}

type Props = {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <UserProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </UserProvider>
    );
}
