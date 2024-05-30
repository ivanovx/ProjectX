import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Container, Typography } from "@mui/material";
import { getDeviceStats } from "@/modules/services/stat-service";

// https://next-auth.js.org/v3/tutorials/refresh-token-rotation

const DeviceStats = dynamic(() => import("@/components/Devices/DeviceStats"));

export default async function Page({ params }: { params: { deviceId: string } }) {
    const device = await getDeviceStats(params.deviceId);

    if (!device) {
        return notFound();
    }

    const temperatureValues = device.measurements.map(m => {
        return {
            timestamp: m.timestamp,
            temperature: m.values.temperature
        }
    });

    return (
        <Container sx={{ my: "2.5rem" }}>
            <Typography variant="h1" textAlign="center">{device.data.name}</Typography>
            <DeviceStats temperatureValues={temperatureValues} />
        </Container>
    );
}