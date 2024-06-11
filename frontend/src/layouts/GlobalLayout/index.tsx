"use client";

import React from 'react';
import { Session } from 'next-auth';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Link,
    Grid,
    AppBar,
    Button,
    Toolbar,
    Container,
    Typography,
    CssBaseline,
} from '@mui/material';

import NavLink from "@/components/NavLink";

const footers = [
    {
        title: 'Project',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

export default function GlobalLayout({ session, children }: { session: Session | null, children: React.ReactNode }) {
    const defaultTheme = createTheme();
    
    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>Sensor Network</Typography>
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
                            {!session && <Button onClick={() => signIn("default")} variant="outlined" sx={{ my: 1, mx: 1.5 }}>Sign in</Button>}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container disableGutters maxWidth="100%" component="main">{children}</Container>
                <Container maxWidth="md" component="footer"
                    sx={{
                        borderTop: theme => `1px solid ${theme.palette.divider}`,
                        mt: 8,
                        py: [3, 6],
                    }}>
                    <Grid container spacing={4} justifyContent="space-evenly">
                        {footers.map((footer) => (
                            <Grid item xs={6} sm={3} key={footer.title}>
                                <Typography variant="h6" color="text.primary" gutterBottom>{footer.title}</Typography>
                                <ul>
                                    {footer.description.map((item) => (
                                        <li key={item}>
                                            <Link href="#" variant="subtitle1" color="text.secondary">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                        {'Copyright © '}
                        <Link color="inherit" href="/">Sensor Network</Link>
                        {' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </ThemeProvider>
        </SessionProvider>
    );
}