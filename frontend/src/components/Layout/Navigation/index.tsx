import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
//import { useUser } from "@auth0/nextjs-auth0/client";
import { Link as MuiLink, Typography, Button } from "@mui/material";

import { useSession, signIn, signOut } from "next-auth/react"

export default function Navigation() {
    const { data: session } = useSession();

    return (
        <Typography component="nav">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/stats">Stats</NavLink>
            {session && (
                <>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                    <Typography component="span">Hello {session.user?.name}!</Typography>
                    <Button onClick={() => signOut()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>Sign out</Button>
                </>
            )}
            {!session && <Button onClick={() => signIn()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>Sign in</Button>}
        </Typography>
    ); 

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