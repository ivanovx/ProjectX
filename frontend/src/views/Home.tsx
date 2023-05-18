import React from "react";
import DeviceService from "../modules/device-service";
import { error } from "console";

export default function Home() {
    const [devices, setDevices] = React.useState([]);

    React.useEffect(() => {
        DeviceService
            .getAllDevices()
            .then((devices: any[]) => setDevices(devices))
            .catch(err => console.log(err));
    }, []);

    return (
        <ul>
            {devices.map(device => (
                <li key={device.id}>{device.title}</li>
            ))}
        </ul>
    );
}