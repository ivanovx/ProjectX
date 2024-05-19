"use client";

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Link,
    Grid,
    AppBar,
    Container,
    Toolbar,
    CssBaseline,
    Typography
} from '@mui/material';

import Navigation from './Navigation';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

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

export default function Layout({ session, children }: { session: Session, children: React.ReactNode }) {
    const defaultTheme = createTheme();

    return (
        <SessionProvider session={session}>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>Sensor Network</Typography>
                    <Navigation session={session} />
                </Toolbar>
            </AppBar>
            
            <Container disableGutters maxWidth="100%" component="main">{children}</Container>
            
            <Container maxWidth="md" component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
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