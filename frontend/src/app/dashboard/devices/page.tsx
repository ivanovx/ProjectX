import React from "react";
import {
    Container,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Chip
} from '@mui/material';

import DeviceActions from "@/components/Devices/DeviceActions";

import { getAccessToken } from "@/modules/auth/auth";
import { getUserDevices } from "@/modules/services/device-service";

export default async function Page() {
    const token = await getAccessToken();
    const devices = await getUserDevices(token);

    return (
        <Container>
            <DeviceActions accessToken={token} action="create" />
            <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Controller</TableCell>
                            <TableCell>Sensors</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map(device => (
                            <TableRow key={device.id}>
                                <TableCell>{device.id}</TableCell>
                                <TableCell>{device.name}</TableCell>
                                <TableCell>{new Date(device.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{device.controller}</TableCell>
                                <TableCell>
                                    {device.sensors.map(sensor => <Chip label={sensor} variant="outlined" sx={{ marginX: "0.25rem"}} />)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}