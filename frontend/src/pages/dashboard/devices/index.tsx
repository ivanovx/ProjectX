import React from "react";
import dynamic from 'next/dynamic';
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

import { getUserDevices, createDevice } from "@/modules/device.service";

import { CONTROLLERS } from "@/modules/mock";

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
    const Search = dynamic(() => import('@/components/Search'), {
        ssr: false,
    });

    const [open, setOpen] = React.useState(false);

    const [location, setLocation] = React.useState({
        latitude: 0.0,
        longitude: 0.0
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            controller: '',
            sensors: [],
            description: {
                indoor: false,
                trafficInArea: 0,
                industryInArea: 0
            }
        },
        onSubmit: async (values) => {
            const device = {
                ...values,
                location
            };

            const res = await createDevice(device, token);

            console.log(res);
        },
    });

    return (
        <FormikProvider value={formik}>
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
                            value={formik.values.controller}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.controller && Boolean(formik.errors.controller)}
                            helperText={formik.touched.controller && formik.errors.controller}    
                        >
                            {CONTROLLERS.map((option) => <option key={option} value={option}>{option}</option>)}
                        </TextField>
                        <FieldArray name="sensors">
                            {({ push, remove }) => (
                            <>
                                {formik.values.sensors.length > 0 && formik.values.sensors.map((sensor: string, index: number) => (
                                    <div key={index}>
                                        <TextField
                                            fullWidth
                                            label="Sensor"
                                            name={`sensors.${index}`}
                                            value={sensor}
                                            onChange={formik.handleChange}
                                        />
                                        <Button onClick={() => remove(index)}>X</Button>
                                    </div>
                                ))}
                                <Button onClick={() => push('')}>Add Sensor</Button>
                            </>
                            )}
                        </FieldArray>
                        <hr />
                        <Search onSelectValue={(coordinates) => setLocation({
                            latitude: coordinates.x,
                            longitude: coordinates.y
                        })} />
                        <hr />
                        <TextField
                            type="number"
                            name="trafficInArea"
                            label="Traffic in area"
                            fullWidth
                            variant="standard"
                            value={formik.values.description.trafficInArea}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            type="number"
                            name="industryInArea"
                            label="Industry in area"
                            fullWidth
                            variant="standard"
                            value={formik.values.description.industryInArea}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => formik.submitForm()}>Create</Button>
                </DialogActions>
            </Dialog>
        </FormikProvider>
    );
}


export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);
    
    const devices = await getUserDevices(accessToken!);
    
    return { 
        props: {
            devices,
            token: accessToken 
        } 
    };
}