import React from "react";
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useFormik, FormikProvider, FieldArray } from "formik";

import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
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

export default function Tokens({ userDevices, deviceTokens, accessToken }: any) {

    return (
        <Container sx={{ marginTop: "1rem" }}>
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

export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);

    const userDevices = await getUserDevices(accessToken!);
    const deviceTokens = (
        await Promise.all(
            userDevices.map(async(device) => await getDeviceToken(accessToken!, device.id) as any)
        )
    ).filter(token => token.value != null)

    console.log(deviceTokens);

    return { 
        props: {
            accessToken,
            userDevices,
            deviceTokens
        } 
    };
}