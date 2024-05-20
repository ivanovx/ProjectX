import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getSession } from "@/modules/auth/auth";
import GlobalLayout from "@/layouts/GlobalLayout";

const inter = Inter({ 
    subsets: ["latin"] 
});

export const metadata: Metadata = {
    title: "Sensor Network",
    description: "TODO",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    return (
        <html lang="en">
            <body className={inter.className}>
                <GlobalLayout session={session}>{children}</GlobalLayout>
            </body>
        </html>
    );
}