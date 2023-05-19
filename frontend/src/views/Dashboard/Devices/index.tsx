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
                        <TableCell>Title</TableCell>
                        <TableCell>Activated</TableCell>
                        <TableCell>Indoor</TableCell>
                        <TableCell>Created on</TableCell>
                        <TableCell >Activated on</TableCell>
                        <TableCell  />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {devices.map(device => <Device key={device.id} device={device} />)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Device({ device }) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{device.id}</TableCell>
                <TableCell component="th" scope="row">{device.title}</TableCell>
                <TableCell component="th" scope="row">false</TableCell>
                <TableCell component="th" scope="row">false</TableCell>
                <TableCell component="th" scope="row">{Date.now()}</TableCell>
                <TableCell component="th" scope="row">{Date.now()}</TableCell>        
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
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