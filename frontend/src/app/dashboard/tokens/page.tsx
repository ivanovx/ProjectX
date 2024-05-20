import React from "react";
import { useFormik, FormikProvider, FieldArray } from "formik";

import {
    Container,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from '@mui/material';

import { getAccessToken } from "@/modules/auth/auth";
import { getUserDevices } from "@/modules/services/device-service";
import { getDeviceToken, createDeviceToken } from "@/modules/services/token-service";
import CreateToken from "@/components/Tokens/CreateToken";

export default async function Page() {
    const token = await getAccessToken();
    const devices = await getUserDevices(token);
    const deviceTokens = (
        await Promise.all(
            devices.map(async(device) => await getDeviceToken(token, device.id) as any)
        )
    ).filter(token => token.value != null);

    return (
        <Container>
            <CreateToken token={token} devices={devices.map(device => device.id)} />
            <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Device</TableCell>
                            <TableCell>Token</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deviceTokens.map((token: any) => (
                            <TableRow key={token.deviceId}>
                                <TableCell>{token.deviceId}</TableCell>
                                <TableCell>{token.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}