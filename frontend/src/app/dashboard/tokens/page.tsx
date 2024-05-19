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

import { getUserDevices } from "@/modules/device.service";
import { getDeviceToken, createDeviceToken } from "@/modules/token.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/authOptions";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const accessToken = session.token.access_token;

    const userDevices = await getUserDevices(accessToken!);
    const deviceTokens = (
        await Promise.all(
            userDevices.map(async(device) => await getDeviceToken(accessToken!, device.id) as any)
        )
    ).filter(token => token.value != null)

    console.log(deviceTokens);

    return (
        <Container>
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