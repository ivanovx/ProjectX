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
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeviceService from '../../../modules/device-service';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

export default function Devices() {
    const auth = useAuth();
    const [devices, setDevices] = React.useState([]);
    
    const token = auth.token.accessToken;

    const getDevices = () => {
        DeviceService
            .getUserDevices(token)
            .then((devices: any[]) => {
                console.log(devices)
                 setDevices(devices)
            })
            .catch(console.log);
    };

    React.useEffect(getDevices, []);
    React.useEffect(getDevices, [devices]);

    const onActivate = React.useCallback((id: any) => {
        DeviceService
            .activateDevice(id, token)
            .then(console.log)
            .catch(console.log);
    }, [devices]);

    return (
        <>
            <Button href="/dashboard/devices/create">Create</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Controller</TableCell>
                            <TableCell>Sensors</TableCell>
                            <TableCell>Outdoor</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Activated</TableCell>
                            <TableCell>Modified</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map(device => <Device key={device.id} device={device} onActivate={() => onActivate(device.id)} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

function Device({ device, onActivate }) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{device.id}</TableCell>
                <TableCell component="th" scope="row">{device.name}</TableCell>
                <TableCell component="th" scope="row">{device.controller}</TableCell>
                <TableCell component="th" scope="row">{device.sensors.join(', ')}</TableCell>
                <TableCell component="th" scope="row">{String(device.outdoor)}</TableCell>
                <TableCell component="th" scope="row">{device.created}</TableCell>
                <TableCell component="th" scope="row">{device.activated}</TableCell> 
                <TableCell component="th" scope="row">{device.modified}</TableCell>
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
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}