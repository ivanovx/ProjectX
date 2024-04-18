import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import { 
    createTheme, 
    ThemeProvider 
} from '@mui/material/styles';

import {
    Link,
    Grid,
    AppBar,
    Container,
    Button,
    Toolbar,
    CssBaseline,
    Typography
} from '@mui/material';

type LayoutProps = {
    children: React.ReactNode
}

const defaultTheme = createTheme();

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">Sensor Network</Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

const NavLink = ({ href, label }: { href: string, label: string }) =>
<Link variant="button" color="text.primary" href={href} sx={{ my: 1, mx: 1.5 }}>{label}</Link>

export default function Layout({ children }: LayoutProps) {
    const { user, error, isLoading } = useUser();
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>Sensor Network</Typography>
                    <nav>
                        <NavLink href="/" label="Home" />
                        <NavLink href="/stats" label="Stats" />
                        {user && <NavLink href="/dashboard" label="Dashboard" />}

                    </nav>
                    {user && user?.sub}
                    {user && <Button href="/api/auth/logout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>Sign out</Button>}
                    {!user && <Button href="/api/auth/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>Sign in</Button>}
                </Toolbar>
            </AppBar>
            
            <Container disableGutters maxWidth="100%" component="main">
                {children}
            </Container>
            
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
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}