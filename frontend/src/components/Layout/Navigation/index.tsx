import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Link as MuiLink, Typography, Button } from "@mui/material";

export default function Navigation() {
    const { user, error, isLoading } = useUser();
  
    if (error) {
        return <Typography variant="body2">Have error {error.message}</Typography>
    }

    return (
        <Typography component="nav">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/stats">Stats</NavLink>
            {user && <NavLink href="/dashboard">Dashboard</NavLink>}
            {user && user?.sub}
            {user && <Button href="/api/auth/logout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>Sign out</Button>}
            {!user && <Button href="/api/auth/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>Sign in</Button>}
        </Typography>
    )
}

const NavLink = React.forwardRef((props: any, ref: any) => {
    const currentPath = usePathname();
    const isCurrentPath = currentPath === props.href;

    return (
        <MuiLink 
            {...props}
            ref={ref}
            component={Link}
            variant="button" 
            color="text.primary"
            sx={{ my: 1, mx: 1.5 }}
            underline={isCurrentPath ? "always": "none"}
        />
    );
});