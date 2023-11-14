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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { SENSORS, CONTROLLERS } from "@/modules/mock";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

export default function CreateDevice() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>Create Device</Button>
            <Dialog open={open} fullWidth={true} maxWidth="lg">
                <DialogTitle>New device</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        fullWidth
                        select
                        label="Controller"
                        defaultValue="Arduino"
                        variant="standard"
                        SelectProps={{
                            native: true,
                        }}
                    >
                        {CONTROLLERS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        select
                        label="Sensors"
                        defaultValue="Arduino"
                        variant="standard"
                        SelectProps={{
                            native: true
                        }}
                    >
                        {SENSORS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                    <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
                    <Slider
                        defaultValue={30}
                        step={1}
                        marks
                        min={1}
                        max={10}
                    />
                     <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
                     <Slider
                        defaultValue={30}
                        step={1}
                        marks
                        min={1}
                        max={10}
                    />
                     <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
                     <Slider
                        defaultValue={30}
                        step={1}
                        marks
                        min={1}
                        max={10}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => setOpen(false)}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}