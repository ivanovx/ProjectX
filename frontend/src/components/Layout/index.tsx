import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Grid, Typography, Stack, Divider } from '@mui/material';

import AuthProvider from '../Auth';
import useUser from '../../hooks/useUser';
import Link from '../Link';

import { Button, Navbar } from 'flowbite-react';

export default function Layout() {
    return (
        <AuthProvider>
            <Container>
                <Header />
                <Outlet />
                <Footer />
            </Container>
        </AuthProvider>
    );
}

function Header() {
    const AppNav = () => {
        return (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Link href="/" label="Home" />
                <Link href="/stats" label="Stats" />
                <Link href="/dashboard" label="Dashboard" />
            </Stack>
        );
    };

    const AuthNav = () => {
        return (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Button href="/user/signup" variant="text">Sign Up</Button>
                <Button href="/user/signin" variant="text">Sign In</Button>
                <Button variant="text">Sign Out</Button>
            </Stack>
        );
    };

    /*return (
        <>
            <Grid container spacing={2} margin="1rem auto">
                <Grid item xs={12} md={3}>
                    <Typography variant='h5' align='center'>ProjectX</Typography>
                    <Typography variant='body2' align='center'>Make open data from community sensors.</Typography>
                </Grid>
                <Grid item xs={6} md={5}>
                    <AppNav />               
                </Grid>
                <Grid item xs={6} md={4}>
                    <AuthNav />
                </Grid>
            </Grid>
            <Divider variant='fullWidth' sx={{ marginBottom: '0.75rem' }} />
        </>
    );*/

    return (
        <Navbar
            fluid
            rounded
        >
            <Navbar.Brand href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    ProjectX
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button>Login</Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    active
                    href="#"
                >
                    <p>
                        Home
                    </p>
                </Navbar.Link>
                <Navbar.Link href="#">
                    About
                </Navbar.Link>
                <Navbar.Link href="#">
                    Services
                </Navbar.Link>
                <Navbar.Link href="#">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="#">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

function Footer() {
    return <div />
}