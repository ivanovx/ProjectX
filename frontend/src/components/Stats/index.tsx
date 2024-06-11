"use client";

import { getAllDevicesInArea } from "@/modules/services/device-service";
import { useSearchParams } from "next/navigation";
import React from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";

export default function DevicesListInArea() {
    const [devices, setDevices] = React.useState<any[] | null>(null);
    const searchParams = useSearchParams();
 
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    React.useEffect(() => {
        getAllDevicesInArea(lat!, lon!).then(devices => setDevices(devices)).catch(err => console.log(err));
    }, []);

    return (
        <Box>
            <List>
                {devices?.map(device => (
                    <ListItem key={device.id}>
                        <ListItemText>
                            <Link href={`/stats/${device.id}`}>{device.id}</Link>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}