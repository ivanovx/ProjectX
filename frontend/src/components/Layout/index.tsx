import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Button, Grid, Typography, Stack, Divider } from '@mui/material';

import AuthProvider from '../Auth';
import useUser from '../../hooks/useUser';

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
                <Button href="/" variant="text">Home</Button>
                <Button href="/stats" variant="text">Stats</Button>
                <Button href="/dashboard" variant="text">Dashboard</Button>
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

    return (
        <>
            <Grid container spacing={2} margin="1rem auto">
                <Grid item xs={12} md={2}>
                    <Typography variant='h5' align='center'>ProjectX</Typography>
                    <Typography variant='body2' align='center'>Some slogan</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <AppNav />               
                </Grid>
                <Grid item xs={6} md={4}>
                    <AuthNav />
                </Grid>
            </Grid>
            <Divider variant='fullWidth' sx={{ marginBottom: '0.75rem' }} />
        </>
    );
}

function Footer (){
    return <div />
}