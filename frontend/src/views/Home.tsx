import React from "react";
import { Container } from "@mui/material";

import DeviceService from "../modules/device-service";

export default function Home() {
    const [devices, setDevices] = React.useState<any[]>([]);
/*
    React.useEffect(() => {
        DeviceService
            .getAllDevices()
            .then(allDevices => setDevices(allDevices))
            .catch(console.log);
    }, []);
    */

    return (
        <Container>{devices.map(device => <h1>{device.title}</h1>)}</Container>
    );
}