import { Tabs, Tab } from '@mui/material';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import UserService from '../../modules/user-service';

export default function Layout() {


    return (
        <div className="layout">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/map">Map</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/auth/signin">Sign In</Link>
                <Link to="/auth/signup">Sign Up</Link>
                <Link to="/auth/signout">Sign Out</Link>
            </nav>
            <Navbar />
            <Outlet />
        </div>
    );
}

function Navbar() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState<string | null>(null);

    const handleChange = (event: React.SyntheticEvent, newValue:string) => {
        setValue(oldValue => newValue);
        navigate(newValue);
    };

    
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
        >
            <Tab value="home" label="Home" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
        </Tabs>
    );
}