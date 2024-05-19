import React from "react";
import dynamic from 'next/dynamic';
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

import { getServerSession } from "next-auth";
import { authOptions } from "@/modules/authOptions";
import CreateDevice from "@/components/Devices/CreateDevice";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const devices = await getUserDevices(session.token.access_token);

    return (
        <Container>
            <CreateDevice token={session.token.access_token} />
            <CreateDevice token={session.token.access_token} />
            <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map(device => (
                            <TableRow key={device.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{device.id}</TableCell>
                                <TableCell align="right">{device.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}