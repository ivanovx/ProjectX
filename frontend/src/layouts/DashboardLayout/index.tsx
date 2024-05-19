import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth="xl" sx={{ marginY: "3rem" }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
                        <NavLink href="/dashboard/devices" title="Devices" />
                        <NavLink href="/dashboard/tokens" title="Tokens" />
                        <NavLink href="/dashboard/measurements" title="Measurements" />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    );
}

const NavLink = ({ href, title }: { href: string, title: string }) => <Button href={href} component={Link} variant="outlined">{title}</Button>