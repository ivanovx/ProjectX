import { Tabs, Tab } from '@mui/material';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="layout">
            <Navbar />
            <Outlet />
        </div>
    );
}

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const onSignOut = (e: React.SyntheticEvent) => {
        e.preventDefault();

        alert("Are you sure?");
    }

    return (
        <Tabs value={location.pathname} onChange={(e: React.SyntheticEvent, newValue: string) => navigate(newValue)} variant="fullWidth">
            <Tab value="/home" label="Home" />
            <Tab value="/map" label="Map" />
            <Tab value="/dashboard" label="Dashboard" />
            <Tab value="/user/signin" label="Sign In" />
            <Tab value="/user/signup" label="Sign Up" />
            <Tab onClick={onSignOut} label="Sign Out" />
        </Tabs>
    );
}