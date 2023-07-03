import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RequireAuth from '../Auth/RequireAuth';
import { Outlet } from 'react-router-dom';
import AuthProvider from '../Auth';

const drawerWidth = 250;

export default function ResponsiveDrawer() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    //

    const drawer = (
        <>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton href='/'>
                        <ListItemText primary="Home" secondary="Go site home." />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/dashboard/devices'>
                        <ListItemText primary="Devices" secondary="Explore my devices." />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/dashboard/measurements'>
                        <ListItemText primary="Measurements" secondary="Explore my devices." />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/dashboard/profile'>
                        <ListItemText primary="Profile" secondary="Manage my profile." />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );

    const container = window !== undefined ? () => document.body : undefined;

    const appbarSx = {
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
    };

    return (
        <AuthProvider>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" sx={appbarSx}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap>Dashboard</Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </AuthProvider>
    );
}