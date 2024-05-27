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
    const accessToken = await getAccessToken();
    const devices = await getUserDevices(accessToken);

    return (
        <Container>
            <DeviceActions accessToken={accessToken} action="create" />
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
                                <TableCell>{new Date(device.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{device.description.controller}</TableCell>
                                <TableCell>
                                    {device.description.sensors.map(sensor => <Chip label={sensor} variant="outlined" sx={{ marginX: "0.25rem"}} />)}
                                </TableCell>
                                <TableCell>
                                    <DeviceActions accessToken={accessToken} action="update" device={device} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}