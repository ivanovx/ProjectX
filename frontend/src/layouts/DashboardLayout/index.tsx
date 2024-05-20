"use client";

import { Box, Container, Grid } from "@mui/material";

import NavLink from "@/components/NavLink";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth="xl" sx={{ marginY: "3rem" }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
                        <NavLink href="/dashboard/devices">Devices</NavLink>
                        <NavLink href="/dashboard/tokens">Tokens</NavLink>
                        <NavLink href="/dashboard/measurements">Measurements</NavLink>
                    </Box>
                </Grid>
                <Grid item xs={8}>{children}</Grid>
                <Grid item xs={2}>
                    Logs here
                </Grid>
            </Grid>
        </Container>
    );
}