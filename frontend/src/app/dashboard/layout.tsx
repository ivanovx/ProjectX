import DashboardLayout from "@/layouts/DashboardLayout";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}