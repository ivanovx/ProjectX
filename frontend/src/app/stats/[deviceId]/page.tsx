import { notFound } from "next/navigation";
import { Container, Typography } from "@mui/material";

import { getDeviceStats } from "@/modules/services/device-service";

export default async function Page({ params }: { params: { deviceId: string } }) {
    const device = await getDeviceStats(params.deviceId);

    if (!device) {
        return notFound();
    }

    return (
        <Container sx={{ my: "2.5rem" }}>
            <Typography variant="h1" textAlign="center">{device.name}</Typography>
        </Container>
    );
}