import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Button, Grid } from '@mui/material';

import AuthProvider from '../Auth';
import useUser from '../../hooks/useUser';

export default function Layout() {
    return (
        <AuthProvider>
            <Container>
                <Grid container spacing={2} margin="1rem auto 2rem">
                    <Grid item xs={6} md={8}>
                        <Button href="/" variant="text">Home</Button>
                        <Button href="/dashboard" variant="text">Dashboard</Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Button href="/user/signup" variant="text">Sign Up</Button>
                        <Button href="/user/signin" variant="text">Sign In</Button>
                        <Button variant="text">Sign Out</Button>
                    </Grid>
                </Grid>
                <Outlet />
            </Container>
        </AuthProvider>
    );
}