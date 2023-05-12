import { Tabs, Tab, Container } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Auth, { useAuth } from '../Auth';

export default function Layout() {
    return (
        <Auth>
             <Container>
                <Navbar />
                <Outlet />
            </Container>
        </Auth>
    );
}

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <Tabs value={location.pathname} onChange={(e: React.SyntheticEvent, newValue: string) => navigate(newValue)} variant="fullWidth">
            <Tab value="/home" label="Home" />
            <Tab value="/map" label="Map" />
            <Tab value="/dashboard" label="Dashboard" />
            <Tab value="/user/signin" label="Sign In" />
            <Tab value="/user/signup" label="Sign Up" />
            <Tab onClick={auth.signOut} label="Sign Out" />
        </Tabs>
    );
}