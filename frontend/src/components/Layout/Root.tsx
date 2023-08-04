import AuthProvider from "../Auth";
import RequireAuth from "../Auth/RequireAuth";

type RootLayoutProps = {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export default function RootLayout({ children, requireAuth = false }: RootLayoutProps) {
    return <AuthProvider>{requireAuth ? <RequireAuth>{children}</RequireAuth> : children}</AuthProvider>;
}