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
import { getDeviceToken } from "@/modules/services/token-service";
import CreateToken from "@/components/Tokens/CreateToken";

export default async function Page() {
    const acccessToken = await getAccessToken();
    const devices = await getUserDevices(acccessToken);    

    const getToken = async (deviceId: string) => {
        try {
            const token = await getDeviceToken(acccessToken, deviceId);

            console.log(token);

            return token;
        } catch (error) {
            console.log(error);
            
            return null;
        }

       // getDeviceToken(acccessToken, deviceId).then(res => {
        //    console.log(res);
        //}).catch(err => console.log(err));

    }

    return (
        <Container>
            <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Token</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map(async (device: any) => {
                            const token = await getToken(device.id);
                            
                            console.log(token);

                            return (
                                <TableRow key={device.id}>
                                    <TableCell>{device.id}</TableCell>
                                    <TableCell>{device.name}</TableCell>
                                    <TableCell>{token.value}</TableCell>
                                    <TableCell>
                                        <CreateToken accessToken={acccessToken} deviceId={device.id} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}