import { Tabs, Tab, Container, Button, Grid } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Auth, { useAuth } from '../Auth';

export default function Layout() {
    const auth = useAuth();

    return (
        <Auth>
            <Container>
                <Navbar auth={auth} />
                <Outlet />
            </Container>
        </Auth>
    );
}

function Navbar({ auth }) {
    return (
        <Grid container spacing={2} margin="1rem auto 2rem">
            <Grid item xs={6} md={8}>
                <Button href="/" variant="text">Home</Button>
                {auth.token && <Button href="/dashboard" variant="text">Dashboard</Button>}
            </Grid>
            <Grid item xs={6} md={4}>
                {!auth.token && (
                    <>
                        <Button href="/user/signup" variant="text">Sign Up</Button>
                        <Button href="/user/signin" variant="text">Sign In</Button>
                    </>
                )}
                
                {auth.token && <Button variant="text">Sign Out</Button>}
            </Grid>
        </Grid>
    );
}

/*
  <Container sx={containerSx}>
           
            
        </Container>
*/

/*
        <Tabs value={location.pathname} onChange={(e: React.SyntheticEvent, newValue: string) => navigate(newValue)} variant="fullWidth">
            <Tab value="/home" label="Home" />
            <Tab value="/map" label="Map" />
            <Tab value="/dashboard" label="Dashboard" />
            <Tab value="/user/signin" label="Sign In" />
            <Tab value="/user/signup" label="Sign Up" />
            <Tab onClick={auth.signOut} label="Sign Out" />
        </Tabs>

*/