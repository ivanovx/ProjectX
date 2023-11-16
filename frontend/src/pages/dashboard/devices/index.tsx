import React from "react";
import dynamic from 'next/dynamic'
import { useFormik } from "formik";
import { getAccessToken } from '@auth0/nextjs-auth0';

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
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';

import DeviceService from "@/modules/services/device-service";

import { SENSORS, CONTROLLERS } from "@/modules/mock";

const Search = dynamic(() => import('@/components/Search'), {
    ssr: false,
});

type DeviceProps = {
    devices: any[];
    token: string;
}

export default function Devices({ devices, token }: DeviceProps) {
    return (
        <Container sx={{ marginTop: "1rem" }}>
            <CreateDevice token={token} />
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

function CreateDevice({ token }: { token: string }) {
    const [open, setOpen] = React.useState(false);
    const [coordinates, setCoordinates] = React.useState({
        latitude: 0.0,
         longitude: 0.0
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            controller: '',
            sensors: '',
            coordinates: {
                latitude: 0.0,
                longitude: 0.0
            }
        },
        onSubmit: (values) => {
            values = {
                ...values,
                coordinates,
            };

            console.log(values);

            DeviceService.createDevice(values, token).then(console.log).catch(console.log);
        },
    });

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>Create Device</Button>
            <Dialog open={open} fullWidth={true} maxWidth="lg">
                <DialogTitle>New device</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            name="name"
                            label="Name"
                            fullWidth
                            variant="standard"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            name="controller"
                            label="Controller"
                            variant="standard"
                            fullWidth
                            select
                            SelectProps={{
                                native: true,
                            }}
                            value={formik.values.controller}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.controller && Boolean(formik.errors.controller)}
                            helperText={formik.touched.controller && formik.errors.controller}    
                        >
                            {CONTROLLERS.map((option) => <option key={option} value={option}>{option}</option>)}
                        </TextField>
                        <TextField
                            name="sensors"
                            label="Sensors"
                            variant="standard"
                            fullWidth
                            select
                            SelectProps={{
                                native: true
                            }}
                            value={formik.values.sensors}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sensors && Boolean(formik.errors.sensors)}
                            helperText={formik.touched.sensors && formik.errors.sensors}  
                        >
                            {SENSORS.map((option) => <option key={option} value={option}>{option}</option>)}
                        </TextField>
                        <hr />
                        <Search onSelectValue={(coordinates) => setCoordinates({
                            latitude: coordinates.x,
                            longitude: coordinates.y
                        })} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => formik.submitForm()}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);
    
    const devices: any[] = await DeviceService.getUserDevices(accessToken!) as any[];

    return { 
        props: {
            devices,
            token: accessToken 
        } 
    };
}
