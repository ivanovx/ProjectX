import { notFound } from "next/navigation";
import { Container, Typography } from "@mui/material";

import { getDeviceStats } from "@/modules/services/stat-service";
import DeviceStats from "@/components/Devices/DeviceStats";

// https://next-auth.js.org/v3/tutorials/refresh-token-rotation

export default async function Page({ params }: { params: { deviceId: string } }) {
    const device = await getDeviceStats(params.deviceId);

    if (!device) {
        return notFound();
    }

    console.log(device)

    const tempValues = device.measurements.map(m => {
        return {
            timestamp: m.timestamp,
            temperature: m.values.temperature
        }
    })

    console.log(tempValues)

    return (
        <Container sx={{ my: "2.5rem" }}>
            <Typography variant="h1" textAlign="center">{device.data.name}</Typography>
            <DeviceStats tempValues={tempValues} />
        </Container>
    );
}