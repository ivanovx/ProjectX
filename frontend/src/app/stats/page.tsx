import DevicesListInArea from "@/components/Stats";
import { Container, Typography } from "@mui/material";

export default async function Page() {
    return (
        <Container sx={{ my: "2.5rem" }}>
            <Typography variant="h1" textAlign="center">Statics</Typography>
            <DevicesListInArea />
        </Container>
    );
}
