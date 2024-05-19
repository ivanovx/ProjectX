import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

import { authOptions } from "@/modules/authOptions";
import GlobalLayout from "@/layouts/GlobalLayout";

const inter = Inter({ 
    subsets: ["latin"] 
});

export const metadata: Metadata = {
    title: "Sensor Network",
    description: "TODO",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className={inter.className}>
                <GlobalLayout session={session!}>{children}</GlobalLayout>
            </body>
        </html>
    );
}