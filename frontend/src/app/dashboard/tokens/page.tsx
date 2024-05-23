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

    //const tokens = (
    //    await Promise.all(
    //        devices.map(async device => await getDeviceToken(acccessToken, device.id) as any)
    //    )
    //).filter(token => token !== null);

    //let devicesWithoutToken: string[] = [];

    //const tokens = (await Promise.all(devices.map(async device => {
    //    try {
     //       const token = await getDeviceToken(acccessToken, device.id) as any;

     //       return token;
    //  } catch (error) {
      //      devicesWithoutToken.push(device.id);
       //     return null;
     //   }
        
   // }))).filter(token => token !== null);

   // const getToken = (deviceId: string) => {
       //return Promise.all(async () => await getDeviceToken(acccessToken, deviceId));

     //  return Promise.resolve(getDeviceToken(acccessToken, deviceId).then(token => token));
   // };

    const getToken = async (deviceId: string) => await getDeviceToken(acccessToken, deviceId);

    //const tokens = (await Promise.all(devices.map(async device => {
    //    try {
     //       const token = await getDeviceToken(acccessToken, device.id) as any;

     //       return token;
    //  } catch (error) {
      //      devicesWithoutToken.push(device.id);
       //     return null;
     //   }

    return (
        <Container>
            <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Token</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map(async (device: any) => {
                            const token = await getToken(device.id);
                            
                            return (
                                <TableRow key={device.id}>
                                    <TableCell>{device.id}</TableCell>
                                    <TableCell>{device.name}</TableCell>
                                    <TableCell>{token}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}