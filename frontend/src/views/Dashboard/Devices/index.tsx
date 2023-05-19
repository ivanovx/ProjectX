import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAuth } from '../../../components/Auth';
import DeviceService from '../../../modules/device-service';
import { Button } from '@mui/material';

export default function Devices() {
    const auth = useAuth();
    const [devices, setDevices] = React.useState([]);
    
    React.useEffect(() => {
        DeviceService
            .getUserDevices(auth.token.accessToken)
            .then((devices: any[]) => {
                setDevices(devices);
                console.log(devices);
            })
            .catch(console.log);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Activated</TableCell>
                        <TableCell>Outdoor</TableCell>
                        <TableCell>Created on</TableCell>
                        <TableCell>Activated on</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {devices.map(device => <Device key={device.id} device={device} token={auth.token.accessToken} />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Device({ device, token }) {
    const [open, setOpen] = React.useState(false);

    const onActivate = () => {
        console.log("activate device")
        DeviceService.activateDevice(device.id, token).then(console.log).catch(console.log);
    };

    const onGenereateCredentials = () => {
        console.log("Generate credentials for device");
        DeviceService.createToken(device.id, token).then(console.log).catch(console.log);
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{device.id}</TableCell>
                <TableCell component="th" scope="row">{device.name}</TableCell>
                <TableCell component="th" scope="row">{String(device.activated)}</TableCell>
                <TableCell component="th" scope="row">{String(device.outdoor)}</TableCell>
                <TableCell component="th" scope="row">{device.createdOn}</TableCell>
                <TableCell component="th" scope="row">{device.activatedOn}</TableCell>        
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Button onClick={onActivate}>Activate</Button>
                        <Button onClick={onGenereateCredentials}>Credentials</Button>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                  
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}