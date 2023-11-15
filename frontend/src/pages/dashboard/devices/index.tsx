import React from "react";
import { getAccessToken } from '@auth0/nextjs-auth0';

import DeviceService from "@/modules/services/device-service";

/*
import { getAccessToken } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Container } from "@mui/material";

export default withPageAuthRequired(function Dashboard(props: any) {
    return (
        <Container maxWidth="md">
            <h1>Devices</h1>
        </Container>
    );
});

export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);

    return { props: { token: accessToken } };
  }*/
/*
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from "@mui/material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Devices(props) {
    const [devices, setDevices] = React.useState<any[] | null>(null);

    React.useEffect(() => {
        DeviceService.getUserDevices(props.token).then((devices: any[]) => {
            console.log(devices);
            setDevices(devices);
        });
    }, []);

    return (
        <Container maxWidth="md">
            <Button>Create Device</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

function CreateDevice(token: string) {

}

export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);

    return { props: { token: accessToken } };
}*/

import { useFormik } from "formik";

import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@mui/material';

import { SENSORS, CONTROLLERS } from "@/modules/mock";

export default function CreateDevice() {
    const [open, setOpen] = React.useState(false);

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
            console.log(values);
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
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            select
                            label="Controller"
                            variant="standard"
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
                            fullWidth
                            select
                            label="Sensors"
                            variant="standard"
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
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => setOpen(false)}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}