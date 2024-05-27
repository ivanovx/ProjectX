import type { Metadata } from "next";

import { getSession } from "@/modules/auth/auth";
import GlobalLayout from "@/layouts/GlobalLayout";

export const metadata: Metadata = {
    title: "Sensor Network",
    description: "TODO",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    return (
        <html lang="en">
            <body>
                <GlobalLayout session={session}>{children}</GlobalLayout>
            </body>
        </html>
    );
}