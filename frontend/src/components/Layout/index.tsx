import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Navbar,Footer } from 'flowbite-react';

//import AuthProvider from '../Auth';
//import useUser from '../../hooks/useUser';
//import Link from '../Link';

import RootLayout from './Root';

export default function Layout() {
    return (
        <RootLayout requireAuth={false}>
            <div className="mx-auto max-w-7xl">
                <Navbar fluid rounded>
                    <Navbar.Brand href="/">
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            ProjectX
                        </span>
                    </Navbar.Brand>
                    <div className="flex md:order-2">
                        <Button>Login</Button>
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <Navbar.Link href="/">Home</Navbar.Link>
                        <Navbar.Link href="/stats">Stats</Navbar.Link>
                        <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
                <Outlet />
                <Footer container className="my-3">
                    <Footer.Copyright
                        by="ProjectX"
                        href="/"
                        year={2023}
                    />
                    <Footer.LinkGroup>
                        <Footer.Link href="#">About</Footer.Link>
                        <Footer.Link href="#">Policy</Footer.Link>
                        <Footer.Link href="#">Contact</Footer.Link>
                        <Footer.Link href="#">Documentation</Footer.Link>
                    </Footer.LinkGroup>
                </Footer>
            </div>
        </RootLayout>
    );
}

//function Header() {
   /* const AppNav = () => {
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
    };*/

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

  //  return (
        
  //  )
//}