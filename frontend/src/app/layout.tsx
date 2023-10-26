import './globals.css';
import type { Metadata } from 'next';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
    title: 'ProjectX',
    description: 'Make open data from community sensors.',
}

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <UserProvider>
            <html lang="en">
                <body>
                    <div className="mx-auto max-w-7xl">
                        <Header />
                        <main className='flex-1'>{children}</main>
                        <Footer />
                    </div>
                </body>
            </html>
        </UserProvider>
    );
}