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

import TokenService from "@/modules/services/token-service";
import DeviceService from "@/modules/services/device-service";

type DeviceProps = {
    accessToken: string;
    tokens: any[];
}

export default function Tokens({ tokens, accessToken }: DeviceProps) {

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
                        {tokens.map(token => (
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
    
    const devices = await DeviceService.getUserDevices(accessToken!) as any[];

    const allTokens = await Promise.all(devices.map(async(device) => await TokenService.getDeviceToken(device.id, accessToken!) as any));

    const tokens = allTokens.filter(token => token !== null);

    return { 
        props: {
            accessToken,
            tokens,
        } 
    };
}